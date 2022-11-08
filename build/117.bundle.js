"use strict";(self.webpackChunkuser_dashboard=self.webpackChunkuser_dashboard||[]).push([[117],{2537:(n,e,t)=>{t.d(e,{Z:()=>h});var r=t(4942),i=t(5987),s=t(7294),o=t(2283),a=t(5934),c=t(5893),l=["name","label","isFieldArray","className","style","hideError"];function d(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,r)}return t}function u(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?d(Object(t),!0).forEach((function(e){(0,r.Z)(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):d(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}const h=function(n){var e,t,r=n.name,d=n.label,h=n.isFieldArray,p=n.className,m=n.style,f=n.hideError,x=(0,i.Z)(n,l),g=(0,o.Gc)(),j=g.register,v=g.formState.errors,w=null;if(h&&!f){var b=r.split(".");w=3===b.length&&Object.keys(v).length>0&&v[b[0]]?(e=[b[1],b[2],"message"],t=v[b[0]],Object.keys(t).length>0&&e.forEach((function(n){t=t&&t[n]?t[n]:null})),t&&"string"==typeof t&&t.split(".")[1]||t):null}return(0,c.jsx)(s.Fragment,{children:(0,c.jsxs)("div",{className:p,style:m,children:[d&&(0,c.jsx)("label",{htmlFor:r,children:d}),(0,c.jsx)("input",u(u({className:"form-control ".concat((v[r]||w)&&"is-invalid")},j(r)),x)),v[r]&&!f&&(0,c.jsx)(a.dp,{className:"invalid-feild",children:v[r].message}),w&&!f&&(0,c.jsx)(a.dp,{className:"invalid-feild",children:w})]})})}},732:(n,e,t)=>{t.d(e,{Z:()=>v});var r,i,s,o,a=t(168),c=t(885),l=t(7294),d=t(5977),u=t(9163),h=t(5438),p=t(2790),m=t(5893),f=u.ZP.div(r||(r=(0,a.Z)(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  position: fixed;\n  z-index: 1000;\n  top: 0;\n  left: 0;\n  background-color: ",";\n"])),(function(n){return n.theme.shades.dark[3]})),x=u.ZP.div(i||(i=(0,a.Z)(["\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  max-width: 450px;\n  height: auto;\n  width: 100%;\n  padding: 1.5rem;\n  border: 1px solid rgb(237 237 237 / 20%);\n  border-radius: 6px;\n  background-color: #fff;\n\n  h3 {\n    text-align: center;\n    margin: 1.5rem 0 0;\n  }\n  p {\n    text-align: center;\n    font-size: 1rem;\n    margin-bottom: 2rem;\n  }\n"]))),g=u.ZP.div(s||(s=(0,a.Z)(["\n  display: flex;\n  justify-content: space-around;\n  width: 100%;\n  margin-left: auto;\n"]))),j=u.ZP.div(o||(o=(0,a.Z)(["\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: absolute;\n  top: 0;\n  right: 0;\n  cursor: pointer;\n  &:hover {\n    svg {\n      path {\n        stroke: ",";\n      }\n    }\n  }\n"])),(function(n){return n.theme.colors.primary}));const v=function(n){var e=n.show,t=n.setShow,r=n.exludedPaths,i=(0,d.k6)(),s=(0,l.useState)(!1),o=(0,c.Z)(s,2),a=o[0],u=o[1],v=(0,l.useState)(""),w=(0,c.Z)(v,2),b=w[0],y=w[1],Z=(0,l.useState)(!1),k=(0,c.Z)(Z,2),P=k[0],O=k[1],z=(0,l.useRef)(),E=function(){u(!1)};(0,l.useEffect)((function(){return z.current=i.block((function(n){if(e){if(r&&(null==r?void 0:r.length)>0&&r.includes(n.pathname))return;return y(n.pathname),u(!0),!1}})),function(){z.current&&z.current()}}),[e]),(0,l.useEffect)((function(){P&&b&&(i.push(b),O(!1))}),[P,b]);var N=(0,l.useCallback)((function(){t(!1),z&&z.current(),u(!1),O(!0)}),[]);return a?(0,m.jsx)(f,{className:"prompt-wrapper",children:(0,m.jsxs)(x,{children:[(0,m.jsx)(j,{onClick:E,children:(0,m.jsx)(p.Z,{})}),(0,m.jsx)("h3",{children:"Are you sure?"}),(0,m.jsx)("p",{children:"You haven't saved your changes, if you exit your changes will be lost"}),(0,m.jsxs)(g,{children:[(0,m.jsx)(h.z,{onClick:N,btnType:"ghost",size:"lg",children:"Ok"}),(0,m.jsx)(h.z,{onClick:E,btnType:"primary",size:"lg",children:"Cancel"})]})]})}):null}},2136:(n,e,t)=>{t.d(e,{Z:()=>s});var r=t(7294),i=t(5893);const s=function(n){var e=n.size,t=n.color,s=n.className;return(0,i.jsx)(r.Fragment,{children:(0,i.jsxs)("svg",{width:e||"1rem",className:s||"",height:e||"1rem",viewBox:"0 0 19 19",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,i.jsx)("path",{d:"M18 1H1V7.61111H18V1Z",stroke:t||"#898989",strokeWidth:"1.2",strokeLinecap:"round",strokeLinejoin:"round"}),(0,i.jsx)("path",{d:"M17.9996 11.3887H13.2773V17.9998H17.9996V11.3887Z",stroke:t||"#898989",strokeWidth:"1.2",strokeLinecap:"round",strokeLinejoin:"round"}),(0,i.jsx)("path",{d:"M9.5 11.3887H1V17.9998H9.5V11.3887Z",stroke:t||"#898989",strokeWidth:"1.2",strokeLinecap:"round",strokeLinejoin:"round"})]})})}},1757:(n,e,t)=>{t.d(e,{Z:()=>s});var r=t(7294),i=t(5893);const s=function(n){var e=n.size,t=n.color,s=n.className;return(0,i.jsx)(r.Fragment,{children:(0,i.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 22 22",width:e||"1rem",className:s||"",height:e||"1rem",children:[(0,i.jsx)("circle",{cx:"11",cy:"11",r:"11",fill:t||"#898989"}),(0,i.jsx)("path",{d:"M5.89453 10.6357L9.63735 14.3098L16.3064 7.46828",stroke:"white",fill:"none"})]})})}},9029:(n,e,t)=>{t.d(e,{Z:()=>s});var r=t(7294),i=t(5893);const s=function(n){var e=n.size,t=n.color,s=n.className;return(0,i.jsx)(r.Fragment,{children:(0,i.jsxs)("svg",{width:e||"1rem",height:e||"1rem",className:s||"",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,i.jsx)("path",{d:"M14.75 10.25V13.25C14.75 13.6478 14.592 14.0294 14.3107 14.3107C14.0294 14.592 13.6478 14.75 13.25 14.75H2.75C2.35218 14.75 1.97064 14.592 1.68934 14.3107C1.40804 14.0294 1.25 13.6478 1.25 13.25V10.25",stroke:t||"#898989",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"}),(0,i.jsx)("path",{d:"M4.25 6.5L8 10.25L11.75 6.5",stroke:t||"#898989",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"}),(0,i.jsx)("path",{d:"M8 10.25V1.25",stroke:t||"#898989",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})]})})}},2434:(n,e,t)=>{t.d(e,{Z:()=>s});var r=t(7294),i=t(5893);const s=function(n){var e=n.size,t=n.color,s=n.className;return(0,i.jsx)(r.Fragment,{children:(0,i.jsx)("svg",{width:e||"1rem",className:s||"",height:e||"1rem",viewBox:"0 0 1 28",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,i.jsx)("path",{d:"M0.5 0V27.5",stroke:t||"#898989"})})})}},5970:(n,e,t)=>{t.d(e,{Z:()=>g});var r,i,s,o,a=t(168),c=t(4942),l=t(7294),d=t(9163),u=t(5893);function h(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,r)}return t}function p(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?h(Object(t),!0).forEach((function(e){(0,c.Z)(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):h(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}var m=function(n){var e=n.vertical,t=n.horizontal,r=n.btnStyle,i=n.children,s=n.show,o=n.setShow,a=n.onClick,c=n.className,d=n.disabled,h=(0,l.useRef)(null),m=function(n){h&&h.current&&!h.current.contains(n.target)&&o(!1)};(0,l.useEffect)((function(){if(h)return document.addEventListener("mousedown",m,!0),function(){document.removeEventListener("mousedown",m,!0)}}));var g="left"===t?{right:0}:{left:0},b="top"===e?{bottom:"100%"}:{top:"100%"},y=l.Children.map(i,(function(n){if(n.type&&n.type===x)return n}));return(0,u.jsx)(l.Fragment,{children:(0,u.jsxs)(v,{ref:h,className:c,"data-test-id":"dropdown-wrapper",children:[s&&(0,u.jsx)(w,{style:p(p({},g),b),children:y}),l.Children.map(i,(function(n){if(n.type===f)return(0,u.jsx)(j,{disabled:d,style:p({},r),onClick:function(n){return function(n){n.preventDefault(),o(!s),a&&a(n)}(n)},children:n})}))]})})},f=function(n){var e=n.children;return(0,u.jsx)(l.Fragment,{children:e})},x=function(n){var e=n.children;return(0,u.jsx)(b,{children:e})};m.Button=f,m.Item=x;const g=m;var j=d.ZP.button(r||(r=(0,a.Z)(["\n  display: flex;\n  align-items: center;\n  background-color: transparent;\n  height: auto;\n  padding: 0.3rem;\n  width: 100%;\n  user-select: none;\n  * {\n    pointer-events: none;\n  }\n"]))),v=d.ZP.div(i||(i=(0,a.Z)(["\n  display: block;\n  position: relative;\n  width: fit-content;\n  user-select: none;\n"]))),w=d.ZP.ul(s||(s=(0,a.Z)(["\n  background: #ffffff;\n  border: 1px solid rgba(2, 52, 126, 0.12);\n  box-shadow: -2px 4px 7px rgba(0, 50, 97, 0.08);\n  border-radius: 4px;\n  padding: 0.5rem 0;\n  margin: 0.3rem 0;\n  display: inline-flex;\n  flex-direction: column;\n  position: absolute;\n  z-index: 10;\n  width: 100%;\n  min-width: 75px;\n  cursor: default;\n"]))),b=d.ZP.li(o||(o=(0,a.Z)(["\n  width: 100%;\n  padding: 0;\n  margin: 0;\n  a {\n    display: block;\n    font-size: ",";\n    padding: 0.3rem 0.5rem;\n    transition: all 300ms ease-in-out;\n    &:hover {\n      background-color: ",";\n    }\n  }\n  @media (max-width: 1300px) {\n    a {\n      font-size: 0.8rem;\n    }\n  }\n"])),(function(n){return n.theme.fonts.small}),(function(n){return n.theme.colors.light}))},2566:(n,e,t)=>{t.d(e,{Z:()=>P});var r,i,s,o,a,c,l,d,u=t(168),h=t(885),p=t(7294),m=t(5977),f=t(3727),x=t(9163),g=t(9964),j=t(8765),v=t(8930),w=t(1757),b=t(2790),y=t(5292),Z=t(5893),k=function(n){var e=n.current,t=n.max,r=n.backRoute,i=n.children,s=(0,p.useState)(0),o=(0,h.Z)(s,2),a=o[0],c=o[1],l=(0,p.useRef)(null),d=p.Children.map(i,(function(n,i){return(0,p.isValidElement)(n)?(0,p.cloneElement)(n,{backRoute:r,current:e,index:i+1,max:t}):n}));return(0,p.useEffect)((function(){if(l&&l.current&&e>0&&e<=l.current.children.length){var n=l.current.querySelectorAll(".step"),t=n[e-1].getBoundingClientRect(),r=e===n.length?l.current.parentElement.clientWidth:t.left+t.width;c(r)}}),[l,e]),(0,Z.jsx)(p.Fragment,{children:(0,Z.jsxs)(E,{children:[(0,Z.jsx)(C,{children:(0,Z.jsx)(N,{max:t,ref:l,children:d})}),(0,Z.jsx)(L,{children:(0,Z.jsx)("span",{style:{width:"".concat(a,"px")}})})]})})};k.Step=function(n){var e=n.name,t=n.isValid,r=n.isError,i=n.current,s=n.max,o=n.index,a=n.backRoute,c=n.onClick,l=(0,m.k6)(),d=(0,g.S)().width,u=d<1e3?1:d<1300?1.2:1.4;return(0,Z.jsxs)(M,{active:!(!o||!i)&&o<=i,children:[1===o&&(0,Z.jsx)(f.OL,{to:"/",children:(0,Z.jsx)(O,{children:(0,Z.jsx)("img",{src:d>1200?j.Z:v.Z,alt:"resume-mango"})})}),(0,Z.jsx)(S,{className:"step",children:(0,Z.jsxs)("div",{onClick:c,style:{cursor:"pointer",userSelect:"none"},children:[(0,Z.jsxs)("p",{children:["Step ",o," of ",s]}),(0,Z.jsxs)("h2",{children:[e,(0,Z.jsx)(p.Fragment,{children:r&&(0,Z.jsx)("span",{children:(0,Z.jsx)(y.Z,{size:"".concat(u,"rem"),color:"rgba(244, 67, 54, 1)"})})}),o&&i&&o<=i&&(0,Z.jsx)(p.Fragment,{children:t?(0,Z.jsx)("span",{children:(0,Z.jsx)(w.Z,{size:"".concat(u,"rem"),color:"rgba(32, 192, 50, 1)"})}):null})]})]})}),o===s&&(0,Z.jsx)(z,{"data-test-id":"close-builder",onClick:function(){return a?l.push(a):l.goBack()},children:(0,Z.jsx)(b.Z,{size:"1.2rem"})})]})};const P=k;var O=x.ZP.div(r||(r=(0,u.Z)(["\n  cursor: pointer;\n  user-select: none;\n  width: fit-content;\n  height: fit-content;\n  @media (max-width: 1300px) {\n    width: 175px;\n    img {\n      width: 100%;\n    }\n  }\n  @media (max-width: 1200px) {\n    display: flex;\n    align-items: center;\n    width: 57px;\n  }\n"]))),z=x.ZP.div(i||(i=(0,u.Z)(["\n  cursor: pointer;\n  user-select: none;\n  display: flex;\n  align-items: center;\n  width: 50px;\n  height: auto;\n  svg {\n    margin: auto;\n  }\n  &:hover {\n    svg {\n      path {\n        stroke: ",";\n      }\n    }\n  }\n"])),(function(n){return n.theme.colors.primary})),E=x.ZP.div(s||(s=(0,u.Z)(["\n  background: rgba(22, 22, 22, 0.02);\n  position: relative;\n  z-index: 10;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  &::before {\n    content: '';\n    display: block;\n    background-color: #fff;\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    right: 0;\n    left: 0;\n    margin: auto;\n    z-index: -1;\n  }\n"]))),N=x.ZP.div(o||(o=(0,u.Z)(["\n  display: grid;\n  grid-template-columns: ",";\n  align-items: center;\n  width: 100%;\n  justify-items: center;\n"])),(function(n){var e=n.max;return"repeat(".concat(e||1,", 1fr)")})),C=x.ZP.div(a||(a=(0,u.Z)(["\n  display: flex;\n  width: 100%;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1.25rem 0.7rem;\n"]))),L=x.ZP.div(c||(c=(0,u.Z)(["\n  width: 100%;\n  display: block;\n  background-color: rgba(196, 196, 196, 0.4);\n  height: 10px;\n  span {\n    display: block;\n    height: 100%;\n    background-color: ",";\n    transition: 1s ease;\n    transition-delay: 0.5s;\n  }\n"])),(function(n){return n.theme.colors.success})),S=x.ZP.div(l||(l=(0,u.Z)(["\n  display: flex;\n  width: 100%;\n  justify-content: center;\n  align-items: center;\n"]))),M=x.ZP.div(d||(d=(0,u.Z)(["\n  display: flex;\n  justify-content: center;\n  width: 100%;\n  position: relative;\n  p {\n    font-weight: bold;\n    margin: 0;\n    color: #878787;\n  }\n  h2 {\n    display: flex;\n    align-items: center;\n    width: fit-content;\n    font-size: 1.5rem;\n    margin: 0;\n    opacity: ",";\n    span {\n      margin-left: 0.7rem;\n      display: inline-flex;\n    }\n  }\n\n  @media (max-width: 1300px) {\n    h2 {\n      font-size: 1.2rem;\n    }\n  }\n  @media (max-width: 1000px) {\n    p {\n      font-size: 0.8rem;\n    }\n    h2 {\n      font-size: 0.875rem;\n    }\n  }\n"])),(function(n){return n.active?1:.34}))},1239:(n,e,t)=>{t.d(e,{Z:()=>d});var r,i,s=t(168),o=t(7294),a=t(9163),c=t(3360),l=t(5893);const d=function(){return(0,l.jsx)(o.Fragment,{children:(0,l.jsx)(u,{children:(0,l.jsxs)(c.ZL,{children:[(0,l.jsxs)(h,{className:"mb-3",children:[(0,l.jsxs)("div",{children:[(0,l.jsx)(c.up,{}),(0,l.jsx)(c.NE,{width:"95%"}),(0,l.jsx)(c.NE,{width:"75%"})]}),(0,l.jsx)(c.bt,{})]}),(0,l.jsxs)(h,{children:[(0,l.jsxs)("div",{children:[(0,l.jsx)(c.PM,{}),(0,l.jsx)(c.AU,{})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)(c.PM,{}),(0,l.jsx)(c.AU,{})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)(c.PM,{}),(0,l.jsx)(c.AU,{})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)(c.PM,{}),(0,l.jsx)(c.AU,{})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)(c.PM,{}),(0,l.jsx)(c.AU,{})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)(c.PM,{}),(0,l.jsx)(c.AU,{})]})]})]})})})};var u=a.ZP.div(r||(r=(0,s.Z)(["\n  padding: 2.75rem;\n  max-width: 900px;\n  margin: auto;\n"]))),h=a.ZP.div(i||(i=(0,s.Z)(["\n  display: grid;\n  grid-template-columns: ",";\n  grid-gap: 2rem;\n  margin-top: 1.5rem;\n  align-items: center;\n  "," {\n    width: 100px;\n    height: 100px;\n  }\n  "," {\n    margin-bottom: 1.7rem;\n  }\n  "," {\n    margin-bottom: 0.8rem;\n  }\n  "," {\n    margin-bottom: 0.5rem;\n  }\n"])),(function(n){return n.columns||"repeat(2, 1fr)"}),c.bt,c.up,c.NE,c.PM)},3137:(n,e,t)=>{t.d(e,{Z:()=>c});var r=t(5861),i=t(7757),s=t.n(i),o=t(9669),a=t.n(o);const c=function(){var n=(0,r.Z)(s().mark((function n(e){var t,r,i,o;return s().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t="",r="",n.prev=2,n.next=5,a().request(e);case 5:i=n.sent,o=i.data,t=o||"",n.next=13;break;case 10:n.prev=10,n.t0=n.catch(2),r=n.t0.response&&n.t0.response.data&&n.t0.response.data.error.message||"Something went wrong!";case 13:return n.abrupt("return",{data:t,error:r});case 14:case"end":return n.stop()}}),n,null,[[2,10]])})));return function(e){return n.apply(this,arguments)}}()},6527:(n,e,t)=>{t.d(e,{Z:()=>s});var r=t(885),i=t(7294);function s(n){var e=(0,i.useState)(n),t=(0,r.Z)(e,2),s=t[0],o=t[1],a=function(n){Object.defineProperty(window,"onbeforeunload",(function(e){return function(n,e){if(e){var t=n||window.event;return t.preventDefault(),t&&(t.returnValue=""),""}}(e,n)}))};return Object.defineProperty(window,"onload",(function(){a(s)})),(0,i.useEffect)((function(){a(s)}),[s]),{showExitPrompt:s,setShowExitPrompt:o}}},5934:(n,e,t)=>{t.d(e,{pJ:()=>l,n5:()=>d,Mf:()=>u,dp:()=>h});var r,i,s,o,a=t(168),c=t(9163),l=c.ZP.div(r||(r=(0,a.Z)(["\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-gap: 1.5rem;\n  margin: 1.5rem 0;\n  width: 100%;\n\n  @media (max-width: 480px) {\n    grid-template-columns: repeat(1, 1fr);\n  }\n"]))),d=c.ZP.div(i||(i=(0,a.Z)(["\n  width: 100%;\n  height: 100%;\n  margin-bottom: 3rem;\n"]))),u=c.ZP.div(s||(s=(0,a.Z)(["\n  width: 100%;\n  display: flex;\n  justify-content: flex-end;\n"]))),h=c.ZP.div(o||(o=(0,a.Z)(["\n  font-size: 0.8rem;\n  color: ",";\n"])),(function(n){return n.theme.colors.danger}))},8765:(n,e,t)=>{t.d(e,{Z:()=>r});const r=t.p+"images/resume-mango-full-logo.png"}}]);
//# sourceMappingURL=117.bundle.js.map