<template>
  <div>
    <nav class="navbar navbar-light">
      <div class="container">
        <nuxt-link exact exact-active-class="active" class="navbar-brand" to="/">conduit</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <nuxt-link exact exact-active-class="active" class="nav-link" to="/">Home</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link ecact exact-active-class="active" class="nav-link" to="/editor"><i class="ion-compose"></i>&nbsp;New Post</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link exact exact-active-class="active" class="nav-link" to="/settings"><i class="ion-gear-a"></i>&nbsp;Settings</nuxt-link>
            <!-- <a class="nav-link" href="">
              <i class="ion-gear-a"></i>&nbsp;Settings
            </a> -->
          </li>
          <li class="nav-item">
            <nuxt-link v-if="user" exact exact-active-class="active" class="nav-link" :to="`@${user.username}`">
              <img class="user-pic">{{ user.username }}
            </nuxt-link>
            <nuxt-link v-else exact exact-active-class="active" class="nav-link" to="/login">
              Sign in
            </nuxt-link>
          </li>
        </ul>
      </div>
    </nav>
    <nuxt-child />
    <footer>
      <div class="container">
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['user'])
  }
};
</script>

<style>
</style>