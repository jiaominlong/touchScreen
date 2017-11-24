<template>
  <div class="list">
    <Header></Header>
    <div class="com-list-wrap">
      <ul class="com-list" v-if="!loading">
        <li class="com-item" v-for="com in comList">
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
        </li>
      </ul>
    </div>
    <FilpPage v-on:increment="flipPage"></FilpPage>
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
        page: 1,
        totalPage: 4 // 此处需要调整
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getData: function (searchKey) {
        var that = this
        if (searchKey === 'flipPage') {
          searchKey = '?current=' + that.page
        }
        console.log(searchKey)
//        此处this指向已经改变
//        that.loading = true
//        this.$api.get('search' + searchKey, null, function (r) {
//          console.log(that.page, that.totalPage)
//          that.loading = false
//          that.comList = r.data.list
//          that.totalPage = r.data.pageModel.total
//        })
      },
      flipPage: function (page) {
        if (this.page < this.totalPage && this.page > 0 && page !== -50 && page !== -100) {
          this.page = this.page + page
          this.getData('flipPage')
        } else if (page === -50) {
          this.page = 1
          this.getData('flipPage')
        } else if (page === -100) {
          this.page = this.totalPage
          this.getData('flipPage')
        } else {
          this.page = 1
          this.getData('flipPage')
        }
      }
    }
  }
</script>


