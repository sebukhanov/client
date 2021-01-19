<template>
 	<div class="container-fluid">
		<div class="row">
			<div class="col-md-2 chat">
				<div class="d-none d-sm-block">				
        		<div class="card mb-sm-3 mb-md-0">
					<div class="card-header">	
					    <div class="text-light">Вошли как: {{ CurrentUser }}</div>
							<router-link :to="'/'">
								<small class="text-light">Выйти</small>
							</router-link>
						</div>
					<div class="card-body">
						<router-link 
							v-for="User of Users" :key="User.name" 
						  	v-show="CurrentUser!=User.name" :to="'/chat/' + User.name" 
						  	class="list-group-item list-group-item-action">
                			<div class="user">{{ User.name  }}</div>
            			</router-link>
            		</div>
				</div>
				</div>
			</div>
			<div class="col-md-10 chat">
				<div v-if="DisplayHeader" class="pt-2 pl-5">
				  <h4>Добро пожаловать в чат!</h4>
				  <span>Выберите пользователя из списка чтобы начать перписку.</span>
				</div>
				<router-view/>
			</div>
		</div>
 	</div>
</template>

<script>
export default {
    data () {
      return {
       Users: []
        }
	},
    created(){
		this.$connection.start()
        this.$chatHub.$on('GetUsers', (users) =>{
				this.Users = users
			})
	},
	beforeDestroy () {
		this.$connection.stop()
  		},
	mounted(){
		/*this.$chatHub.$on('onUserAdded', (username) =>{
			this.Users.push({'name':username})
		})*/
	},
    computed: {
        CurrentUser() {
         return this.$store.state.user.name   
				},
				DisplayHeader() {
					return this.$store.state.isVisible
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
		white-space: nowrap;
    background-color:rgb(1, 60, 116);
	}
	.card-body{
		padding:  0;
		overflow-y: auto;
		overflow-x: hidden;
		background-color: #A9A9A9;
	}
	.user{
    white-space: nowrap;
    overflow: hidden;
		text-overflow: ellipsis;
    color: #FFFFFF;
	}
	.list-group-item {
	  border: 0;
    background-color: #A9A9A9;
	}
	.list-group-item:hover {
    background: #C0C0C0;
  }
	.list-group-item:focus {
    background: #C0C0C0;
  }
</style>
