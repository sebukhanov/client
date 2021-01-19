import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'
import store from './store'

export default {
  install (Vue) {
    const connection = new HubConnectionBuilder()
      .withUrl('/chat', { accessTokenFactory: () => store.state.token})
      .configureLogging(LogLevel.Information)
      .build()
    const chatHub = new Vue()

    Vue.prototype.$chatHub = chatHub
    Vue.prototype.$connection = connection

    connection.on('GetUsers', users => {
      chatHub.$emit('GetUsers', users)
    })

    connection.on('GetMessages', messages => {
      chatHub.$emit('GetMessages', messages)
    })

    chatHub.GetMessages = (user1, user2) => {
      connection.invoke('GetMessages', user1, user2).catch(console.error)
    }

    connection.on('SendMessage', (message) => {
      chatHub.$emit('SendMessage', message)
    })

    chatHub.SendMessage = (message) => {
        connection.invoke('SendMessage', message).catch(console.error)
    }

  }
}
