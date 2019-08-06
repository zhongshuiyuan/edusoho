webpackJsonp(["app/js/activity-manage/homework/index"],{0:function(t,e){t.exports=jQuery},"1e0cf618bc778b8ab554":function(t,e,i){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=i("7ab4a89ebadbfdecc2bf"),n=a(o),r=i("4602c3f5fe7ad9e3e91d"),s=a(r),d=i("b334fd7e4c5a19234db2"),l=a(d),u=i("71e1df85d5928925f4b1"),c=function(){function t(e,i){(0,n.default)(this,t),this.$form=e,this.$modal=i,this.initEvent()}return(0,s.default)(t,[{key:"initEvent",value:function(){var t=this;this.$form.on("click",'[data-role="item-delete-btn"]',function(e){return t.deleteQuestion(e)}),this.$form.on("click",'[data-role="replace-item"]',function(e){return t.replaceQuestion(e)}),this.$form.on("click",'[data-role="preview-btn"]',function(e){return t.previewQuestion(e)}),this.$form.on("click",'[data-role="batch-delete-btn"]',function(e){return t.batchDelete(e)}),this.initSortList()}},{key:"initSortList",value:function(){var t=this,e=void 0,i=this.$form.find("tbody"),a=i.hasClass("js-homework-table")?"":"<td></td>",o='<tr class="question-placehoder js-placehoder"><td></td><td></td><td></td><td></td><td></td><td></td><td></td>'+a+"</tr>";i.sortable({containerPath:"> tr",containerSelector:"tbody",itemSelector:"tr.is-question",placeholder:o,exclude:".notMoveHandle",onDragStart:function(t,i,a){t.hasClass("have-sub-questions")||$(".js-have-sub").removeClass("is-question");var o=t.offset(),n=i.rootGroup.pointer;e={left:n.left-o.left,top:n.top-o.top},a(t,i)},onDrag:function(t,i){var a=t.height();t.css({left:i.left-e.left,top:i.top-e.top}),$(".js-placehoder").css({height:a})},onDrop:function(e,i,a){if(a(e,i),e.hasClass("have-sub-questions")){var o=e.parents("tbody");o.find("tr.is-question").each(function(){var t=$(this);o.find("[data-parent-id="+t.data("id")+"]").detach().insertAfter(t)})}else $(".js-have-sub").addClass("is-question");t.refreshSeqs()}})}},{key:"replaceQuestion",value:function(t){var e=this,i=$(t.currentTarget),a=[],o=this.$form.find("tbody:visible");o.find('[name="questionIds[]"]').each(function(){a.push($(this).val())}),this.$modal.data("manager",this).modal(),$.get(i.data("url"),{excludeIds:a.join(","),type:o.data("type")},function(t){e.$modal.html(t)})}},{key:"deleteQuestion",value:function(t){t.stopPropagation();var e=$(t.currentTarget),i=e.closest("tr").data("id"),a=e.closest("tbody");a.find('[data-parent-id="'+i+'"]').remove(),e.closest("tr").remove(),(0,u.questionSubjectiveRemask)(this.$form),a.trigger("lengthChange"),this.refreshSeqs()}},{key:"batchDelete",value:function(t){if(0==this.$form.find('[data-role="batch-item"]:checked').length){var e=this.$form.find(".js-help-redmine");e?(e.text(Translator.trans("activity.testpaper_manage.question_required_error_hint")).show(),setTimeout(function(){e.slideUp()},3e3)):(0,l.default)("danger",Translator.trans("activity.testpaper_manage.question_required_error_hint"))}var i=this;this.$form.find('[data-role="batch-item"]:checked').each(function(t,e){var a=$(this).val();"material"==$(this).closest("tr").data("type")&&i.$form.find('[data-parent-id="'+a+'"]').remove(),$(this).closest("tr").remove()}),(0,u.questionSubjectiveRemask)(this.$form)}},{key:"previewQuestion",value:function(t){t.preventDefault(),window.open($(t.currentTarget).data("url"),"_blank","directories=0,height=580,width=820,scrollbars=1,toolbar=0,status=0,menubar=0,location=0")}},{key:"refreshSeqs",value:function(){var t=1;this.$form.find("tbody tr").each(function(){var e=$(this);e.hasClass("have-sub-questions")||(e.find("td.seq").html(t),t++)}),this.$form.find('[name="questionLength"]').val(t-1>0?t-1:null)}}]),t}();e.default=c},"71e1df85d5928925f4b1":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.questionSubjectiveRemask=function(t){var e=!1,i="",a=$("#task-create-content-iframe").contents().find(".js-subjective-remask");if(t.find("tbody tr").each(function(){var t=$(this).data("type");"essay"==t&&(e=!0)}),e||0==t.find("tbody tr").length)return void a.html("");i="homework"==a.data("type")?Translator.trans("activity.homework_manage.objective_question_hint"):Translator.trans("activity.homework_manage.pass_objective_question_hint"),a.html(i).removeClass("hidden")}},a1245300032d0e719e62:function(t,e,i){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}var o=i("de585ca0d3c2d0205c51"),n=a(o),r=i("1e0cf618bc778b8ab554"),s=a(r),d=i("a12be7d90ead2917b889"),l=a(d),u=$("#step2-form");new l.default($("#iframe-content")),new n.default(u),new s.default(u,$("#attachment-modal",window.parent.document))},a12be7d90ead2917b889:function(t,e,i){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=i("7ab4a89ebadbfdecc2bf"),n=a(o),r=i("4602c3f5fe7ad9e3e91d"),s=a(r),d=function(){function t(e){(0,n.default)(this,t),this.$homeworkModal=$("#modal",window.parent.document),this.$questionPickedModal=$("#attachment-modal",window.parent.document),this.$element=e,this.$step2_form=this.$element.find("#step2-form"),this.$step3_form=this.$element.find("#step3-form"),this.validator2=null,this.init()}return(0,s.default)(t,[{key:"init",value:function(){this.initEvent(),this.setValidateRule(),this.inItStep2form()}},{key:"initEvent",value:function(){var t=this;this.$element.on("click",'[data-role="pick-item"]',function(e){return t.showPickQuestion(e)}),this.$questionPickedModal.on("shown.bs.modal",function(){t.$homeworkModal.hide()}),this.$questionPickedModal.on("hidden.bs.modal",function(){t.$homeworkModal.show(),t.$questionPickedModal.html(""),t.validator2&&t.validator2.form()})}},{key:"initCkeditor",value:function(t){var e=CKEDITOR.replace("homework-about-field",{toolbar:"Task",fileSingleSizeLimit:app.fileSingleSizeLimit,filebrowserImageUploadUrl:$("#homework-about-field").data("imageUploadUrl")});e.on("change",function(){$("#homework-about-field").val(e.getData())}),e.on("blur",function(){t.form()})}},{key:"showPickQuestion",value:function(t){var e=this;t.preventDefault();var i=$(t.currentTarget),a=[];$("#question-table-tbody").find('[name="questionIds[]"]').each(function(){a.push($(this).val())}),this.$questionPickedModal.modal().data("manager",this),$.get(i.data("url"),{excludeIds:a.join(",")},function(t){e.$questionPickedModal.html(t)})}},{key:"inItStep2form",value:function(){var t=this.$step2_form.validate({onkeyup:!1,rules:{title:{required:!0,maxlength:50,trim:!0,course_title:!0},description:{required:!0},content:"required",questionLength:{required:!0}},messages:{description:Translator.trans("activity.homework_manage.question_homework_hint"),questionLength:Translator.trans("activity.homework_manage.question_required_error_hint")}});this.validator2=t,this.initCkeditor(t),this.$step2_form.data("validator",t)}},{key:"setValidateRule",value:function(){$.validator.addMethod("arithmeticFloat",function(t,e){return this.optional(e)||/^[0-9]+(\.[0-9]?)?$/.test(t)},$.validator.format(Translator.trans("activity.homework_manage.arithmetic_float_error_hint"))),$.validator.addMethod("positiveInteger",function(t,e){return this.optional(e)||/^[1-9]\d*$/.test(t)},$.validator.format(Translator.trans("activity.homework_manage.positive_integer_error_hint"))),$.validator.addMethod("DateAndTime",function(t,e){var i=/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29) ([0-1]{1}[0-9]{1})|(2[0-4]{1}):[0-5]{1}[0-9]{1}$/;return this.optional(e)||i.test(t)},$.validator.format(Translator.trans("activity.homework_manage.date_and_time_error_hint:mm")))}}]),t}();e.default=d}},["a1245300032d0e719e62"]);