(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3c2299ea"],{"26d3":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{height:"100vh","overflow-y":"auto"}},[a("v-main",[a("v-container",[a("v-card",{staticClass:"my-1",attrs:{flat:"",tile:""}},[a("v-card-title",{domProps:{textContent:t._s("App")}}),a("v-card-text",[a("v-checkbox",{attrs:{color:"accent",label:"Auto update"},on:{change:function(e){return t.updateAppConfig({autoUpdate:e||!1})}},model:{value:t.state.appConfig.autoUpdate,callback:function(e){t.$set(t.state.appConfig,"autoUpdate",e)},expression:"state.appConfig.autoUpdate"}}),a("v-checkbox",{attrs:{color:"accent",label:"Development mode *"},on:{change:function(e){return t.updateAppConfig({devMode:e||!1})}},model:{value:t.state.appConfig.devMode,callback:function(e){t.$set(t.state.appConfig,"devMode",e)},expression:"state.appConfig.devMode"}}),a("v-checkbox",{attrs:{color:"accent",label:"Pin navigation *"},on:{change:function(e){return t.updateAppConfig({pinNav:e||!1})}},model:{value:t.state.appConfig.pinNav,callback:function(e){t.$set(t.state.appConfig,"pinNav",e)},expression:"state.appConfig.pinNav"}}),a("v-checkbox",{attrs:{color:"accent",label:"Show help"},on:{change:function(e){return t.updateProjectViewConfig({showHelp:e||!1})}},model:{value:t.state.projectViewConfig.showHelp,callback:function(e){t.$set(t.state.projectViewConfig,"showHelp",e)},expression:"state.projectViewConfig.showHelp"}}),a("v-checkbox",{attrs:{color:"accent",label:"Colored toolbar"},on:{change:function(e){return t.updateProjectViewConfig({coloredToolbar:e||!1})}},model:{value:t.state.projectViewConfig.coloredToolbar,callback:function(e){t.$set(t.state.projectViewConfig,"coloredToolbar",e)},expression:"state.projectViewConfig.coloredToolbar"}}),a("span",[t._v("* Page restart required")])],1)],1),a("v-card",{staticClass:"my-1",attrs:{flat:"",tile:""}},[a("v-card-title",{domProps:{textContent:t._s("Backends")}}),a("v-card-text",[a("v-row",[a("v-col",{attrs:{cols:"6"}},[a("NESTSimulatorConfig")],1),a("v-col",{attrs:{cols:"6"}},[a("InsiteAccessConfig")],1)],1)],1)],1),a("v-card",{staticClass:"my-1",attrs:{flat:"",tile:""}},[a("v-card-title",{domProps:{textContent:t._s("Model")}}),a("v-card-text",[a("v-card",{attrs:{flat:"",tile:""}},[a("v-card-subtitle",{domProps:{textContent:t._s("Accepted recordables")}}),t._l(t.state.model.config.recordables,(function(e){return a("span",{key:e.id},[a("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(o){var n=o.on,s=o.attrs;return[a("v-chip",t._g(t._b({staticClass:"ma-1",attrs:{label:"",outlined:"",small:""},domProps:{textContent:t._s(e.id)}},"v-chip",s,!1),n))]}}],null,!0)},[a("span",{domProps:{textContent:t._s(e.label)}}),e.unit?a("span",{domProps:{textContent:t._s(" ("+e.unit+")")}}):t._e()])],1)}))],2)],1)],1),a("v-card",{staticClass:"my-1",attrs:{flat:"",tile:""}},[a("v-card-title",{domProps:{textContent:t._s("Network")}}),a("v-card-text",[a("v-card",{attrs:{flat:"",tile:""}},[a("v-select",{attrs:{items:t.state.colorSchemes,value:t.state.network.config.color.scheme,label:"Color cycle of nodes"},on:{change:t.updateNetworkColorScheme},scopedSlots:t._u([{key:"item",fn:function(e){var o=e.item;return[a("v-row",{staticClass:"my-1"},[a("v-col",{attrs:{cols:"3"},domProps:{textContent:t._s(o.text)}}),a("v-col",{attrs:{cols:"9"}},[a("v-row",t._l(o.colors,(function(t){return a("v-sheet",{key:t,staticClass:"mx-1 my-3",attrs:{color:t,height:20,width:20}})})),1)],1)],1)]}},{key:"selection",fn:function(e){var o=e.item;return[a("v-row",[a("v-col",{attrs:{cols:"4"},domProps:{textContent:t._s(o.text)}}),a("v-col",{attrs:{cols:"8"}},[a("v-row",t._l(o.colors,(function(t){return a("v-sheet",{key:t,staticClass:"mx-1 my-3",attrs:{color:t,height:20,width:20}})})),1)],1)],1)]}}])})],1)],1)],1)],1)],1)],1)},n=[],s=(a("7db0"),a("d3b7"),a("2b0e")),r=a("ed09"),i=a("669f"),c=a("5339"),l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"InsiteAccessConfig"},[a("v-card",{attrs:{outlined:""}},[a("v-card-subtitle",{domProps:{textContent:t._s("Insite Access")}}),a("v-card-text",[a("v-tooltip",{attrs:{"open-delay":"300",top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,n=e.attrs;return[a("v-text-field",t._g(t._b({attrs:{"hide-details":"",label:"URL of Insite access",placeholder:"http://127.0.0.1:8080"},on:{change:t.updateInsiteAccessConfig},model:{value:t.state.app.backends.insiteAccess.url,callback:function(e){t.$set(t.state.app.backends.insiteAccess,"url",e)},expression:"state.app.backends.insiteAccess.url"}},"v-text-field",n,!1),o))]}}])},[a("span",[t._v(" Please enter the URL where the server of Insite can be found at (including protocol!). ")])]),a("div",{staticClass:"my-1"},[t.state.insiteVersion&&"unknown"!==t.state.insiteVersion?a("span",[a("label",[t._v("Response: ")]),a("v-tooltip",{attrs:{"open-delay":"300",right:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,n=e.attrs;return[a("v-chip",t._g(t._b({attrs:{color:"green",dark:"",small:""}},"v-chip",n,!1),o),[a("v-avatar",{attrs:{left:""}},[a("v-icon",{attrs:{small:""},domProps:{textContent:t._s("mdi-checkbox-marked-circle")}})],1),t._v(" Insite version: "+t._s(t.state.insiteVersion)+" ")],1)]}}],null,!1,1551549577)},[a("span",[t._v("A server of Insite has been found at the given URL.")])])],1):"unknown"===t.state.insiteVersion?a("span",[a("label",[t._v("Response: ")]),a("v-tooltip",{attrs:{"open-delay":"300",right:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,n=e.attrs;return[a("v-chip",t._g(t._b({attrs:{color:"gray",dark:"",small:""}},"v-chip",n,!1),o),[a("v-avatar",{attrs:{left:""}},[a("v-icon",{attrs:{small:""},domProps:{textContent:t._s("mdi-help-circle-outline")}})],1),a("span",[t._v("Unknown")])],1)]}}])},[a("span",[t._v(" The server state of Insite has not been checked yet. ")])])],1):a("span",[a("label",[t._v("Response: ")]),a("v-tooltip",{attrs:{"open-delay":"300",right:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,n=e.attrs;return[a("v-chip",t._g(t._b({attrs:{color:"red",dark:"",small:""}},"v-chip",n,!1),o),[a("v-avatar",{attrs:{left:""}},[a("v-icon",{attrs:{small:""},domProps:{textContent:t._s("mdi-power-off")}})],1),a("span",[t._v(" No valid response ")])],1)]}}])},[a("span",[t._v(" The server of Insite seems to be unavailable at this URL. ")])])],1)])],1),a("v-card-actions",[a("v-btn",{attrs:{outlined:"",small:""},domProps:{textContent:t._s("Check")},on:{click:t.checkInsiteAccess}})],1)],1)],1)},p=[],d=a("1da1"),u=(a("96cf"),s["default"].extend({name:"insiteAccessConfig",setup:function(){var t=Object(r["e"])({app:c["a"].app,insiteVersion:"unknown"});function e(){return a.apply(this,arguments)}function a(){return a=Object(d["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:c["a"].app.backends.insiteAccess.check().finally((function(){t.insiteVersion=c["a"].app.backends.insiteAccess.state.version.insite||""}));case 1:case"end":return e.stop()}}),e)}))),a.apply(this,arguments)}Object(r["b"])((function(){return e()}));var o=function(){t.app.backends.insiteAccess.updateConfig({custom:!0}),e()};return{checkInsiteAccess:e,state:t,updateInsiteAccessConfig:o}}})),v=u,f=a("0c7c"),m=a("6544"),h=a.n(m),b=a("8212"),C=a("8336"),g=a("b0af"),_=a("99d9"),k=a("cc20"),x=a("132d"),w=a("8654"),S=a("3a2f"),V=Object(f["a"])(v,l,p,!1,null,null,null),y=V.exports;h()(V,{VAvatar:b["a"],VBtn:C["a"],VCard:g["a"],VCardActions:_["a"],VCardSubtitle:_["b"],VCardText:_["c"],VChip:k["a"],VIcon:x["a"],VTextField:w["a"],VTooltip:S["a"]});var T=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"NESTSimulatorConfig"},[a("v-card",{attrs:{outlined:""}},[a("v-card-subtitle",{domProps:{textContent:t._s("NEST Simulator")}}),a("v-card-text",[a("v-tooltip",{attrs:{top:"","open-delay":"300"},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,n=e.attrs;return[a("v-text-field",t._g(t._b({attrs:{"hide-details":"",label:"URL of NEST Simulator",placeholder:"http://127.0.0.1:5000"},on:{change:t.updateNESTSimulatorConfig},model:{value:t.state.app.backends.nestSimulator.url,callback:function(e){t.$set(t.state.app.backends.nestSimulator,"url",e)},expression:"state.app.backends.nestSimulator.url"}},"v-text-field",n,!1),o))]}}])},[a("span",[t._v(" Please enter the URL where the server of NEST Simulator can be found at (including protocol!). ")])]),a("div",{staticClass:"my-1"},[t.state.simulatorVersion&&"unknown"!==t.state.simulatorVersion?a("span",[a("label",[t._v("Response: ")]),a("v-tooltip",{attrs:{"open-delay":"300",right:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,n=e.attrs;return[a("v-chip",t._g(t._b({attrs:{color:"green",dark:"",small:""}},"v-chip",n,!1),o),[a("v-avatar",{attrs:{left:""}},[a("v-icon",{attrs:{small:""},domProps:{textContent:t._s("mdi-checkbox-marked-circle")}})],1),t._v(" NEST version: "+t._s(t.state.simulatorVersion)+" ")],1)]}}],null,!1,2756789987)},[a("span",[t._v(" A server of NEST Simulator has been found at the given URL. ")])])],1):"unknown"===t.state.simulatorVersion?a("span",[a("label",[t._v("Response: ")]),a("v-tooltip",{attrs:{"open-delay":"300",right:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,n=e.attrs;return[a("v-chip",t._g(t._b({attrs:{color:"gray",dark:"",small:""}},"v-chip",n,!1),o),[a("v-avatar",{attrs:{left:""}},[a("v-icon",{attrs:{small:""},domProps:{textContent:t._s("mdi-help-circle-outline")}})],1),a("span",[t._v("Unknown")])],1)]}}])},[a("span",[t._v(" The server state of NEST Simulator has not been checked yet. ")])])],1):a("span",[a("label",[t._v("Response: ")]),a("v-tooltip",{attrs:{"open-delay":"300",right:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,n=e.attrs;return[a("v-chip",t._g(t._b({attrs:{color:"red",dark:"",small:""}},"v-chip",n,!1),o),[a("v-avatar",{attrs:{left:""}},[a("v-icon",{attrs:{small:""},domProps:{textContent:t._s("mdi-power-off")}})],1),a("span",[t._v(" No valid response ")])],1)]}}])},[a("span",[t._v(" The server of NEST Simulator seems to be unavailable at this URL. ")])])],1)])],1),a("v-card-actions",[a("v-btn",{attrs:{outlined:"",small:""},domProps:{textContent:t._s("Check")},on:{click:t.checkNESTSimulator}})],1)],1)],1)},A=[],P=s["default"].extend({name:"NESTSimulatorConfig",setup:function(){var t=Object(r["e"])({app:c["a"].app,simulatorVersion:"unknown"});function e(){return a.apply(this,arguments)}function a(){return a=Object(d["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:c["a"].app.backends.nestSimulator.check().finally((function(){t.simulatorVersion=c["a"].app.backends.nestSimulator.state.version.nest||""}));case 1:case"end":return e.stop()}}),e)}))),a.apply(this,arguments)}Object(r["b"])((function(){return e()}));var o=function(){t.app.backends.nestSimulator.updateConfig({custom:!0}),e()};return{checkNESTSimulator:e,state:t,updateNESTSimulatorConfig:o}}}),N=P,j=Object(f["a"])(N,T,A,!1,null,null,null),R=j.exports;h()(j,{VAvatar:b["a"],VBtn:C["a"],VCard:g["a"],VCardActions:_["a"],VCardSubtitle:_["b"],VCardText:_["c"],VChip:k["a"],VIcon:x["a"],VTextField:w["a"],VTooltip:S["a"]});var E=a("c998"),I=s["default"].extend({name:"Settings",components:{InsiteAccessConfig:y,NESTSimulatorConfig:R},setup:function(){var t=c["a"].app.project.view,e=Object(r["e"])({app:c["a"].app,appConfig:c["a"].app.config,colorSchemes:E,model:new i["a"]("Model"),network:new i["a"]("Network"),projectViewConfig:t.config}),a=function(t){c["a"].app.updateConfig(t)},o=function(t){c["a"].app.project.view.updateConfig(t)},n=function(t){var a=E.find((function(e){return e.value===t})),o={color:{scheme:t,cycle:a.colors}};e.network.updateConfig(o)};return{projectView:t,state:e,updateAppConfig:a,updateNetworkColorScheme:n,updateProjectViewConfig:o}}}),U=I,$=a("ac7c"),O=a("62ad"),L=a("a523"),M=a("f6c4"),B=a("0fd9"),H=a("b974"),F=a("8dd9"),J=Object(f["a"])(U,o,n,!1,null,null,null);e["default"]=J.exports;h()(J,{VCard:g["a"],VCardSubtitle:_["b"],VCardText:_["c"],VCardTitle:_["d"],VCheckbox:$["a"],VChip:k["a"],VCol:O["a"],VContainer:L["a"],VMain:M["a"],VRow:B["a"],VSelect:H["a"],VSheet:F["a"],VTooltip:S["a"]})},bd0c:function(t,e,a){},f6c4:function(t,e,a){"use strict";a("bd0c");var o=a("d10f");e["a"]=o["a"].extend({name:"v-main",props:{tag:{type:String,default:"main"}},computed:{styles:function(){var t=this.$vuetify.application,e=t.bar,a=t.top,o=t.right,n=t.footer,s=t.insetFooter,r=t.bottom,i=t.left;return{paddingTop:"".concat(a+e,"px"),paddingRight:"".concat(o,"px"),paddingBottom:"".concat(n+s+r,"px"),paddingLeft:"".concat(i,"px")}}},render:function(t){var e={staticClass:"v-main",style:this.styles,ref:"main"};return t(this.tag,e,[t("div",{staticClass:"v-main__wrap"},this.$slots.default)])}})}}]);