(self.webpackChunkuser_dashboard=self.webpackChunkuser_dashboard||[]).push([[963],{7023:(n,e,r)=>{"use strict";r.d(e,{Z:()=>s});var t=r(7294),i=r(5893);const s=function(n){var e=n.size,r=n.color,s=n.className;return(0,i.jsx)(t.Fragment,{children:(0,i.jsx)("svg",{width:e||"1rem",className:s||"",height:e||"1rem",viewBox:"0 0 14 15",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,i.jsx)("path",{d:"M5.66732 11.0007C6.85064 11.0004 7.99985 10.6043 8.93198 9.87532L11.8627 12.806L12.8053 11.8633L9.87465 8.93265C10.604 8.00043 11.0004 6.85094 11.0007 5.66732C11.0007 2.72665 8.60798 0.333984 5.66732 0.333984C2.72665 0.333984 0.333984 2.72665 0.333984 5.66732C0.333984 8.60798 2.72665 11.0007 5.66732 11.0007ZM5.66732 1.66732C7.87332 1.66732 9.66732 3.46132 9.66732 5.66732C9.66732 7.87332 7.87332 9.66732 5.66732 9.66732C3.46132 9.66732 1.66732 7.87332 1.66732 5.66732C1.66732 3.46132 3.46132 1.66732 5.66732 1.66732Z",fill:r||"#898989"})})})}},8614:(n,e,r)=>{"use strict";r.d(e,{Z:()=>m});var t,i=r(168),s=r(7294),a=r(5977),o=r(9163),c=r(5454),l=r(9964),d=r(5438),u=r(5893);const m=function(n){var e=n.name,r=n.title,t=n.children,i=n.customBtns,o=(0,c.a)().user,m=(0,a.k6)(),p=(0,l.S)().width;return(0,u.jsx)(s.Fragment,{children:(0,u.jsxs)(h,{children:[(0,u.jsxs)("div",{children:[e&&(0,u.jsx)("p",{children:e}),(0,u.jsx)("h1",{children:r})]}),p>800&&(0,u.jsx)("div",{children:i?t:(0,u.jsxs)(s.Fragment,{children:[o&&o.role&&Array.isArray(o.role)&&o.role.includes("ceo")?(0,u.jsx)(d.z,{onClick:function(){return m.push("/resumes/new")},btnType:"primary",size:"sm",children:"Create Resume"}):(0,u.jsx)(d.z,{onClick:function(){return m.push("/subscribe")},btnType:"primary",size:"sm",children:"Upgrade"}),(0,u.jsx)(d.z,{onClick:function(){return m.push("/progress-tracker")},btnType:"ghost",size:"sm",children:"Tracker"})]})})]})})};var h=o.ZP.header(t||(t=(0,i.Z)(["\n  min-height: 175px;\n  max-height: 175px;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  border-bottom: 1px solid #e2e9f3;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.5rem;\n  h1 {\n    margin-bottom: 0;\n    span {\n      font-weight: normal;\n    }\n  }\n  div:last-child {\n    display: flex;\n    button {\n      margin: 0 1rem;\n    }\n  }\n  @media (max-width: 768px) {\n    div:last-child {\n      flex-direction: column;\n    }\n  }\n  @media (max-width: 480px) {\n    max-height: 100px;\n    min-height: 100px;\n    h1 {\n      margin: 0;\n    }\n    div:last-child {\n      display: block;\n      width: 100%;\n    }\n  }\n"])))},999:(n,e,r)=>{"use strict";r.d(e,{Z:()=>c});var t,i=r(168),s=r(7294),a=r(9163),o=r(5893);const c=function(n){var e=n.show,r=(n.setShow,n.children);return(0,o.jsx)(s.Fragment,{children:e&&(0,o.jsx)(l,{children:r})})};var l=a.ZP.div(t||(t=(0,i.Z)(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  position: fixed;\n  z-index: 1000;\n  top: 0;\n  left: 0;\n  background-color: ",";\n"])),(function(n){return n.theme.shades.dark[3]}))},704:(n,e,r)=>{"use strict";r.d(e,{Z:()=>d});var t=r(5861),i=r(7757),s=r.n(i),a=r(9669),o=r.n(a),c=r(8767),l=r(5454);const d=function(n,e,r){var i=(0,l.a)(),a=i.user,d=i.token,u=a&&a.ref,m=function(){var n=(0,t.Z)(s().mark((function n(){var t,i;return s().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,o().get(e,{params:r});case 2:return t=n.sent,i=t.data,n.abrupt("return",i);case 5:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();return(0,c.useQuery)(n,m,{enabled:!!d&&!!u})}},3106:(n,e,r)=>{"use strict";r.d(e,{Z:()=>c});var t=r(4942),i=r(8767),s=r(5454);function a(n,e){var r=Object.keys(n);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(n);e&&(t=t.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.push.apply(r,t)}return r}function o(n){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?a(Object(r),!0).forEach((function(e){(0,t.Z)(n,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(r,e))}))}return n}const c=function(n,e){var r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],t=arguments.length>3?arguments[3]:void 0,a=(0,s.a)(),c=a.user,l=a.token,d=c&&c.ref;return(0,i.useQuery)(n,e,o({enabled:!!l&&!!d&&r},t))}},5824:(n,e,r)=>{"use strict";r.r(e),r.d(e,{default:()=>S});var t=r(168),i=r(885),s=r(7484),a=r.n(s),o=r(4110),c=r.n(o),l=r(7294),d=r(5977),u=r(9163),m=r(2790),h=r(8614),p=r(999),f=r(5893);const x=function(n){var e=n.size,r=n.color,t=n.className;return(0,f.jsx)(l.Fragment,{children:(0,f.jsx)("svg",{width:e||"1rem",height:e||"1rem",className:t||"",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,f.jsx)("path",{fill:r||"#898989",d:"M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"})})})};var g,v=r(7023);const b=function(n){var e=n.placeholder,r=n.value,t=n.setValue,i=n.handleSubmit,s=n.style;return(0,f.jsxs)(Z,{style:s,children:[(0,f.jsx)("span",{className:"icon",children:(0,f.jsx)(v.Z,{})}),(0,f.jsx)("input",{name:"search",type:"text",placeholder:e||"Search",value:r,onChange:function(n){return t(n.target.value)},onKeyPress:function(n){"Enter"===n.key&&(n.target.blur(),i())},autoComplete:"off"}),(0,f.jsx)("span",{className:"search-btn icon",onClick:i,children:(0,f.jsx)(x,{size:"1.1rem"})})]})};var j,y,w,k,Z=u.ZP.div(g||(g=(0,t.Z)(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: ",";\n  border-radius: 4px;\n  input {\n    background-color: transparent;\n    border: none;\n    height: 40px;\n    font-size: 0.875rem;\n    display: flex;\n    align-items: center;\n    padding-left: 0;\n    padding-right: 0;\n    padding-top: 0;\n    padding-bottom: 0;\n  }\n  .icon {\n    display: flex;\n    height: 100%;\n    width: 50px;\n    align-items: center;\n    justify-content: center;\n  }\n  .search-btn {\n    transform: rotateY(180deg);\n    cursor: pointer;\n    &:hover {\n      svg {\n        path {\n          fill: ",";\n        }\n      }\n    }\n  }\n"])),(function(n){return n.theme.colors.light}),(function(n){return n.theme.colors.primary})),N=r(4371),T=r(2611),C=r(5438),z=r(3360),P=r(9070);const S=function(){a().extend(c());var n=(0,l.useState)(!1),e=(0,i.Z)(n,2),r=e[0],t=e[1],s=(0,l.useState)(""),o=(0,i.Z)(s,2),u=o[0],x=o[1],g=(0,l.useState)(""),v=(0,i.Z)(g,2),j=v[0],y=v[1],w=(0,l.useState)(0),k=(0,i.Z)(w,2),Z=k[0],S=k[1],L=(0,l.useState)(0),F=(0,i.Z)(L,2),A=F[0],B=F[1],I=(0,d.k6)(),U={page:Z,limit:15},V={page:A,limit:15};j&&(U.title=j);var D=(0,T.VN)(U),_=D.data,W=D.isLoading,$=D.isError,H=(0,N.jM)(V),K=H.data,Q=H.isLoading,q=H.isError,Y=function(n,e){"next"===e&&("review"===n?B((function(n){return n+1})):S((function(n){return n+1}))),"prev"===e&&("review"===n?B((function(n){return n-1})):S((function(n){return n-1})))};return(0,f.jsxs)(l.Fragment,{children:[(0,f.jsx)(h.Z,{title:"Resume Review",customBtns:!0,children:(0,f.jsx)(C.z,{btnType:"primary",size:"sm",onClick:function(){return t(!0)},children:"Request Review"})}),(0,f.jsx)(p.Z,{show:r,setShow:t,children:(0,f.jsxs)(E,{children:[(0,f.jsxs)("div",{className:"title",children:[(0,f.jsx)("h3",{children:"Select Resume"}),(0,f.jsx)("span",{className:"close-icon",onClick:function(){return t(!1)},children:(0,f.jsx)(m.Z,{})})]}),$?(0,f.jsx)("div",{className:"align-center",style:{height:"90%"},children:(0,f.jsx)("h3",{children:"Failed to load resumes!"})}):W?(0,f.jsx)(z.u,{style:{height:"90%"},children:(0,f.jsx)(z.$j,{size:"2rem",type:"primary"})}):_&&_.items&&_.items.length>0?(0,f.jsxs)(l.Fragment,{children:[(0,f.jsx)("div",{className:"search",children:(0,f.jsx)(b,{placeholder:"Title of your resume...",value:u,setValue:x,handleSubmit:function(){y(u)},style:{width:"100%"}})}),(0,f.jsxs)("div",{className:"list-wrapper",children:[(0,f.jsx)("div",{className:"list",children:_.items.map((function(n,e){return(0,f.jsxs)("div",{className:"item",onClick:function(){return I.push({pathname:"/resume-review/new",search:"?ref=".concat(n._id)})},children:[n.attachments&&n.attachments.thumbnail?(0,f.jsx)("img",{src:n.attachments.thumbnail}):(0,f.jsx)("img",{src:"https://resume-mango.s3.us-east-2.amazonaws.com/public/template-images/resumes/empty/template10.jpg"}),(0,f.jsx)("p",{children:n.title||"Untitled"})]},e)}))}),_.total>U.limit&&(0,f.jsxs)(P.N,{children:[(0,f.jsx)(C.z,{btnType:"secondary",disabled:0===Z,onClick:function(){return Y("resume","prev")},children:"Previous"}),(0,f.jsx)(C.z,{btnType:"secondary",disabled:Z+1>=Math.ceil(_.total/_.limit),onClick:function(){return Y("resume","next")},children:"Next"})]})]})]}):(0,f.jsx)("div",{className:"align-center",style:{height:"90%"},children:(0,f.jsx)("h3",{children:"No resumes found!"})})]})}),(0,f.jsx)(O,{children:q?(0,f.jsx)("div",{className:"align-center",style:{height:"50vh"},children:(0,f.jsx)("h3",{children:"Failed to load review tickets!"})}):Q?(0,f.jsx)(z.u,{style:{height:"50vh"},children:(0,f.jsx)(z.$j,{size:"2.5rem",type:"primary"})}):K&&K.items&&K.items.length>0?(0,f.jsxs)("div",{children:[(0,f.jsxs)("h3",{children:["All Conversations",(0,f.jsx)("span",{className:"count",children:K.total})]}),(0,f.jsxs)(M,{className:"grey",children:[(0,f.jsx)("p",{children:"TITLE"}),(0,f.jsx)("p",{children:"TICKET ID"}),(0,f.jsx)("p",{children:"STATUS"}),(0,f.jsx)("p",{children:"REVIEWER"}),(0,f.jsx)("p",{children:"CURRENT STATUS"})]}),K.items.map((function(n,e){return(0,f.jsxs)(R,{onClick:function(){return I.push("resume-review/".concat(n._id))},children:[(0,f.jsxs)("div",{className:"title item",children:[(0,f.jsx)("p",{children:n.resume&&n.resume.title||"Untitled Resume"}),(0,f.jsxs)("div",{className:"title-label",children:[(0,f.jsxs)("span",{children:["Created ",a()(a()(n.createdAt)).fromNow(!0)," ago"]}),(0,f.jsx)("span",{className:"divider"}),(0,f.jsx)("span",{children:a()(n.createdAt).add(48,"hour").diff(a()(),"second")>0?"Response due in \n                        ".concat(a()(a()()).to(a()(n.createdAt).add(48,"hour"),!0)):"Will respond shortly"})]})]}),(0,f.jsxs)("p",{className:"grey truncate item",children:["#",n._id]}),(0,f.jsx)("p",{className:"capitalize item item-status",children:(0,f.jsx)("span",{children:n.status||"-"})}),(0,f.jsx)("p",{className:"item",children:n.assignedTo?n.assignedTo.firstName?n.assignedTo.firstName+" "+n.assignedTo.lastName||"":n.assignedTo.email:"Not assigned"}),(0,f.jsx)("p",{className:"item",children:"New Message"})]},e)})),K.total>V.limit&&(0,f.jsxs)(P.N,{children:[(0,f.jsx)(C.z,{btnType:"secondary",disabled:0===A,onClick:function(){return Y("review","prev")},children:"Previous"}),(0,f.jsx)(C.z,{btnType:"secondary",disabled:A+1>=Math.ceil(K.total/K.limit),onClick:function(){return Y("review","next")},children:"Next"})]})]}):(0,f.jsx)("div",{className:"align-center",style:{height:"50vh"},children:(0,f.jsx)("h3",{children:"No review tickets found!"})})})]})};var O=u.ZP.div(j||(j=(0,t.Z)(["\n  margin: 1.5rem;\n  flex: 1;\n  .grey {\n    color: rgba(52, 52, 52, 0.4);\n  }\n  h3 {\n    font-size: 1.12rem;\n    font-weight: 400;\n    display: flex;\n    align-items: center;\n    margin-bottom: 1rem;\n    .count {\n      display: flex;\n      height: 30px;\n      min-width: 30px;\n      padding: 0.5rem;\n      line-height: normal;\n      background-color: #ffeea4;\n      font-size: 0.7rem;\n      color: ",";\n      align-items: center;\n      justify-content: center;\n      border-radius: 50%;\n      margin-left: 0.7rem;\n    }\n  }\n"])),(function(n){return n.theme.colors.primary})),M=u.ZP.div(y||(y=(0,t.Z)(["\n  display: grid;\n  grid-template-columns: 35% 25% 10% 15% 15%;\n  padding: 0.7rem 1rem;\n  border-left: 4px solid transparent;\n  p {\n    font-size: 0.7rem;\n    margin: 0 0.5rem;\n    width: 100%;\n    color: inherit;\n  }\n"]))),R=u.ZP.div(w||(w=(0,t.Z)(["\n  display: grid;\n  grid-template-columns: 35% 25% 10% 15% 15%;\n  background-color: #f7f8fa;\n  border-radius: 3px;\n  border-left: 4px solid #f08438;\n  height: 70px;\n  align-items: center;\n  padding: 0.7rem 1rem;\n  cursor: pointer;\n  transition: box-shadow ease-in-out 0.2s;\n  &:not(:last-child) {\n    margin-bottom: 1rem;\n  }\n  &:hover {\n    box-shadow: 0px 0px 5px 1px #f9bd3f;\n  }\n  .item-status span {\n    background-color: ",";\n    color: #fff;\n    padding: 0.2rem 0.7rem;\n    font-size: 0.8rem;\n    border-radius: 3px;\n    width: 75px;\n    display: block;\n    text-align: center;\n  }\n  .item {\n    margin: 0 0.5rem;\n  }\n  .title {\n    p {\n      margin: 0;\n    }\n    .title-label {\n      display: flex;\n      align-items: center;\n      color: rgba(52, 52, 52, 0.4);\n      font-size: 0.7rem;\n    }\n    .divider {\n      margin: 0 0.5rem;\n      ::before {\n        display: flex;\n        content: '';\n        width: 7px;\n        height: 7px;\n        background-color: rgba(52, 52, 52, 0.4);\n        border-radius: 50%;\n      }\n    }\n  }\n"])),(function(n){return n.theme.colors.primary})),E=u.ZP.div(k||(k=(0,t.Z)(["\n  max-width: 700px;\n  height: 75vh;\n  width: 100%;\n  background-color: white;\n  padding: 1.5rem;\n\n  .title {\n    h3 {\n      letter-spacing: 1px;\n    }\n    display: flex;\n    justify-content: space-between;\n    border-bottom: 1px solid rgba(52, 52, 52, 0.1);\n    margin-bottom: 1rem;\n\n    .close-icon {\n      cursor: pointer;\n      &:hover {\n        svg path {\n          stroke: #343434;\n        }\n      }\n    }\n  }\n  .search {\n    border-bottom: 1px solid rgba(52, 52, 52, 0.1);\n    margin-bottom: 1rem;\n    padding-bottom: 1rem;\n  }\n  .list-wrapper {\n    overflow-y: auto;\n    height: 50vh;\n    padding-bottom: 1rem;\n  }\n  .list {\n    display: grid;\n    grid-template-columns: repeat(5, 1fr);\n    margin-bottom: 1rem;\n    border-bottom: 1px solid rgba(52, 52, 52, 0.1);\n    padding-bottom: 1rem;\n    .item {\n      margin: 0.5rem;\n      background-color: rgba(52, 52, 52, 0.1);\n      padding: 0.4rem;\n      border-radius: 6px;\n      cursor: pointer;\n      &:hover {\n        background-color: ",";\n      }\n      img {\n        width: 100%;\n        margin: 0;\n        border-radius: 6px;\n      }\n      p {\n        text-align: center;\n        font-size: 0.65rem;\n        margin: 0;\n        font-weight: bold;\n      }\n    }\n  }\n"])),(function(n){return n.theme.shades.primary[4]}))},4371:(n,e,r)=>{"use strict";r.d(e,{jF:()=>u,W2:()=>m,jM:()=>h});var t=r(5987),i=r(5861),s=r(7757),a=r.n(s),o=r(9669),c=r.n(o),l=r(3106),d=["ticketId"],u=function(){var n=(0,i.Z)(a().mark((function n(e){var r,i,s,o;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.ticketId,i=(0,t.Z)(e,d),n.next=3,c().get("/ticket/".concat(r),{params:i});case 3:return s=n.sent,o=s.data,n.abrupt("return",o);case 6:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}(),m=function(n){var e=n.ticket,r=function(){var n=(0,i.Z)(a().mark((function n(){var r,t;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,c().get("/resume-review/".concat(e));case 2:return r=n.sent,t=r.data,n.abrupt("return",t);case 5:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();return(0,l.Z)(["reviewTicket",e],(function(){return r()}),"new"!==e)},h=function(n){var e=function(){var e=(0,i.Z)(a().mark((function e(){var r,t;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c().get("/resume-review",{params:n});case 2:return r=e.sent,t=r.data,e.abrupt("return",t);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,l.Z)(["resumeReview",n],(function(){return e()}))}},2611:(n,e,r)=>{"use strict";r.d(e,{Bh:()=>d,VN:()=>u,ZT:()=>m,IE:()=>h});var t=r(5861),i=r(7757),s=r.n(i),a=r(9669),o=r.n(a),c=r(704),l=r(3106),d=function(){return(0,c.Z)("resumeTemplates","/templates/resume")},u=function(n){var e=function(){var e=(0,t.Z)(s().mark((function e(){var r,t;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o().get("/resume",{params:n});case 2:return r=e.sent,t=r.data,e.abrupt("return",t);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,l.Z)(["resumes",n],(function(){return e()}))},m=function(n,e){var r=function(){var n=(0,t.Z)(s().mark((function n(e){var r,t;return s().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,o().get("/templates/resume/".concat(e));case 2:return r=n.sent,t=r.data,n.abrupt("return",t);case 5:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}();return(0,l.Z)(["resumeTemplates",n],(function(){return r(n)}),e)},h=function(n,e){var r=function(){var n=(0,t.Z)(s().mark((function n(e){var r,t;return s().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,o().get("/resume/".concat(e));case 2:return r=n.sent,t=r.data,n.abrupt("return",t);case 5:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}();return(0,l.Z)(["resume",n],(function(){return r(n)}),e)}},9070:(n,e,r)=>{"use strict";r.d(e,{v:()=>o,N:()=>c});var t,i,s=r(168),a=r(9163),o=a.ZP.div(t||(t=(0,s.Z)(["\n  width: 100%;\n  max-width: ",";\n  p {\n    max-width: 575px;\n  }\n"])),(function(n){return n.maxWidth})),c=a.ZP.div(i||(i=(0,s.Z)(["\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  button {\n    width: fit-content;\n    padding: 0 1rem;\n    margin: 0 1rem;\n  }\n"])))},4110:function(n){n.exports=function(){"use strict";return function(n,e,r){n=n||{};var t=e.prototype,i={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function s(n,e,r,i){return t.fromToBase(n,e,r,i)}r.en.relativeTime=i,t.fromToBase=function(e,t,s,a,o){for(var c,l,d,u=s.$locale().relativeTime||i,m=n.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],h=m.length,p=0;p<h;p+=1){var f=m[p];f.d&&(c=a?r(e).diff(s,f.d,!0):s.diff(e,f.d,!0));var x=(n.rounding||Math.round)(Math.abs(c));if(d=c>0,x<=f.r||!f.r){x<=1&&p>0&&(f=m[p-1]);var g=u[f.l];o&&(x=o(""+x)),l="string"==typeof g?g.replace("%d",x):g(x,t,f.l,d);break}}if(t)return l;var v=d?u.future:u.past;return"function"==typeof v?v(l):v.replace("%s",l)},t.to=function(n,e){return s(n,e,this,!0)},t.from=function(n,e){return s(n,e,this)};var a=function(n){return n.$u?r.utc():r()};t.toNow=function(n){return this.to(a(this),n)},t.fromNow=function(n){return this.from(a(this),n)}}}()}}]);
//# sourceMappingURL=963.bundle.js.map