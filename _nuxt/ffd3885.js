(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{291:function(t,n,r){"use strict";r.r(n);r(41),r(31),r(30),r(14),r(63),r(32),r(64);var e=r(27);function o(object,t){var n=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),n.push.apply(n,r)}return n}function c(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?o(Object(source),!0).forEach((function(n){Object(e.a)(t,n,source[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):o(Object(source)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(source,n))}))}return t}var l={name:"PaginationComponent",props:{pagination:{type:Object,required:!0,validator:function(t){return!isNaN(t.limit)&&!isNaN(t.current)&&!isNaN(t.last)}}},computed:{previousPage:function(){var t=this.pagination.current-1;return t<=1?void 0:t},nextPage:function(){var t=this.pagination.current+1;return t>this.pagination.last?this.pagination.last:t},lastPage:function(){return this.pagination.last},pages:function(){var t=[this.pagination.current];return this.pagination.current-1>=1&&t.unshift(this.pagination.current-1),this.pagination.current+1<=this.pagination.last&&t.push(this.pagination.current+1),t.length<3&&this.pagination.current+2<=this.pagination.last&&t.push(this.pagination.current+2),t.length<3&&this.pagination.current-2>1&&t.unshift(this.pagination.current-2),t}}},h=r(46),component=Object(h.a)(l,(function(){var t=this,n=t._self._c;return n("div",{staticClass:"pagination"},[n("nuxt-link",{attrs:{to:"/"}},[t._v(" First ")]),t._v(" "),n("nuxt-link",{attrs:{to:{query:{page:t.previousPage}}}},[t._v("\n        Prev\n    ")]),t._v(" "),t._l(t.pages,(function(r,e){return n("nuxt-link",{key:e,attrs:{to:{query:c(c({},t.$route.query),{},{page:r>1?r:void 0})}}},[t._v("\n        "+t._s(r)+"\n    ")])})),t._v(" "),n("nuxt-link",{attrs:{to:{query:{page:t.nextPage}}}},[t._v("\n        Next\n    ")]),t._v(" "),n("nuxt-link",{attrs:{to:{query:{page:t.lastPage}}}},[t._v("\n        Last\n    ")])],2)}),[],!1,null,null,null);n.default=component.exports}}]);