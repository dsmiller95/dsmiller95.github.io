(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"/Rd+":function(e,t,n){"use strict";n("KKXr"),n("pIFo"),n("bWfx"),n("V+eJ"),n("LK8F"),n("HEwt"),n("f3/d"),n("a1Th"),n("h7Nl"),n("rE2o"),n("WLL4"),n("jm62"),n("8+KV"),n("0l/t"),n("ioFf"),n("RW0V"),n("91GP"),n("rGqo"),n("yt8O"),n("Btvt"),n("XfO3"),n("EK0E"),n("HAE/"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r,o=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==f(e)&&"function"!=typeof e)return{default:e};var t=i();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var a=r?Object.getOwnPropertyDescriptor(e,o):null;a&&(a.get||a.set)?Object.defineProperty(n,o,a):n[o]=e[o]}n.default=e,t&&t.set(e,n);return n}(n("q1tI")),a=(r=n("17x9"))&&r.__esModule?r:{default:r};function i(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return i=function(){return e},e}function c(){return(c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(l){o=!0,a=l}finally{try{r||null==c.return||c.return()}finally{if(o)throw a}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return d(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function m(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var h=function(e){var t,n=e.element,r=e.children,a=e.tel,i=e.sms,l=e.facetime,s=e.email,d=e.href,h=e.headers,y=e.obfuscate,g=e.obfuscateChildren,b=e.linkText,v=e.style,w=e.onClick,T=m(e,["element","children","tel","sms","facetime","email","href","headers","obfuscate","obfuscateChildren","linkText","style","onClick"]),E=p((0,o.useState)(!1),2),O=E[0],j=E[1],S=r||a||i||l||s||d,C=n,P=function(){var e,t;if(s)e="mailto:".concat(s),h&&(e+="?".concat((t=h,Object.keys(t).map((function(e){return"".concat(e,"=").concat(encodeURIComponent(t[e]))})).join("&"))));else if(a)e="tel:".concat(a);else if(i)e="sms:".concat(i);else if(l)e="facetime:".concat(l);else if(d)e=d;else{if("object"===f(r))return"";e=r}return e},k=u(u({},v),{},{unicodeBidi:"bidi-override",direction:!0===O||!1===y||!1===g?"ltr":"rtl"}),A=!0===O||!1===y||"object"===f(r)||!1===g?S:void 0!==(t=S)&&t.split("").reverse().join("").replace("(",")").replace(")","("),x="a"===C?{href:!0===O||!1===y?P():b||"obfuscated",onClick:function(){w&&"function"==typeof w&&w(),!1===O&&(window.location.href=P())}}:{};return o.default.createElement(C,c({onFocus:function(){return j(!0)},onMouseOver:function(){return j(!0)},onContextMenu:function(){return j(!0)}},T,x,{style:k}),A)};h.propTypes={element:a.default.string,children:a.default.node,tel:a.default.string,sms:a.default.string,facetime:a.default.string,email:a.default.string,href:a.default.string,headers:a.default.shape({}),obfuscate:a.default.bool,obfuscateChildren:a.default.bool,linkText:a.default.string,style:a.default.shape({}),onClick:a.default.func},h.defaultProps={element:"a",children:void 0,tel:void 0,sms:void 0,facetime:void 0,email:void 0,href:void 0,headers:void 0,obfuscate:void 0,obfuscateChildren:void 0,linkText:void 0,style:{},onClick:void 0};var y=h;t.default=y},"0mN4":function(e,t,n){"use strict";n("OGtf")("fixed",(function(e){return function(){return e(this,"tt","","")}}))},"5pEY":function(e){e.exports=JSON.parse('{"data":{"file":{"childImageSharp":{"fixed":{"width":500,"height":281,"src":"/static/64a83ff7b5d35e5e54ecb2a502c222d8/46604/facebook-logo.png","srcSet":"/static/64a83ff7b5d35e5e54ecb2a502c222d8/46604/facebook-logo.png 1x,\\n/static/64a83ff7b5d35e5e54ecb2a502c222d8/d8815/facebook-logo.png 1.5x,\\n/static/64a83ff7b5d35e5e54ecb2a502c222d8/31987/facebook-logo.png 2x"}}}}}')},"6ZbW":function(e,t,n){},"8+s/":function(e,t,n){"use strict";n("V+eJ"),n("bWfx"),n("f3/d"),n("hHhE"),n("HAE/");var r,o=n("q1tI"),a=(r=o)&&"object"==typeof r&&"default"in r?r.default:r;function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var c=!("undefined"==typeof window||!window.document||!window.document.createElement);e.exports=function(e,t,n){if("function"!=typeof e)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof t)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==n&&"function"!=typeof n)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(r){if("function"!=typeof r)throw new Error("Expected WrappedComponent to be a React component.");var l,u=[];function s(){l=e(u.map((function(e){return e.props}))),f.canUseDOM?t(l):n&&(l=n(l))}var f=function(e){var t,n;function o(){return e.apply(this,arguments)||this}n=e,(t=o).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n,o.peek=function(){return l},o.rewind=function(){if(o.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var e=l;return l=void 0,u=[],e};var i=o.prototype;return i.UNSAFE_componentWillMount=function(){u.push(this),s()},i.componentDidUpdate=function(){s()},i.componentWillUnmount=function(){var e=u.indexOf(this);u.splice(e,1),s()},i.render=function(){return a.createElement(r,this.props)},o}(o.PureComponent);return i(f,"displayName","SideEffect("+function(e){return e.displayName||e.name||"Component"}(r)+")"),i(f,"canUseDOM",c),f}}},Al62:function(e,t,n){n("KKXr"),n("Vd3H"),n("pIFo"),n("a1Th"),n("Btvt");var r=n("obyI"),o={resolveUrl:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.reduce((function(e,t){var n=t.toString().trim();return n&&(e+=(""===e?"":"/")+n.replace(/^\/|\/$/g,"")),e}),"")},resolvePageUrl:function(){var e=o.resolveUrl.apply(o,arguments);return e+"/"},getSuggestedPosts:function(e,t,n){var r=function(t){var n=0;return t.node.frontmatter.tags.forEach((function(t){n+=-1!==e.frontmatter.tags.indexOf(t)?1:0})),n};return t.edges.sort((function(e,t){return r(t)-r(e)})).slice(0,n)},getRelatedTranslations:function(e,t){return t.filter((function(t){return t.node.fileAbsolutePath.split("/").slice(-2,-1)[0]===e.fileAbsolutePath.split("/").slice(-2,-1)[0]})).map((function(e){var t=e.node,n=t.fileAbsolutePath.split(".").slice(-2,-1)[0];return{hreflang:"index"!==n.slice(-5)?n:r.defaultLanguage,path:o.resolvePageUrl(t.frontmatter.path)}}))},capitalize:function(e){return e[0].toUpperCase()+e.slice(1)}};e.exports=o},"B/qU":function(e,t,n){e.exports={container:"header-module--container--3Ej3t",titleContainer:"header-module--titleContainer--2qjcI",title:"header-module--title--2hjav",hiddenDescription:"header-module--hiddenDescription--1UVTe",visibleDescription:"header-module--visibleDescription--3wR_R",list:"header-module--list--3PQY8",menuButton:"header-module--menuButton--HP3_y",collapsedMenu:"header-module--collapsedMenu--1Mv0Z",expandedMenu:"header-module--expandedMenu--25RBz"}},EK0E:function(e,t,n){"use strict";var r,o=n("dyZX"),a=n("CkkT")(0),i=n("KroJ"),c=n("Z6vF"),l=n("czNK"),u=n("ZD67"),s=n("0/R4"),f=n("s5qY"),p=n("s5qY"),d=!o.ActiveXObject&&"ActiveXObject"in o,m=c.getWeak,h=Object.isExtensible,y=u.ufstore,g=function(e){return function(){return e(this,arguments.length>0?arguments[0]:void 0)}},b={get:function(e){if(s(e)){var t=m(e);return!0===t?y(f(this,"WeakMap")).get(e):t?t[this._i]:void 0}},set:function(e,t){return u.def(f(this,"WeakMap"),e,t)}},v=e.exports=n("4LiD")("WeakMap",g,b,u,!0,!0);p&&d&&(l((r=u.getConstructor(g,"WeakMap")).prototype,b),c.NEED=!0,a(["delete","has","get","set"],(function(e){var t=v.prototype,n=t[e];i(t,e,(function(t,o){if(s(t)&&!h(t)){this._f||(this._f=new r);var a=this._f[e](t,o);return"set"==e?this:a}return n.call(this,t,o)}))})))},"I/Ru":function(e,t,n){"use strict";n.d(t,"a",(function(){return E}));var r=n("q1tI"),o=n.n(r),a=n("Wbzz"),i=n("ma3e");var c=n("B/qU"),l=n.n(c),u=n("obyI"),s=n.n(u),f=n("Al62"),p=n.n(f),d=n("/Rd+"),m=n.n(d),h=function(){var e,t,n,c=Object(r.useState)(!1),u=c[0],f=c[1],d=Object(r.useState)(!1),h=d[0],y=d[1];function g(){f(!u)}return e="scroll",t=function(){!h&&window.scrollY>100?y(!0):h&&window.scrollY<100&&y(!1)},void 0===n&&(n=!1),Object(r.useEffect)((function(){return window.addEventListener(e,t,n),function(){window.removeEventListener(e,t)}})),o.a.createElement("div",{className:l.a.container,style:h?{backgroundImage:"none"}:null},o.a.createElement("div",{className:l.a.titleContainer},o.a.createElement("div",{className:l.a.title},o.a.createElement(a.Link,{to:p.a.resolvePageUrl(s.a.pages.home)},o.a.createElement("h4",null,s.a.siteTitle),o.a.createElement("p",{className:h?l.a.hiddenDescription:l.a.visibleDescription},s.a.siteDescription))),o.a.createElement("div",{className:l.a.menuButton},u?o.a.createElement(i.c,{size:"30",onClick:g}):o.a.createElement(i.o,{size:"30",onClick:g}))),o.a.createElement("div",{className:[l.a.list,u?l.a.collapsedMenu:l.a.expandedMenu].join(" ")},o.a.createElement("ul",null,o.a.createElement("li",null,o.a.createElement(a.Link,{to:p.a.resolvePageUrl(s.a.pages.posts)},"Posts")),o.a.createElement("li",null,o.a.createElement(a.Link,{to:p.a.resolvePageUrl(s.a.pages.tag)},"Tags")),o.a.createElement("li",null,o.a.createElement(a.Link,{to:p.a.resolvePageUrl(s.a.pages.home)},"Home"))),o.a.createElement("ul",null,o.a.createElement("li",null,o.a.createElement("a",{target:"_blank",rel:"nofollow noopener noreferrer",href:s.a.social.github},o.a.createElement(i.h,{size:"30"}))),o.a.createElement("li",null,o.a.createElement("a",{target:"_blank",rel:"nofollow noopener noreferrer",href:s.a.social.linkedin},o.a.createElement(i.i,{size:"30"}))),o.a.createElement("li",null,o.a.createElement(a.Link,{to:p.a.resolveUrl(s.a.social.rss)},o.a.createElement(i.n,{size:"30"}))),o.a.createElement("li",null,o.a.createElement("a",{target:"_blank",rel:"nofollow noopener noreferrer",href:s.a.social.twitter},o.a.createElement(i.q,{size:"30"}))),o.a.createElement("li",null,o.a.createElement(m.a,{email:s.a.social.email,headers:{subject:"Business Inquiry"}},o.a.createElement(i.d,{size:"30"}))))))},y=n("rbrq"),g=n.n(y),b=function(){return o.a.createElement("div",{className:g.a.container},o.a.createElement("p",null,"Made with Gatbsy.js, hosted on GitHub Pages"))},v=(n("6ZbW"),n("aP7T")),w=n.n(v),T=function(e){var t=e.children,n=e.title;return o.a.createElement(o.a.Fragment,null,o.a.createElement(h,null),o.a.createElement("div",{className:w.a.container},n?o.a.createElement("div",{className:w.a.title},o.a.createElement("h1",null,n)):null,t),o.a.createElement(b,null))};T.defaultProps={title:""};var E=T},Lnxd:function(e,t,n){"use strict";n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return a}));n("bWfx"),n("ioFf"),n("V+eJ"),n("91GP");var r=n("q1tI"),o={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},a=r.createContext&&r.createContext(o),i=function(){return(i=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},c=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&(n[r[o]]=e[r[o]])}return n};function l(e){return function(t){return r.createElement(u,i({attr:i({},e.attr)},t),function e(t){return t&&t.map((function(t,n){return r.createElement(t.tag,i({key:n},t.attr),e(t.child))}))}(e.child))}}function u(e){var t=function(t){var n,o=e.size||t.size||"1em";t.className&&(n=t.className),e.className&&(n=(n?n+" ":"")+e.className);var a=e.attr,l=e.title,u=c(e,["attr","title"]);return r.createElement("svg",i({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,a,u,{className:n,style:i({color:e.color||t.color},t.style,e.style),height:o,width:o,xmlns:"http://www.w3.org/2000/svg"}),l&&r.createElement("title",null,l),e.children)};return void 0!==a?r.createElement(a.Consumer,null,(function(e){return t(e)})):t(o)}},OGtf:function(e,t,n){var r=n("XKFU"),o=n("eeVq"),a=n("vhPU"),i=/"/g,c=function(e,t,n,r){var o=String(a(e)),c="<"+t;return""!==n&&(c+=" "+n+'="'+String(r).replace(i,"&quot;")+'"'),c+">"+o+"</"+t+">"};e.exports=function(e,t){var n={};n[e]=t(c),r(r.P+r.F*o((function(){var t=""[e]('"');return t!==t.toLowerCase()||t.split('"').length>3})),"String",n)}},Oyvg:function(e,t,n){var r=n("dyZX"),o=n("Xbzi"),a=n("hswa").f,i=n("kJMx").f,c=n("quPj"),l=n("C/va"),u=r.RegExp,s=u,f=u.prototype,p=/a/g,d=/a/g,m=new u(p)!==p;if(n("nh4g")&&(!m||n("eeVq")((function(){return d[n("K0xU")("match")]=!1,u(p)!=p||u(d)==d||"/a/i"!=u(p,"i")})))){u=function(e,t){var n=this instanceof u,r=c(e),a=void 0===t;return!n&&r&&e.constructor===u&&a?e:o(m?new s(r&&!a?e.source:e,t):s((r=e instanceof u)?e.source:e,r&&a?l.call(e):t),n?this:f,u)};for(var h=function(e){e in u||a(u,e,{configurable:!0,get:function(){return s[e]},set:function(t){s[e]=t}})},y=i(s),g=0;y.length>g;)h(y[g++]);f.constructor=u,u.prototype=f,n("KroJ")(r,"RegExp",u)}n("elZq")("RegExp")},ZD67:function(e,t,n){"use strict";var r=n("3Lyj"),o=n("Z6vF").getWeak,a=n("y3w9"),i=n("0/R4"),c=n("9gX7"),l=n("SlkY"),u=n("CkkT"),s=n("aagx"),f=n("s5qY"),p=u(5),d=u(6),m=0,h=function(e){return e._l||(e._l=new y)},y=function(){this.a=[]},g=function(e,t){return p(e.a,(function(e){return e[0]===t}))};y.prototype={get:function(e){var t=g(this,e);if(t)return t[1]},has:function(e){return!!g(this,e)},set:function(e,t){var n=g(this,e);n?n[1]=t:this.a.push([e,t])},delete:function(e){var t=d(this.a,(function(t){return t[0]===e}));return~t&&this.a.splice(t,1),!!~t}},e.exports={getConstructor:function(e,t,n,a){var u=e((function(e,r){c(e,u,t,"_i"),e._t=t,e._i=m++,e._l=void 0,null!=r&&l(r,n,e[a],e)}));return r(u.prototype,{delete:function(e){if(!i(e))return!1;var n=o(e);return!0===n?h(f(this,t)).delete(e):n&&s(n,this._i)&&delete n[this._i]},has:function(e){if(!i(e))return!1;var n=o(e);return!0===n?h(f(this,t)).has(e):n&&s(n,this._i)}}),u},def:function(e,t,n){var r=o(a(t),!0);return!0===r?h(e).set(t,n):r[e._i]=n,e},ufstore:h}},aP7T:function(e,t,n){e.exports={container:"layout-module--container--2YeUy",title:"layout-module--title--3ofkA"}},bmMU:function(e,t,n){"use strict";n("f3/d"),n("SRfc"),n("a1Th"),n("h7Nl"),n("Oyvg"),n("rGqo"),n("yt8O"),n("Btvt"),n("RW0V"),n("LK8F");var r=Array.isArray,o=Object.keys,a=Object.prototype.hasOwnProperty,i="undefined"!=typeof Element;e.exports=function(e,t){try{return function e(t,n){if(t===n)return!0;if(t&&n&&"object"==typeof t&&"object"==typeof n){var c,l,u,s=r(t),f=r(n);if(s&&f){if((l=t.length)!=n.length)return!1;for(c=l;0!=c--;)if(!e(t[c],n[c]))return!1;return!0}if(s!=f)return!1;var p=t instanceof Date,d=n instanceof Date;if(p!=d)return!1;if(p&&d)return t.getTime()==n.getTime();var m=t instanceof RegExp,h=n instanceof RegExp;if(m!=h)return!1;if(m&&h)return t.toString()==n.toString();var y=o(t);if((l=y.length)!==o(n).length)return!1;for(c=l;0!=c--;)if(!a.call(n,y[c]))return!1;if(i&&t instanceof Element&&n instanceof Element)return t===n;for(c=l;0!=c--;)if(!("_owner"===(u=y[c])&&t.$$typeof||e(t[u],n[u])))return!1;return!0}return t!=t&&n!=n}(e,t)}catch(n){if(n.message&&n.message.match(/stack|recursion/i)||-2146828260===n.number)return console.warn("Warning: react-fast-compare does not handle circular references.",n.name,n.message),!1;throw n}}},h7Nl:function(e,t,n){var r=Date.prototype,o=r.toString,a=r.getTime;new Date(NaN)+""!="Invalid Date"&&n("KroJ")(r,"toString",(function(){var e=a.call(this);return e==e?o.call(this):"Invalid Date"}))},jNNy:function(e,t,n){"use strict";n.d(t,"a",(function(){return d}));n("0mN4");var r=n("5pEY"),o=n("q1tI"),a=n.n(o),i=n("qhky"),c=n("Wbzz"),l=n("obyI"),u=n.n(l),s=n("Al62"),f=n.n(s);var p="1166109120",d=function(e){var t=e.title,n=e.description,o=e.path,l=e.lang,s=e.keywords,d=e.contentType,m=e.imageUrl,h=e.translations,y=e.meta;return a.a.createElement(c.StaticQuery,{query:p,render:function(e){var r=s&&s.length>0?{name:"keywords",content:s.join(", ")}:[],c=f.a.resolvePageUrl(u.a.siteUrl,u.a.pathPrefix,o),p=f.a.resolveUrl(u.a.siteUrl,m||e.file.childImageSharp.fixed.src);return a.a.createElement(i.a,{title:t,titleTemplate:"%s | "+u.a.siteTitle,meta:[{name:"description",content:n},{property:"og:title",content:t},{property:"og:type",content:d||"website"},{property:"og:url",content:c},{property:"og:description",content:n},{property:"og:image",content:p},{property:"og:image:alt",content:n},{property:"og:site_name",content:u.a.siteTitle},{property:"og:locale",content:l||"en_US"},{name:"twitter:card",content:"summary_large_image"},{name:"twitter:title",content:t},{name:"twitter:description",content:n},{name:"twitter:image",content:p},{name:"twitter:image:alt",content:n},{name:"twitter:site",content:u.a.author},{name:"twitter:creator",content:u.a.author}].concat(r).concat(y||[]),link:[{rel:"canonical",href:c}].concat(h?h.map((function(e){return{rel:"alternate",hreflang:e.hreflang,href:f.a.resolvePageUrl(u.a.siteUrl,u.a.pathPrefix,e.path)}})):[])})},data:r})}},obyI:function(e,t){e.exports={pathPrefix:"",siteUrl:"https://www.fraculation.com",siteTitle:"Fraculation",siteDescription:"developers blog",author:"Dan Miller",postsPerArchivePage:3,defaultLanguage:"en",pages:{home:"/",blog:"blog",posts:"posts",tag:"tag",archive:"archive"},social:{github:"https://github.com/dsmiller95",linkedin:"https://www.linkedin.com/in/the-daniel-miller/",rss:"rss.xml",email:"dan.miller@fraculation.com",twitter:"https://twitter.com/dan0mighte"},tags:{angular:{description:"Angular is an open source web application platform."},electron:{description:"Electron is a framework for building cross-platform desktop applications with web technology."},javascript:{description:"JavaScript is an object-oriented programming language used alongside HTML and CSS to give functionality to web pages."},laravel:{description:"Laravel is a PHP framework for building web applications following the MVC pattern."},nodejs:{name:"Node.js",description:"Node.js is a tool for executing JavaScript in a variety of environments."},rxjs:{name:"RxJS",description:"RxJS is a library for reactive programming using Observables, to make it easier to compose asynchronous or callback-based code."},sass:{description:"Sass is a stable extension to classic CSS."},typescript:{description:"TypeScript is a typed superset of JavaScript that compiles to plain JavaScript."},procGen:{description:"Procedural generation is a technique used to generate parts of a game or interaction semi-randomly, to allow for greater replayability and design speed."},graphics:{description:"Graphics reffers to graphical programming, typically referring to writing shaders or configuring rendering pipelines to acheive a particular appearance on-screen."},tooling:{description:"Tooling is anything developed with the goal of accelerating further design and development."},react:{description:"React is an open source JavaScript library used for designing user interfaces."},vuejs:{name:"Vue.js",description:"Vue.js is a JavaScript framework for building interactive web applications."}}}},qhky:function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return he}));n("dZ+Y"),n("KKXr"),n("2Spj"),n("eM6i"),n("8+KV"),n("0l/t"),n("LK8F"),n("pIFo"),n("V+eJ"),n("/SS/"),n("hHhE"),n("91GP"),n("HAE/"),n("rE2o"),n("ioFf"),n("DNiP"),n("rGqo"),n("yt8O"),n("Btvt"),n("RW0V"),n("bWfx");var r,o,a,i,c=n("17x9"),l=n.n(c),u=n("8+s/"),s=n.n(u),f=n("bmMU"),p=n.n(f),d=n("q1tI"),m=n.n(d),h=n("MgzW"),y=n.n(h),g="bodyAttributes",b="htmlAttributes",v="titleAttributes",w={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"},T=(Object.keys(w).map((function(e){return w[e]})),"charset"),E="cssText",O="href",j="http-equiv",S="innerHTML",C="itemprop",P="name",k="property",A="rel",x="src",I="target",L={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},N="defaultTitle",M="defer",R="encodeSpecialCharacters",_="onChangeClientState",q="titleTemplate",D=Object.keys(L).reduce((function(e,t){return e[L[t]]=t,e}),{}),U=[w.NOSCRIPT,w.SCRIPT,w.STYLE],F="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},K=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},W=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),H=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Y=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n},z=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},B=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return!1===t?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},J=function(e){var t=$(e,w.TITLE),n=$(e,q);if(n&&t)return n.replace(/%s/g,(function(){return Array.isArray(t)?t.join(""):t}));var r=$(e,N);return t||r||void 0},V=function(e){return $(e,_)||function(){}},G=function(e,t){return t.filter((function(t){return void 0!==t[e]})).map((function(t){return t[e]})).reduce((function(e,t){return H({},e,t)}),{})},X=function(e,t){return t.filter((function(e){return void 0!==e[w.BASE]})).map((function(e){return e[w.BASE]})).reverse().reduce((function(t,n){if(!t.length)for(var r=Object.keys(n),o=0;o<r.length;o++){var a=r[o].toLowerCase();if(-1!==e.indexOf(a)&&n[a])return t.concat(n)}return t}),[])},Z=function(e,t,n){var r={};return n.filter((function(t){return!!Array.isArray(t[e])||(void 0!==t[e]&&re("Helmet: "+e+' should be of type "Array". Instead found type "'+F(t[e])+'"'),!1)})).map((function(t){return t[e]})).reverse().reduce((function(e,n){var o={};n.filter((function(e){for(var n=void 0,a=Object.keys(e),i=0;i<a.length;i++){var c=a[i],l=c.toLowerCase();-1===t.indexOf(l)||n===A&&"canonical"===e[n].toLowerCase()||l===A&&"stylesheet"===e[l].toLowerCase()||(n=l),-1===t.indexOf(c)||c!==S&&c!==E&&c!==C||(n=c)}if(!n||!e[n])return!1;var u=e[n].toLowerCase();return r[n]||(r[n]={}),o[n]||(o[n]={}),!r[n][u]&&(o[n][u]=!0,!0)})).reverse().forEach((function(t){return e.push(t)}));for(var a=Object.keys(o),i=0;i<a.length;i++){var c=a[i],l=y()({},r[c],o[c]);r[c]=l}return e}),[]).reverse()},$=function(e,t){for(var n=e.length-1;n>=0;n--){var r=e[n];if(r.hasOwnProperty(t))return r[t]}return null},Q=(r=Date.now(),function(e){var t=Date.now();t-r>16?(r=t,e(t)):setTimeout((function(){Q(e)}),0)}),ee=function(e){return clearTimeout(e)},te="undefined"!=typeof window?window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||Q:e.requestAnimationFrame||Q,ne="undefined"!=typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||ee:e.cancelAnimationFrame||ee,re=function(e){return console&&"function"==typeof console.warn&&console.warn(e)},oe=null,ae=function(e,t){var n=e.baseTag,r=e.bodyAttributes,o=e.htmlAttributes,a=e.linkTags,i=e.metaTags,c=e.noscriptTags,l=e.onChangeClientState,u=e.scriptTags,s=e.styleTags,f=e.title,p=e.titleAttributes;le(w.BODY,r),le(w.HTML,o),ce(f,p);var d={baseTag:ue(w.BASE,n),linkTags:ue(w.LINK,a),metaTags:ue(w.META,i),noscriptTags:ue(w.NOSCRIPT,c),scriptTags:ue(w.SCRIPT,u),styleTags:ue(w.STYLE,s)},m={},h={};Object.keys(d).forEach((function(e){var t=d[e],n=t.newTags,r=t.oldTags;n.length&&(m[e]=n),r.length&&(h[e]=d[e].oldTags)})),t&&t(),l(e,m,h)},ie=function(e){return Array.isArray(e)?e.join(""):e},ce=function(e,t){void 0!==e&&document.title!==e&&(document.title=ie(e)),le(w.TITLE,t)},le=function(e,t){var n=document.getElementsByTagName(e)[0];if(n){for(var r=n.getAttribute("data-react-helmet"),o=r?r.split(","):[],a=[].concat(o),i=Object.keys(t),c=0;c<i.length;c++){var l=i[c],u=t[l]||"";n.getAttribute(l)!==u&&n.setAttribute(l,u),-1===o.indexOf(l)&&o.push(l);var s=a.indexOf(l);-1!==s&&a.splice(s,1)}for(var f=a.length-1;f>=0;f--)n.removeAttribute(a[f]);o.length===a.length?n.removeAttribute("data-react-helmet"):n.getAttribute("data-react-helmet")!==i.join(",")&&n.setAttribute("data-react-helmet",i.join(","))}},ue=function(e,t){var n=document.head||document.querySelector(w.HEAD),r=n.querySelectorAll(e+"[data-react-helmet]"),o=Array.prototype.slice.call(r),a=[],i=void 0;return t&&t.length&&t.forEach((function(t){var n=document.createElement(e);for(var r in t)if(t.hasOwnProperty(r))if(r===S)n.innerHTML=t.innerHTML;else if(r===E)n.styleSheet?n.styleSheet.cssText=t.cssText:n.appendChild(document.createTextNode(t.cssText));else{var c=void 0===t[r]?"":t[r];n.setAttribute(r,c)}n.setAttribute("data-react-helmet","true"),o.some((function(e,t){return i=t,n.isEqualNode(e)}))?o.splice(i,1):a.push(n)})),o.forEach((function(e){return e.parentNode.removeChild(e)})),a.forEach((function(e){return n.appendChild(e)})),{oldTags:o,newTags:a}},se=function(e){return Object.keys(e).reduce((function(t,n){var r=void 0!==e[n]?n+'="'+e[n]+'"':""+n;return t?t+" "+r:r}),"")},fe=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,n){return t[L[n]||n]=e[n],t}),t)},pe=function(e,t,n){switch(e){case w.TITLE:return{toComponent:function(){return e=t.title,n=t.titleAttributes,(r={key:e})["data-react-helmet"]=!0,o=fe(n,r),[m.a.createElement(w.TITLE,o,e)];var e,n,r,o},toString:function(){return function(e,t,n,r){var o=se(n),a=ie(t);return o?"<"+e+' data-react-helmet="true" '+o+">"+B(a,r)+"</"+e+">":"<"+e+' data-react-helmet="true">'+B(a,r)+"</"+e+">"}(e,t.title,t.titleAttributes,n)}};case g:case b:return{toComponent:function(){return fe(t)},toString:function(){return se(t)}};default:return{toComponent:function(){return function(e,t){return t.map((function(t,n){var r,o=((r={key:n})["data-react-helmet"]=!0,r);return Object.keys(t).forEach((function(e){var n=L[e]||e;if(n===S||n===E){var r=t.innerHTML||t.cssText;o.dangerouslySetInnerHTML={__html:r}}else o[n]=t[e]})),m.a.createElement(e,o)}))}(e,t)},toString:function(){return function(e,t,n){return t.reduce((function(t,r){var o=Object.keys(r).filter((function(e){return!(e===S||e===E)})).reduce((function(e,t){var o=void 0===r[t]?t:t+'="'+B(r[t],n)+'"';return e?e+" "+o:o}),""),a=r.innerHTML||r.cssText||"",i=-1===U.indexOf(e);return t+"<"+e+' data-react-helmet="true" '+o+(i?"/>":">"+a+"</"+e+">")}),"")}(e,t,n)}}}},de=function(e){var t=e.baseTag,n=e.bodyAttributes,r=e.encode,o=e.htmlAttributes,a=e.linkTags,i=e.metaTags,c=e.noscriptTags,l=e.scriptTags,u=e.styleTags,s=e.title,f=void 0===s?"":s,p=e.titleAttributes;return{base:pe(w.BASE,t,r),bodyAttributes:pe(g,n,r),htmlAttributes:pe(b,o,r),link:pe(w.LINK,a,r),meta:pe(w.META,i,r),noscript:pe(w.NOSCRIPT,c,r),script:pe(w.SCRIPT,l,r),style:pe(w.STYLE,u,r),title:pe(w.TITLE,{title:f,titleAttributes:p},r)}},me=s()((function(e){return{baseTag:X([O,I],e),bodyAttributes:G(g,e),defer:$(e,M),encode:$(e,R),htmlAttributes:G(b,e),linkTags:Z(w.LINK,[A,O],e),metaTags:Z(w.META,[P,T,j,k,C],e),noscriptTags:Z(w.NOSCRIPT,[S],e),onChangeClientState:V(e),scriptTags:Z(w.SCRIPT,[x,S],e),styleTags:Z(w.STYLE,[E],e),title:J(e),titleAttributes:G(v,e)}}),(function(e){oe&&ne(oe),e.defer?oe=te((function(){ae(e,(function(){oe=null}))})):(ae(e),oe=null)}),de)((function(){return null})),he=(o=me,i=a=function(e){function t(){return K(this,t),z(this,e.apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.shouldComponentUpdate=function(e){return!p()(this.props,e)},t.prototype.mapNestedChildrenToProps=function(e,t){if(!t)return null;switch(e.type){case w.SCRIPT:case w.NOSCRIPT:return{innerHTML:t};case w.STYLE:return{cssText:t}}throw new Error("<"+e.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},t.prototype.flattenArrayTypeChildren=function(e){var t,n=e.child,r=e.arrayTypeChildren,o=e.newChildProps,a=e.nestedChildren;return H({},r,((t={})[n.type]=[].concat(r[n.type]||[],[H({},o,this.mapNestedChildrenToProps(n,a))]),t))},t.prototype.mapObjectTypeChildren=function(e){var t,n,r=e.child,o=e.newProps,a=e.newChildProps,i=e.nestedChildren;switch(r.type){case w.TITLE:return H({},o,((t={})[r.type]=i,t.titleAttributes=H({},a),t));case w.BODY:return H({},o,{bodyAttributes:H({},a)});case w.HTML:return H({},o,{htmlAttributes:H({},a)})}return H({},o,((n={})[r.type]=H({},a),n))},t.prototype.mapArrayTypeChildrenToProps=function(e,t){var n=H({},t);return Object.keys(e).forEach((function(t){var r;n=H({},n,((r={})[t]=e[t],r))})),n},t.prototype.warnOnInvalidChildren=function(e,t){return!0},t.prototype.mapChildrenToProps=function(e,t){var n=this,r={};return m.a.Children.forEach(e,(function(e){if(e&&e.props){var o=e.props,a=o.children,i=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,n){return t[D[n]||n]=e[n],t}),t)}(Y(o,["children"]));switch(n.warnOnInvalidChildren(e,a),e.type){case w.LINK:case w.META:case w.NOSCRIPT:case w.SCRIPT:case w.STYLE:r=n.flattenArrayTypeChildren({child:e,arrayTypeChildren:r,newChildProps:i,nestedChildren:a});break;default:t=n.mapObjectTypeChildren({child:e,newProps:t,newChildProps:i,nestedChildren:a})}}})),t=this.mapArrayTypeChildrenToProps(r,t)},t.prototype.render=function(){var e=this.props,t=e.children,n=Y(e,["children"]),r=H({},n);return t&&(r=this.mapChildrenToProps(t,r)),m.a.createElement(o,r)},W(t,null,[{key:"canUseDOM",set:function(e){o.canUseDOM=e}}]),t}(m.a.Component),a.propTypes={base:l.a.object,bodyAttributes:l.a.object,children:l.a.oneOfType([l.a.arrayOf(l.a.node),l.a.node]),defaultTitle:l.a.string,defer:l.a.bool,encodeSpecialCharacters:l.a.bool,htmlAttributes:l.a.object,link:l.a.arrayOf(l.a.object),meta:l.a.arrayOf(l.a.object),noscript:l.a.arrayOf(l.a.object),onChangeClientState:l.a.func,script:l.a.arrayOf(l.a.object),style:l.a.arrayOf(l.a.object),title:l.a.string,titleAttributes:l.a.object,titleTemplate:l.a.string},a.defaultProps={defer:!0,encodeSpecialCharacters:!0},a.peek=o.peek,a.rewind=function(){var e=o.rewind();return e||(e=de({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),e},i);he.renderStatic=he.rewind}).call(this,n("yLpj"))},rbrq:function(e,t,n){e.exports={container:"footer-module--container--KEDIr"}},yLpj:function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(r){"object"==typeof window&&(n=window)}e.exports=n}}]);
//# sourceMappingURL=commons-ac1d8e30e72f5792547b.js.map