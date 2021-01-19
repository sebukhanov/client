<template>
  <div class="Registr">
    <div class="row">
      <div class="col-sm-7 col-md-5 col-lg-3 mx-auto">
        <div class="card card-signout my-5">
          <div class="card-body">
            <h5 class="card-title text-center">Регистрация</h5>
            <form class="form-signout" @submit.prevent="onSubmit">
              <div class="form-group">
                <input type="text" v-model="User.Name" id="inputUserame" class="form-control" placeholder="Логин" required>
              </div>
              <div class="form-group">
                <input type="password" v-model="User.Password" id="inputPassword" class="form-control" placeholder="Пароль" required>
              </div>
              <div class="form-group">
                <input type="password" id="inputConfirmPassword" class="form-control" placeholder="Подтвердите пароль" required>
              </div>
              <button class="btn btn-lg btn-primary btn-block" type="submit">Зарегистрироваться</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Registr',
    data () {
    return {
      User: {
        Name: '',
        Password: ''
      }
    }
    },
    methods: {
    onSubmit (evt) {
         this.$http.post('/api/Registration/AddUser', this.User)
         .then(response => {
           //this.$chatHub.userAdeed(this.User.Name)
           this.$router.push('/')
           })
         .catch(error => console.log(error))
    }
  }
}
</script>

<style lang="scss" scoped>
.card-signout {
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}
.card-signout .card-title {
  margin-bottom: 2rem;
  font-weight: 500;
  font-size: 1.5rem;
}
.card-signout .card-body {
  padding: 2rem;
}
.form-signout {
  width: 100%;
}
.form-signout .btn {
  font-size: 80%;
  letter-spacing: .1rem;
  font-weight: 500;
  padding: .5rem;
  transition: all 0.2s;
}
</style>
