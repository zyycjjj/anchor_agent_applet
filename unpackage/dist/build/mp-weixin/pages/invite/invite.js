(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/invite/invite"],{"0c1b":function(n,t,o){"use strict";var e=o("f797"),i=o.n(e);i.a},1409:function(n,t,o){"use strict";var e={"uni-icons":()=>Promise.all([o.e("common/vendor"),o.e("components/uni-icons/uni-icons")]).then(o.bind(null,"77be"))},i=function(){var n=this,t=n.$createElement;n._self._c},s=[];o.d(t,"b",function(){return i}),o.d(t,"c",function(){return s}),o.d(t,"a",function(){return e})},"4ffd":function(n,t,o){"use strict";o.r(t);var e=o("1409"),i=o("a399");for(var s in i)"default"!==s&&function(n){o.d(t,n,function(){return i[n]})}(s);o("0c1b");var a,c=o("f0c5"),u=Object(c["a"])(i["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],a);t["default"]=u.exports},"9eff":function(n,t,o){"use strict";(function(n){o("0e61"),o("921b");e(o("66fd"));var t=e(o("4ffd"));function e(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,o("543d")["createPage"])},a399:function(n,t,o){"use strict";o.r(t);var e=o("d479"),i=o.n(e);for(var s in e)"default"!==s&&function(n){o.d(t,n,function(){return e[n]})}(s);t["default"]=i.a},d479:function(n,t,o){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e=function(){return Promise.all([o.e("common/vendor"),o.e("components/uni-icons/uni-icons")]).then(o.bind(null,"77be"))},i=function(){return o.e("components/uni-section/uni-section").then(o.bind(null,"c7fb"))},s={components:{uniIcons:e,uniSection:i},data:function(){return{imageVis:!1,imgUrl:"",providerList:[],show1:!1,isDom:!0,canvasUrl:"",cover:"https://www.vzoyo.com/uploads/share.png",hascanvas:!1}},onShareAppMessage:function(t){var o=JSON.parse(n.getStorageSync("login")).user_id;return"button"===t.from&&console.log(t.target),{title:"天天来提现",path:"/pages/anchor/anchor?pid=".concat(o),imgUrl:"https://ww1.yunjiexi.club/2020/03/18/GwFBk.png"}},methods:{open:function(n){console.log(n),n.detail.authSetting["scope.writePhotosAlbum"]&&(this.show1=!1)},preview:function(){wx.previewImage({current:this.canvasUrl,urls:[this.canvasUrl]})},closeimg:function(){this.imageVis=!1},getImg:function(){var t=this;this.imgUrl=n.getStorageSync("login").spread_code,this.imageVis=!0,t.hascanvas||n.showToast({icon:"loading",title:"正在生成海报中",duration:1e3});var o=n.createCanvasContext("firstCanvas");n.getImageInfo({src:t.cover,success:function(e){console.log(e);var i=e.path;o.drawImage(i,0,0,n.upx2px(500),n.upx2px(878)),n.getImageInfo({src:t.imgUrl,success:function(e){var i=e.path;o.drawImage(i,n.upx2px(165),n.upx2px(650),n.upx2px(200),n.upx2px(200)),o.draw(!1,function(){n.canvasToTempFilePath({x:0,y:0,canvasId:"firstCanvas",success:function(n){t.canvasUrl=n.tempFilePath,t.hascanvas=!0},fail:function(t){n.showToast({title:"生成海报失败",icon:"none"})}})})}})},fail:function(n){console.log(n)}})},save:function(){var t=this;n.showToast({icon:"loading",title:"正在保存图片",duration:1e3}),wx.getSetting({success:function(n){n.authSetting["scope.writePhotosAlbum"]?t.savePhoto():wx.authorize({scope:"scope.writePhotosAlbum",success:function(){t.savePhoto()},fail:function(){console.log("用户拒绝授权，跳转到设置页面"),t.show1=!0}})}})},savePhoto:function(){wx.saveImageToPhotosAlbum({filePath:this.canvasUrl,success:function(t){console.log(t),n.showToast({title:"保存成功",icon:"success",duration:1e3}),that.imageVis=!1}})}}};t.default=s}).call(this,o("543d")["default"])},f797:function(n,t,o){}},[["9eff","common/runtime","common/vendor"]]]);