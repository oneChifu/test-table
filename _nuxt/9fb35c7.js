(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{302:function(t,e,o){"use strict";o.r(e);o(43);var r={name:"TodosItem",props:{todo:{type:Object,required:!0}},computed:{isUser:function(){return Boolean(this.$route.query.userId)}}},d=o(46),component=Object(d.a)(r,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"todos-item"},[e("div",{class:["todos-item_status",{"todos-item_status__completed":t.todo.completed}]},[t.todo.completed?e("i",{staticClass:"fa-regular fa-circle-check"}):e("i",{staticClass:"fa-regular fa-circle"})]),t._v(" "),e("div",{staticClass:"todos-item_content"},[e("div",{staticClass:"todos-item_title",domProps:{innerHTML:t._s(t.todo.title)}}),t._v(" "),t.isUser?t._e():e("div",{staticClass:"todos-item_author"},[t._v("\n            by\n            "),e("nuxt-link",{attrs:{to:{query:{userId:t.todo.userId}}}},[e("b",[t._v(t._s(t.todo.user.name))])])],1)])])}),[],!1,null,null,null);e.default=component.exports}}]);