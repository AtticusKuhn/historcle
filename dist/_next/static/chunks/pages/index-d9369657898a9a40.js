(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(3065)}])},8879:function(e,t,n){"use strict";var r=n(5893),s=n(1043),i=n(7568);t.Z=function(){var e=(0,s.I0)(),t=(0,i.pi)((function(e){return e.error}));return(0,r.jsxs)("div",{className:"".concat(!t&&"hidden"," rounded font-bold bg-accent p-lg"),children:[t||"",(0,r.jsx)("button",{onClick:function(){return e((0,i.YN)())},className:"text-primary-400 bg-transparent hover:bg-parimary-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto","data-modal-toggle":"defaultModal",children:(0,r.jsx)("svg",{className:"w-5 h-5",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:(0,r.jsx)("path",{fillRule:"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",clipRule:"evenodd"})})})]})}},3065:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return k}});var r=n(5893),s=n(7294),i=n(1664),a=n.n(i),l=n(7568),c=function(e){var t=e.children,n=e.link;return(0,r.jsx)(a(),{href:"/historcle/"+n,children:(0,r.jsx)("a",{className:"my-auto text-secondary text-secondary",children:t})})},o=function(){var e=(0,l.Yb)();return(0,r.jsxs)("div",{className:"bg-primary-300 w-full p-sm flex place-content-around rounded",children:[(0,r.jsx)("button",{className:"bg-accent p-sm rounded",onClick:function(){return e((0,l.mc)())},children:"Reset game"}),(0,r.jsx)(c,{link:"",children:"Play"}),(0,r.jsx)(c,{link:"explore",children:"Play Previous"}),(0,r.jsx)(c,{link:"challenge",children:"Challenge Your Friends"})]})},d=function(e){return e.split("/")[e.split("/").length-1].replace(/\d/g,"").replace(/[A-Z]/g,(function(e){return" ".concat(e)}))};function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function h(e){return function(e){if(Array.isArray(e))return u(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"===typeof e)return u(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return u(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var x=function(e){var t=e.index,n=e.guess;return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("tr",{className:"even:bg-primary-100 odd:bg-primary-200 rounded",children:[(0,r.jsx)("td",{className:"text-lg font-bold",children:(0,r.jsx)("div",{className:"text-center",children:t+1})}),(0,r.jsx)("td",{children:(0,r.jsx)("img",{width:"100",height:"100",src:n.image})}),(0,r.jsx)("td",{children:null===n.dist?"[a bug occured]":n.dist}),(0,r.jsx)("td",{children:Math.abs(n.time)}),(0,r.jsx)("td",{children:n.hints.length>0?h(new Set(n.hints.map(d))).join(", "):"[no hints]"})]},t)})},m=function(){var e=(0,l.pi)((function(e){return e.guesses}));return(0,r.jsxs)("table",{className:"w-full mx-auto text-sm text-left text-primary-500 dark:text-primary-400",id:"table",children:[(0,r.jsx)("thead",{className:"w-full text-sm text-left text-primary-500 dark:text-primary-400",children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:"Guess Number"}),(0,r.jsx)("th",{children:"Guess Image"}),(0,r.jsx)("th",{children:"Distance (km)"}),(0,r.jsx)("th",{children:"Time (years)"}),(0,r.jsx)("th",{children:"Hint"})]})}),(0,r.jsx)("tbody",{children:e.map((function(e,t){return(0,r.jsx)(x,{guess:e,index:t},t)}))})]})},f=n(4051),g=n.n(f),p=n(8879);function j(e,t,n,r,s,i,a){try{var l=e[i](a),c=l.value}catch(o){return void n(o)}l.done?t(c):Promise.resolve(c).then(r,s)}var v=function(){var e=(0,l.pi)((function(e){return e.waiting})),t=(0,l.pi)((function(e){return e.won})),n=(0,l.pi)((function(e){return e.currentGuess})),i=(0,s.useState)((new Date).getTime()),a=i[0],c=i[1],o=(0,s.useRef)(a);o.current=a;var d=function(){return(new Date).getTime()-o.current>500},u=(0,l.Yb)(),h=function(){var n,r=(n=g().mark((function n(r){var s;return g().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(s=r.target,u((0,l.Bv)(s.value)),console.log(r.key,"key.key"),!t&&!e){n.next=5;break}return n.abrupt("return");case 5:"Enter"===r.key?(console.log("enter"),u((0,l.Mb)())):"ArrowUp"===r.key?u((0,l.cu)()):"ArrowDown"===r.key?u((0,l.c$)()):"Escape"===r.key?(r.preventDefault(),u((0,l.YN)())):d()?(c((new Date).getTime()),u((0,l.Re)())):setTimeout((function(){d()&&(c((new Date).getTime()),u((0,l.Re)()))}),500);case 6:case"end":return n.stop()}}),n)})),function(){var e=this,t=arguments;return new Promise((function(r,s){var i=n.apply(e,t);function a(e){j(i,r,s,a,l,"next",e)}function l(e){j(i,r,s,a,l,"throw",e)}a(void 0)}))});return function(e){return r.apply(this,arguments)}}();return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{children:["Put your guess here: ",e?"waiting...":""]}),(0,r.jsx)("input",{readOnly:e||t,onKeyUp:h,defaultValue:n,placeholder:"e.g. Isaac Newton",className:"rounded-lg w-full h-7/12 border-primary-300 focus:border-primary-400 bg-primary-200 p-sm m-base mx-auto"}),(0,r.jsx)(p.Z,{})]})},y=function(){var e=(0,l.pi)((function(e){return e.day})),t=(0,s.useState)(""),n=t[0],i=t[1];return(0,s.useEffect)((function(){var e=setInterval((function(){var e=new Date,t=new Date;t.setHours(24),t.setMinutes(0),t.setSeconds(0);var n=new Date(0);n.setSeconds((t.getTime()-e.getTime())/1e3);var r=n.toISOString().substr(11,8);i(r)}),1e3);return function(){return clearInterval(e)}}),[]),(0,r.jsxs)("div",{className:"text-center pb-3xl",children:[(0,r.jsx)("p",{children:"I have thought of a secret historical figure. Can you guess him? For each guess I will tell you how many years apart the two figures were born, and how far away they were born."}),(0,r.jsx)("p",{children:"I know the birth dates and birth places of most people, but for people whose birth date or place is unknown, you cannot guess them (think like Charlemange)."}),(0,r.jsxs)("div",{children:[" Today is day ",e,". Next day begins in ",n," "]})]})},b=function(e){var t=e.suggestion,n=e.index,s=(0,l.Yb)(),i=(0,l.pi)((function(e){return e.waiting})),a=(0,l.pi)((function(e){return e.won})),c=(0,l.pi)((function(e){return e.selectedSearch})),o=!(i||a);return(0,r.jsxs)("div",{className:"".concat(n===c?"bg-primary-300":"bg-primary-200"," flex flex-row rounded ").concat(o&&"cursor-pointer hover:bg-primary-300"),onClick:function(){return o&&s((0,l.I3)(t.name))},children:[(0,r.jsx)("div",{className:"w-5xl h-full",children:t.image&&(0,r.jsx)("img",{height:"100",width:"100",src:t.image})}),(0,r.jsxs)("div",{className:"flex flex-col px-lg",children:[(0,r.jsx)("h1",{className:"text-lg font-bold",children:t.name}),(0,r.jsx)("div",{className:"text-sm",children:t.description})]})]})},w=function(){var e=(0,l.pi)((function(e){return e.suggestions}));return(0,r.jsx)("div",{className:"flex flex-col",children:e.map((function(e,t){return(0,r.jsx)(b,{index:t,suggestion:e},t)}))})},N=function(){var e=(0,l.Yb)(),t=(0,l.pi)((function(e){return e.modalOpen})),n=(0,l.pi)((function(e){return e.secretPerson})),s=(0,l.pi)((function(e){return e.guesses})),i=(0,l.pi)((function(e){return e.day}));return(0,r.jsx)("div",{id:"defaultModal","aria-hidden":"true",className:"".concat(!t&&"hidden"," bg-primary-100 translate-x-1/4 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"),children:(0,r.jsx)("div",{className:"relative p-4 w-full max-w-2xl h-full md:h-auto",children:(0,r.jsxs)("div",{className:"relative bg-primary-100 rounded-lg shadow ",children:[(0,r.jsxs)("div",{className:"flex justify-between items-start p-4 rounded-t border-b",children:[(0,r.jsx)("h3",{className:"text-xl font-semibold text-gray-900 ",children:"You Won!"}),(0,r.jsx)("button",{onClick:function(){return e((0,l.Mr)())},className:"text-primary-400 bg-transparent hover:bg-parimary-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white","data-modal-toggle":"defaultModal",children:(0,r.jsx)("svg",{className:"w-5 h-5",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:(0,r.jsx)("path",{fillRule:"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",clipRule:"evenodd"})})})]}),(0,r.jsxs)("div",{className:"p-6 space-y-6",children:[(0,r.jsx)("p",{className:"text-base leading-relaxed text-gray-500 dark:text-gray-400",children:"Congradulations! You beat the Historcle. That's an impressive achievement considering I purposefully designed this game to be very hard."}),(0,r.jsxs)("p",{className:"text-base leading-relaxed text-gray-500 dark:text-gray-400",children:["The person was ",(0,r.jsx)("a",{className:"text-secondary p-tiny rounded",href:n,children:d(n).replace(/_/g," ")})]}),(0,r.jsx)("div",{className:"font-bold",children:"your results:"}),(0,r.jsxs)("div",{children:["Historcle day ",i,". Beat in ",s.length+1," guesses"]}),(0,r.jsxs)("table",{children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:"g"}),(0,r.jsx)("th",{children:"bd"}),(0,r.jsx)("th",{children:"bp"}),(0,r.jsx)("th",{children:"h"})]})}),(0,r.jsxs)("tbody",{children:[s.map((function(e,t){return(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:t+1}),(0,r.jsx)("td",{children:e.dist>1e3?"\ud83d\udfe5":e.dist>500?"\ud83d\udfe8":"\ud83d\udfe9"}),(0,r.jsx)("td",{children:e.time>300?"\ud83d\udfe5":e.time>100?"\ud83d\udfe8":"\ud83d\udfe9"}),(0,r.jsx)("td",{children:e.hints.length<3?"\ud83d\udfe5":e.hints.length<5?"\ud83d\udfe8":"\ud83d\udfe9"})]},t)})),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:s.length+1}),(0,r.jsx)("td",{children:"\ud83d\udfe6"}),(0,r.jsx)("td",{children:"\ud83d\udfe6"}),(0,r.jsx)("td",{children:"\ud83d\udfe6"})]})]})]})]}),(0,r.jsxs)("div",{className:"flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600",children:[(0,r.jsx)("button",{onClick:function(){navigator.clipboard.writeText("Historcle day ".concat(i,". Beat in ").concat(s.length+1," guesses\n")+s.map((function(e,t){return"".concat(t+1,"  ").concat(e.dist>1e3?"\ud83d\udfe5":e.dist>500?"\ud83d\udfe8":"\ud83d\udfe9","  ").concat(e.time>300?"\ud83d\udfe5":e.time>100?"\ud83d\udfe8":"\ud83d\udfe9"," ").concat(e.hints.length<3?"\ud83d\udfe5":e.hints.length<5?"\ud83d\udfe8":"\ud83d\udfe9")})).join("\n")+"\n".concat(s.length+1," \ud83d\udfe6 \ud83d\udfe6 \ud83d\udfe6")+"\n play it at: https://atticuskuhn.github.io/historcle/")},className:"text-white bg-accent hover:bg-accent-hover rounded p-sm",children:"Copy results"}),(0,r.jsx)("button",{onClick:function(){return e((0,l.Mr)())},className:"text-white bg-secondary rounded p-sm",children:"Close"})]})]})})})},k=function(){return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("div",{className:"bg-primary-100 w-full h-full min-h-screen",children:(0,r.jsxs)("div",{className:"sm:w-7/12 w-12/12 mx-auto",children:[(0,r.jsx)("h1",{className:"font-bold text-4xl mx-auto p-lg text-center",children:"Historcle"}),(0,r.jsx)(y,{}),(0,r.jsx)(m,{}),(0,r.jsxs)("div",{className:"w-full mx-auto mt-3xl",children:[(0,r.jsx)(v,{}),(0,r.jsx)(w,{})]}),(0,r.jsx)(N,{}),(0,r.jsx)(o,{})]})})})}}},function(e){e.O(0,[664,774,888,179],(function(){return t=8312,e(e.s=t);var t}));var t=e.O();_N_E=t}]);