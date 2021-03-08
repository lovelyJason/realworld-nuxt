<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <a href="">Have an account?</a>
          </p>

          <ul class="error-messages">
            <li>That email is already taken</li>
          </ul>

          <form>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model="user.email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" type="button" @click="login">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/apis'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  name: 'login',
  data () {
    return {
      user: {
        email: '1248394650@qq.com',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      try {
        const res = await login({
          user: this.user
        })
        const { data: { user } } = res 
        // 保存登录态并持久化
        this.$store.commit('setUser', user)
        Cookie.set('user', user)
        this.$router.push('/')
        
      } catch (error) {
        
      }
    }
  }
};
</script>

<style>
</style>