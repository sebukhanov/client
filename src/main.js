import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ChatHub from './chat-hub'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:8089/'
Vue.prototype.$http = axios
axios.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response.status == 401) {
    Vue.prototype.$connection.stop()
    router.push('/', () => {})
  }
  return Promise.reject(error)
})

Vue.use(BootstrapVue)
Vue.use(ChatHub)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
