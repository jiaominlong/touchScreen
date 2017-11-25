<template>
  <div class="detail">
    <Header></Header>
    <div class="detail-wrap">
      <div class="com-title">{{ company.comName }}</div>
      <div class="com-info">
        <div class="com-big-img"></div>
        <div class="com-sumarry">
          {{ company.comDescription }}
        </div>
        <div class="com-img">
          <div class="com-img-title">公司相册</div>
          <ul class="com-img-arr">
            <li v-for = 'img in company.comPhotoURLList'>
              <img v-bind:scr="img" alt="">
            </li>
          </ul>
        </div>
        <!--认证信息无意义-->
        <!--<div class="com-authen">-->
          <!--<div class="com-authen-title">认证信息</div>-->
          <!--<div class="com-authen-info">-->
            <!--<ul class="com-authen-info-left">-->
              <!--<li>-->
                <!--<span>公司名称：</span>{{ company.comName }}-->
              <!--</li>-->
              <!--<li>-->
                <!--<span>经营范围：</span>常熟市服装城魏春商行-->
              <!--</li>-->
              <!--<li>-->
                <!--<span>经营模式：</span>常熟市服装城魏春商行-->
              <!--</li>-->
            <!--</ul>-->
            <!--<ul class="com-authen-info-right">-->
              <!--<li>-->
                <!--<span>成立时间：</span>常熟市服装城魏春商行-->
              <!--</li>-->
              <!--<li>-->
                <!--<span>申 请 人：</span>常熟市服装城魏春商行-->
              <!--</li>-->
              <!--<li>-->
                <!--<span>认证地址：</span>{{ company.creditModel.certAddress }}-->
              <!--</li>-->
            <!--</ul>-->
          <!--</div>-->
        <!--</div>-->
        <div class="com-authen">
          <div class="com-authen-title">公司信息</div>
          <div class="com-authen-info">
            <ul class="com-authen-info-left">
              <li>
                <span>公司名称：</span>{{ company.comName }}
              </li>
              <li>
                <span>公司电话：</span>{{ company.comTel }}
              </li>
              <li>
                <span>公司地址：</span>{{ company.comAddressName }}
              </li>
            </ul>
            <ul class="com-authen-info-right">
              <li>
                <span>主营产品：</span>{{ company.mainProduct }}
              </li>
              <li>
                <span>经营品牌：</span>{{ company.brandName }}
              </li>
              <li>
                <span>接单类型：</span>{{ company.orderTypeNameList[0] }}
              </li>
            </ul>
          </div>
        </div>
        <div class="com-reg">
          <div class="com-reg-title">工商注册信息</div>
          <div class="com-reg-info">
            <ul class="com-reg-info-left">
              <li>
                <span>注 册 地 址：</span>{{ company.creditModel.registerAddress }}
              </li>
              <li>
                <span>成 立 时 间：</span>{{ company.creditModel.establishTime }}
              </li>
              <li>
                <span>法定代表人：</span>{{ company.creditModel.legalPerson }}
              </li>
              <li>
                <span>企 业 类 型：</span>{{ company.creditModel.comType }}
              </li>
              <!--<li>-->
                <!--<span>年 检 时 间：</span>{{ company.creditModel.annualSurveyTime }}-->
              <!--</li>-->
            </ul>
            <ul class="com-reg-info-right">
              <li>
                <span>注册资本：</span>{{ company.creditModel.registerCapital }}
              </li>
              <li>
                <span>注 册 号：</span>{{ company.creditModel.registerNo }}
              </li>
              <li>
                <span>登记机关：</span>{{ company.creditModel.registerAuthority }}
              </li>
              <!--<li>-->
                <!--<span>营业期限：</span>{{ company.creditModel.businessTermStart }} 至 {{ company.creditModel.businessTermEnd }}-->
              <!--</li>-->
              <li>
                <span>经营范围：</span>{{ company.creditModel.businessScope }}
              </li>
            </ul>
          </div>
        </div>
        <router-link to='/list'>
          <div class="go-back">返回列表页</div>
        </router-link>
      </div>
    </div>
    <PopupPage></PopupPage>
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
        company: {}
      }
    },
    created () {
      this.getCompany()
    },
    methods: {
      getCompany: function () {
        var that = this
        that.loading = true
        this.$api.get('/' + this.id, null, function (r) {
          that.company = r.data
        })
      }
    }
  }
</script>
