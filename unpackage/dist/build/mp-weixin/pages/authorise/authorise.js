(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/authorise/authorise"],{1553:function(e,n,o){"use strict";(function(e){o("0e61"),o("921b");t(o("66fd"));var n=t(o("33da"));function t(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,o("543d")["createPage"])},"33da":function(e,n,o){"use strict";o.r(n);var t=o("eb5a"),i=o("a9ea");for(var r in i)"default"!==r&&function(e){o.d(n,e,function(){return i[e]})}(r);o("79b8");var c,s=o("f0c5"),a=Object(s["a"])(i["default"],t["b"],t["c"],!1,null,"75787268",null,!1,t["a"],c);n["default"]=a.exports},"79b8":function(e,n,o){"use strict";var t=o("7bd2"),i=o.n(t);i.a},"7bd2":function(e,n,o){},a9ea:function(e,n,o){"use strict";o.r(n);var t=o("f869"),i=o.n(t);for(var r in t)"default"!==r&&function(e){o.d(n,e,function(){return t[e]})}(r);n["default"]=i.a},eb5a:function(e,n,o){"use strict";var t,i=function(){var e=this,n=e.$createElement;e._self._c},r=[];o.d(n,"b",function(){return i}),o.d(n,"c",function(){return r}),o.d(n,"a",function(){return t})},f869:function(e,n,o){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t=o("5820"),i=function(){return o.e("components/neil-modal/neil-modal").then(o.bind(null,"3a25"))},r={components:{neilModal:i},data:function(){return{background:["color1","color2","color3"],indicatorDots:!0,autoplay:!1,show2:!1,userInfo:{},show1:!0,pid:""}},onLoad:function(n){this.pid=Number(e.getStorageSync("pid")),console.log(typeof this.pid),console.log(this.pid)},methods:{modalTap:function(e){this.show2=!0},cancelAuth:function(){this.show2=!1},getUserInfo:function(){var n=this;e.getUserInfo({provider:"weixin",success:function(e){console.log("getUserInfo success",e),n.userInfo=e.userInfo},fail:function(n){console.log("getUserInfo fail",n);var o=n.errMsg;~o.indexOf("uni.login")&&(o="请在登录页面完成登录操作"),e.getSetting({success:function(n){var t=n.authSetting["scope.userInfo"];t?e.showModal({title:"获取用户信息失败",content:"错误原因"+o,showCancel:!1}):e.showModal({title:"授权失败",content:"Hello uni-app需要获取您的用户信息，请在设置界面打开相关权限",success:function(n){n.confirm&&e.openSetting()}})}})}})},mpGetUserInfo:function(n){if("getUserInfo:ok"!==n.detail.errMsg)return this.show1=!1,void wx.openSetting({success:function(){wx.authorize({scope:"scope.userinfo",success:function(){o.getUserInfo()}})}});this.userInfo=n.detail.userInfo;var o=this;e.login({provider:"weixin",success:function(i){e.setStorageSync("code",i.code),e.setStorageSync("pid",Number(e.getStorageSync("pid"))),o.userInfo.code=i.code,e.setStorageSync("userinfo",n.detail.userInfo),(0,t.request)({url:"/api/user/MiniProgramLogin",data:{code:o.userInfo.code,nickname:o.userInfo.nickName,headimage:o.userInfo.avatarUrl,gender:o.userInfo.gender,province:o.userInfo.province,city:o.userInfo.city,country:o.userInfo.country,pid:o.pid},method:"POST"}).then(function(n){1!=n.data.code?e.showModal({title:"登录失败",showCancel:!1}):(e.setStorageSync("token",n.data.data.userinfo.token),e.setStorageSync("login",n.data.data.userinfo),e.switchTab({url:"/pages/anchor/anchor"}))})}})}}};n.default=r}).call(this,o("543d")["default"])}},[["1553","common/runtime","common/vendor"]]]);