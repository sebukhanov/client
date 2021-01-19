<template>
  <div class="card">
	  <div class="card-header">
			  <div class="text-light">Диалог с: {{ username }}</div>
				<router-link :to="'/chat'">
					<small class="text-light">Закрыть</small>
				</router-link>
		</div>
		<div class="card-body" ref="msgbody">
			<div v-for="message of messages" :key="message.id" class="d-flex mb-4"
					 :class="{'justify-content-end': (message.userTo === username) && (message.userFrom === CurrentUser)}">
				<div v-if="(message.userTo === username) && (message.userFrom === CurrentUser)" class="msg_cotainer_send">
					<span class="msg-text">{{ message.text }}</span>
					<!--<span v-if="message.isRead" class="msg_status_send">прочитано</span>
					<span v-else class="msg_status_send">отправлено</span>-->
				</div>
        <div v-else-if="(message.userTo === CurrentUser) && (message.userFrom === username)" class="msg_cotainer">
					<span class="msg-text">{{ message.text }}</span>
				</div>
			</div>
		</div>
		<div class="card-footer">
			<div class="form-group">
				<div class="input-group">
					<textarea 
						v-model="messageInput"
						class="form-control" 
						placeholder="Введите сообщение...">
					</textarea>
					<button class="btn btn-primary" type="submit" @click="SendMessage">Отправить</button>
				</div>
			</div>
		</div>
	</div> 
</template>

<script>
export default {
  data() {
    return {
      username: this.$route.params['username'],
      messages: [],
	  messageInput: '',
      dialogId: '',  
    } 
  },
  watch: {
    $route (toR, fromR) {
		this.username = toR.params['username']
		this.$chatHub.GetMessages(this.username,this.$store.state.user.name)
		this.$chatHub.$on('GetMessages', (messages) =>{
			this.messages = messages;
		})
		}
  },
  created() {
	this.$chatHub.GetMessages(this.username,this.$store.state.user.name)
	this.$chatHub.$on('GetMessages', (messages) =>{
				this.messages = messages;
			})
	this.$store.commit('isVisibleFalse')		
  },
  beforeDestroy () {
		this.$store.commit('isVisibleTrue')
  },
  mounted() {
	  this.$chatHub.$on('SendMessage', (message) =>{
		this.messages.push(message)
		})
	},
  methods: {
    SendMessage() {
		const message = {
		    UserTo: this.username,
		    UserFrom: this.$store.state.user.name,
		    Text: this.messageInput,
            IsRead: false
		}
		this.$chatHub.SendMessage(message)
		this.messageInput = ''
	  },
	},
	computed: {
    CurrentUser() {
      return this.$store.state.user.name   
	  }
	}
}
</script>

<style lang="scss" scoped>
	.chat{
    margin: 0;
    padding: 0;
	}
	.card{
    display: flex;
    flex-direction: column;
    height: 100vh;
	}
	.card-header{
		background-color:rgb(1, 60, 116);
	}
	.card-body{
		overflow-x: hidden;
	  overflow-y: auto;
		background-color: #F5F5F5;
	}
	.card-footer{
		border-top: 0 !important;
		background-color: #F5F5F5;
	}
	.msg_cotainer{
		margin-top: auto;
		margin-bottom: auto;
		margin-left: 10px;
		border-radius: 25px;
		background-color: #82ccdd;
		padding: 10px;
		position: relative;
	}
	.msg_cotainer_send{
		margin-top: auto;
		margin-bottom: auto;
		margin-right: 10px;
		border-radius: 25px;
		background-color: #78e08f;
		padding: 10px;
		position: relative;
	}
	.msg-text{
				white-space: pre;
	}
	.msg_status_send{
		position: absolute;
		right:0;
		bottom: -15px;
		font-size: 10px;
	}
	textarea{
		resize: none;
	}
</style>
