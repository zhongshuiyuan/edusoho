webpackJsonp(["app/js/user/index"],[function(n,o){"use strict";$(".follow-btn").on("click",function(){var n=$(this);$.post(n.data("url"),function(){n.hide(),n.next(".unfollow-btn").show()})}),$(".unfollow-btn").on("click",function(){var n=$(this);$.post(n.data("url"),function(){n.hide(),n.prev(".follow-btn").show()})}),$(".user-center-header").blurr({height:220}),echo.init()}]);