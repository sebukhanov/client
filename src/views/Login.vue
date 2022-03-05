<template>
    <div class="Login">
      <div class="row">
        <div class="col-sm-7 col-md-5 col-lg-3 mx-auto">
          <div class="card card-signin my-5">
            <div class="card-body">
              <h5 class="card-title text-center">Вход</h5>
              <form class="form-signin" @submit.prevent="onSubmit">
                <div class="form-group">
                  <input type="text" v-model="User.Name" id="inputEmail" class="form-control" placeholder="Введите логин" required autofocus>
                </div>
                <div class="form-group">
                  <input type="password" v-model="User.Password" id="inputPassword" class="form-control" placeholder="Введите пароль" required>
                </div>
                <div class="custom-control custom-checkbox mb-3">
                  <input type="checkbox" class="custom-control-input" id="customCheck1">
                  <label class="custom-control-label" for="customCheck1">Запомнить пароль</label>
                </div>
                <button class="btn btn-lg btn-primary btn-block" type="submit">Войти</button>
                <button class="btn btn-lg btn-secondary btn-block" type="button" @click="registr">Регистрация</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    data () {
    return {
      User: {
        Name: 'Tom',
        Password: '123456'
      }
    }
    },
    methods: {
    registr () {
      this.$router.push('/registr')
    },
    onSubmit (evt) {
         this.$http.post('/api/Authentication/GetToken', this.User)
                   .then(response => {
                     this.$store.state.user.name = this.User.Name
                     this.$store.state.token = response.data.access_token       
                     this.$router.push('/chat')
          })
    }
  }
}
</script>

<style lang="scss" scoped>
  .card-signin {
    border: 0;
    border-radius: 1rem;
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  }
  .card-signin .card-title {
    margin-bottom: 2rem;
    font-weight: 500;
    font-size: 1.5rem;
  }
  .card-signin .card-body {
    padding: 2rem;
  }
.form-signin {
  width: 100%;
}
.form-signin .btn {
  font-size: 80%;
  letter-spacing: .1rem;
  font-weight: 500;
  padding: .5rem;
  transition: all 0.2s;
}
</style>
