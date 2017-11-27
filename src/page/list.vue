<template>
  <div class="list">
    <Header></Header>
    <div class="com-list-wrap">
      <ul class="com-list" v-if="!loading">
        <li class="com-item" v-for="com in comList">
          <router-link :to="'/detail/' + com.encodedCompanyId">
            <h1>{{com.comName}}</h1>
            <div class="summary">
              <div class="img"><img v-bind:src="com.photoUrl"></div>
              <ul class="type">
                <li><i>经营类型：</i><span>{{ com.businessModelName }}</span></li>
                <li><i>主营产品：</i><span>{{ com.mainProduct }}</span></li>
                <li><i>档口位置：</i><span>{{ com.newStoreAddress }}</span></li>
              </ul>
            </div>
            <ul class="member">
              <li><span>{{ com.workerTotalAll }}人</span><i>用工人数</i></li>
              <li><span>{{ com.machineCount }}台</span><i>{{ com.machineName }}数</i></li>
              <li><span>{{ com.output }}万</span><i>年生产值</i></li>
            </ul>
          </router-link>
        </li>
      </ul>
    </div>
    <FilpPage v-bind:totalPage ='totalPage' v-on:splitParameter="parameterUrl"></FilpPage>
    <Loading v-if="loading"></Loading>
    <PopupPage v-on:subsearch="getData"></PopupPage>
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
        localUrlPara: ''
      }
    },
    created () {
      this.getData('?current=' + this.page)
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
        var id = urlObj.id
        var type = urlObj.type
        var newUrl = ''
        if (this.isEmptyObject(this.currentUrlAvg)) {
          newUrl = '?' + type + '=' + id
        } else {
          if (type === 'current') {
            if (this.currentUrlAvg.market === '' && this.currentUrlAvg.catecode === '' && this.currentUrlAvg.keyword === '') {
              newUrl = '?current=' + id
            } else if (this.currentUrlAvg.market !== '' && this.currentUrlAvg.catecode === '' && this.currentUrlAvg.keyword === '') {
              newUrl = '?current=' + id + '&market=' + this.currentUrlAvg.market
            } else if (this.currentUrlAvg.market === '' && this.currentUrlAvg.catecode !== '' && this.currentUrlAvg.keyword === '') {
              newUrl = '?current=' + id + '&catecode=' + this.currentUrlAvg.catecode
            } else if (this.currentUrlAvg.market === '' && this.currentUrlAvg.catecode === '' && this.currentUrlAvg.keyword !== '') {
              newUrl = '?current=' + id + '&keyword=' + this.currentUrlAvg.keyword
            }
          } else if (type === 'market') {
            newUrl = '?current=1&market=' + id
          } else if (type === 'catecode') {
            newUrl = '?current=1&catecode=' + id
          } else if (type === 'keyword') {
            newUrl = '?current=1&keyword=' + id
          }
        }
        console.log(newUrl)
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
          console.log(that.page, that.totalPage)
          that.loading = false
          that.comList = r.data.list
          that.currentUrlAvg = {
            market: (r.data.result.market || ''),
            catecode: (r.data.result.catecode || ''),
            keyword: (r.data.result.keyword || ''),
            current: (r.data.pageModel.current)
          }
          console.log(that.currentUrlAvg)
          that.totalPage = r.data.pageModel.total
        })
      }
    }
  }
</script>


