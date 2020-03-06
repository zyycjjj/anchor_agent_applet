import Vue from 'vue'
import App from './App'
import uniPop from './components/uni-popup/uni-popup.vue'
Vue.config.productionTip = false
Vue.component('uni-pop', uniPop) 
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
