<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="updateUser.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="updateUser.username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="updateUser.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="updateUser.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="updateUser.password"
                />
              </fieldset>
              <fieldset class="form-group error-messages">
                <div v-for="(error, key) in errors" :key="key">
                  <span>{{ key }}</span>
                  <span v-for="val in error" :key="val">
                    {{ val }}
                  </span>
                </div>
              </fieldset>
              <button type="button" class="btn btn-lg btn-primary pull-xs-right" @click="onUpdateClick">
                Update Settings
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { updateUser } from '@/apis'

export default {
  name: 'settings',
  data () {
    return {
      updateUser: {
        username: '',
        password: '',
        email: '',
        bio: '',
        image: ''
      },
      errors: null  // { email: [] }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async onUpdateClick () {
      try {
        const data = {
          user: this.updateUser
        }
        await updateUser(data)
        this.$router.push(`/@${this.updateUser.username}`)
      } catch (error) {
        console.dir(error)
        this.errors = error.response.data.errors
      }
    }
  },
  mounted () {
    this.updateUser.username = this.user.username
  }
};
</script>

<style>
</style>