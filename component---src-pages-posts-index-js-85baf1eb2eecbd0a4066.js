(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"4K3U":function(e,t,n){"use strict";n.r(t),n.d(t,"query",(function(){return m}));var a=n("q1tI"),r=n.n(a),l=n("I/Ru"),o=n("jNNy"),u=n("fC2M"),c=n("JIeO"),i=n("obyI"),s=n.n(i),m="1643605655";t.default=function(e){var t=e.data;return r.a.createElement(l.a,null,r.a.createElement(o.a,{title:"Home",description:s.a.siteDescription,path:"posts"}),r.a.createElement(u.a,{posts:t.allMdx.edges}),r.a.createElement(c.a,{nextPage:2}))}},"6z7D":function(e,t,n){e.exports={tags:"tag-list-module--tags--O_Obx"}},FT44:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var a=n("q1tI"),r=n.n(a),l=n("Wbzz"),o=n("ph5I"),u=n.n(o),c=function(e){var t=e.children,n=e.to,a=e.buttonStyle;return r.a.createElement(l.Link,{to:n,className:u.a.button+" "+a},t)};c.defaultProps={buttonStyle:""};var i=c},GWjj:function(e,t,n){e.exports={container:"post-list-module--container--2AqiX",post:"post-list-module--post--1gkyY",cover:"post-list-module--cover--31q1n",content:"post-list-module--content--ixjr-"}},JIeO:function(e,t,n){"use strict";n.d(t,"a",(function(){return p}));var a=n("q1tI"),r=n.n(a),l=n("ma3e"),o=n("FT44"),u=n("obyI"),c=n.n(u),i=n("Al62"),s=n.n(i),m=n("qux6"),d=n.n(m),p=function(e){var t=e.prevPage,n=e.nextPage;return r.a.createElement("div",{className:d.a.container},t?r.a.createElement(o.a,{to:s.a.resolvePageUrl(c.a.pages.archive,t),buttonStyle:d.a.buttonLeft},r.a.createElement(l.a,null),r.a.createElement("span",null,"Newer posts")):null,n?r.a.createElement(o.a,{to:s.a.resolvePageUrl(c.a.pages.archive,n),buttonStyle:d.a.buttonRight},r.a.createElement("span",null,"Older posts"),r.a.createElement(l.b,null)):null)}},dkXr:function(e,t,n){"use strict";n.d(t,"a",(function(){return d}));n("Vd3H");var a=n("q1tI"),r=n.n(a),l=n("Wbzz"),o=n("6z7D"),u=n.n(o),c=n("obyI"),i=n.n(c),s=n("Al62"),m=n.n(s),d=function(e){var t=e.tags;return r.a.createElement("div",{className:u.a.tags},t.filter((function(e,n){return n===t.indexOf(e)})).sort().map((function(e){var t=m.a.resolvePageUrl(i.a.pages.tag,e),n=i.a.tags[e];return n||console.error("Tag data for "+e+" not found"),r.a.createElement(l.Link,{to:t,key:e},(null==n?void 0:n.name)||m.a.capitalize(e))})))}},fC2M:function(e,t,n){"use strict";n.d(t,"a",(function(){return p}));var a=n("q1tI"),r=n.n(a),l=n("Wbzz"),o=n("9eSz"),u=n.n(o),c=n("GWjj"),i=n.n(c),s=n("dkXr"),m=n("Al62"),d=n.n(m),p=function(e){var t=e.posts;return r.a.createElement("div",{className:i.a.container},t.map((function(e,t){var n=e.node.frontmatter,a=n.title,o=n.date,c=n.path,m=n.tags,p=n.cover,f=n.excerpt;return n.hidden?null:r.a.createElement("div",{key:a,className:i.a.post},r.a.createElement("div",{className:i.a.cover},r.a.createElement(l.Link,{to:d.a.resolvePageUrl(c)},r.a.createElement(u.a,{fluid:p.childImageSharp.fluid,title:f,alt:a}))),r.a.createElement("div",{className:i.a.content},r.a.createElement(l.Link,{to:d.a.resolvePageUrl(c)},o?r.a.createElement("label",null,o):null,r.a.createElement("h2",null,a),r.a.createElement("p",null,f)),r.a.createElement(s.a,{tags:m})))})).filter((function(e){return null!=e})))}},ph5I:function(e,t,n){e.exports={button:"button-module--button--24AQQ"}},qux6:function(e,t,n){e.exports={container:"archive-pagination-module--container--2VM7Y",buttonLeft:"archive-pagination-module--buttonLeft--3CRS6",buttonRight:"archive-pagination-module--buttonRight--Wnali"}}}]);
//# sourceMappingURL=component---src-pages-posts-index-js-85baf1eb2eecbd0a4066.js.map