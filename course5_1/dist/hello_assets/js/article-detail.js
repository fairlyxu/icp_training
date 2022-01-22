function check_comment(){let e=vditor.getValue();""!==e&&null!=e?e.length>200?$("#error-info").text("字数不能超过200"):publish_comment():$("#error-info").text("回复内容不能为空")}function publish_comment(){let e=$("#article_id").val(),t=$("#user_id").val();$.ajax({type:"POST",url:"/front/publishComment",headers:{"X-CSRFToken":getCsrfToken()},data:{content:vditor.getValue(),article_id:e,user_id:t},dataType:"JSON",success:function(e){1===e.code?(swal({text:e.msg,icon:"success",timer:1500}).then((e=>{vditor.setValue(""),vditor.clearCache(),location.reload()})),setTimeout("location.reload()",1500)):0===e.code&&swal({text:e.msg,icon:"error",timer:1500})},error:function(e){console.log(e)}})}function like_comment(e){$.ajax({type:"POST",url:"/front/likeComment",headers:{"X-CSRFToken":getCsrfToken()},data:{comment_id:e,user_id:$("#user_id").val()},dataType:"JSON",success:function(e){1===e.code?location.reload():0===e.code&&swal({text:e.msg,icon:"error",timer:1500})},error:function(e){console.log(e)}})}function reply_comment(e,t,o,n){let r=r_vditor.getValue(),i=/@.*?\:/gi;null!=r.match(i)&&(r=r.replace(r.match(i)[0],"")),r.length>200||0===r.length?swal({text:"字数不能超过200,也不能为空",icon:"error",timer:1200}):$.ajax({type:"POST",url:"/front/replyComment",headers:{"X-CSRFToken":getCsrfToken()},data:{to_comment_id:t,user_id:$("#user_id").val(),reply_user_id:o,article_id:n,content:r},dataType:"JSON",success:function(e){console.log(e),1===e.code?(swal({text:e.msg,icon:"success",timer:1500}).then((e=>{location.reload()})),setTimeout("location.reload()",1500)):0===e.code&&swal({text:e.msg,icon:"error",timer:1500})},error:function(e){console.log(e)}})}function deleteComment(e){swal("确定要删除吗？",{buttons:{cancel:"取消",catch:{text:"确定",value:"yes"}}}).then((t=>{"yes"===t&&$.getJSON("/front/deleteComment",{id:e},(function(e){1===e.code?(swal({text:e.msg,icon:"success",timer:1500}).then((function(){location.reload()})),setTimeout("location.reload()",1500)):swal({text:e.msg,icon:"error",timer:1500})}))}))}let r_vditor;function show_reply(e){if("none"===$(e).parents(".comment-box").find(".reply-holder").css("display")){$(e).parents(".comment-box").find(".reply-btn").before('<div id="reply-vditor" class="reply-text-area"></div>'),r_vditor=init_reply_vditor(),$(e).parents(".comment-box").find(".reply-holder").fadeIn(1e3);let t=$(e).parents(".comment-box").find(".user-name").text();r_vditor.setValue("@"+t+":")}else $(e).parents(".comment-box").find(".reply-holder").fadeOut(1e3),$(e).parents(".comment-box").find("#reply-vditor").remove()}function border_change(e,t){const o=$(e).width(),n=o+t;$(e).mouseenter((function(){$(this).animate({width:n})})),$(e).mouseleave((function(){$(this).animate({width:o})}))}$((function(){border_change($(".at-sort-comment-a"),10),$(".article-content img").click((function(){imgShow("#outerdiv","#innerdiv","#bigimg",$(this))}));let e=[];$(".toc a").each((function(t,o){let n=$(o).attr("href");e[t]=$(n).offset().top})),$(".toc a").click((function(){return $(".toc a").removeAttr("id"),$(this).attr("id","toc-a-on"),$("body, html").animate({scrollTop:e[$(".toc a").index($(this))]-70},400),!1})),$(window).scroll((function(){if(IsPC())if($(this).scrollTop()+80>=$(".comment-container").offset().top)$(".toc").css("display","none");else{$(".toc").css("display","block");for(let t=0;t<e.length;t++)$(this).scrollTop()>e[t]-70&&($(".toc a").removeAttr("id"),$(".toc a").eq(t).attr("id","toc-a-on"))}}))}));const toolbarList=["emoji","headings","bold","link","|","check","outdent","indent","|","quote","line","code","inline-code","insert-before","insert-after","|","upload","table","|","undo","redo","|","edit-mode",{name:"more",toolbar:["fullscreen","both","format","preview","info","help"]}],emoji={pray:"🙏",broken_heart:"💔",ok_hand:"👌",smile:"😄",laughing:"😆",smirk:"😏",heart_eyes:"😍",grin:"😁",stuck_out_tongue:"😛",expressionless:"😑",unamused:"😒",sob:"😭",joy:"😂",tired_face:"😫",blush:"😊",cry:"😢",fearful:"😨"},vditor=new Vditor("vditor",{counter:200,height:300,editorName:"vditor",tab:"\t",max:1024,toolbar:toolbarList,upload:{accept:".jpg,.png,.gif,.jpeg",filename:e=>e.replace(/\?|\\|\/|:|\||<|>|\*|\[|\]|\s+/g,"-"),handler(e){}},preview:{show:!0,parse:()=>{LazyLoadImage()}},hint:{emoji}});function init_reply_vditor(){return new Vditor("reply-vditor",{counter:200,height:300,editorName:"vditor",tab:"\t",max:1024,toolbar:toolbarList,upload:{accept:".jpg,.png,.gif,.jpeg",filename:e=>e.replace(/\?|\\|\/|:|\||<|>|\*|\[|\]|\s+/g,"-"),handler(e){}},preview:{show:!0,mode:"editor",parse:()=>{LazyLoadImage()}},hint:{emoji}})}const LazyLoadImage=()=>{const e=e=>{const t=document.createElement("img");t.src=e.getAttribute("data-src"),t.addEventListener("load",(()=>{e.src=t.src,e.particle.backgroundImage="none",e.particle.backgroundColor="transparent"})),e.removeAttribute("data-src")};if(!("IntersectionObserver"in window))return document.querySelectorAll("img").forEach((t=>{t.getAttribute("data-src")&&e(t)})),!1;window.imageIntersectionObserver?(window.imageIntersectionObserver.disconnect(),document.querySelectorAll("img").forEach((function(e){window.imageIntersectionObserver.observe(e)}))):(window.imageIntersectionObserver=new IntersectionObserver((t=>{t.forEach((t=>{(void 0===t.isIntersecting?0!==t.intersectionRatio:t.isIntersecting)&&t.target.getAttribute("data-src")&&e(t.target)}))})),document.querySelectorAll("img").forEach((function(e){window.imageIntersectionObserver.observe(e)})))};function getCsrfCookie(e){let t=null;if(document.cookie&&""!==document.cookie){let o=document.cookie.split(";");for(let n=0;n<o.length;n++){let r=jQuery.trim(o[n]);if(r.substring(0,e.length+1)===e+"="){t=decodeURIComponent(r.substring(e.length+1));break}}}return t}function imgShow(e,t,o,n){let r=n.attr("src");$(o).attr("src",r),$("<img/>").attr("src",r).on("load",(function(){let n,r,i=$(window).width(),c=$(window).height(),a=this.width,s=this.height,l=.96;s>c*l?(r=c*l,n=r/s*a,n>i*l&&(n=i*l)):a>i*l?(n=i*l,r=n/a*s):1.2*a<i&&1.2*s<c?(n=1.2*a,r=1.2*s):(n=a,r=s),$(o).css("width",n);let d=(i-n)/2,m=(c-r)/2;IsPC()?$(t).css({top:m,left:d}):($(t).css({top:"50%",left:"50%"}),$(t).css({transform:"translateX(-50%) translateY(-50%)"})),$(e).fadeIn(500)})),$(e).click((function(){$(this).fadeOut(300)}))}function IsPC(){for(var e=navigator.userAgent,t=["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"],o=!0,n=0;n<t.length;n++)if(e.indexOf(t[n])>0){o=!1;break}return o}