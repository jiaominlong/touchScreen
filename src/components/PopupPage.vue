<template>
  <div class="search-pupup">
    <div class="popup-wrap">
      <div class="mask" v-if="display.alpha" v-on:click="popup('none')"></div>
      <div class="select-content-wrap" v-if="display.alpha">
        <div class="select-content">
          <ul class="select-item market" v-if="display.marketshow">
            <li v-for='(item,index) in marketList' v-on:click="toggleClass('market',index)" :class='{hover:index === numberMarket}'>{{ item.name }}</li>
          </ul>
          <ul class="select-item cate" v-if="display.cateshow">
            <li v-for='(item,index) in cateList' v-on:click="toggleClass('cate',index)" :class='{hover:index === numberCate}'>{{ item.name }}</li>
          </ul>
          <ul class="select-handle">
            <li class="submit" v-on:click="submitSearch(1)"></li>
            <li class="cancel" v-on:click="popup('none')"></li>
          </ul>
        </div>
      </div>
    </div>
    <!--bottom search-->
    <div class="search-bar">
      <div class="handle">
        <div class="city-search" v-on:click="popup('market')">
          <span>{{ selectMarket }}</span>
          <div class="ico_arr arr_city" v-if="display.marketshow"></div>
        </div>
        <div class="cate-search" v-on:click="popup('cate')">
          <span>{{ selectCate }}</span>
          <div class="ico_arr arr_cate" v-if="display.cateshow"></div>
        </div>
        <div class="keyword-search">
          <input type="text" v-model="searchKeyWorld" placeholder="请输入检索关键字">
          <div class="button-search" v-on:click="submitSearch(2)">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        numberMarket: 0,
        numberCate: 0,
        searchKeyId: {},
        searchKeyWorld: '',
        selectMarket: '请选择商场',
        selectCate: '请选择品类',
        display: {
          marketshow: false,
          cateshow: false,
          alpha: false
        },
        marketList: [{name: '全部', id: ''},
          {name: '天虹服装城', id: 0},
          {name: '服装城服饰广场', id: 1},
          {name: '招商场', id: 2},
          {name: '八达市场', id: 3},
          {name: '世界服装中心', id: 4},
          {name: '四号桥外贸村', id: 5},
          {name: '环球服装城', id: 6},
          {name: '休闲服饰商贸城', id: 7},
          {name: '宝鼎男装写字楼', id: 8},
          {name: '国际服装城', id: 10},
          {name: '中国童装中心', id: 11},
          {name: '华盛男装写字楼', id: 12},
          {name: '中国男装中心', id: 14},
          {name: '中国时装中心', id: 15}
        ],
        cateList: [{name: '全部', id: ''},
          {name: '男装', id: 1},
          {name: '女装', id: 2},
          {name: '童装', id: 3},
          {name: '中老年装', id: 4}
        ]
      }
    },
    methods: {
      popup: function (target) {
        if (target === 'market') {
          this.display = {
            marketshow: true,
            cateshow: false,
            alpha: true
          }
        } else if (target === 'cate') {
          this.display = {
            marketshow: false,
            cateshow: true,
            alpha: true
          }
        } else if (target === 'none') {
          this.display = {
            marketshow: false,
            cateshow: false,
            alpha: false
          }
        }
      },
      submitSearch: function (type) {
        if (type === 1) {
          console.log(this.searchKeyId)
          this.$emit('subsearch', {type: this.searchKeyId.type, id: this.searchKeyId.id})
        } else {
          this.$emit('subsearch', {type: 'keyword', id: this.searchKeyWorld})
          this.searchKeyWorld = ''
        }
        this.popup('none')
      },
      toggleClass: function (target, index) {
        if (target === 'market') {
//          组合url
          this.searchKeyId = {type: 'market', id: this.marketList[index].id}
          this.numberMarket = index
//          更改搜索按钮文字
          this.toggleTitle(target, this.marketList[index].name)
        } else {
//          组合Url
          this.searchKeyId = {type: 'catcode', id: this.cateList[index].id}
          this.numberCate = index
//          更改搜索按钮文字
          this.toggleTitle(target, this.cateList[index].name)
        }
      },
      toggleTitle: function (target, name) {
        if (name === '全部') {
          if (target === 'market') {
            this.selectMarket = '请选择商场'
          } else {
            this.selectCate = '请选择品类'
          }
        } else {
          if (target === 'market') {
            this.selectMarket = name
            this.selectCate = '请选择品类'
          } else {
            this.selectCate = name
            this.selectMarket = '请选择商场'
          }
        }
      }
    }
  }
</script>
