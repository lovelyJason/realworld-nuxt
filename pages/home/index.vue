<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link
                  :class="{ active: tab === 'your_feed' }"
                  class="nav-link"
                  :to="{ query: { tab: 'your_feed' } }"
                  >Your Feed</nuxt-link
                >
                <!-- <a class="nav-link disabled" href="">Your Feed</a> -->
              </li>
              <li class="nav-item">
                <!-- <a class="nav-link active" href="">Global Feed</a> -->
                <nuxt-link
                  :class="{ active: tab === 'global_feed' }"
                  class="nav-link"
                  :to="{ query: { tab: 'global_feed' } }"
                  >Global Feed</nuxt-link
                >
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  :class="{ active: tag }"
                  class="nav-link"
                  :to="{ query: { tag: tag } }"
                  ><i class="ion-pound"></i> {{ tag }}</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="val in articles" :key="val.slug">
            <div class="article-meta">
              <!-- <a href="profile.html"><img :src="val.author.image" /></a> -->
              <nuxt-link :to="{ name: 'profile', params: { username: val.author.username } }"><img :src="val.author.image" /></nuxt-link>
              <div class="info">
                <nuxt-link class="author" :to="{ name: 'profile', params: { username: val.author.username } }">{{ val.author.username }}</nuxt-link>
                <span class="date">{{ val.updatedAt }}</span>
              </div>
              <button :class="val.favorited ? 'active' : ''" class="btn btn-outline-primary btn-sm pull-xs-right" :disabled="favorited" @click="onFavoriteClick(val)">
                <i class="ion-heart"></i> {{ val.favoritesCount }}
              </button>
            </div>
            <nuxt-link class="preview-link" :to="{ name: 'article', params: { slug: val.slug } }">
              <h1>{{ val.title }}</h1>
              <p>{{ val.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                class="tag-pill tag-default"
                :to="{ query: { tag: val, tab: 'tag' } }"
                v-for="val in tags"
                :key="val"
                >{{ val }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
      <nav>
        <ul class="pagination">
          <!-- ngRepeat: pageNumber in $ctrl.pageRange($ctrl.totalPages) -->
          <li
            class="page-item"
            :class="val === page ? 'active' : ''"
            v-for="val in totalPage"
            :key="val"
          >
            <nuxt-link class="page-link" :to="{ query: { page: val } }">{{ val }}</nuxt-link>
          </li>
          <!-- end ngRepeat: pageNumber in $ctrl.pageRange($ctrl.totalPages) -->
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getArticleList, getTagList, getFeedArticleList, favoriteArticle, unfavoriteArticle } from "@/apis";

export default {
  name: "home",
  data () {
    return {
      favorited: false
    }
  },
  computed: {
    ...mapState(["user"]),
  },
  async asyncData({ query, store }) {
    let { tag, page_size, tab = "global_feed" } = query;
    let page = Number.parseInt(query.page) || 1;
    let limit = Number.parseInt(page_size) || 20;
    const data = {
      tag,
      limit,
      offset: (page - 1) * limit,
    };
    // watchQuery监听的结果可能导致不必要的函数调用
    // console.log(tab)
    const getArticlesApi =
      store.state.user && tab === "your_feed"
        ? getFeedArticleList
        : getArticleList;
    const [articelRes, tagRes] = await Promise.all([
      getArticlesApi(data),
      getTagList(),
    ]);
    const { articles, articlesCount } = articelRes.data;
    const totalPage = Math.ceil(articlesCount / limit)
    const { tags } = tagRes.data;
    return {
      articles,
      articlesCount,
      limit,
      page,
      tab,
      tag,
      tags,
      totalPage
    };
  },
  // nuxt提供的api,query更改时执行组件的方法
  watchQuery: ["page", "tab", "tag"],
  methods: {
    async onFavoriteClick (article) {
      let { slug } = article
      this.favorited = true
      if(!article.favorited) {
        await favoriteArticle(slug)
        this.favorited = false
        // 解构出来的数据没有了引用关系不能直接修改
        article.favoritesCount++
        article.favorited = true
      } else {
        await unfavoriteArticle(slug)
        this.favorited = false
        article.favoritesCount--
        article.favorited = false
      }
    }
  }
};
</script>

<style>
</style>