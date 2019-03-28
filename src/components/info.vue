<template>
   <div class="user-info">
        <div class="info-item">
            <span class="info-title">姓名</span>
            <span class="info-content">{{userinfo.name}}</span>
        </div>
        <div class="info-item">
            <span class="info-title">证件号</span>
            <span class="info-content">{{userinfo.idno}}</span>
        </div>
        <div class="info-item">
            <span class="info-title">警号</span>
            <span class="info-content">{{userinfo.policeno}}</span>
        </div>
        <div class="info-item">
            <span class="info-title">所属部门</span>
            <span class="info-content">{{userinfo.department}}</span>
        </div>
        <div class="info-item">
            <span class="info-title">岗位</span>
            <span class="info-content">{{userinfo.job}}</span>
        </div>
        <group class="is-loaned-outer">
            <x-switch class="is-loaned" title="是否借调" v-model="isLoaned"></x-switch>
        </group>
        <x-button class="get-into" plain type="primary" @click.native="getIntoMainPage">进入智能助理</x-button>
   </div>
</template>

<script>
import { XSwitch, Group, XButton } from 'vux'
export default {
  name: 'info',
  components: {
     XSwitch, 
     Group,
     XButton 
  },
  data () {
    return {
       userinfo: {
           name: "张宇",
           idno: "210152********1598",
           policeno: "H25489",
           department: "上海市公安局网络安全部",
           job: "普通科员"
       },
       isLoaned: true
    }
  },
  computed: {
   
  },
  methods: {
    getIntoMainPage: function() {
        this.$router.push({path:'/assistant'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../assets/scss/login_info.scss';
</style>
