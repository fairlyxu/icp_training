function myPagination(e){var t=e.pageSize,a=e.pageTotal,i=e.curPage,n=e.id,s=e.getPage,l=e.showPageTotalFlag,r=e.showSkipInputFlag,g=e.pageAmount,c=e.dataTotal;this.pageSize=t||5,this.pageTotal=a,this.pageAmount=g,this.dataTotal=c,this.curPage=i||1,this.ul=document.createElement("ul"),this.id=n,this.getPage=s,this.showPageTotalFlag=l||!1,this.showSkipInputFlag=r||!1,this.init()}myPagination.prototype={init:function(){var e=document.getElementById(this.id);e.innerHTML="",this.ul.innerHTML="",e.appendChild(this.ul);var t=this;t.firstPage(),t.lastPage(),t.getPages().forEach((function(e){var a=document.createElement("li");e==t.curPage?a.className="active":a.onclick=function(){t.curPage=parseInt(this.innerHTML),t.init(),t.getPage(t.curPage)},a.innerHTML=e,t.ul.appendChild(a)})),t.nextPage(),t.finalPage(),t.showSkipInputFlag&&t.showSkipInput(),t.showPageTotalFlag&&t.showPageTotal()},firstPage:function(){var e=this,t=document.createElement("li");t.innerHTML="首页",1===this.curPage&&(t.className="disabled"),this.ul.appendChild(t),t.onclick=function(){if(1!==this.curPage){var t=parseInt(1);e.curPage=t,e.getPage(e.curPage),e.init()}}},lastPage:function(){var e=this,t=document.createElement("li");t.innerHTML="<",parseInt(e.curPage)>1?t.onclick=function(){e.curPage=parseInt(e.curPage)-1,e.init(),e.getPage(e.curPage)}:t.className="disabled",this.ul.appendChild(t)},getPages:function(){var e=[];if(this.curPage<=this.pageTotal)if(this.curPage<this.pageSize)for(var t=Math.min(this.pageSize,this.pageTotal);t;)e.unshift(t--);else{var a=this.curPage-Math.floor(this.pageSize/2);t=this.pageSize;for(a>this.pageTotal-this.pageSize&&(a=this.pageTotal-this.pageSize+1);t--;)e.push(a++)}else console.error("当前页数不能大于总页数");return this.pageSize||console.error("显示页数不能为空或者0"),e},nextPage:function(){var e=this,t=document.createElement("li");t.innerHTML=">",parseInt(e.curPage)<parseInt(e.pageTotal)?t.onclick=function(){e.curPage=parseInt(e.curPage)+1,e.init(),e.getPage(e.curPage)}:t.className="disabled",this.ul.appendChild(t)},finalPage:function(){var e=this,t=document.createElement("li");t.innerHTML="尾页",this.curPage===e.pageTotal&&(t.className="disabled"),this.ul.appendChild(t),t.onclick=function(){var t=e.pageTotal,a=parseInt(t);e.curPage=a,e.getPage(e.curPage),e.init()}},showSkipInput:function(){var e=this,t=document.createElement("li");t.className="totalPage";var a=document.createElement("span");a.setAttribute("class","fl"),a.innerHTML="跳转到",t.appendChild(a);var i=document.createElement("input");i.setAttribute("type","number"),i.onkeydown=function(t){if("13"==(t||event).keyCode){var a=parseInt(i.value);"number"==typeof a&&a<=e.pageTotal&&a>0?(e.curPage=a,e.getPage(e.curPage)):swal("跳转页数必须大于等于1，小于等于最大页数!"),e.init()}},t.appendChild(i);var n=document.createElement("input");n.setAttribute("type","button"),n.setAttribute("id","page_bt"),n.value="确定",n.onclick=function(){var t=parseInt(i.value);"number"==typeof t&&t<=e.pageTotal&&t>0?(e.curPage=t,e.getPage(e.curPage)):swal("跳转页数必须大于等于1，小于等于最大页数!"),e.init()},t.appendChild(n),this.ul.appendChild(t)},showPageTotal:function(){var e=this,t=document.createElement("li");t.className="totalPage",t.innerHTML="共&nbsp"+e.pageTotal+"&nbsp页&nbsp&nbsp&nbsp每页&nbsp"+e.pageAmount+"&nbsp条&nbsp&nbsp&nbsp共&nbsp"+e.dataTotal+"&nbsp条数据",this.ul.appendChild(t)}};