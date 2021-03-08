<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <div class="article-meta">
          <nuxt-link
            :to="{
              name: 'profile',
              params: { username: article.author.username },
            }"
            ><img :src="article.author.image"
          /></nuxt-link>
          <div class="info">
            <nuxt-link
              class="author"
              :to="{
                name: 'profile',
                params: { username: article.author.username },
              }"
              >{{ article.author.username }}</nuxt-link
            >
            <span class="date">{{ article.updatedAt }}</span>
          </div>
          <button class="btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round"></i>
            &nbsp; Follow {{ article.author.username }}
            <!-- <span class="counter">(10)</span> -->
          </button>
          &nbsp;&nbsp;
          <button class="btn btn-sm btn-outline-primary">
            <i class="ion-heart"></i>
            &nbsp; Favorite Post
            <span class="counter">({{ article.favoritesCount }})</span>
          </button>
        </div>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <!-- <p>
            Web development technologies have evolved at an incredible clip over
            the past few years.
          </p> -->
          <h2 id="introducing-ionic">{{ article.title }}</h2>
          <p>{{ article.body }}</p>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <div class="article-meta">
          <nuxt-link
            :to="{
              name: 'profile',
              params: { username: article.author.username },
            }"
            ><img :src="article.author.image"
          /></nuxt-link>
          <div class="info">
            <nuxt-link
              class="author"
              :to="{
                name: 'profile',
                params: { username: article.author.username },
              }"
              >{{ article.author.username }}</nuxt-link
            >
            <span class="date">{{ article.updatedAt }}</span>
          </div>
          <button class="btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round"></i>
            &nbsp; Follow {{ article.author.username }}
            <!-- <span class="counter">(10)</span> -->
          </button>
          &nbsp;&nbsp;
          <button class="btn btn-sm btn-outline-primary">
            <i class="ion-heart"></i>
            &nbsp; Favorite Post
            <span class="counter">({{ article.favoritesCount }})</span>
          </button>
        </div>
      </div>
      <!-- 评论列表 -->
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
              <textarea
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
                v-model="body"
              ></textarea>
            </div>
            <div class="card-footer">
              <img
                :src="article.author.image"
                class="comment-author-img"
              />
              <button type="button" class="btn btn-sm btn-primary" @click="onCommentAdd">Post Comment</button>
            </div>
          </form>

          <div class="card" v-for="comment in comments" :key="comment.id">
            <div class="card-block">
              <p class="card-text">
               {{ comment.body }}
              </p>
            </div>
            <div class="card-footer">
              <nuxt-link class="comment-author" :to="{ name: 'profile', params: { username: comment.author.username } }"><img class="comment-author-img" :src="comment.author.image" /></nuxt-link>
              &nbsp;
              <nuxt-link class="comment-author" :to="{ name: 'profile', params: { username: comment.author.username } }">{{ comment.author.username }}</nuxt-link>
              <span class="date-posted">{{ comment.createdAt }}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFeedArticleInfo, getCommentsBySlug, addCommentBySlug } from "@/apis";

export default {
  name: "articleIndex",
  data () {
    return {
      body: ''
    }
  },
  async asyncData({ isDev, route, store, env, params, query }) {
    const { slug } = params;
    const [ articleRes, commentsRes ] = await Promise.all([ getFeedArticleInfo(slug), getCommentsBySlug(slug) ])
    const { article } = articleRes.data
    const { comments } = commentsRes.data
    return {
      article,
      comments
    };
  },
  methods: {
    async onCommentAdd () {
      const { slug } = this.$route.params;
      await addCommentBySlug(slug, {
        comment: {
          body: this.body
        }
      })
      this.body = ''
      getCommentsBySlug(slug).then(res => {
        const { comments } = res.data
        this.comments = comments
      })
    }
  }
};
</script>

<style>
</style>