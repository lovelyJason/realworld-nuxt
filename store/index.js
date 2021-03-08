// 必须导出才能被使用,且state要导出为一个函数
const CookieParser = process.server ? require('cookieparser') : undefined

export const state = () => {
  return {
    foo: 'bar',
    user: null
  }
}

export const mutations = {
  setUser (state, payload) {
    state.user = payload
  }
}

export const actions = {
  // 服务端渲染初始化state数据,获取请求头的cookie存储到仓库
  nuxtServerInit({ commit }, { req }) {
    const cookie = CookieParser.parse(req.headers.cookie || '')
    // console.log(cookie)
    let user = null
    try {
      user = JSON.parse(cookie.user)
    } catch (error) {
      
    }
    commit('setUser', user)
  }
}