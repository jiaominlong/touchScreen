<template>
  <div class="detail">
    <Header></Header>
    <div class="detail-wrap">
      <div class="com-title">{{ company.comName }}</div>
      <div class="com-info">
        <div class="com-big-img vam" v-if="company.comPhotoURLList">
          <div class="vam-out">
            <div class="vam-in">
              <img alt="" v-for="img in company.comPhotoURLList" v-bind:src="img | modiImgSize('500', '600')">
            </div>
          </div>
        </div>
        <div class="com-sumarry">
          {{ company.comDescription }}
        </div>
        <div class="com-img" v-if="company.comPhotoURLList">
          <div class="com-img-title">公司相片</div>
          <ul class="com-img-arr">
            <li v-for = 'img in company.comPhotoURLList'>
              <div class="vam">
                <div class="vam-out">
                  <div class="vam-in"><img v-bind:src="img | modiImgSize('500', '600')" alt=""></div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="com-authen">
          <div class="com-authen-title">公司信息</div>
          <div class="com-authen-info">
            <ul class="com-authen-info-left">
              <li>
                <span>公司名称：</span>{{ company.comName | replacNull }}
              </li>
              <li>
                <span>公司电话：</span>{{ ((company.comTel === '') ? company.comMobile:company.comTel) | replacNull }}
              </li>
              <li>
                <span>公司地址：</span>{{ company.comAddressName | replacNull }}
              </li>
            </ul>
            <ul class="com-authen-info-right">
              <li>
                <span>主营产品：</span>{{ company.mainProduct | replacNull }}
              </li>
              <li>
                <span>经营品牌：</span>{{ company.brandName | replacNull }}
              </li>
              <li>
                <span>接单类型：</span>{{ (company.orderTypeNameList === undefined) ? '--' : company.orderTypeNameList }}
              </li>
            </ul>
          </div>
        </div>
        <div class="com-reg">
          <div class="com-reg-title">工商注册信息</div>
          <div class="com-reg-info">
            <ul class="com-reg-info-left">
              <li>
                <span>注 册 地 址：</span>{{ creditModel.registerAddress | replacNull }}
              </li>
              <li>
                <span>成 立 时 间：</span>{{ creditModel.establishTime | replacNull }}
              </li>
              <li>
                <span>法定代表人：</span>{{ creditModel.legalPerson | replacNull }}
              </li>
              <li>
                <span>企 业 类 型：</span>{{ creditModel.comType | replacNull }}
              </li>
              <!--<li>-->
                <!--<span>年 检 时 间：</span>{{ company.creditModel.annualSurveyTime }}-->
              <!--</li>-->
            </ul>
            <ul class="com-reg-info-right">
              <li>
                <span>注册资本：</span>{{ creditModel.registerCapital | replacNull }}
              </li>
              <li>
                <span>注 册 号：</span>{{ creditModel.registerNo  | replacNull }}
              </li>
              <li>
                <span>登记机关：</span>{{ creditModel.registerAuthority  | replacNull }}
              </li>
              <!--<li>-->
                <!--<span>营业期限：</span>{{ company.creditModel.businessTermStart }} 至 {{ company.creditModel.businessTermEnd }}-->
              <!--</li>-->
              <li>
                <span>经营范围：</span>{{ creditModel.businessScope  | replacNull }}
              </li>
            </ul>
          </div>
        </div>
        <router-link to='/list'>
          <div class="go-back">返回列表页</div>
        </router-link>
      </div>
    </div>
    <PopupPage v-on:subsearch="goSearch"></PopupPage>
  </div>
</template>

<script>
  import Header from '../components/Header.vue'
  import PopupPage from '../components/PopupPage.vue'
  export default {
    components: {Header, PopupPage},
    data () {
      return {
        id: this.$route.params.id,
        company: {},
        creditModel: {}
      }
    },
    created () {
      this.getCompany()
      this.timingGoIndex()
    },
    methods: {
      getCompany: function () {
        var that = this
        that.loading = true
        this.$api.get('/' + this.id, null, function (r) {
          that.company = r.data
          that.creditModel = r.data.creditModel || {}
        })
      },
      goSearch: function (obj) {
        this.$router.push({path: '/list', query: obj})
      },
      timingGoIndex: function () {
        var that = this
        that.clock = setTimeout(function () {
          that.$router.push({path: '/index'})
        }, 300000)
      }
    }
  }
</script>
