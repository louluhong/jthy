<template>
<section class="chat-container">
    <div class="chat-containerbody">
      <!-- <div class="chat-containerbodyitem">
        <img src="../assets/images/sysinfo@2x.png" class="chat-containerbodyitem_img">
        <span class="chat-containerbodyitem_type">
          系统消息
        </span>
        <span class="chat-containerbodyitem_content">
          系统提醒：张默默转诊成功，转诊医...
        </span>
        <span class="chat-containerbodyitem_date">
          13:40
        </span>
        <i></i>
      </div> -->
      <div class="chat_tab">
        <ul class="chat_ul">
          <li class="chat_li" @click='GoRecord(1)'><span class='selected'>当前问诊</span></li>
          <li class="chat_li" @click='GoRecord(0)'><span>历史问诊</span></li>
        </ul>
      </div>
      <div class="chat-containerbodyitem" v-for="item in chattalklist" @click="GoRouter(item.InquiryId)">
        <img :src="item.PhotoImage" class="chat-containerbodyitem_img">
        <span class="chat-containerbodyitem_type">
          {{item.DoctorName}}
        </span>
        <span class="chat-containerbodyitem_content">
           {{item.DiseaseName}}
        </span>
        <span class="chat-containerbodyitem_content" v-if="item.MsgType==2">
           图片
        </span>
         <!-- v-if='item.InquiryState=="问诊中"' -->
        <span class="chat-containerbodyitem_date">
           {{item.CreateTime}}
        </span>
        <!-- {{item.IsHaveChat}} -->
        <span class="chat-containerbodyitem_poin" v-if='item.IsHaveChat>99'style="padding:0.1rem;">{{item.IsHaveChat}}+</span>
        <span class="chat-containerbodyitem_poin" v-if='item.IsHaveChat>0'>{{item.IsHaveChat}}</span>
        <!-- <span class="chat-containerbodyitem_date" v-if='item.InquiryState=="已结束"'>
           {{item.EndTime}}
        </span> -->
        <span class="chat-containerbodyitem_zt colorzt" v-if='item.InquiryState=="问诊中"'>问诊中</span>
        <span class="chat-containerbodyitem_zt" v-if='item.InquiryState=="已结束"'>已完成</span>
        <i v-if="item.notReadCount>0"></i>
      </div>
      <img src="../assets/images/noinfo@2x.png" alt="" class="chat-containernoinfo" v-if="chattalklist.length<=0">
    </div>
<!--     <router-view transition="cover"></router-view> -->
</section>
</template>
<script>
import Vue from 'vue'
import { mapGetters,mapActions } from 'vuex'
import {apiurl} from '../service/api-config.js'
export default{
  // beforeRouteEnter (to, from, next) {
  //   $(".mint-tabbar").show();
  //     $(".mint-tabbar .mint-tab-item").removeClass('is-selected');
  //   $(".mint-tabbar .mint-tab-item").eq(1).addClass('is-selected');
  //   next();
  // },
  beforeRouteLeave (to, from, next) {
    var arr = new Array("/Index", "/Me","/Chatindex");
    if($.inArray(to.path, arr)==-1){
      $(".mint-tabbar").hide();
    }
    next();
  },
  computed:{
      ...mapGetters({
      openid:'openid',userinfo:'userinfo',userid:'userid',wztabdata:'wztabdata'
    })
  },
  data() {
        return {
          chattalklist:[],
          iid:'',
          isfalse:1
        }
  },
  methods:{
    ...mapActions([
          'set_wztabdata'
        ]),
    GoRouter(iid){
      var vm=this;
      var headers={
        UserID:this.userid,
        Token:this.openid
      };    
      $.ajax({ url: apiurl.GetInquiryInfo+"?InquiryId="+iid,type:'get',headers:headers, 
        success: function(data){
          console.log(vm.isfalse)
          vm.$router.push({'name':'WenZhenDetail', params: { iid:iid,pid:data.extra.PatientId,did:data.extra.DoctorId,isfalse:vm.isfalse}});
        }
      });
      // this.$router.push({'name':'ChatDetail', params: { uid: uid,iuid:this.userid }});
      // vm.$router.push({'name':'WenZhenDetail', params: { iid:data.extra.Id,pid:vm.$route.params.wzid,did:vm.$route.params.did}});
        
    },
    GoRecord(index){
      var vm=this;
      vm.set_wztabdata(index);
      $('.chat_li').find('span').removeClass('selected');
      if(index==0){
        vm.isfalse=0;
        vm.data_list(0);
      $('.chat_li').eq(1).find('span').addClass('selected');
      }else{
        vm.isfalse=1;
        vm.data_list(1);
        $('.chat_li').eq(0).find('span').addClass('selected');
      }
    },
    
  },
  mounted(){
    var vm=this;
    $('.chat_li').find('span').removeClass('selected');
      if(vm.wztabdata===''){
        vm.data_list(1);
        $('.chat_li').eq(0).find('span').addClass('selected');
      }else{
        vm.data_list(vm.wztabdata);
        if(vm.wztabdata=='1'){
          $('.chat_li').eq(0).find('span').addClass('selected');
        }else{
          $('.chat_li').eq(1).find('span').addClass('selected');
        }
      }
  },
  created(){
      var vm=this;
      var headers={
        UserID:this.userid,
        Token:this.openid
      };
      vm.data_list=function(type){
        $.ajax({ url: apiurl.GetInquiryListOfPatient+"?InquiryState="+type,headers:headers, 
          success: function(data){
            if(type==0){
              // 结束时间排序
              var listls=[];
              for(var i=data.rows.length-1;i>=0;i--){
                listls.push(data.rows[i]);
              }
              vm.chattalklist=listls;
              // var newtime=[];
              // var newdata=[];
              // $.each(data.rows,function(i,v){
              //   newtime.push($(v)[0].CreateTime);
              // })
              // newtime.sort(function(a, b){  
              //     return a < b ? 1 : -1;  
              // });  
              // $.each(newtime,function(ii,vv){
              //   $.each(data.rows,function(ii1,vv1){
              //     if(newtime[ii]==data.rows[ii1].CreateTime){
              //       console.log(ii,ii1)
              //       data.rows[ii].CreateTime=data.rows[ii1].CreateTime;
              //       data.rows[ii].DiseaseName=data.rows[ii1].DiseaseName;
              //       data.rows[ii].DoctorName=data.rows[ii1].DoctorName;
              //       data.rows[ii].EndTime=data.rows[ii1].EndTime;
              //       data.rows[ii].InquiryId=data.rows[ii1].InquiryId;
              //       data.rows[ii].InquiryState=data.rows[ii1].InquiryState;
              //       data.rows[ii].IsHaveChat=data.rows[ii1].IsHaveChat;
              //       data.rows[ii].PhotoImage=data.rows[ii1].PhotoImage;
              //       data.rows[ii].PhotoImageUrl=data.rows[ii1].PhotoImageUrl;
              //     }
              //   })             
              // })
              // console.log(data,newtime)
            }else{
              // 开始时间排序
              var listls=[];
              for(var i=data.rows.length-1;i>=0;i--){
                listls.push(data.rows[i]);
              }
              vm.chattalklist=listls;
              // vm.chattalklist=data.rows;
            }            
          }
        });
      }
  }
}
</script>
<style scoped>
body{
  background: #F6F6F6;
}
</style>