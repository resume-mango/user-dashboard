"use strict";(self.webpackChunkuser_dashboard=self.webpackChunkuser_dashboard||[]).push([[124,44],{5661:(e,r,t)=>{t.d(r,{h7:()=>l,wX:()=>d,wS:()=>f,M7:()=>v});var n,a=t(1002),u=t(5861),c=t(7757),o=t.n(c),s=t(9669),i=t.n(s),p=t(3137),l=function(){var e=(0,u.Z)(o().mark((function e(r,t){var n,a,u,c;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={method:"GET",url:"/coverletter/download/".concat(r,"/").concat(t),responseType:"blob"},e.prev=1,e.next=4,i().request(a);case 4:return n=e.sent,e.abrupt("return",n);case 8:if(e.prev=8,e.t0=e.catch(1),!e.t0.response||!e.t0.response.data){e.next=18;break}return e.next=13,new Response(e.t0.response.data).text();case 13:if(u=e.sent,c=JSON.parse(u).error.message||null,console.log(c),!c||"download limits reached!"!==c){e.next=18;break}return e.abrupt("return",n="limit reached");case 18:return e.abrupt("return",n=null);case 19:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(r,t){return e.apply(this,arguments)}}(),d=function(){var e=(0,u.Z)(o().mark((function e(r){var t,n,a,u;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={method:"POST",url:"/coverletter",data:{template:r}},e.prev=1,e.next=4,(0,p.Z)(a);case 4:return u=e.sent,t=u.data,n=u.error,e.abrupt("return",{data:t,error:n});case 10:return e.prev=10,e.t0=e.catch(1),e.abrupt("return",{data:void 0,error:e.t0});case 13:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(r){return e.apply(this,arguments)}}(),f=function(){var e=(0,u.Z)(o().mark((function e(r){var t,u;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"undefined"!==(0,a.Z)(n)&&n.cancel("Cancelling previous requests"),n=i().CancelToken.source(),t={method:"PATCH",url:"/coverletter",cancelToken:n.token,data:r},e.next=5,i().request(t).then((function(e){return{data:e.data,error:void 0}})).catch((function(e){return{data:void 0,error:e}}));case 5:return u=e.sent,e.abrupt("return",u);case 7:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}(),v=function(){var e=(0,u.Z)(o().mark((function e(r){var t,n,a,u;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={method:"DELETE",url:"/coverletter/".concat(r)},e.prev=1,e.next=4,(0,p.Z)(a);case 4:return u=e.sent,t=u.data,n=u.error,e.abrupt("return",{data:t,error:n});case 10:return e.prev=10,e.t0=e.catch(1),e.abrupt("return",{data:void 0,error:e.t0});case 13:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(r){return e.apply(this,arguments)}}()},3876:(e,r,t)=>{t.d(r,{I3:()=>d,B9:()=>f,dG:()=>v,T3:()=>b});var n=t(4942),a=t(5861),u=t(7757),c=t.n(u),o=t(9669),s=t.n(o),i=t(5661);function p(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function l(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?p(Object(t),!0).forEach((function(r){(0,n.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):p(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var d=function(){var e=(0,a.Z)(c().mark((function e(r,t,n){var a,u,o;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,i.wX)(r);case 2:if(a=e.sent,u=a.data,o=a.error,!u||o){e.next=11;break}return n.setQueryData(["coverletter",u._id],u),t.replace("/coverletters/edit/".concat(u._id)),e.abrupt("return",!0);case 11:return e.abrupt("return",!1);case 12:case"end":return e.stop()}}),e)})));return function(r,t,n){return e.apply(this,arguments)}}(),f=function(){var e=(0,a.Z)(c().mark((function e(r,t,n,a,u,o,s){var p,l,d,f;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(u(null),!n){e.next=3;break}return e.abrupt("return");case 3:return a(r),e.prev=4,e.next=7,(0,i.M7)(r);case 7:if(p=e.sent,l=p.data,d=p.error,console.log(l,d),!l||d){e.next=19;break}if(t&&t.items){e.next=14;break}return e.abrupt("return");case 14:f=t.items.filter((function(e){return e._id!==r})),t.items=f,s.setQueryData("coverletters",t),e.next=20;break;case 19:throw new Error("Failed to delete coverletter");case 20:e.next=26;break;case 22:e.prev=22,e.t0=e.catch(4),console.log(e.t0),o({type:"danger",heading:"Err!",message:"Failed to delete coverletter"});case 26:return e.abrupt("return",a(null));case 27:case"end":return e.stop()}}),e,null,[[4,22]])})));return function(r,t,n,a,u,c,o){return e.apply(this,arguments)}}(),v=function(){var e=(0,a.Z)(c().mark((function e(r,t,n,a,u){var o,s,p,l,d;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,i.h7)(t,n);case 2:if(!(o=e.sent)){e.next=17;break}if("limit reached"!==o){e.next=6;break}return e.abrupt("return",u(!0));case 6:if(!o.data){e.next=17;break}return s=r?r.replaceAll(/\s/g,"-"):"untitled-coverletter",p=s+"."+n,l=window.URL.createObjectURL(new Blob([o.data])),(d=document.createElement("a")).href=l,d.setAttribute("download",p),document.body.appendChild(d),d.click(),document.body.removeChild(d),e.abrupt("return",window.URL.revokeObjectURL(l));case 17:return e.abrupt("return",a({type:"danger",heading:"Err!",message:"Failed to donwload design"}));case 18:case"end":return e.stop()}}),e)})));return function(r,t,n,a,u){return e.apply(this,arguments)}}(),b=function(){var e=(0,a.Z)(c().mark((function e(r,t,n,a,u,o,p,d,f,b){var h,m,x,w,y,k,g;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(h=!1,e.prev=1,p(!1),a){e.next=5;break}return e.abrupt("return");case 5:return e.next=7,(0,i.wS)(l({title:a.title,template:r,id:n._id},a));case 7:if(m=e.sent,x=m.data,w=m.error,!x||w){e.next=23;break}if(!t){e.next=15;break}return y=x.title?x.title:"",e.next=15,v(y,n._id,t,d,b);case 15:(k=f.getQueryData("coverletters"))&&((g=k.findIndex((function(e){return e._id===x._id})))>=0?k.splice(g,1,x):k.unshift(x),f.setQueryData("coverletters",k)),x.fields=u(),f.setQueryData(["coverletter",x._id],x),p(!0),o({},{keepDirty:!1,keepValues:!0,keepIsValid:!0,keepErrors:!0}),e.next=28;break;case 23:if(!s().isCancel(w)){e.next=27;break}p(!0),e.next=28;break;case 27:throw new Error("Failed to update design");case 28:h=!0,e.next=34;break;case 31:e.prev=31,e.t0=e.catch(1),d({type:"danger",heading:"Err!",message:"Failed to update design"});case 34:return e.abrupt("return",h);case 35:case"end":return e.stop()}}),e,null,[[1,31]])})));return function(r,t,n,a,u,c,o,s,i,p){return e.apply(this,arguments)}}()},6044:(e,r,t)=>{t.r(r),t.d(r,{default:()=>a}),t(7294);var n=t(5893);const a=function(){return(0,n.jsx)("div",{className:"align-center",children:(0,n.jsx)("div",{children:(0,n.jsx)("h3",{className:"text-center",children:"This page could not be found"})})})}},5337:(e,r,t)=>{t.d(r,{Kj:()=>p,F:()=>l,xB:()=>d,V5:()=>f});var n=t(5861),a=t(7757),u=t.n(a),c=t(9669),o=t.n(c),s=t(704),i=t(3106),p=function(){return(0,s.Z)("CoverLetterTemplates","/templates/coverletter")},l=function(e){var r=function(){var r=(0,n.Z)(u().mark((function r(){var t,n;return u().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,o().get("/coverletter",{params:e});case 2:return t=r.sent,n=t.data,r.abrupt("return",n);case 5:case"end":return r.stop()}}),r)})));return function(){return r.apply(this,arguments)}}();return(0,i.Z)(["coverletters",e],(function(){return r()}))},d=function(e,r){var t=function(){var e=(0,n.Z)(u().mark((function e(r){var t,n;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o().get("/templates/coverletter/".concat(r));case 2:return t=e.sent,n=t.data,e.abrupt("return",n);case 5:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}();return(0,i.Z)(["CoverLetterTemplates",e],(function(){return t(e)}),r)},f=function(e,r){var t=function(){var e=(0,n.Z)(u().mark((function e(r){var t,n;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o().get("/coverletter/".concat(r));case 2:return t=e.sent,n=t.data,e.abrupt("return",n);case 5:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}();return(0,i.Z)(["coverletter",e],(function(){return t(e)}),r)}},1002:(e,r,t)=>{function n(e){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}t.d(r,{Z:()=>n})}}]);
//# sourceMappingURL=124.bundle.js.map