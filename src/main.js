// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vue2-animate/dist/vue2-animate.min.css'
// 引用API文件
import api from './api/index'
// 将API文件绑定到全局
Vue.prototype.$api = api

Vue.config.productionTip = false

// 过滤器1 过滤值为空
Vue.filter('replacNull', function (value) {
  // console.log('已经进入空值过滤器了', value)
  if (value) {
    return value
  } else {
    return '--'
  }
})
// 过滤器2 过滤图片大小
Vue.filter('modiImgSize', function (value, size, targetSize) {
  // console.log('已经进入图片过滤器了', value, size)
  var newsize = targetSize + 'x' + targetSize
  if (value === undefined) {
    return 'http://image.csfz.cn/product_pic/9bkk9k9ss9/' + newsize + '.jpg'
  } else {
    var str = size + 'x' + size
    return value.replace(str, newsize)
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
