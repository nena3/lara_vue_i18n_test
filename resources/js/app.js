require('./bootstrap')

import VueRouter from 'vue-router'
import VueCookie from 'vue-cookie'
import VueI18n from 'vue-i18n'
// import Vuex from 'vuex'

window.Vue = require('vue')
Vue.use(VueRouter)
Vue.use(VueCookie)
Vue.use(VueI18n)

const i18n = new VueI18n({
  messages: require('./language.json'),
  fallbackLocale: 'ja'
});

Vue.component('switch-langage', require('./components/SwitchLanguageComponent'));

const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', component: require('./components/TopComponent')},
    {path: '/search/:pref', component: require('./components/SearchComponent')},
    {path: '/detail/:id', component: require('./components/DetailComponent'), name: 'Detail'},
  ],
  base: APP_ROOT_URL
})

const app = new Vue({
  router,
  i18n,
  data() {
    return {
      lang: this.$cookie.get('lang')
    }
  },
  watch: {
    lang() {
      this.$i18n.locale = this.lang
    }
  },
  mounted() {
    if (this.lang !== 'ja' && this.lang !== 'en') {
      this.lang = 'ja'
    }
    this.$i18n.locale = this.lang;
  },
})

app.$mount('#app')
