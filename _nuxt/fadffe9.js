(window.webpackJsonp=window.webpackJsonp||[]).push([[6,5],{291:function(t,e,o){"use strict";o.r(e);o(30),o(14);var l={name:"TodosFilter",props:{isDisabled:{type:Boolean,default:!1}},computed:{title:{get:function(){return this.$store.state.todos.filter.title},set:function(t){this.$store.commit("todos/filter",{field:"title",value:t})}}}},r=o(46),component=Object(r.a)(l,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"todos-filter"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],staticClass:"todos-filter_input",attrs:{type:"text",placeholder:"Filter by title",disabled:t.isDisabled},domProps:{value:t.title},on:{input:function(e){e.target.composing||(t.title=e.target.value)}}})])}),[],!1,null,null,null);e.default=component.exports},296:function(t,e,o){"use strict";o.r(e);o(41),o(40);var l={name:"TodosHeader",props:{state:{type:Object,default:function(){return{}}},user:{type:Object,default:function(){return{}}}},computed:{isUser:function(){return Boolean(Object.keys(this.user).length)}}},r=o(46),component=Object(r.a)(l,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"todos_header"},[e("div",[e("nuxt-link",{staticClass:"todos_header-logo",attrs:{to:"/"}},[t._v("TODO'S")]),t._v(" "),t.isUser?e("div",{staticClass:"todos_header-author"},[t._v("\n            by "),e("b",[t._v(t._s(t.user.name))])]):t._e()],1),t._v(" "),e("TodosFilter",{attrs:{"is-disabled":Boolean(t.state.error)}})],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{TodosFilter:o(291).default})}}]);