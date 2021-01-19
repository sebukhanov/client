import Vue from 'vue'
import Router from 'vue-router'
import Registr from './views/Registr.vue'
import Login from './views/Login.vue'
import Chat from './views/Chat.vue'
import Dialog from './components/Dialog.vue'
import store from './store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
      beforeEnter (to, from, next){
        if (store.state.user.name) {
          next()
          return
        }
        next('/')
      },
      children: [{
        path: ':username',
        name: 'Dialog',
        component: Dialog,
        beforeEnter (to, from, next){
          if (store.state.user.name) {
            next()
            return
          }
          next('/')
        },
      }]
    },
    {
      path: '/registr',
      name: 'Registr',
      component: Registr,
    }
  ]
})
