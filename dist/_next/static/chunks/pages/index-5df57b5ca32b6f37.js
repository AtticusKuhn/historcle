(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(3300)}])},3300:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return g}});var n=r(5893),a=r(7294),s=r(872),i=function(){var e=(0,s.pi)((function(e){return e.day})),t=(0,a.useState)(""),r=t[0],i=t[1];return(0,a.useEffect)((function(){var e=setInterval((function(){var e=new Date,t=new Date;t.setHours(24),t.setMinutes(0),t.setSeconds(0);var r=new Date(0);r.setSeconds((t.getTime()-e.getTime())/1e3);var n=r.toISOString().substr(11,8);i(n)}),1e3);return function(){return clearInterval(e)}}),[]),(0,n.jsxs)("div",{className:"text-center pb-3xl",children:[(0,n.jsx)("p",{children:"I have thought of a secret historical figure. Can you guess him? For each guess I will tell you how many years apart the two figures were born, and how far away they were born."}),(0,n.jsxs)("p",{children:["Please note that as I am pulling these figures from ",(0,n.jsx)("a",{className:"text-secondary",href:"https://en.wikipedia.org/",children:"Wikipedia"}),",you must be precise in your spelling"]}),(0,n.jsxs)("div",{children:[" Today is day ",e,". Next day begins in ",r," "]})]})},l=function(e){return e.split("/")[e.split("/").length-1].replace(/\d/g,"").replace(/[A-Z]/g,(function(e){return" ".concat(e)}))},o=function(){var e=(0,s.Yb)(),t=(0,s.pi)((function(e){return e.modalOpen})),r=(0,s.pi)((function(e){return e.secretPerson})),a=(0,s.pi)((function(e){return e.guesses})),i=(0,s.pi)((function(e){return e.day}));return(0,n.jsx)("div",{id:"defaultModal","aria-hidden":"true",className:"".concat(!t&&"hidden"," bg-primary-100 translate-x-1/4 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"),children:(0,n.jsx)("div",{className:"relative p-4 w-full max-w-2xl h-full md:h-auto",children:(0,n.jsxs)("div",{className:"relative bg-primary-100 rounded-lg shadow ",children:[(0,n.jsxs)("div",{className:"flex justify-between items-start p-4 rounded-t border-b",children:[(0,n.jsx)("h3",{className:"text-xl font-semibold text-gray-900 ",children:"You Won!"}),(0,n.jsx)("button",{onClick:function(){return e((0,s.Mr)())},className:"text-primary-400 bg-transparent hover:bg-parimary-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white","data-modal-toggle":"defaultModal",children:(0,n.jsx)("svg",{className:"w-5 h-5",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:(0,n.jsx)("path",{fillRule:"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",clipRule:"evenodd"})})})]}),(0,n.jsxs)("div",{className:"p-6 space-y-6",children:[(0,n.jsx)("p",{className:"text-base leading-relaxed text-gray-500 dark:text-gray-400",children:"Congradulations! You beat the Historcle. That's an impressive achievement considering I purposefully designed this game to be very hard."}),(0,n.jsxs)("p",{className:"text-base leading-relaxed text-gray-500 dark:text-gray-400",children:["The person was ",(0,n.jsx)("a",{className:"text-secondary p-tiny rounded",href:r,children:l(r).replace(/_/g," ")})]}),(0,n.jsx)("div",{className:"font-bold",children:"your results:"}),(0,n.jsxs)("div",{children:["Historcle day ",i,". Beat in ",a.length," guesses"]}),(0,n.jsxs)("table",{children:[(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("th",{}),(0,n.jsx)("th",{}),(0,n.jsx)("th",{}),(0,n.jsx)("th",{}),(0,n.jsx)("th",{})]})}),(0,n.jsx)("tbody",{children:a.map((function(e,t){return(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:t}),(0,n.jsx)("td",{children:e.dist>1e3?"\ud83d\udfe5":e.dist>500?"\ud83d\udfe8":"\ud83d\udfe9"}),(0,n.jsx)("td",{children:e.time>300?"\ud83d\udfe5":e.time>100?"\ud83d\udfe8":"\ud83d\udfe9"}),(0,n.jsx)("td",{children:e.hints.length<3?"\ud83d\udfe5":e.hints.length<5?"\ud83d\udfe8":"\ud83d\udfe9"})]},t)}))})]})]}),(0,n.jsxs)("div",{className:"flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600",children:[(0,n.jsx)("button",{onClick:function(){navigator.clipboard.writeText("Historcle day ".concat(i,". Beat in ").concat(a.length," guesses")+a.map((function(e,t){return"\n                        ".concat(t+1,"  ").concat(e.dist>1e3?"\ud83d\udfe5":e.dist>500?"\ud83d\udfe8":"\ud83d\udfe9","  ").concat(e.time>300?"\ud83d\udfe5":e.time>100?"\ud83d\udfe8":"\ud83d\udfe9"," ").concat(e.hints.length<3?"\ud83d\udfe5":e.hints.length<5?"\ud83d\udfe8":"\ud83d\udfe9","\n                        https://atticuskuhn.github.io/historcle/\n                    ")})).join("\n"))},className:"text-white bg-accent hover:bg-accent-hover rounded p-sm",children:"Copy results"}),(0,n.jsx)("button",{onClick:function(){return e((0,s.Mr)())},className:"text-white bg-secondary rounded p-sm",children:"Close"})]})]})})})};function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function d(e){return function(e){if(Array.isArray(e))return c(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"===typeof e)return c(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return c(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var u=function(){var e=(0,s.pi)((function(e){return e.guesses}));return(0,n.jsxs)("table",{className:"w-full mx-auto text-sm text-left text-primary-500 dark:text-primary-400",id:"table",children:[(0,n.jsx)("thead",{className:"w-full text-sm text-left text-primary-500 dark:text-primary-400",children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("th",{children:"Guess Number"}),(0,n.jsx)("th",{children:"Guess Image"}),(0,n.jsx)("th",{children:"Distance (km)"}),(0,n.jsx)("th",{children:"Time (years)"}),(0,n.jsx)("th",{children:"Hint"})]})}),(0,n.jsx)("tbody",{children:e.map((function(e,t){return(0,n.jsxs)("tr",{className:"even:bg-primary-100 odd:bg-primary-200 rounded",children:[(0,n.jsx)("td",{children:t+1}),(0,n.jsx)("td",{children:(0,n.jsx)("img",{width:"100",height:"100",src:e.image})}),(0,n.jsx)("td",{children:null===e.dist?"[a bug occured]":e.dist}),(0,n.jsx)("td",{children:e.time}),(0,n.jsx)("td",{children:e.hints.length>0?d(new Set(e.hints.map(l))).join("\n"):"[no hints]"})]},t)}))})]})},h=r(4051),x=r.n(h);function m(e,t,r,n,a,s,i){try{var l=e[s](i),o=l.value}catch(c){return void r(c)}l.done?t(o):Promise.resolve(o).then(n,a)}var f=function(){var e=(0,s.pi)((function(e){return e.waiting})),t=(0,s.pi)((function(e){return e.won})),r=(0,s.pi)((function(e){return e.error})),a=(0,s.Yb)(),i=function(){var e,t=(e=x().mark((function e(t){var r;return x().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=t.target,"Enter"===t.key?(a((0,s.I3)()),r.value=""):a((0,s.Bv)(r.value));case 2:case"end":return e.stop()}}),e)})),function(){var t=this,r=arguments;return new Promise((function(n,a){var s=e.apply(t,r);function i(e){m(s,n,a,i,l,"next",e)}function l(e){m(s,n,a,i,l,"throw",e)}i(void 0)}))});return function(e){return t.apply(this,arguments)}}();return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("div",{children:["Put your guess here: ",e?"waiting...":""]}),(0,n.jsx)("input",{disabled:e||t,onKeyUp:i,placeholder:"e.g. Isaac Newton",className:"rounded-lg w-full h-7/12 border-primary-300 bg-primary-200 p-sm m-base mx-auto"}),(0,n.jsxs)("div",{className:"".concat(!r&&"hidden"," rounded font-bold bg-accent p-lg"),children:[r||"",(0,n.jsx)("button",{onClick:function(){return a((0,s.YN)())},className:"text-primary-400 bg-transparent hover:bg-parimary-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto","data-modal-toggle":"defaultModal",children:(0,n.jsx)("svg",{className:"w-5 h-5",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:(0,n.jsx)("path",{fillRule:"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",clipRule:"evenodd"})})})]})]})},p=r(1043),g=function(){var e=(0,p.I0)();return(0,a.useEffect)((function(){var t=new URLSearchParams(window.location.search),r=t.get("day");console.log("day",r);var n=t.get("person");r&&e((0,s.vO)(Number(r))),n&&"string"===typeof n&&e((0,s.S0)(atob(n)))}),[]),(0,n.jsx)(n.Fragment,{children:(0,n.jsx)("div",{className:"bg-primary-100 w-full h-full min-h-screen",children:(0,n.jsxs)("div",{className:"sm:w-7/12 w-10/12 mx-auto",children:[(0,n.jsx)("h1",{className:"font-bold text-4xl mx-auto p-lg text-center",children:"Historcle"}),(0,n.jsx)(i,{}),(0,n.jsx)(u,{}),(0,n.jsx)("div",{className:"w-full mx-auto mt-3xl",children:(0,n.jsx)(f,{})}),(0,n.jsx)(o,{})]})})})}}},function(e){e.O(0,[774,888,179],(function(){return t=8312,e(e.s=t);var t}));var t=e.O();_N_E=t}]);