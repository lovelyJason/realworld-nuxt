import { request } from '@/plugins/request'

export const login = (data) => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data
  })
}
// 注册
export const register = (data) => {
  return request({
    method: 'POST',
    url: '/api/users',
    data
  })
}
// 文章列表
export const getArticleList = (params) => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}
// 文章列表
export const getTagList = (params) => {
  return request({
    method: 'GET',
    url: '/api/tags',
    params
  })
}
// 用户关注文章列表
export const getFeedArticleList = (params) => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params
  })
}
// 文章详情
export const getFeedArticleInfo = (slug) => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}
// 更新账号资料
export const updateUser = (data) => {
  return request({
    method: 'PUT',
    url: '/api/user',
    data
  })
}
// 个人信息
export const getProfile = (username) => {
  return request({
    method: 'GET',
    url: `/api/profiles/${username}`,
  })
}
// 喜爱文章
export const favoriteArticle  = (slug) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`,
  })
}
export const unfavoriteArticle  = (slug) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`,
  })
}
// 评论列表
export const getCommentsBySlug = (slug) => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`,
  })
}
// 增加评论
export const addCommentBySlug = (slug, data) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data
  })
}
// 新增文章
export const addArticle = (data) => {
  return request({
    method: 'POST',
    url: `/api/articles`,
    data
  })
}

