module.exports = {
  router: {
    extendRoutes(routes, resolve) {
      routes.splice(0)
      routes.push({
        path: '/',
        component: resolve(__dirname, 'pages/layout'),
        children: [
          {
            name: 'home',
            path: '',
            component: resolve(__dirname, 'pages/home'),
          },
          {
            name: 'login',
            path: '/login',
            component: resolve(__dirname, 'pages/login')
          },
          {
            name: 'register',
            path: '/register',
            component: resolve(__dirname, 'pages/register')
          },
          {
            name: 'profile',
            path: '/@:username',
            component: resolve(__dirname, 'pages/profile')
          },
          {
            name: 'settings',
            path: '/settings',
            component: resolve(__dirname, 'pages/settings')
          },
          {
            name: 'editor',
            path: '/editor',
            component: resolve(__dirname, 'pages/editor')
          },
          {
            name: 'article',
            path: '/article/:slug',
            component: resolve(__dirname, 'pages/article')
          },
        ]
      })
    }
  },
  plugins: ['~/plugins/request.js'],
  // build后start的可达ip和应用端口
  server: {
    host: '0.0.0.0',
    port: 9000
  }
}