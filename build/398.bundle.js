"use strict";(self.webpackChunkuser_dashboard=self.webpackChunkuser_dashboard||[]).push([[398],{2136:(n,e,t)=>{t.d(e,{Z:()=>a});var r=t(7294),i=t(5893);const a=function(n){var e=n.size,t=n.color,a=n.className;return(0,i.jsx)(r.Fragment,{children:(0,i.jsxs)("svg",{width:e||"1rem",className:a||"",height:e||"1rem",viewBox:"0 0 19 19",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,i.jsx)("path",{d:"M18 1H1V7.61111H18V1Z",stroke:t||"#898989",strokeWidth:"1.2",strokeLinecap:"round",strokeLinejoin:"round"}),(0,i.jsx)("path",{d:"M17.9996 11.3887H13.2773V17.9998H17.9996V11.3887Z",stroke:t||"#898989",strokeWidth:"1.2",strokeLinecap:"round",strokeLinejoin:"round"}),(0,i.jsx)("path",{d:"M9.5 11.3887H1V17.9998H9.5V11.3887Z",stroke:t||"#898989",strokeWidth:"1.2",strokeLinecap:"round",strokeLinejoin:"round"})]})})}},1757:(n,e,t)=>{t.d(e,{Z:()=>a});var r=t(7294),i=t(5893);const a=function(n){var e=n.size,t=n.color,a=n.className;return(0,i.jsx)(r.Fragment,{children:(0,i.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 22 22",width:e||"1rem",className:a||"",height:e||"1rem",children:[(0,i.jsx)("circle",{cx:"11",cy:"11",r:"11",fill:t||"#898989"}),(0,i.jsx)("path",{d:"M5.89453 10.6357L9.63735 14.3098L16.3064 7.46828",stroke:"white",fill:"none"})]})})}},9029:(n,e,t)=>{t.d(e,{Z:()=>a});var r=t(7294),i=t(5893);const a=function(n){var e=n.size,t=n.color,a=n.className;return(0,i.jsx)(r.Fragment,{children:(0,i.jsxs)("svg",{width:e||"1rem",height:e||"1rem",className:a||"",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,i.jsx)("path",{d:"M14.75 10.25V13.25C14.75 13.6478 14.592 14.0294 14.3107 14.3107C14.0294 14.592 13.6478 14.75 13.25 14.75H2.75C2.35218 14.75 1.97064 14.592 1.68934 14.3107C1.40804 14.0294 1.25 13.6478 1.25 13.25V10.25",stroke:t||"#898989",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"}),(0,i.jsx)("path",{d:"M4.25 6.5L8 10.25L11.75 6.5",stroke:t||"#898989",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"}),(0,i.jsx)("path",{d:"M8 10.25V1.25",stroke:t||"#898989",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})]})})}},2434:(n,e,t)=>{t.d(e,{Z:()=>a});var r=t(7294),i=t(5893);const a=function(n){var e=n.size,t=n.color,a=n.className;return(0,i.jsx)(r.Fragment,{children:(0,i.jsx)("svg",{width:e||"1rem",className:a||"",height:e||"1rem",viewBox:"0 0 1 28",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,i.jsx)("path",{d:"M0.5 0V27.5",stroke:t||"#898989"})})})}},5970:(n,e,t)=>{t.d(e,{Z:()=>A});var r,i,a,o,s=t(168),l=t(4942),c=t(7294),p=t(9163),d=t(5893);function u(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,r)}return t}function m(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?u(Object(t),!0).forEach((function(e){(0,l.Z)(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):u(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}var h=function(n){var e=n.vertical,t=n.horizontal,r=n.btnStyle,i=n.children,a=n.show,o=n.setShow,s=n.onClick,l=n.className,p=n.disabled,u=(0,c.useRef)(null),h=function(n){u&&u.current&&!u.current.contains(n.target)&&o(!1)};(0,c.useEffect)((function(){if(u)return document.addEventListener("mousedown",h,!0),function(){document.removeEventListener("mousedown",h,!0)}}));var A="left"===t?{right:0}:{left:0},y="top"===e?{bottom:"100%"}:{top:"100%"},w=c.Children.map(i,(function(n){if(n.type&&n.type===f)return n}));return(0,d.jsx)(c.Fragment,{children:(0,d.jsxs)(b,{ref:u,className:l,"data-test-id":"dropdown-wrapper",children:[a&&(0,d.jsx)(v,{style:m(m({},A),y),children:w}),c.Children.map(i,(function(n){if(n.type===g)return(0,d.jsx)(x,{disabled:p,style:m({},r),onClick:function(n){return function(n){n.preventDefault(),o(!a),s&&s(n)}(n)},children:n})}))]})})},g=function(n){var e=n.children;return(0,d.jsx)(c.Fragment,{children:e})},f=function(n){var e=n.children;return(0,d.jsx)(y,{children:e})};h.Button=g,h.Item=f;const A=h;var x=p.ZP.button(r||(r=(0,s.Z)(["\n  display: flex;\n  align-items: center;\n  background-color: transparent;\n  height: auto;\n  padding: 0.3rem;\n  width: 100%;\n  user-select: none;\n  * {\n    pointer-events: none;\n  }\n"]))),b=p.ZP.div(i||(i=(0,s.Z)(["\n  display: block;\n  position: relative;\n  width: fit-content;\n  user-select: none;\n"]))),v=p.ZP.ul(a||(a=(0,s.Z)(["\n  background: #ffffff;\n  border: 1px solid rgba(2, 52, 126, 0.12);\n  box-shadow: -2px 4px 7px rgba(0, 50, 97, 0.08);\n  border-radius: 4px;\n  padding: 0.5rem 0;\n  margin: 0.3rem 0;\n  display: inline-flex;\n  flex-direction: column;\n  position: absolute;\n  z-index: 10;\n  width: 100%;\n  min-width: 75px;\n  cursor: default;\n"]))),y=p.ZP.li(o||(o=(0,s.Z)(["\n  width: 100%;\n  padding: 0;\n  margin: 0;\n  a {\n    display: block;\n    font-size: ",";\n    padding: 0.3rem 0.5rem;\n    transition: all 300ms ease-in-out;\n    &:hover {\n      background-color: ",";\n    }\n  }\n  @media (max-width: 1300px) {\n    a {\n      font-size: 0.8rem;\n    }\n  }\n"])),(function(n){return n.theme.fonts.small}),(function(n){return n.theme.colors.light}))},2566:(n,e,t)=>{t.d(e,{Z:()=>E});var r,i,a,o,s,l,c,p,d=t(168),u=t(885),m=t(7294),h=t(5977),g=t(3727),f=t(9163),A=t(9964),x=t(8765),b=t(8930),v=t(1757),y=t(2790),w=t(5292),j=t(5893),k=function(n){var e=n.current,t=n.max,r=n.backRoute,i=n.children,a=(0,m.useState)(0),o=(0,u.Z)(a,2),s=o[0],l=o[1],c=(0,m.useRef)(null),p=m.Children.map(i,(function(n,i){return(0,m.isValidElement)(n)?(0,m.cloneElement)(n,{backRoute:r,current:e,index:i+1,max:t}):n}));return(0,m.useEffect)((function(){if(c&&c.current&&e>0&&e<=c.current.children.length){var n=c.current.querySelectorAll(".step"),t=n[e-1].getBoundingClientRect(),r=e===n.length?c.current.parentElement.clientWidth:t.left+t.width;l(r)}}),[c,e]),(0,j.jsx)(m.Fragment,{children:(0,j.jsxs)(Z,{children:[(0,j.jsx)(O,{children:(0,j.jsx)(N,{max:t,ref:c,children:p})}),(0,j.jsx)(P,{children:(0,j.jsx)("span",{style:{width:"".concat(s,"px")}})})]})})};k.Step=function(n){var e=n.name,t=n.isValid,r=n.isError,i=n.current,a=n.max,o=n.index,s=n.backRoute,l=n.onClick,c=(0,h.k6)(),p=(0,A.S)().width,d=p<1e3?1:p<1300?1.2:1.4;return(0,j.jsxs)(L,{active:!(!o||!i)&&o<=i,children:[1===o&&(0,j.jsx)(g.OL,{to:"/",children:(0,j.jsx)(C,{children:(0,j.jsx)("img",{src:p>1200?x.Z:b.Z,alt:"resume-mango"})})}),(0,j.jsx)(S,{className:"step",children:(0,j.jsxs)("div",{onClick:l,style:{cursor:"pointer",userSelect:"none"},children:[(0,j.jsxs)("p",{children:["Step ",o," of ",a]}),(0,j.jsxs)("h2",{children:[e,(0,j.jsx)(m.Fragment,{children:r&&(0,j.jsx)("span",{children:(0,j.jsx)(w.Z,{size:"".concat(d,"rem"),color:"rgba(244, 67, 54, 1)"})})}),o&&i&&o<=i&&(0,j.jsx)(m.Fragment,{children:t?(0,j.jsx)("span",{children:(0,j.jsx)(v.Z,{size:"".concat(d,"rem"),color:"rgba(32, 192, 50, 1)"})}):null})]})]})}),o===a&&(0,j.jsx)(B,{"data-test-id":"close-builder",onClick:function(){return s?c.push(s):c.goBack()},children:(0,j.jsx)(y.Z,{size:"1.2rem"})})]})};const E=k;var C=f.ZP.div(r||(r=(0,d.Z)(["\n  cursor: pointer;\n  user-select: none;\n  width: fit-content;\n  height: fit-content;\n  @media (max-width: 1300px) {\n    width: 175px;\n    img {\n      width: 100%;\n    }\n  }\n  @media (max-width: 1200px) {\n    display: flex;\n    align-items: center;\n    width: 57px;\n  }\n"]))),B=f.ZP.div(i||(i=(0,d.Z)(["\n  cursor: pointer;\n  user-select: none;\n  display: flex;\n  align-items: center;\n  width: 50px;\n  height: auto;\n  svg {\n    margin: auto;\n  }\n  &:hover {\n    svg {\n      path {\n        stroke: ",";\n      }\n    }\n  }\n"])),(function(n){return n.theme.colors.primary})),Z=f.ZP.div(a||(a=(0,d.Z)(["\n  background: rgba(22, 22, 22, 0.02);\n  position: relative;\n  z-index: 10;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  &::before {\n    content: '';\n    display: block;\n    background-color: #fff;\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    right: 0;\n    left: 0;\n    margin: auto;\n    z-index: -1;\n  }\n"]))),N=f.ZP.div(o||(o=(0,d.Z)(["\n  display: grid;\n  grid-template-columns: ",";\n  align-items: center;\n  width: 100%;\n  justify-items: center;\n"])),(function(n){var e=n.max;return"repeat(".concat(e||1,", 1fr)")})),O=f.ZP.div(s||(s=(0,d.Z)(["\n  display: flex;\n  width: 100%;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1.25rem 0.7rem;\n"]))),P=f.ZP.div(l||(l=(0,d.Z)(["\n  width: 100%;\n  display: block;\n  background-color: rgba(196, 196, 196, 0.4);\n  height: 10px;\n  span {\n    display: block;\n    height: 100%;\n    background-color: ",";\n    transition: 1s ease;\n    transition-delay: 0.5s;\n  }\n"])),(function(n){return n.theme.colors.success})),S=f.ZP.div(c||(c=(0,d.Z)(["\n  display: flex;\n  width: 100%;\n  justify-content: center;\n  align-items: center;\n"]))),L=f.ZP.div(p||(p=(0,d.Z)(["\n  display: flex;\n  justify-content: center;\n  width: 100%;\n  position: relative;\n  p {\n    font-weight: bold;\n    margin: 0;\n    color: #878787;\n  }\n  h2 {\n    display: flex;\n    align-items: center;\n    width: fit-content;\n    font-size: 1.5rem;\n    margin: 0;\n    opacity: ",";\n    span {\n      margin-left: 0.7rem;\n      display: inline-flex;\n    }\n  }\n\n  @media (max-width: 1300px) {\n    h2 {\n      font-size: 1.2rem;\n    }\n  }\n  @media (max-width: 1000px) {\n    p {\n      font-size: 0.8rem;\n    }\n    h2 {\n      font-size: 0.875rem;\n    }\n  }\n"])),(function(n){return n.active?1:.34}))},3554:(n,e,t)=>{t.d(e,{Z:()=>g});var r,i,a,o,s=t(168),l=t(4942),c=t(7294),p=t(9163),d=t(3360),u=t(5893);function m(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,r)}return t}function h(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?m(Object(t),!0).forEach((function(e){(0,l.Z)(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):m(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}const g=function(n){var e=n.style,t=n.scale,r=h(h({},e&&e),t?{transform:"scale(".concat(t,")")}:{transform:"scale(0.6)"});return(0,u.jsx)(c.Fragment,{children:(0,u.jsx)(A,{className:"template_skeleton",style:r,children:(0,u.jsxs)(d.ZL,{children:[(0,u.jsxs)(f,{columns:"30% 60%",children:[(0,u.jsx)(x,{children:(0,u.jsx)(d.ph,{})}),(0,u.jsxs)("div",{children:[(0,u.jsx)(d.up,{}),(0,u.jsx)(d.NE,{})]})]}),(0,u.jsxs)(f,{columns:"40% 55%",style:{borderTop:" 1px solid #ddd",height:"100%"},children:[(0,u.jsxs)("div",{style:{borderRight:" 1px solid #ddd",height:"100%",padding:"3rem 2rem 3rem 0"},children:[(0,u.jsxs)(b,{children:[(0,u.jsx)(d.up,{}),(0,u.jsx)(d.NE,{width:"75%"})]}),(0,u.jsxs)(b,{children:[(0,u.jsx)(d.up,{}),(0,u.jsx)(d.NE,{width:"75%"}),(0,u.jsx)(d.NE,{width:"65%"})]}),(0,u.jsxs)(b,{children:[(0,u.jsx)(d.up,{}),(0,u.jsx)(d.NE,{width:"95%"}),(0,u.jsx)(d.NE,{width:"55%"})]})]}),(0,u.jsxs)("div",{style:{height:"100%",padding:"3rem 2rem 3rem 0"},children:[(0,u.jsxs)(b,{children:[(0,u.jsx)(d.up,{}),(0,u.jsx)(d.NE,{width:"90%"}),(0,u.jsx)(d.NE,{width:"95%"}),(0,u.jsx)(d.NE,{width:"75%"}),(0,u.jsx)("br",{}),(0,u.jsx)(d.NE,{width:"95%"}),(0,u.jsx)(d.NE,{width:"80%"}),(0,u.jsx)(d.NE,{width:"55%"})]}),(0,u.jsx)("br",{}),(0,u.jsxs)(b,{children:[(0,u.jsx)(d.up,{}),(0,u.jsx)(d.NE,{width:"90%"}),(0,u.jsx)(d.NE,{width:"95%"}),(0,u.jsx)(d.NE,{width:"75%"})]}),(0,u.jsx)("br",{}),(0,u.jsxs)(b,{children:[(0,u.jsx)(d.up,{}),(0,u.jsx)(d.NE,{width:"90%"}),(0,u.jsx)(d.NE,{width:"95%"})]})]})]})]})})})};var f=p.ZP.div(r||(r=(0,s.Z)(["\n  display: grid;\n  grid-template-columns: ",";\n  grid-gap: 2rem;\n  margin-top: 1.5rem;\n  align-items: center;\n  "," {\n    width: 100px;\n    height: 100px;\n  }\n  "," {\n    margin-bottom: 1.7rem;\n  }\n  "," {\n    margin-bottom: 0.8rem;\n  }\n  "," {\n    margin-bottom: 0.5rem;\n  }\n"])),(function(n){return n.columns||"repeat(2, 1fr)"}),d.bt,d.up,d.NE,d.PM),A=p.ZP.div(i||(i=(0,s.Z)(["\n  display: flex;\n  flex-direction: column;\n  height: 297mm;\n  width: 210mm;\n  background-color: #fff;\n  padding: 2rem;\n  "," {\n    width: 100px;\n    height: 100px;\n  }\n"])),d.ph),x=p.ZP.div(a||(a=(0,s.Z)(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"]))),b=p.ZP.div(o||(o=(0,s.Z)(["\n  margin-bottom: 4rem;\n"])))},1239:(n,e,t)=>{t.d(e,{Z:()=>p});var r,i,a=t(168),o=t(7294),s=t(9163),l=t(3360),c=t(5893);const p=function(){return(0,c.jsx)(o.Fragment,{children:(0,c.jsx)(d,{children:(0,c.jsxs)(l.ZL,{children:[(0,c.jsxs)(u,{className:"mb-3",children:[(0,c.jsxs)("div",{children:[(0,c.jsx)(l.up,{}),(0,c.jsx)(l.NE,{width:"95%"}),(0,c.jsx)(l.NE,{width:"75%"})]}),(0,c.jsx)(l.bt,{})]}),(0,c.jsxs)(u,{children:[(0,c.jsxs)("div",{children:[(0,c.jsx)(l.PM,{}),(0,c.jsx)(l.AU,{})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(l.PM,{}),(0,c.jsx)(l.AU,{})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(l.PM,{}),(0,c.jsx)(l.AU,{})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(l.PM,{}),(0,c.jsx)(l.AU,{})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(l.PM,{}),(0,c.jsx)(l.AU,{})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(l.PM,{}),(0,c.jsx)(l.AU,{})]})]})]})})})};var d=s.ZP.div(r||(r=(0,a.Z)(["\n  padding: 2.75rem;\n  max-width: 900px;\n  margin: auto;\n"]))),u=s.ZP.div(i||(i=(0,a.Z)(["\n  display: grid;\n  grid-template-columns: ",";\n  grid-gap: 2rem;\n  margin-top: 1.5rem;\n  align-items: center;\n  "," {\n    width: 100px;\n    height: 100px;\n  }\n  "," {\n    margin-bottom: 1.7rem;\n  }\n  "," {\n    margin-bottom: 0.8rem;\n  }\n  "," {\n    margin-bottom: 0.5rem;\n  }\n"])),(function(n){return n.columns||"repeat(2, 1fr)"}),l.bt,l.up,l.NE,l.PM)},5951:(n,e,t)=>{t.d(e,{h:()=>o});var r=t(5861),i=t(7757),a=t.n(i),o=function(){var n=(0,r.Z)(a().mark((function n(e){return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!("fonts"in document)){n.next=5;break}return Promise.all(e.map((function(n){var e=new FontFace(n.name,"url(".concat(n.url,") format('").concat(n.format,"')"));return e.style=n.style,e.weight=n.weight,e.load()}))).then((function(n){n&&n.forEach((function(n){document.fonts.add(n)}))})),n.abrupt("return",!0);case 5:return n.abrupt("return",!1);case 6:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()},8772:(n,e,t)=>{t.d(e,{Z:()=>s});var r=t(2982),i=t(885);function a(n,e){var t="undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(!t){if(Array.isArray(n)||(t=function(n,e){if(n){if("string"==typeof n)return o(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);return"Object"===t&&n.constructor&&(t=n.constructor.name),"Map"===t||"Set"===t?Array.from(n):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?o(n,e):void 0}}(n))||e&&n&&"number"==typeof n.length){t&&(n=t);var r=0,i=function(){};return{s:i,n:function(){return r>=n.length?{done:!0}:{done:!1,value:n[r++]}},e:function(n){throw n},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,s=!0,l=!1;return{s:function(){t=t.call(n)},n:function(){var n=t.next();return s=n.done,n},e:function(n){l=!0,a=n},f:function(){try{s||null==t.return||t.return()}finally{if(l)throw a}}}}function o(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}const s=function(n,e,t,o){if(n&&n.layout&&n.secondaryLayout&&e){var s=function(n){return function n(e){var t=document.createElement(e.tag);if(e.class&&(t.className=e.class),e.name&&"element"!==e.name&&t.classList.add(e.name),e.id&&t.classList.add(e.id),e.text&&(t.classList.contains("space_before")?t.textContent=" "+e.text:t.textContent=e.text),e.html&&(t.innerHTML=e.html),e.src&&(t.src=e.src),e.blocks&&e.blocks.length>0&&(t.classList.add("template_column","not-filled"),t.setAttribute("data-blocks",e.blocks.join(" "))),e.children&&e.children.length>0){var r,i=a(e.children);try{for(i.s();!(r=i.n()).done;){var o=r.value;t.appendChild(n(o))}}catch(n){i.e(n)}finally{i.f()}}return t}(n)},l=function n(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return Array.isArray(e)?[]:Object(e)===e?Object.entries(e).flatMap((function(e){var a=(0,i.Z)(e,2),o=a[0],s=a[1];return n(s,[].concat((0,r.Z)(t),[o]))})):t.join(".")},c=function(n,e){return n.forEach((function(n){e=e[n]})),e},p=function n(e,t,r){var i=t.indexOf(e.name);if(i>=0){var o=t[i].split("."),s=c(o,r);1===o.length&&"description"===o[0]?e.html=s:e.text=s}if(e.parent)if(t.indexOf(e.parent)>=0){var l=e.parent.split(".");c(l,r)||(e.text&&(e.text=""),e.html&&(e.html=""))}else e.text&&(e.text=""),e.html&&(e.html="");if(e.children.length>0){var p,d=a(e.children);try{for(d.s();!(p=d.n()).done;)n(p.value,t,r)}catch(n){d.e(n)}finally{d.f()}}return e},d=function(n,e){var t=0;return function n(e,r){"title"===r.name&&(r.text=e),"blocks-wrapper"===r.name&&r.columns&&(t=parseInt(r.columns));var i,o=a(r.children);try{for(o.s();!(i=o.n()).done;)n(e,i.value)}catch(n){o.e(n)}finally{o.f()}}(n,e),{layout:e,columns:t}},u={},m={page:null,pageNo:1,wrapper:null,column:null,blocksWrapper:null,block:null},h=s(n.secondaryLayout),g=function(n,e,i,a,l,c){var g=m.page.getBoundingClientRect(),f=g.y+window.scrollY+g.height,A=i.getBoundingClientRect();if(A.y+window.scrollY+A.height+o>f){var x,b=i.querySelector(".description");if(b)!function(n,e,i,a,l,c,g,f){var A=e.getBoundingClientRect();if(A.y+window.scrollY+A.height+o>a){var x=Array.from(e.children);e.innerHTML="";var b=i.querySelector(".description");if(0===x.length)return;x.forEach((function(e,a){b&&b.appendChild(e);var A=e.getBoundingClientRect(),x=A.y+window.scrollY+A.height+o,v=m.page.getBoundingClientRect();if(x>v.y+window.scrollY+v.height){var y,w;if(a>0){var j=p(g,[],{}),k=(y=s(j)).querySelector(".description");k&&(k.appendChild(e),b=k)}else y=i;m.pageNo>=Object.keys(u).length?(w=h.cloneNode(!0),u[m.pageNo+1]={page:w,cols:(0,r.Z)(w.querySelectorAll(".template_column"))},t.appendChild(w)):w=u[m.pageNo+1].page,m.pageNo=m.pageNo+1;var E=d(n,f);l<1&&a<1&&m.wrapper.remove(),m.wrapper=s(E.layout);var C=(0,r.Z)(w.querySelectorAll(".template_column")).filter((function(n){return n.getAttribute("data-blocks")===m.column.getAttribute("data-blocks")}))[0];if(m.page=w,m.column=C,m.blocksWrapper=m.wrapper.getElementsByClassName("blocks-wrapper")[0],c&&m.blocksWrapper.removeAttribute("class"),m.blocksWrapper.appendChild(y),m.column.appendChild(m.wrapper),m.column.classList.remove("not-filled"),l>=1||a>=1){var B=m.wrapper.getElementsByClassName("title")[0];B.parentElement.removeChild(B)}}}))}}(n,b,i,f,a,l,c,e);else{m.pageNo>=Object.keys(u).length?(x=h.cloneNode(!0),u[m.pageNo+1]={page:x,cols:(0,r.Z)(x.querySelectorAll(".template_column"))},t.appendChild(x)):x=u[m.pageNo+1].page,m.pageNo=m.pageNo+1;var v=d(n,e);a<1&&m.wrapper.remove(),m.wrapper=s(v.layout);var y=(0,r.Z)(x.querySelectorAll(".template_column")).filter((function(n){return n.getAttribute("data-blocks")===m.column.getAttribute("data-blocks")}))[0];if(m.page=x,m.column=y,m.blocksWrapper=m.wrapper.getElementsByClassName("blocks-wrapper")[0],l&&m.blocksWrapper.removeAttribute("class"),m.blocksWrapper.appendChild(i),m.column.appendChild(m.wrapper),m.column.classList.remove("not-filled"),a>=1){var w=m.wrapper.getElementsByClassName("title")[0];w.parentElement.removeChild(w)}}}},f=function(n,e){return function n(e,t){l(t).forEach((function(n){var r=n.split("."),i=c(r,t);"string"==typeof i&&e.name===n&&("avatar.processed"===n?e.src=i:e.text=i),e.parent&&!t[e.parent]&&("img"===e.tag&&(e.tag="span",e.src=""),e.text&&(e.text=""),e.html&&(e.html=""))}));var r,i=a(e.children);try{for(i.s();!(r=i.n()).done;)n(r.value,t)}catch(n){i.e(n)}finally{i.f()}}(n,e),n}(n.layout,e),A=s(f),x=t.appendChild(A),b=(0,r.Z)(x.querySelectorAll(".template_column"));n.blocks&&function(n,e,i,c){u[1]={page:c,cols:i},i.length>0&&i.forEach((function(i){m.page=u[1].page,m.pageNo=1,m.column=i,i.getAttribute("data-blocks").split(" ").forEach((function(c){n[c]&&(n[c].multiple?function(n,e){if(Array.isArray(e)&&e.length>0){var t=e.map((function(e){var t=JSON.parse(JSON.stringify(n.block)),r=l(e);return p(t,r,e)}));!function(n,e,t,r){if(!(t.length<1)){var i=d(n,e);if(m.wrapper=s(i.layout),m.column.appendChild(m.wrapper),m.blocksWrapper=m.wrapper.getElementsByClassName("blocks-wrapper")[0],i.columns>0){var a=function(n,e){for(var t=Math.max(n.length/e,1),r=[],i=0;i<t;i++)r.push(n.slice(e*i,e*(i+1)));return r}(t,i.columns),o=m.blocksWrapper.classList.toString();m.blocksWrapper.removeAttribute("class"),a.map((function(t,i){var a={tag:m.blocksWrapper.tagName.toLowerCase(),class:o,children:t};m.block=s(a),m.blocksWrapper.appendChild(m.block),g(n,e,m.block,i,!0,r)}))}else t.map((function(t,i){m.block=s(t),m.blocksWrapper.appendChild(m.block),g(n,e,m.block,i,!1,r)}))}}(n.title,n.layout,t,JSON.parse(JSON.stringify(n.block)))}}(n[c],e[c]):function(n,e,i,l){var c="blocks-wrapper",p=[],d=function n(e,t,r){"element"!==e.name&&("title"===e.name?e.text=t:r[e.name]&&(p.push(e.name),"about_info"===e.name||"description"===e.name?e.html=r[e.name]:e.text=r[e.name])),e.parent&&!r[e.parent]&&("img"===e.tag&&(e.tag="span",e.src=""),e.text&&(e.text=""),e.html&&(e.html=""));var i,o=a(e.children);try{for(o.s();!(i=o.n()).done;)n(i.value,t,r)}catch(n){o.e(n)}finally{o.f()}return e}(n,e,i);if(d){if(0===p.length)return;if(m.column=l,m.block=s(d),m.column.appendChild(m.block),m.column.classList.remove("not-filled"),m.blocksWrapper=m.block.querySelector("."+c),!m.blocksWrapper)return;var g=Array.from(m.blocksWrapper.children).splice(0,m.blocksWrapper.children.length);m.blocksWrapper.innerHTML="",g.forEach((function(n,e){m.blocksWrapper.appendChild(n);var i=m.page.getBoundingClientRect(),a=i.y+window.scrollY+i.height,s=n.getBoundingClientRect(),l=s.y+window.scrollY+o;if(s.height+l>=a){var p;m.pageNo>=Object.keys(u).length?(p=h.cloneNode(!0),u[m.pageNo+1]={page:p,cols:(0,r.Z)(p.querySelectorAll(".template_column"))},t.appendChild(p)):p=u[m.pageNo+1].page,m.page=p,m.pageNo=m.pageNo+1,m.wrapper=m.block.cloneNode(!0),m.page.appendChild(m.wrapper),m.blocksWrapper=m.wrapper.querySelector("."+c),m.blocksWrapper.innerHTML="",m.blocksWrapper.appendChild(n);var d=(0,r.Z)(p.querySelectorAll(".template_column")).filter((function(n){return n.getAttribute("data-blocks")===m.column.getAttribute("data-blocks")}))[0];if(m.column=d,m.column.appendChild(m.wrapper),m.column.classList.remove("not-filled"),e>=1){var g=m.wrapper.getElementsByClassName("title")[0];g&&g.parentElement.removeChild(g)}}}))}}(n[c].layout,n[c].title,e,i))}))}))}(n.blocks,e,b,x);var v=[];return Object.keys(u).forEach((function(n){v.push.apply(v,(0,r.Z)(u[n].page.querySelectorAll(".removable-blocks"))),v.length>0&&v.forEach((function(n){0===n.querySelectorAll(".block").length&&n.remove()}))})),u}}},704:(n,e,t)=>{t.d(e,{Z:()=>p});var r=t(5861),i=t(7757),a=t.n(i),o=t(9669),s=t.n(o),l=t(8767),c=t(5454);const p=function(n,e,t){var i=(0,c.a)(),o=i.user,p=i.token,d=o&&o.ref,u=function(){var n=(0,r.Z)(a().mark((function n(){var r,i;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,s().get(e,{params:t});case 2:return r=n.sent,i=r.data,n.abrupt("return",i);case 5:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();return(0,l.useQuery)(n,u,{enabled:!!p&&!!d})}},2220:(n,e,t)=>{t.d(e,{Z:()=>s});var r=t(7537),i=t.n(r),a=t(3645),o=t.n(a)()(i());o.push([n.id,".mt {\n  margin-top: 3rem !important;\n}\n.page {\n  width: 210mm;\n  height: 297mm;\n  box-sizing: border-box;\n  margin: auto;\n  padding: 0;\n  transform: scale(0.6);\n  overflow: hidden;\n  position: absolute;\n}\n\n.page h1,\n.page h2,\n.page h3,\n.page h4,\n.page h5,\n.page p,\n.page li,\n.page span,\n.page b,\n.page em {\n  margin: 0.2rem 0;\n  line-height: 1.2;\n  word-wrap: break-word;\n  word-break: break-word;\n  letter-spacing: 0;\n}\n\n.page .description ul,\n.page .about_info ul {\n  margin: 0;\n  padding: 0;\n  list-style-position: inside;\n  list-style-type: disc;\n}\n.page .description ol,\n.page .about_info ol {\n  margin: 0;\n  padding: 0;\n  list-style-position: inside;\n  list-style-type: auto;\n}\n\n.page .heading {\n  margin-bottom: 1.5rem;\n}\n\n.page p,\n.page b,\n.page em,\n.page li {\n  font-size: 0.875rem;\n  line-height: 1.5;\n}\n.page. h1 {\n  font-size: 2rem !important;\n}\n.page h3 {\n  font-size: 1.25rem !important;\n}\n\n.page ul {\n  margin: 0;\n  padding: 0;\n  list-style-position: inside;\n  list-style-type: unset;\n}\n.page li {\n  margin-top: 0.3rem;\n  margin-bottom: 0.3rem;\n}\n\n.page img {\n  width: 100%;\n  height: 100%;\n}\n\n.template_page {\n  width: 210mm;\n  min-height: 297mm;\n  height: 297mm;\n  display: flex;\n  flex-direction: column;\n  background-color: #fff;\n}\n\n.page .uppercase {\n  text-transform: uppercase;\n}\n\n.page .no-list-style {\n  list-style-type: none;\n}\n","",{version:3,sources:["webpack://./src/styled/template_global.css"],names:[],mappings:"AAAA;EACE,2BAA2B;AAC7B;AACA;EACE,YAAY;EACZ,aAAa;EACb,sBAAsB;EACtB,YAAY;EACZ,UAAU;EACV,qBAAqB;EACrB,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;;;;;;;;;;EAUE,gBAAgB;EAChB,gBAAgB;EAChB,qBAAqB;EACrB,sBAAsB;EACtB,iBAAiB;AACnB;;AAEA;;EAEE,SAAS;EACT,UAAU;EACV,2BAA2B;EAC3B,qBAAqB;AACvB;AACA;;EAEE,SAAS;EACT,UAAU;EACV,2BAA2B;EAC3B,qBAAqB;AACvB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;;;;EAIE,mBAAmB;EACnB,gBAAgB;AAClB;AACA;EACE,0BAA0B;AAC5B;AACA;EACE,6BAA6B;AAC/B;;AAEA;EACE,SAAS;EACT,UAAU;EACV,2BAA2B;EAC3B,sBAAsB;AACxB;AACA;EACE,kBAAkB;EAClB,qBAAqB;AACvB;;AAEA;EACE,WAAW;EACX,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,iBAAiB;EACjB,aAAa;EACb,aAAa;EACb,sBAAsB;EACtB,sBAAsB;AACxB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,qBAAqB;AACvB",sourcesContent:[".mt {\n  margin-top: 3rem !important;\n}\n.page {\n  width: 210mm;\n  height: 297mm;\n  box-sizing: border-box;\n  margin: auto;\n  padding: 0;\n  transform: scale(0.6);\n  overflow: hidden;\n  position: absolute;\n}\n\n.page h1,\n.page h2,\n.page h3,\n.page h4,\n.page h5,\n.page p,\n.page li,\n.page span,\n.page b,\n.page em {\n  margin: 0.2rem 0;\n  line-height: 1.2;\n  word-wrap: break-word;\n  word-break: break-word;\n  letter-spacing: 0;\n}\n\n.page .description ul,\n.page .about_info ul {\n  margin: 0;\n  padding: 0;\n  list-style-position: inside;\n  list-style-type: disc;\n}\n.page .description ol,\n.page .about_info ol {\n  margin: 0;\n  padding: 0;\n  list-style-position: inside;\n  list-style-type: auto;\n}\n\n.page .heading {\n  margin-bottom: 1.5rem;\n}\n\n.page p,\n.page b,\n.page em,\n.page li {\n  font-size: 0.875rem;\n  line-height: 1.5;\n}\n.page. h1 {\n  font-size: 2rem !important;\n}\n.page h3 {\n  font-size: 1.25rem !important;\n}\n\n.page ul {\n  margin: 0;\n  padding: 0;\n  list-style-position: inside;\n  list-style-type: unset;\n}\n.page li {\n  margin-top: 0.3rem;\n  margin-bottom: 0.3rem;\n}\n\n.page img {\n  width: 100%;\n  height: 100%;\n}\n\n.template_page {\n  width: 210mm;\n  min-height: 297mm;\n  height: 297mm;\n  display: flex;\n  flex-direction: column;\n  background-color: #fff;\n}\n\n.page .uppercase {\n  text-transform: uppercase;\n}\n\n.page .no-list-style {\n  list-style-type: none;\n}\n"],sourceRoot:""}]);const s=o},8765:(n,e,t)=>{t.d(e,{Z:()=>r});const r=t.p+"images/resume-mango-full-logo.png"},2150:(n,e,t)=>{var r=t(3379),i=t.n(r),a=t(7795),o=t.n(a),s=t(569),l=t.n(s),c=t(3565),p=t.n(c),d=t(9216),u=t.n(d),m=t(4589),h=t.n(m),g=t(2220),f={};f.styleTagTransform=h(),f.setAttributes=p(),f.insert=l().bind(null,"head"),f.domAPI=o(),f.insertStyleElement=u(),i()(g.Z,f),g.Z&&g.Z.locals&&g.Z.locals}}]);
//# sourceMappingURL=398.bundle.js.map