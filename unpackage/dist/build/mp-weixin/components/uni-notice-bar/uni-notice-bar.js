(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-notice-bar/uni-notice-bar"],{"28c5":function(n,t,e){"use strict";var i={"uni-icons":function(){return Promise.all([e.e("common/vendor"),e.e("components/uni-icons/uni-icons")]).then(e.bind(null,"77be"))}},o=function(){var n=this,t=n.$createElement;n._self._c},c=[];e.d(t,"b",(function(){return o})),e.d(t,"c",(function(){return c})),e.d(t,"a",(function(){return i}))},3423:function(n,t,e){},"76e3":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=function(){Promise.all([e.e("common/vendor"),e.e("components/uni-icons/uni-icons")]).then(function(){return resolve(e("77be"))}.bind(null,e)).catch(e.oe)},o={name:"UniNoticeBar",components:{uniIcons:i},props:{text:{type:String,default:""},moreText:{type:String,default:""},backgroundColor:{type:String,default:"#fffbe8"},speed:{type:Number,default:100},color:{type:String,default:"#de8c17"},moreColor:{type:String,default:"#999999"},single:{type:[Boolean,String],default:!1},scrollable:{type:[Boolean,String],default:!1},showIcon:{type:[Boolean,String],default:!1},showGetMore:{type:[Boolean,String],default:!1},showClose:{type:[Boolean,String],default:!1}},data:function(){var n="Uni_".concat(Math.ceil(1e6*Math.random()).toString(36)),t="Uni_".concat(Math.ceil(1e6*Math.random()).toString(36));return{textWidth:0,boxWidth:0,wrapWidth:"",webviewHide:!1,elId:n,elIdBox:t,show:!0,animationDuration:"none",animationPlayState:"paused",animationDelay:"0s"}},mounted:function(){var n=this;this.$nextTick((function(){n.initSize()}))},methods:{initSize:function(){var t=this;if(this.scrollable){var e=[],i=new Promise((function(e,i){n.createSelectorQuery().in(t).select("#".concat(t.elId)).boundingClientRect().exec((function(n){t.textWidth=n[0].width,e()}))})),o=new Promise((function(e,i){n.createSelectorQuery().in(t).select("#".concat(t.elIdBox)).boundingClientRect().exec((function(n){t.boxWidth=n[0].width,e()}))}));e.push(i),e.push(o),Promise.all(e).then((function(){t.animationDuration="".concat(t.textWidth/t.speed,"s"),t.animationDelay="-".concat(t.boxWidth/t.speed,"s"),setTimeout((function(){t.animationPlayState="running"}),1e3)}))}},loopAnimation:function(){},clickMore:function(){this.$emit("getmore")},close:function(){this.show=!1,this.$emit("close")},onClick:function(){this.$emit("click")}}};t.default=o}).call(this,e("543d")["default"])},be2c:function(n,t,e){"use strict";e.r(t);var i=e("28c5"),o=e("e25a");for(var c in o)"default"!==c&&function(n){e.d(t,n,(function(){return o[n]}))}(c);e("f7cd");var a,u=e("f0c5"),r=Object(u["a"])(o["default"],i["b"],i["c"],!1,null,"832d9ce0",null,!1,i["a"],a);t["default"]=r.exports},e25a:function(n,t,e){"use strict";e.r(t);var i=e("76e3"),o=e.n(i);for(var c in i)"default"!==c&&function(n){e.d(t,n,(function(){return i[n]}))}(c);t["default"]=o.a},f7cd:function(n,t,e){"use strict";var i=e("3423"),o=e.n(i);o.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-notice-bar/uni-notice-bar-create-component',
    {
        'components/uni-notice-bar/uni-notice-bar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("be2c"))
        })
    },
    [['components/uni-notice-bar/uni-notice-bar-create-component']]
]);
