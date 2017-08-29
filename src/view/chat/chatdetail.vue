<template>
<section class="chatdetail-container">
    <div class="chatdetail-containerbody" id="scroller">
      <ul>
        <li v-for="item in chatdetaillist" :class="{ chatdetailcontainerbodyitemme: item.SendUserID==iuid }">
          <span class="chatdetail-containerbodyitemtime">{{item.SendTime}}</span>
          <img :src="item.SendUserImgUrl" alt="" class="chatdetail-containerbodyitemheader">
          <span class="chatdetail-containerbodyitemcontent" v-if="item.MsgType==1">{{item.SendMsg}}</span>
          <span class="chatdetail-containerbodyitemcontent" v-if="item.MsgType==2">
            <img :src="item.SendMsg" alt="">
          </span>
        </li>
      </ul>
    </div>
    <div class="chatdetail-containerfootertool">
      <div class="chatdetail-containerfooter">
      <div>
        <input type="text" id="chat_mesinput" v-model.trim="messagevalue" @focus="onfocus" @blur="onblur">
      <!-- <img src="../../assets/images/icon@2x.png" class="chatdetail-containertool_icon"> -->
      <!--<img src="../../assets/images/chat_add@2x.png" class="chatdetail-containertool_add" @click="ShowTool()" v-show="!chatdetail_showsend">-->
      <span @click="SendMsg()">发送</span>
      </div>
    </div>
    <!--<div class="chatdetail-containertool" v-show="chatdetail_showtool" >
      <div>
        <img src="../../assets/images/image@2x.png" alt="" @click="ChooseImage('album')">
        <span>图片</span>
      </div>
      <div>
        <img src="../../assets/images/photo@2x.png" alt="" @click="ChooseImage('camera')" class="chatdetail-containertool_photo">
        <span>拍照</span>
      </div>
    </div>-->
    </div>
    <router-view transition="cover"></router-view>
</section>
</template>
<script>
import Vue from 'vue'
import { mapGetters,mapActions } from 'vuex'
import {apiurl} from '../../service/api-config.js'
import {globappid} from '../../variable/variable.js'
import '../../assets/js/iscroll.js';
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
import wx from 'weixin-js-sdk'
export default{
  computed:{
      ...mapGetters({
      openid:'openid',userid:'userid',userinfo:'userinfo'
    }),
      classObject: function (uid) {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal',
    }
  }

  },
  data(){
    return{
      chatdetail_showtool:false,
      chatdetail_showsend:false,
      messagevalue:"",
      scrollheight:0,
      myScroll:null,
      chatdetaillist:[],
      pageindex:1,
      pagesize:30,
      iuid:this.$route.params.iuid,
      isend:false,
      issend:false,
      isfirst:true,
      serverId:''
    }
  },
  created(){
    var vm=this;
      var headers={
        UserID:this.userid,
      Token:this.openid
      };
      
      $.ajax({ url: apiurl.GetTicket+"?url="+encodeURIComponent(location.href.split('#')[0]),type:"post",headers:headers, success: function(data){
        if(data.suc){
            wx.config({
              appId:globappid.appid,
              timestamp:data.extra.timestamp,
              nonceStr:data.extra.noncestr,
              signature:data.extra.signature,
              jsApiList:['chooseImage','uploadImage']
            });
        }else{
          Toast(data.mes);
        }
      }});
    
    this.GetMesData();
    
  },
  mounted(){
    var vm=this;
    var intervalTime = setInterval(function () {
      var resultContentH = $("#scroller").height();
      if (resultContentH > 0) {
        clearInterval(intervalTime);
        setTimeout(function () {
            vm.CreateScroll();
        }, 100)
      }
    },10);
      
  },
  watch: {
    messagevalue: function(newValue, oldValue) {
      var regu = "^[ ]+$";
      var re = new RegExp(regu);
      if(re.test(newValue)){
        this.chatdetail_showsend=false;
      }else{
        this.chatdetail_showsend=newValue.length>0;
      }
    }
  },
  methods:{
    ChooseImage(type){
      var vm=this;
      $.ajax({url: apiurl.LoginByOpenId,data:{OpenId:this.openid},type:'get',success:function(data){      	
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'],
          sourceType: [type], 
          success: function (res) {
            var localIds = res.localIds;
            var ua =window.navigator.userAgent.toLowerCase();
            var s = ua.match(/IPhone/i);
            if(s == null){
              var obj={
                SendUserID:vm.userid,
                SendUserImgUrl:data.extra.CurrentLoginMember.PhotoUrl,
                SendMsg:localIds,
                SendTime:"",
                MsgType:2
              };
              vm.chatdetaillist.push(obj);
              vm.messagevalue="";
              vm.issend=true;
              vm.chatdetail_showtool=false;
              setTimeout(function(){
                vm.RefreshScroll();
              },1000)
            }else{
              wx.getLocalImgData({
                localId: '' + localIds,
                success: function (res) {
                  var localData = res.localData; 
                  var obj={
                    SendUserID:vm.userid,
                    SendUserImgUrl:data.extra.CurrentLoginMember.PhotoUrl,
                    SendMsg:localData,
                    SendTime:"",
                    MsgType:2
                  };
                  vm.chatdetaillist.push(obj);
                  vm.messagevalue="";
                  vm.issend=true;
                  vm.chatdetail_showtool=false;
                  setTimeout(function(){
                    vm.RefreshScroll();
                  },1000)
                }
              });
            }
            wx.uploadImage({
              localId: '' + localIds,
              isShowProgressTips: 1,
              success: function(res) {
                vm.serverId=res.serverId;
                var headers={
                  UserID:vm.userid,
                  Token:vm.openid
                };
                $.ajax({ url: apiurl.UploadImg+"?MEDIA_ID="+vm.serverId+"&targetUserID="+vm.$route.params.uid,type:"post",headers:headers, success: function(data){
                    if(data.suc){
                      Toast(data.mes);
                    }else{
                      Toast(data.mes);
                    }
                  },error: function(XMLHttpRequest, textStatus, errorThrown) {
                      Toast(XMLHttpRequest.status);
                      Toast(XMLHttpRequest.readyState);
                      Toast(textStatus);
                  }});
              },
              fail:function(res){
                Toast('腾讯服务器上传失败，请重新上传');
              }
            });        
          }
        });
      }});  
    },
    RefreshScroll(){
      var vm=this;
      var intervalTime = setInterval(function () {
        var resultContentH = $("#scroller ul").height();
        var all_height = 0;
        var scroller = document.getElementById("scroller");
        var items = scroller.getElementsByTagName("li");
        for(var i = 0; i < items.length; i++){
          all_height += items[i].offsetHeight;
        }
        if (all_height>vm.scrollheight) {
          clearInterval(intervalTime);
          setTimeout(function () {
            var scroller = document.getElementById("scroller");
            if(all_height>document.body.clientHeight){
               scroller.style.height=document.body.clientHeight+"px";
            }
            $('#scroller ul').height(all_height+$('.chatdetail-containerfootertool').height()+"px");
            vm.myScroll.refresh();
            if(vm.issend){
              if(all_height>(document.body.clientHeight-$('.chatdetail-containerfootertool').height())){
                vm.myScroll.scrollTo(0, -(all_height-(document.body.clientHeight-$('.chatdetail-containerfootertool').height())));
              }
              vm.issend=false;
            }
          }, 500)
        }
      },10);
    },
    SendMsg(){
      var vm=this;
      if($("input").val().trim()==""){
      	Toast("请输入内容");
      	return false;
      }
      $.ajax({url: apiurl.LoginByOpenId,data:{OpenId:this.openid},type:'get',success:function(data){//获取用户信息
        var photourl=data.extra.CurrentLoginMember.PhotoUrl;
        var headers={
          UserID:vm.userid,
          Token:vm.openid
        };
        $.ajax({ url: apiurl.SendMessage+"?message="+ encodeURIComponent(vm.messagevalue)+"&targetUserID="+vm.$route.params.uid,type:"post",headers:headers, success: function(data){
          if(data.suc){      	
              var obj={
                SendUserID:vm.userid,
                SendUserImgUrl:photourl,
                SendMsg:vm.messagevalue,
                SendTime:"",
                MsgType:1
              };
              vm.chatdetaillist.push(obj);
              vm.messagevalue="";
              vm.issend=true;
              vm.RefreshScroll();
          }else{
            Toast(data.mes);
          }
        }});
      }});  
    },
    ShowTool(){
      this.chatdetail_showtool=!this.chatdetail_showtool;
    },
    GetMesData(){
      var vm=this;
      var headers={
        UserID:this.userid,
        Token:this.openid
      };
      var data={
  		  pageIndex:vm.pageindex,
  		  pageSize:vm.pagesize,
  		  receiveUserID:this.$route.params.uid
      }
      console.log(vm.pageindex)
      $.ajax({ url: apiurl.GetChatMessages,data:data,headers:headers, success: function(data){

        if(data.rows.length<vm.pagesize){
          vm.isend=true;
        }
        if(vm.isfirst){
          var listls=[];
          for(var i=data.rows.length-1;i>=0;i--){
          	listls.push(data.rows[i]);
          }
  			  vm.chatdetaillist=listls;
        }else{
          var listls=[];
          for (var i=data.rows.length-1;i>=0;i--){
  	        listls.push(data.rows[i]);
  	      }
  	      vm.chatdetaillist=listls.concat(vm.chatdetaillist);
        }
        vm.pageindex+=1;
        Indicator.close();
        if(!vm.isfirst){
          vm.RefreshScroll();
        }
        vm.isfirst=false;
      }});
        
    },
    onfocus() {
    	/*var u = navigator.userAgent;
   		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    	
    	if(isAndroid){
    		var creenheight=document.body.clientHeight;
    		setTimeout(()=>{
    			var height=creenheight-window.innerHeight;
      		$("#scroller").css({position: "absolute",bottom: height+'px',left:"0"});
    		},100)
    	}*/
    	
  	
    	setTimeout(function(){
          document.body.scrollTop = document.body.scrollHeight;  
         },100);
    	
    },
    onblur() {
    	//$("#scroller").css({position: "absolute",bottom: '0',left:"0"});
    },
    CreateScroll(){
      var all_height = 0;
      var scroller = document.getElementById("scroller");
      var items = scroller.getElementsByTagName("li");
      for(var i = 0; i < items.length; i++){
        all_height += items[i].offsetHeight;
      }
      /*if(all_height>(document.body.clientHeight-$('.chatdetail-containerfootertool').height())){
        var scroller = document.getElementById("scroller");
        scroller.style.height = (document.body.clientHeight-$('.chatdetail-containerfootertool').height()) + "px";
      }else{
        $('#scroller ul').height((document.body.clientHeight-$('.chatdetail-containerfootertool').height()) + "px");
      }*/
      //var scroller = document.getElementById("scroller");
      if(all_height>document.body.clientHeight){
        scroller.style.height=document.body.clientHeight+"px";
      }
      this.scrollheight=all_height+$('.chatdetail-containerfootertool').height();
      $('#scroller ul').height(all_height+$('.chatdetail-containerfootertool').height()+"px");
      var _this=this;
      this.myScroll = new iScroll('scroller',{
      	vScrollbar : false,
	      onScrollMove: function () {
	    	  $("input").blur();
	        if (this.y > 5 && !$('#scroller ul').hasClass('flip')) {
	          $('#scroller ul').addClass('flip');
	        } else if (this.y < 5 && $('#scroller ul').hasClass('flip')) {
	          $('#scroller ul').removeClass('flip');
	        }
	      },
  	    onScrollEnd: function () {
  	      if ($('#scroller ul').hasClass('flip')) {
  	        if(_this.isend){
  	          if(!_this.issend){
  	            Toast('没有更多消息');
  	          }
  	      }else{
  		        console.info("加载")
  		        Indicator.open({
    		        text: '加载中...',
    		        spinnerType: 'fading-circle'
  		        });
  		        _this.GetMesData();
  	      	}  	        
  	      }  	      
  	    }
      });

      this.myScroll.scrollTo(0, -(all_height-(document.body.clientHeight-$('.chatdetail-containerfootertool').height())));
    }
  }
}
</script>
<style scoped>
body{
  background: #F6F6F6;
}
</style>