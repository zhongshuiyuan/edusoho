<?php

namespace ApiBundle\Api\Resource\Me;

use ApiBundle\Api\ApiRequest;
use ApiBundle\Api\Resource\AbstractResource;
use ApiBundle\Api\Annotation\ResponseFilter;

class MeOrder extends AbstractResource
{
    /**
     * @ResponseFilter(class="ApiBundle\Api\Resource\Order\OrderFilter", mode="simple")
     */
    public function search(ApiRequest $request)
    {
        $conditions = array(
            'user_id' => $this->getCurrentUser()->getId(),
        );
        list($offset, $limit) = $this->getOffsetAndLimit($request);
        $orders = $this->getOrderService()->searchOrders(
            $conditions,
            array('created_time' => 'DESC'),
            $offset,
            $limit
        );

        $assets = $this->container->get('templating.helper.assets');
        $request = $this->container->get('request');
        foreach ($orders as $key => $value) {
            $product = $this->getProduct($orders[$key]['id']);
            if ('/assets' === substr($product->cover['middle'], 0, 6)) {
                $orders[$key]['imgUrl'] = $request->getSchemeAndHttpHost().$assets->getUrl($product->cover['middle']);
            } else {
                $orders[$key]['imgUrl'] = $request->getSchemeAndHttpHost().$this->getWebExtension()->getFpath($product->cover['middle'], $product->targetType);
            }
        }

        $total = $this->getOrderService()->countOrders($conditions);

        return $this->makePagingObject($orders, $total, $offset, $limit);
    }

    private function getProduct($orderId)
    {
        $orderItems = $this->getOrderService()->findOrderItemsByOrderId($orderId);
        $orderItem = reset($orderItems);

        return $this->getOrderFacadeService()->getOrderProductByOrderItem($orderItem);
    }

    /**
     * @return OrderService
     */
    protected function getOrderService()
    {
        return $this->getBiz()->service('Order:OrderService');
    }

    /**
     * @return OrderFacadeService
     */
    private function getOrderFacadeService()
    {
        return $this->getBiz()->service('OrderFacade:OrderFacadeService');
    }

    protected function getWebExtension()
    {
        return $this->container->get('web.twig.extension');
    }
}
