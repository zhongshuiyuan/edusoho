<?php
namespace Custom\WebBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

use Topxia\Common\Paginator;
use Topxia\WebBundle\Form\CourseType;
use Topxia\Service\Course\CourseService;
use Topxia\Common\ArrayToolkit;
use Topxia\Service\Util\LiveClientFactory;
use Topxia\WebBundle\Controller\CourseController as CourseBaseController;

class CourseController extends CourseBaseController
{
	public function createAction(Request $request)
	{
		$user = $this->getUserService()->getCurrentUser();
		$userProfile = $this->getUserService()->getUserProfile($user['id']);

		$isLive = $request->query->get('flag');
		$type = ($isLive == "isLive") ? 'live' : 'normal';

		if($isLive == "isLive"){
			$type = 'live';
		}elseif($isLive == "periodic"){
			$type = 'periodic';
		}else{
			$type = 'normal';
		}

//		if ($type == 'live') {
//
//			$courseSetting = $this->setting('course', array());
//
//			if (!empty($courseSetting['live_course_enabled'])) {
//				$client = LiveClientFactory::createClient();
//				$capacity = $client->getCapacity();
//			} else {
//				$capacity = array();
//			}
//
//			if (empty($courseSetting['live_course_enabled'])) {
//				return $this->createMessageResponse('info', '请前往后台开启直播,尝试创建！');
//			}
//
//			if (empty($capacity['capacity']) && !empty($courseSetting['live_course_enabled'])) {
//				return $this->createMessageResponse('info', '请联系EduSoho官方购买直播教室，然后才能开启直播功能！');
//			}
//		}

		if (false === $this->get('security.context')->isGranted('ROLE_TEACHER')) {
			throw $this->createAccessDeniedException();
		}

		if ($request->getMethod() == 'POST') {
			$course = $request->request->all();
			$course = $this->getCourseService()->createCourse($course);
			return $this->redirect($this->generateUrl('course_manage', array('id' => $course['id'])));
		}

		return $this->render('CustomWebBundle:Course:create.html.twig', array(
			'userProfile'=>$userProfile,
			'type'=>$type
		));
	}
}