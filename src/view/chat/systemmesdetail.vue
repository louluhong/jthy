<template>
<section class="system_container">
  <span class="bjbtn" @click="bjclick()" v-show="bjbtn">编辑</span>
  <div class="system_mes">
    <ul class="system_ul">
      <li class="system_li" v-for="(item,index) in chattalklist">
        <span class="system_time">{{item.strCreateTime}}</span>
        <div class="system_con" @click="goRouter($event,item.AttachContexts)" :data-id ="item.MessageSYSInfoId" :data-type = "item.MesType">
          <span class="system_con_title">{{item.Title}}</span>
          <span class="system_con_content">{{item.Contexts}}</span>
          <img v-show="btnshow" class="system_con_imgbtn" src="../../assets/images/adminDetails_icon1.png" @click.stop="imgclick($event)"/>
        </div>
      </li>
        <li>
          <img src="../../assets/images/noinfo@2x.png" alt="" class="chat-containernoinfo" v-if="chattalklist.length<=0">
        </li>        
    </ul>
  </div>
</section>
</template>
<script>
import Vue from 'vue'
import { mapGetters,mapActions } from 'vuex'
import {apiurl} from '../../service/api-config.js'
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default{
  computed:{
      ...mapGetters({
      openid:'openid',userinfo:'userinfo',userid:'userid'
    })
  },
  data() {
        return {
          chattalklist:[],
          btnshow:false,
          bjbtn:true
        }
  },
  methods:{
    ...mapActions([
            'set_qyadminpass','set_qyadminyear'
        ]),
    bjclick () {
      this.btnshow=!this.btnshow;
    },
    imgclick (event) {
       var vm = this;
       var el = event.currentTarget;
       var id = $(el).parent().attr("data-id");
        var headers={
          UserID:this.userid,
          Token:this.openid
        };
      MessageBox.confirm('确定删除此消息?').then(action => {
         if(action=='confirm'){
          $.ajax({url:apiurl.DeleteMessageSYSPat,type:'post',headers:headers,data:{MesSYSId:id},success:function(data){
            $(el).parent().parent('.system_li').remove();
            if(!data.suc){
              Toast(data.mes);
            }
          }})   
         }

      });
    },
    goRouter (event,text) {
      var vm=this;
      var el = event.currentTarget;
      var data = new Date();
      var yearnow = data.getFullYear();
//    if(this.list[index].SignStateText=="签约成功"){
//      if(parseInt(this.list[index].SignYear) <= yearnow){
//        vm.set_qyadminyear(1);
//      }else{
//        vm.set_qyadminyear(0);
//      }
//    }
      // var patientid = text.split('patientid:');
      var patientid = text.substring(10,15);
      if($(el).attr("data-type")=="msg.system.signApply"){//签约提醒
        this.set_qyadminpass(1);
        // console.log(patientid[1])
        this.$router.push({'name':'adminDetails',params: { glid:patientid}});
      }
      if($(el).attr("data-type")=="msg.system.verificationApply"){//身份证认证提醒
         this.$router.push({'name':'ChangeFamilyMemberList', params: { pid:patientid}});
      }
    },
  },
  created(){
      var vm=this;
      var headers={
        UserID:this.userid,
        Token:this.openid
      };
       $.ajax({ url: apiurl.GetMessageSYSInfoPat,headers:headers, data:{pageSize:100,pageIndex:1},success: function(data){
        console.log(data)
        if(data.suc){
          vm.chattalklist=data.rows;
        }else{
          Toast(data.mes);
        }
        if(data.total==0){
          vm.bjbtn=false;
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