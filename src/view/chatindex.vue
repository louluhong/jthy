<template>
<section class="chat-con">
  <div class="chat_interrogation clearfix" @click="GoRouter()">
    <div class="chat_left">
      <img src="../assets/images/interrogation_ico@2x.png" alt="" class="chat_img">
    </div>
    <div class="chat_right">
      <span class="chat_text">问诊消息</span>
      <span class="chat_time">{{SendTime}}</span>
      <span class="chat_interrogation_con xiaoxi_chat_interrogation">暂无问诊回复消息</span>
      <span class="chat_spot xiaoxi">{{wznum}}</span>
      <!-- <span class="chat_spot xiaoxi">点</span> -->
    </div>
  </div>
  <div class="chat_interrogation clearfix" @click="GoSystemDetail()">
    <div class="chat_left">
      <img src="../assets/images/sysinfo@2x.png" alt="" class="chat_img">
    </div>
    <div class="chat_right">
      <span class="chat_text">系统消息</span>
      <span class="chat_time">{{CreateTime}}</span>
      <span class="chat_interrogation_con xitong_chat_interrogation">暂无签约提醒</span>
      <span class="chat_spot xitong">{{xtnum}}</span>
    </div>
  </div>
</section>
</template>
<script>
import Vue from 'vue'
import { mapGetters,mapActions } from 'vuex'
import {apiurl} from '../service/api-config.js'
export default{
  beforeRouteEnter (to, from, next) {
    $(".mint-tabbar").show();
    $(".mint-tabbar .mint-tab-item").removeClass('is-selected');
    $(".mint-tabbar .mint-tab-item").eq(1).addClass('is-selected');
    next();
  },
  beforeRouteLeave (to, from, next) {
    var arr = new Array("/Index", "/Chat", "/Me","/Chatindex");
    if($.inArray(to.path, arr)==-1){
      $(".mint-tabbar").hide();
    }
    next();
  },
  computed:{
      ...mapGetters({
      openid:'openid',userinfo:'userinfo',userid:'userid'
    })
  },
  data() {
        return {
          chattalklist:[],
          wznum:0,
          xtnum:0,
          CreateTime:'',
          SendTime:''
        }
  },
  methods:{
    GoRouter(uid){
        this.$router.push({'name':'Chat'});
    },
    GoSystemDetail(){
       this.$router.push({'name':'SystemMesDetail'});
    }
  },
  created(){
      var vm=this;
      var headers={
        UserID:this.userid,
        Token:this.openid
      };
      $.ajax({ url: apiurl.IsExistNoReadMessage,headers:headers, success: function(data){
        console.log('问诊',data)
        if(data.Id>0){
          vm.wznum=data.Id;
          vm.SendTime=data.extra.SendTime;
          $('.xiaoxi').show();
          $('.xiaoxi_chat_interrogation').html('您有问诊回复消息');
        }else{
          $('.xiaoxi').hide();
          $('.xiaoxi_chat_interrogation').html('暂无问诊回复消息');
        }

      }});
      
      $.ajax({ url: apiurl.IsNoReadMessageSYSPat,headers:headers, success: function(data){
        console.log('系统',data)
        if(data.Id>0){
          vm.xtnum=data.Id;
          vm.CreateTime=data.extra.CreateTime;
          // console.log(vm.CreateTime)
          $('.xitong').show();
          $('.xitong_chat_interrogation').html('您有一条签约提醒');
        }else{
          $('.xitong').hide();
          $('.xitong_chat_interrogation').html('暂无签约提醒');
        }
      }});
  }
}
</script>
<style scoped>
body{
  background: #F6F6F6;
}
</style>