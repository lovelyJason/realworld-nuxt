import axios from 'axios'

export const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})

export default ({ store }, inject) => {
  // 如果是服务端渲染，请求拦截器作为utils导入是获取不到的store的，当我们要添加token到头部时,必须作为插件来进行注入
  request.interceptors.request.use(function (config) {
    // Do something before request is sent
    // 注意一开始user为null
    const token = store.state.user ? store.state.user.token : ''
    if(token) {
      config.headers.Authorization = `Token ${token}`
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
}