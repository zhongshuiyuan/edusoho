<?php
namespace Topxia\WebBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Topxia\Service\Order\OrderRefundProcessor\OrderRefundProcessorFactory;
use Topxia\Service\Common\ServiceEvent;
use Topxia\Service\Common\ServiceKernel;

class OrderRefundController extends BaseController
{
    public function refundAction(Request $request, $id)
    {
        $targetType = $request->query->get("targetType");

        if (!in_array($targetType, array("course", "classroom"))) {
            throw $this->createAccessDeniedException($this->getServiceKernel()->trans('参数不对。'));
        }

        $processor = OrderRefundProcessorFactory::create($targetType);

        $target = $processor->getTarget($id);
        $user   = $this->getCurrentUser();
        $member = $processor->getTargetMember($id, $user["id"]);

        if (empty($member) || empty($member['orderId'])) {
            throw $this->createAccessDeniedException($this->getServiceKernel()->trans('您不是学员或尚未购买，不能退学。'));
        }

        $order = $this->getOrderService()->getOrder($member['orderId']);

        if (empty($order)) {
            throw $this->createNotFoundException();
        }

        if ($order['targetType'] == 'groupSell') {
            throw $this->createAccessDeniedException($this->getServiceKernel()->trans('组合购买课程不能退出。'));
        }

        if ('POST' == $request->getMethod()) {
            $data   = $request->request->all();
            $reason = empty($data['reason']) ? array() : $data['reason'];
            $amount = empty($data['applyRefund']) ? 0 : null;

            $refund = $processor->applyRefundOrder($member['orderId'], $amount, $reason, $this->container);
            if ($refund['status'] == 'success') {
            $this->dispatchEvent(
                'learn.refund',
                new ServiceEvent($refund, array('userId' => $user['id']))
            );            
            }
            return $this->createJsonResponse(true);
        }

        $maxRefundDays = (int) $this->setting('refund.maxRefundDays', 0);
        $refundOverdue = (time() - $order['createdTime']) > ($maxRefundDays * 86400);
        return $this->render('TopxiaWebBundle:OrderRefund:refund-modal.html.twig', array(
            'target'        => $target,
            'targetType'    => $targetType,
            'order'         => $order,
            'maxRefundDays' => $maxRefundDays,
            'refundOverdue' => $refundOverdue,
        ));
    }

    public function cancelRefundAction(Request $request, $id)
    {
        $targetType = $request->query->get("targetType");

        if (!in_array($targetType, array("course", "classroom"))) {
            throw $this->createAccessDeniedException($this->getServiceKernel()->trans('参数不对。'));
        }

        $processor = OrderRefundProcessorFactory::create($targetType);

        $target = $processor->getTarget($id);

        if (empty($target)) {
            throw $this->createNotFoundException();
        }

        $user = $this->getCurrentUser();

        if (empty($user)) {
            throw $this->createAccessDeniedException();
        }

        $member = $processor->getTargetMember($target['id'], $user['id']);

        if (empty($member) || empty($member['orderId'])) {
            throw $this->createAccessDeniedException($this->getServiceKernel()->trans('您不是学员或尚未购买，不能取消退款。'));
        }

        $processor->cancelRefundOrder($member['orderId']);

        return $this->createJsonResponse(true);
    }

    public function getDispatcher()
    {
        return ServiceKernel::dispatcher();
    }

    protected function dispatchEvent($eventName, $subject)
    {
        if ($subject instanceof ServiceEvent) {
            $event = $subject;
        } else {
            $event = new ServiceEvent($subject);
        }
        return $this->getDispatcher()->dispatch($eventName, $event);
    }

    protected function getOrderService()
    {
        return $this->getServiceKernel()->createService('Order.OrderService');
    }

}
