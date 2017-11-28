<template>
    <div class="list">
      <Header></Header>
      <div class="com-list-wrap">
        <ul class="com-list" v-if="!loading">
          <li class="com-item" v-for="com in comList">
            <router-link :to="'/detail/' + com.encodedCompanyId">
              <h1>{{com.comName}}</h1>
              <div class="summary">
                <div class="img vam">
                  <div class="vam-out">
                    <div class="vam-in"><img v-bind:src="com.photoUrl | modiImgSize('200', '100') "></div></div>
                  </div>
                <ul class="type">
                  <li><i>经营类型：</i><span>{{ com.businessModelName }}</span></li>
                  <li><i>主营产品：</i><span>{{ com.mainProduct }}</span></li>
                  <li><i>档口位置：</i><span>{{ com.newStoreAddress }}</span></li>
                </ul>
              </div>
              <ul class="member">
                <li><span>{{ com.workerTotalAll }}</span><i>用工人数</i></li>
                <li><span>{{ com.machineCount }}台</span><i>{{ com.machineName }}数</i></li>
                <li><span>{{ com.yearProduction | replacNull }}</span><i>年生产值</i></li>
              </ul>
            </router-link>
          </li>
        </ul>
      </div>
      <FilpPage v-bind:totalPage ='totalPage' v-on:splitParameter="parameterUrl"></FilpPage>
      <Loading v-if="loading"></Loading>
      <PopupPage v-on:subsearch="parameterUrl"></PopupPage>
    </div>
</template>
<script>
  import Header from '../components/Header.vue'
  import Loading from '../components/Loading.vue'
  import FilpPage from '../components/FlipPage.vue'
  import PopupPage from '../components/PopupPage.vue'
  export default {
    components: { Header, Loading, FilpPage, PopupPage },
    data () {
      return {
        comList: {},
        loading: false,
        urlParameter: '',
        page: 1,
        totalPage: 0, // 此处需要调整
        currentUrlAvg: {},
        localUrlPara: '',
        clock: null
      }
    },
    created () {
      if (this.isEmptyObject(this.$route.query)) {
        this.getData('?current=' + this.page)
      } else {
        this.parameterUrl(this.$route.query)
      }
      this.timingGoIndex()
    },
    methods: {
      parameterUrlOld: function (parameter) {
        if (arguments.length !== 0) {
          for (var i in arguments) {
            this.urlParameter += arguments[i]
          }
        }
        this.getData(this.urlParameter)
      },
      // *************新组件添加开始**************
      parameterUrl: function (urlObj) {
        console.log(urlObj, '穿入參數為他！')
        var id = urlObj.id
        var type = urlObj.type
        var newUrl = ''
        if (this.isEmptyObject(this.currentUrlAvg)) {
          newUrl = '?' + type + '=' + id
        } else {
          if (type === 'current') {
            if (this.currentUrlAvg.market === '' && this.currentUrlAvg.catcode === '' && this.currentUrlAvg.keyword === '') {
              newUrl = '?current=' + id
            } else if (this.currentUrlAvg.market !== '' && this.currentUrlAvg.catcode === '' && this.currentUrlAvg.keyword === '') {
              newUrl = '?current=' + id + '&market=' + this.currentUrlAvg.market
              console.log(newUrl, 'market不为空')
            } else if (this.currentUrlAvg.market === '' && this.currentUrlAvg.catcode !== '' && this.currentUrlAvg.keyword === '') {
              newUrl = '?current=' + id + '&catcode=' + this.currentUrlAvg.catcode
              console.log(newUrl, 'catcode不为空')
            } else if (this.currentUrlAvg.market === '' && this.currentUrlAvg.catcode === '' && this.currentUrlAvg.keyword !== '') {
              newUrl = '?current=' + id + '&keyword=' + this.currentUrlAvg.keyword
            }
          } else if (type === 'market') {
            newUrl = '?current=1&market=' + id
          } else if (type === 'catcode') {
            newUrl = '?current=1&catcode=' + id
          } else if (type === 'keyword') {
            newUrl = '?current=1&keyword=' + id
          }
        }
        this.getData(newUrl)
        clearTimeout(this.clock)
        this.timingGoIndex()
      },

      isEmptyObject: function (obj) {
      // 判断对象是否为空
        for (var key in obj) {
          return false // 返回false，不为空对象
        }
        return true // 返回true，为空对象
      },
      // **************新组件添加结束**************/
      getData: function (searchKey) {
        var that = this
        that.loading = true
        this.$api.get('search' + searchKey, null, function (r) {
          that.loading = false
          that.comList = r.data.list
          that.currentUrlAvg = {
            market: (r.data.result.market || ''),
            catcode: (r.data.result.catcode || ''),
            keyword: (r.data.result.keyword || ''),
            current: (r.data.pageModel.current)
          }
          console.log(that.currentUrlAvg, '返回參數複製成功')
          that.totalPage = r.data.pageModel.total
        })
      },
      timingGoIndex: function () {
        var that = this
        that.clock = setTimeout(function () {
          that.$router.push({path: '/index'})
        }, 360000)
      }
    }
  }
</script>


