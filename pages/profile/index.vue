<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <button class="btn btn-sm btn-outline-secondary action-btn" v-if="user.username !== profile.username">
              <i class="ion-plus-round"></i>
              &nbsp; Follow {{ profile.username }}
            </button>
             <button class="btn btn-sm btn-outline-secondary action-btn" v-else @click="gotoSettings">
              <i class="ion-gear-a"></i>
              &nbsp; Edit Profile Settings
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <!-- <a class="nav-link active" href="">My Articles</a> -->
                <nuxt-link :class="tab !== 'favorites' ? 'active' : ''" class="nav-link" :to="`@${profile.username}`">My Articles</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link :class="tab === 'favorites' ? 'active' : ''" class="nav-link" :to="{ query: { tab: 'favorites' } }">Favorited Articles</nuxt-link>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="article in articles" :key="article.slug">
            <div class="article-meta">
              <a href=""><img :src="article.author.image" /></a>
              <div class="info">
                <a href="" class="author">{{ article.author.username }}</a>
                <span class="date">{{ article.updatedAt }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right" :class="article.favorited ? 'active' : ''" :disabled="favoriteDisabled" @click="favorite(article)">
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getProfile, getArticleList, favoriteArticle, unfavoriteArticle } from '@/apis'

export default {
  name: 'profile',
  data () {
    return {
      favoriteDisabled: false
    }
  },
  async asyncData({ store, params, query }) {
    const { username } = params
    const { tab } = query
    const obj = tab === 'favorites' ? { favorited: username } : { author: username }
    const [ profileRes, articleRes ] = await Promise.all([getProfile(username), getArticleList(obj)])
    const { profile } = profileRes.data
    let { articles, articlesCount } = articleRes.data;
    // console.log(profile)
    return {
      profile,
      articles,
      articlesCount,
      tab
    }
  },
  watchQuery: ['tab'],
  computed: {
    ...mapState(['user'])
  },
  methods: {
    gotoSettings () {
      this.$router.push('/settings')
    },
    async favorite (article) {
      let { favoritesCount, slug, favorited } = article
      if(!favorited) return
      await unfavoriteArticle(slug)
      // TODO: 刷新asyncData
    }
  }
};
</script>

<style>
</style>