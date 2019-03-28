<template>
  <div class="login-page">
    <div class="login-logo">
      <img src="../assets/image/logo.png" alt="">
    </div>
    <div class="tips">{{ msg }}</div>
    <div class="login-box">
        <div class="header-img">
           <img src="../assets/image/lay.jpg" alt="">
        </div>
        <div class="idcard-no"><span>{{ idcard }}</span></div>
        <group class="input-name">
             <x-input title="" v-model="loginForm.password" placeholder="请设置密码">
                <input slot="right" type="checkbox"/>
            </x-input>
        </group>
        <x-button class="login-btn" plain type="primary" @click.native="login">立即登录</x-button>
    </div>
    <div class="bottom-tips">DATA ASSISTANT</div>
    <!-- <h2>{{author}}</h2>
    <button @click="change">vuex点击测试</button> -->
    <!-- <Test v-bind:c="c"  :data="data" v-on:listenchild="showchildmsg"></Test> -->
  </div>
</template>

<script>
import Test from '@/components/child/testv'
import { XInput, Group, XButton } from 'vux'
export default {
  name: 'home',
  components: {
     Test,
     Group,
     XInput,
     XButton
  },
  data () {
    return {
      msg: '你想要的这里都有',
      idcard: '321081198608016734',
      loginForm: {
         username: "",
         password: ""
      }
      // c: [1,2,3],
      // data: "time to show msg"
    }
  },
  computed: {
    author() {
      return this.$store.state.author
    }
  },
  methods: {
      showchildmsg: function(data) {
         this.data = data;
         console.log("data from child ===", data);
      },
      change: function() {
        this.$store.commit("newAuthor", "hahhah");
      },
      login: function() {
        this.$router.push({path:'/info'})
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../assets/scss/home.scss';
</style>
