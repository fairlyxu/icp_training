function toLogin(){window.location.href="login.html"}function toRegis(){window.location.href="register.html"}function send_email(){let t=$("#email_r").val();/^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/.test(t)?$.ajax({url:"/front/send_email",type:"GET",data:{to_email:t},datatype:"json",success:function(t){1===t.code?(swal({text:t.msg,icon:"success",timer:1500}).then((t=>{count_down()})),setTimeout("count_down();",1500)):0===t.code&&swal({text:t.msg,icon:"error",timer:1500})},error:function(t){swal({text:"发送异常",icon:"error",timer:1500})}}):swal({text:"请输入格式正确的邮箱",icon:"error",timer:1500})}function count_down(){let t=$("#send-code");t.attr("disabled","disabled"),setTimeout((function(){t.css("opacity","0.6")}),1e3);let e=60,n=setInterval((function(){t.val("("+--e+")秒后重新获取")}),1e3);setTimeout((function(){t.attr("disabled",!1).val("发送验证码"),t.css("opacity","1"),clearInterval(n)}),6e4)}$(document).ready((function(){$("#registered").click((function(){toRegis()})),$("#landing").click((function(){toLogin()})),$(document).keyup((function(t){13===t.keyCode&&("none"!==$("#landing-content").css("display")?$("#login").click():$("#register").click())}))}));