<template>
<section class="chatdetail-container">
    <div class="chatdetail-containerbody" id="scroller">
      <ul>
        <li v-for="item in wzinfolist" :class="{ chatdetailcontainerbodyitemme: item.PatientId==iuid }">
          <span class="chatdetail-containerbodyitemtime">{{item.CreateTime}}</span>
          <img :src="item.SendImg" alt="" class="chatdetail-containerbodyitemheader">
          <span class="chatdetail-containerbodyitemcontent">
            <span class="zz_title"><span class="wz_d"></span>症状：</span>
            {{item.DiseaseName}}<br>
            <span class="zz_ms"><span class="wz_d"></span>描述：</span>
            <span>{{item.DiseaseDescription}}</span>
          </span>   
        </li> 
        <!-- <span class="zz_dot_wait">医生会在尽快接诊，请稍等片刻。</span>     -->
        <li v-for="item in wzinfolist" :class="{ chatdetailcontainerbodyitemme: item.PatientId==iuid }" class="wzimgli ">
        <span class="chatdetail-containerbodyitemtime" :value='item.SendTime1'>{{item.SendTime}}</span>
          <div v-for="(item,index) in newimg" class="wz_header clearfix">
            <img :src="pheader" alt="" class="chatdetail-containerbodyitemheader">
            <span class="chatdetail-containerbodyitemcontent" >  
              <span class="chatdetail-containerbodyitemcontent_img_k">
                <img :src="item.img" alt="" class="chatdetail-containerbodyitemcontent_img">
              </span>        
              
            </span> 
          </div>                 
        </li> 
        <li>
          <span class="zz_dot_wait">医生会在尽快接诊，请稍等片刻。</span> 
        </li>   
        <li v-for="(item,index) in chatdetaillist" :class="{ chatdetailcontainerbodyitemme: item.SendID==iuid } " class="imgli" :data-length='chatdetaillist.length'>
          <span class="chatdetail-containerbodyitemtime" :value='item.SendTime1'>{{item.strSendTime1}}</span>
          <img :src="item.SendImg" alt="" class="chatdetail-containerbodyitemheader">
          <span class="chatdetail-containerbodyitemcontent" v-if="item.SendMsgType==1">
            <!-- <span v-if="item.SendMsg1" class="zz_title">症状：</span> -->
            {{item.SendMsg}}<br>
            <!-- <span v-if="item.SendMsg1" class="zz_ms">描述：</span> -->
            <!-- <span v-if="item.SendMsg1">{{item.SendMsg1}}</span> -->
          </span>
          <span class="chatdetail-containerbodyitemcontent" v-if="item.SendMsgType==2">
            <!-- <div class="chatdetail-containerbodyitemcontent_img"> -->
              <!-- <img :src="item.SendMsg" alt="" class="chatdetail-containerbodyitemcontent_img" @click='imgZoom(index,".imgli")'> -->
              <span class="chatdetail-containerbodyitemcontent_img_k">
                <img :data-src="item.SendMsg" alt="" class="chatdetail-containerbodyitemcontent_img" src='../../assets/images/def.png' data-flag='true'>
              </span>              
              <!-- <img src="../../assets/images/def.png" alt="" class="chatdetail-containerbodyitemcontent_img" @click='imgZoom(index,".imgli")' v-else> -->
            <!-- </div>             -->
          </span>
        </li>              
      </ul>
    </div>
    <div class="chatdetail-containerfootertool">
      <div class="wz_finish" :value='isfalse' v-if='isfalse==0'>问题已完成</div>
      <div class="chatdetail-containerfooter" v-if='isfalse==1'>
        <div>
          <input type="text" id="chat_mesinput" v-model.trim="messagevalue" @focus="onfocus">
          <img src="../../assets/images/chat_add@2x.png" class="chatdetail-containertool_add" @click="ShowTool()">
          <span @click="SendMsg()">发送</span>
        </div>
      </div>
      <div class="chatdetail-containertool" v-show="chatdetail_showtool" >
        <div>
          <img src="../../assets/images/image@2x.png" alt="" @click="ChooseImage('album')">
          <span>图片</span>
        </div>
        <div>
          <img src="../../assets/images/photo@2x.png" alt="" @click="ChooseImage('camera')" class="chatdetail-containertool_photo">
          <span>拍照</span>
        </div>
      </div>
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
      pagesize:1,
      iuid:this.$route.params.pid,
      isend:false,
      issend:false,
      isfirst:true,
      serverId:'',
      pheader:'',
      wzinfolist:[],
      newimg:[],
      isfalse:'',
      nowHs:0,
      nowTime:0,
      newYear:0,
      newMonth:0,
      newDate:0,
      newHours:0,
      newMinutes:0,
      newSeconds:0,
      timelen:0,
      lasttime:0,
      lasttimeHm:0,
      newtimeHm:0,
      flag:1,
      lasttime1:0,
      defimg:'../../assets/images/def.png',
      lastnewtime:'',
      setinterval_flag:false,
      srcList:[],
      imgclass:'',
      oldsrc:""
    }
  },
  // beforeUpdate() {
  //   var all_height = 0;
  //   var scroller = document.getElementById("scroller");
  //   var items = scroller.getElementsByTagName("li");
  //   for(var i = 0; i < items.length; i++){
  //     all_height += items[i].offsetHeight;
  //   // console.log("li的长度"+items.length+"每个li的高"+items[i].offsetHeight)
  //   }
  //   console.log("aa"+all_height)
  // },
  created(){
    var vm=this;    
    this.GetMesData();
    // console.log('aaaa'+vm)
    vm.isfalse=vm.$route.params.isfalse;
    // console.log(vm.isfalse)
      var headers={
        UserID:this.userid,
        Token:this.openid
      };
      $.ajax({ url: apiurl.GetTicket+"?url="+encodeURIComponent(location.href.split('#')[0]),type:"post",headers:headers, success: function(data){
        if(data.suc){
            wx.config({
              debug:false,
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
    this.GetInquiryInfo(); 
  },
  mounted(){
    var vm=this;
    var intervalTime = setInterval(function () {
      // console.log(vm.lastnewtime)
      var resultContentH = $("#scroller").height();
      // console.log('ul的高'+resultContentH)
      if (resultContentH > 0) {
        clearInterval(intervalTime);
        setTimeout(function () {
            vm.CreateScroll();
            vm.lazyload();
            $.each($('.chatdetail-containerbodyitemcontent_img'),function(i,item){  //$('.info_detail .container img') 容器中的图片
                if(item.src) {
                  vm.srcList.push(item.src);
                }
            });
            
            // setInterval(function(){
            //   vm.newmessage(vm.lastnewtime);
            // },10000)
            
        }, 700)
      }else{
        vm.lazyload();
      }
              
    },10); 

    this.$nextTick(()=>{
       vm.imgclass=$('.chatdetail-containerbodyitemcontent_img');
            console.log(vm.imgclass)
       
     })

      vm.imgZoom();
      vm.setint=setInterval(function(){
        vm.newmessage(vm.lastnewtime);
            
      },2500);
    
    
    vm.getNowDate();
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
    },
  },  

  beforeRouteEnter (to, from, next) {
    var vm=this;
    next();
  },
  beforeRouteLeave (to, from, next) {
    var vm=this;
    // console.log($('.chat_li').eq(0).attr('data-flag'))
    clearInterval(this.setint)
    var setinterval_flag=false;
      // $("#addfamilyContent").show();
      next();
  },
  methods:{
    imgfun(event){
       var _vm = this;
       var el_taget = event.currentTarget;
       var el = $(el_taget);

       if(el.attr('src')===this.__oldSrc)return;
       this.__oldSrc = el.attr('src');
       setTimeout(function(){_vm.__oldSrc="";},100);

      console.log(el.attr('src'));

      var srcarr=[el.attr('src')]
      wx.previewImage({
        current: el.attr('src'),
        urls: srcarr
      });
    },

    // 时时获取新消息
    newmessage(lastnewtime){
      var vm=this;
      var headers={
        UserID:this.userid,
        Token:this.openid
      };
            // vm.CreateScroll();
      var data={
        // InquiryId:'49',
        // chat1Id:'29549',
        // chat2Id:'20737',
        InquiryId:vm.$route.params.iid,
        strSendTime:lastnewtime,
        RecieveId:vm.$route.params.pid
      };
      // console.log(data)
      $.ajax({ url: apiurl.GetInquiryMessageRecentlyPatList,data:data,headers:headers,type:'get',
        success: function(data){
          // console.log(data)
          // console.log(data.rows);
          var obj=[];
          if(data.rows.length>0){
            // alert('aaaa')
            $.each(data.rows,function(i,v){
              data.rows[i].SendID=data.rows[i].SendID;
              data.rows[i].SendImg=data.rows[i].SendImg;
              data.rows[i].SendMsg=data.rows[i].SendMsg;
              data.rows[i].SendTime=data.rows[i].SendTime;
              // obj.push(data.rows[i]);
              vm.chatdetaillist.push(data.rows[i])
              vm.lastnewtime=data.rows[data.rows.length-1].strSendTime;
              if(data.rows[i].SendMsgType==2){
                vm.srcList.push(data.rows[i].SendMsg);
              }
            })
            setTimeout(function(){
              vm.CreateScroll();
            },200)            
                // vm.chatdetaillist=obj;
          }       
          // vm.imgZoom();
          // console.log(obj) 
          // if(data.rows.length>0){  
          //   var obj={
          //     SendID:data.rows[0].SendID,
          //     SendImg:data.rows[0].SendImg,
          //     SendMsg:data.rows[0].SendMsg,
          //     SendTime:data.rows[0].SendTime,
          //     SendMsgType:1,

          //   };
          //   vm.lastnewtime=data.rows[0].strSendTime;
          //   // console.log('aaa:'+vm.lastnewtime)
          //   // console.log(obj)
          //   vm.chatdetaillist.push(obj);

          //   vm.CreateScroll();
          // }   
        }
      });
    },
    // 图片上传
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
              wx.getLocalImgData({
                localId: '' + localIds,
                success: function (res) {
                  var localData = res.localData;
                  var obj={
                    SendID:vm.$route.params.pid,
                    SendImg:data.extra.CurrentLoginMember.PhotoUrl,
                    SendMsg:localData,
                    SendTime:vm.newtimeHm,
                    SendMsgType:2,
                    SendTime1:vm.newYear+"-"+vm.newMonth+"-"+vm.newDate+" "+vm.newHours+":"+vm.newMinutes+":"+vm.newSeconds
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
            }else{
              wx.getLocalImgData({
                localId: '' + localIds,
                success: function (res) {
                  var localData = res.localData;
                  vm.getNowDate();
                  vm.timelen=$('.chatdetail-containerbodyitemtime').length;
                  vm.lasttime=$('.chatdetail-containerbodyitemtime').eq(vm.timelen-1).attr('value');
                  vm.lasttimeHm=new Date((vm.lasttime).replace(new RegExp("-","gm"),"/")).getTime();
                  vm.newtimeHm=new Date((vm.nowTime).replace(new RegExp("-","gm"),"/")).getTime();
                  // console.log(vm.newtimeHm-vm.lasttimeHm)
                  if((vm.newtimeHm-vm.lasttimeHm)<200000){
                    vm.newtimeHm="";
                    // console.log("不到2分不显示时间："+vm.lasttime)
                  }else if((vm.newtimeHm-vm.lasttimeHm)>=200000||(vm.newtimeHm-vm.lasttimeHm)<=86400000){
                    // console.log('8888')
                    vm.newtimeHm=vm.newHours+':'+vm.newMinutes;
                  }else{
                    vm.newtimeHm=vm.newMonth+"-"+vm.newDate+" "+vm.newHours+':'+vm.newMinutes;
                  }
                  var obj={
                    SendID:vm.$route.params.pid,
                    SendImg:data.extra.CurrentLoginMember.PhotoUrl,
                    SendMsg:localData,
                    SendTime:vm.newtimeHm,
                    SendMsgType:2,
                    SendTime1:vm.newYear+"-"+vm.newMonth+"-"+vm.newDate+" "+vm.newHours+":"+vm.newMinutes+":"+vm.newSeconds
                  };

                  if(obj.SendMsgType==2){
                    vm.srcList.push(obj.SendMsg);
                  }

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
                var data={
                  MEDIA_ID:vm.serverId,
                  DoctorId:vm.$route.params.did,
                  InquiryId:vm.$route.params.iid
                }
                // +"?MEDIA_ID="+vm.serverId+"&DoctorId="+vm.$route.params.did+"&InquiryId="+vm.$route.params.iid
                // alert(vm.serverId)
                $.ajax({ url: apiurl.UploadImgPa,data:data,type:"post",headers:headers, success: function(data){
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
    // 滚动
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
    // 获取当前时间
    getNowDate(){
      var vm=this;
      // 获取服务时间
      // var xhr = null;
      // if(window.XMLHttpRequest){
      //   xhr = new window.XMLHttpRequest();
      // }else{ // ie
      //   xhr = new ActiveObject("Microsoft")
      // }
      // 通过get的方式请求当前文件
      // xhr.open("get","/");
      // xhr.send(null);
      // 监听请求状态变化
      // xhr.onreadystatechange = function(){
      //   var time = null,
         // var   curDate = null;
        // if(xhr.readyState===2){
          // 获取响应头里的时间戳
          // time = xhr.getResponseHeader("Date");
          // console.log(xhr.getAllResponseHeaders())
          var curDate = new Date();
          // 年
          vm.newYear=curDate.getFullYear();
          // 月
          // if((curDate.getMonth()+1)<10){
          //   vm.newMonth='0'+(curDate.getMonth()+1);
          // }else{
            vm.newMonth=(curDate.getMonth()+1);
          // }
          // 日
          // if((curDate.getDate())<10){
          //   vm.newDate='0'+curDate.getDate();
          // }else{
            vm.newDate=curDate.getDate();
          // }
          // 时
          // if((curDate.getHours())<10){
          //   vm.newHours='0'+curDate.getHours();
          // }else{
            vm.newHours=curDate.getHours();
          // }
          
          // 分
          // if((curDate.getMinutes())<10){
          //   vm.newMinutes='0'+curDate.getMinutes();
          // }else{
            vm.newMinutes=curDate.getMinutes();
          // }
          
          // 秒
          // if((curDate.getSeconds())<10){
          //   vm.newSeconds='0'+curDate.getSeconds();
          // }else{
            vm.newSeconds=curDate.getSeconds();
          // }
          
          vm.nowTime=vm.newYear+"-"+vm.newMonth+"-"+vm.newDate+" "+vm.newHours+":"+vm.newMinutes+":"+vm.newSeconds;
          // console.log(vm.nowTime)
        // }
      // }
    },
    // 发送消息
    SendMsg(){
      var vm=this;
      // $('.chatdetail-containerbodyitemtime').each(function(i,v){

      //   console.log( (new Date($(v).html())).getTime())
      // })
      vm.getNowDate();
      // vm.timelen=$('.chatdetail-containerbodyitemtime').length;
      // vm.lasttime=$('.chatdetail-containerbodyitemtime').eq(vm.timelen-1).attr('value');
      // vm.lasttimeHm=new Date((vm.lasttime).replace(new RegExp("-","gm"),"/")).getTime();
      // vm.newtimeHm=new Date((vm.nowTime).replace(new RegExp("-","gm"),"/")).getTime();
      // if((vm.newtimeHm-vm.lasttimeHm)<200000){
      //   vm.newtimeHm="";
      // }else if((vm.newtimeHm-vm.lasttimeHm)>=200000||(vm.newtimeHm-vm.lasttimeHm)<=86400000){
      //   vm.newtimeHm=vm.newHours+':'+vm.newMinutes;
      // }else{
      //   vm.newtimeHm=vm.newMonth+"-"+vm.newDate+" "+vm.newHours+':'+vm.newMinutes;
      // }
      
      if($("input").val().trim()==""){
      	Toast("请输入内容");
      	return false;
      }
      // console.log(vm.$route.params.pid)
      $.ajax({url: apiurl.LoginByOpenId,data:{OpenId:this.openid},type:'get',success:function(data){//获取用户信息
        var photourl=data.extra.CurrentLoginMember.PhotoUrl;
        // console.log(photourl)
        var headers={
          UserID:vm.userid,
          Token:vm.openid
        };
        var data1={
          InquiryId:vm.$route.params.iid,
          SendId:vm.$route.params.pid,
          RecieveId:vm.$route.params.did,
          // InquiryId:'49',
          // SendId:'29549',
          // RecieveId:'20737',
          // Message: encodeURIComponent(vm.messagevalue),
          SendTime:'',
          Message:vm.messagevalue,
          MesType: 1
        }
        $.ajax({ url: apiurl.SendInquiryMessagePa,data:data1,type:"post",headers:headers, success: function(data){
          // console.log(data)
          if(data.suc){      	
              var obj={
                SendID:vm.$route.params.pid,
                SendImg:photourl,
                SendMsg:vm.messagevalue,
                SendTime:vm.newtimeHm,
                SendMsgType:1,
                strSendTime1:vm.newMonth+"-"+vm.newDate+" "+vm.newHours+":"+vm.newMinutes
              };
              // console.log(obj.SendTime1)
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
    // 底部的上传图片拍照的工具
    ShowTool(){
      this.chatdetail_showtool=!this.chatdetail_showtool;
    },
    // 图片缩放
    imgZoom(){
      var vm=this;
      console.log("===",vm.oldsrc);
      // var srcList = [];
      // $.each($('.chatdetail-containerbodyitemcontent_img'),function(i,item){  //$('.info_detail .container img') 容器中的图片
      //     if(item.src) {
      //         srcList.push(item.src);
      //         console.log(srcList)
      //         $(item).click(function(e){
      //           // alert($(item))
      //             // 通过这个API就能直接调起微信客户端的图片播放组件了
      //             wx.previewImage({
      //                 current: this.src,
      //                 urls: srcList,
      //                 success:function(){
      //                   alert('aaaaa')
      //                   console.log('接口调用成功')
      //                 },
      //                 fail:function(){
      //                   console.log('接口调用失败')
      //                 }
      //             });
      //         });
      //     }
      // });
      $.each($('.chatdetail-containerbodyitemcontent_img'),function(i,item){  //$('.info_detail .container img') 容器中的图片
          if(item.src) {
            srcList.push(item.src);
          }
      });

      $('ul').delegate('.chatdetail-containerbodyitemcontent_img','click',function(e){
        if(this.src===vm.oldsrc)return;
        vm.oldsrc = this.src;
        setTimeout(function(){vm.oldsrc="";},100);
        // 通过这个API就能直接调起微信客户端的图片播放组件了
        wx.previewImage({
            current: this.src,
            urls: vm.srcList
        });
      });
      
      // console.log(vm.srcList)  bind      
      // $('.chatdetail-containerbodyitemcontent_img').bind('click',function(e){
      //   alert(this.src)
      //     // 通过这个API就能直接调起微信客户端的图片播放组件了
      //     wx.previewImage({
      //         current: this.src,
      //         urls: vm.srcList
      //     });
      // });

          
      
      // wx.previewImage({
      //     current: 'http://182.254.138.91:8099/upload/WenZhen/ChatPhoto/2017081618344820756df4f4b2a-8782-48a5-838b-b8c8a336edf4.jpg', // 当前显示图片的http链接
      //     urls: ['http://182.254.138.91:8099/upload/WenZhen/ChatPhoto/2017081618344820756df4f4b2a-8782-48a5-838b-b8c8a336edf4.jpg','http://182.254.138.91:8099/upload/WenZhen/ChatPhoto/20170816183457207562884a367-43ba-406b-819f-5dffddc63544.jpg'] // 需要预览的图片http链接列表
      // });
      // console.log($(classname).eq(i).find('.chatdetail-containerbodyitemcontent_img'),i)
      // vm.chatdetail_showtool=false;
      // var newimg=new Image();
      // newimg.src=$(classname).eq(i).find('.chatdetail-containerbodyitemcontent_img').attr('src');;
      // console.log(newimg.width,newimg.height/75/2)
      // var img=$(classname).eq(i).find('.chatdetail-containerbodyitemcontent_img').attr('src');
      // $('#app').append('<div class="newimg_mask"><div class="newimg_k"></div></div>')
      // $('#app').find('.newimg_k').append("<img src='"+img+"' alt='' class='new_img'>");
      // $('.newimg_k').css({'margin-top':'-'+(newimg.height/72/2)+'rem'})
      // $('.new_img').click(function(){
      //   $(this).hide();
      //   $('.newimg_mask').hide();
      // })
    },
    // 消息获取
    GetMesData(){
      var vm=this;
      var headers={
        UserID:this.userid,
        Token:this.openid
      };
      var data={
        // InquiryId:'49',
        // chat1Id:'29549',
        // chat2Id:'20737',
        InquiryId:vm.$route.params.iid,
        chat1Id:vm.$route.params.pid,
        chat2Id:this.$route.params.did
      };
      // console.log(vm.pageindex)
      $.ajax({ url: apiurl.GetInquiryMessagePatList,data:data,headers:headers,type:'get',
        success: function(data){
          // console.log(data)
          vm.lastnewtime=data.rows[data.rows.length-1].strSendTime;
          // console.log(data.rows[data.rows.length-1].strSendTime,'对')
          // if(data.rows.length<vm.pagesize){
          //   vm.isend=true;
          // }
          if(vm.isfirst){
            var listls=[];
            // for(var i=data.rows.length-1;i>=0;i--){
            //   listls.push(data.rows[i]);
            // }
            for(var i=0;i<data.rows.length;i++){              
              data.rows[i].SendTime1=data.rows[i].SendTime;
              // alert(data.rows[i].SendTime)
              // console.log((new Date(data.rows[i].SendTime).getMonth()+1)<10)
              // 年月日分别获取
              // if((new Date(data.rows[i].SendTime).getMonth()+1)<10){
              //   vm.Month1='0'+(new Date((data.rows[i].SendTime).replace(new RegExp("-","gm"),"/")).getMonth()+1);
              // }else{
              //   vm.Month1=(new Date((data.rows[i].SendTime).replace(new RegExp("-","gm"),"/")).getMonth()+1);
              // }
              // if((new Date(data.rows[i].SendTime).getDate())<10){
              //   vm.data1='0'+new Date((data.rows[i].SendTime).replace(new RegExp("-","gm"),"/")).getDate();
              // }else{
              //   vm.data1=new Date((data.rows[i].SendTime).replace(new RegExp("-","gm"),"/")).getDate();
              // }
              // if((new Date(data.rows[i].SendTime).getHours())<10){
              //   vm.hours1='0'+new Date((data.rows[i].SendTime).replace(new RegExp("-","gm"),"/")).getHours();
              // }else{
              //   vm.hours1=new Date((data.rows[i].SendTime).replace(new RegExp("-","gm"),"/")).getHours()
              // }
              // if((new Date((data.rows[i].SendTime).replace(new RegExp("-","gm"),"/")).getMinutes())<10){
              //   vm.minutes1='0'+new Date((data.rows[i].SendTime).replace(new RegExp("-","gm"),"/")).getMinutes();
              // }else{
              //   vm.minutes1=new Date((data.rows[i].SendTime).replace(new RegExp("-","gm"),"/")).getMinutes();
              // }
              // 判断2分钟，24小时
              // if((new Date((vm.nowTime).replace(new RegExp("-","gm"),"/"))-new Date((data.rows[i].SendTime).replace(new RegExp("-","gm"),"/")))<200000){
              //   data.rows[i].SendTime='';  
              // }
              // else if((((new Date((vm.nowTime).replace(new RegExp("-","gm"),"/")))-(new Date((data.rows[i].SendTime).replace(new RegExp("-","gm"),"/"))))>=200000)&&(((new Date((vm.nowTime).replace(new RegExp("-","gm"),"/")))-(new Date((data.rows[i].SendTime).replace(new RegExp("-","gm"),"/"))))<=86400000)){
              //   data.rows[i].SendTime=vm.hours1+':'+vm.minutes1;
              // }else{
              //   // console.log('超过24')
              //   data.rows[i].SendTime=vm.Month1+'-'+vm.data1+' '+vm.hours1+':'+vm.minutes1;
              // }
              listls.push(data.rows[i]);
            }
            vm.chatdetaillist=listls;
            // console.log(vm.chatdetaillist[1].SendTime)
          }else{
            var listls=[];
            // for (var i=data.rows.length-1;i>=0;i--){
            //   listls.push(data.rows[i]);
            // }
            for(var i=0;i<data.rows.length;i++){
              listls.push(data.rows[i]);
            }
            vm.chatdetaillist=listls.concat(vm.chatdetaillist);
          }
          // vm.pageindex+=1;
          // console.log(vm.pageindex)
          Indicator.close();
          // console.log($('img').length)
          if(!vm.isfirst){
            vm.RefreshScroll();
          }
          vm.isfirst=false;
        }
      });
    },
    // 问诊获取
    GetInquiryInfo(){
      var vm=this;
      var headers={
        UserID:this.userid,
        Token:this.openid
      };
      var data={
        InquiryId:vm.$route.params.iid
      };
      $.ajax({url: apiurl.LoginByOpenId,data:{OpenId:this.openid},type:'get',
        success:function(data1){
          $.ajax({ url: apiurl.GetInquiryInfo,data:data,headers:headers,type:'get',
            success: function(data){
              // console.log('aaa',data);
              vm.pheader=data1.extra.CurrentLoginMember.PhotoUrl;
              var obj={
                PatientId:data.extra.PatientId,
                SendImg:data.extra.PatientImageUrl,
                DiseaseName:data.extra.DiseaseName,
                DiseaseDescription:data.extra.DiseaseDescription,
                CreateTime:data.extra.CreateTime
              };
              vm.wzinfolist.push(obj)
              var arr=[];
              var imgimg;
              // console.log(data.extra.DiseaseImageList);
              var str=data.extra.DiseaseImageList;
              if(str!=''){
                arr=str.split(',');
                for(var i=0;i<arr.length-1;i++){
                  imgimg={
                    img:arr[i]
                  }
                  vm.newimg.push(imgimg);
                }
              }else{
                // console.log('进入这里',$('.wzimgli'))
                $('.wzimgli').hide();
              }
              
              // vm.wzinfolist.push(newimg);
              // console.log(vm.wzinfolist)
              // vm.wzinfolist=data;
              // var obj={
              //   PatientId:data.extra.PatientId,
              //   SendImg:data1.extra.CurrentLoginMember.PhotoUrl,
              //   DiseaseName:data.extra.DiseaseName,
              //   DiseaseDescription:data.extra.DiseaseDescription,
              //   CreateTime:data.extra.CreateTime
              // };
              // vm.wzinfolist=obj.concat(vm.wzinfolist)
              // console.log(vm.wzinfolist)
            }
          });
        }
      });  
    },
    // 获得焦点
    onfocus() {
      var vm=this;
      vm.chatdetail_showtool=false;
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
    // 懒加载
    lazyload(){
      var vm=this;
      var n = 0,
        imgNum = $(".chatdetail-containerbodyitemcontent_img").length,
        img = $('.chatdetail-containerbodyitemcontent_img');
      for (var i = n; i < imgNum; i++) {
        // console.log(imgNum)

        if (img.eq(i).offset().top < parseInt($(window).height()) + parseInt($(window).scrollTop())) {
          // console.log(img.eq(i).attr("src"))
            if (img.eq(i).attr("data-flag") == 'true') {
              var src = img.eq(i).attr("data-src");
              img.eq(i).attr("src", src);
              img.eq(i).attr("data-flag", 'false');
              n = i + 1;
            }
        }
      }
    },
    findByTagName(p,el,count,i)    {
      var vm=this;
       var items = p.getElementsByTagName(el);
       // console.log(vm.chatdetaillist.length+vm.wzinfolist.length)
       // var items=vm.chatdetaillist.length+vm.wzinfolist.length;
        // console.log("这里的",items,$('#scroller').find('li').length);
       if(items.length<count && i<=30)
       {
          setTimeout(this.findByTagName(p,el,count,i++),100);
       }
       return items;
    },
   
    CreateScroll(){
      var vm=this;
      var all_height = 0;
      var scroller = document.getElementById("scroller");
      vm.items = vm.findByTagName(scroller,"li",vm.chatdetaillist.length);
      // console.log("li的长度",vm.chatdetaillist.length,'li的',vm.items.length);
      // alert("li的长度"+items.length)
      for(var i = 0; i < vm.items.length; i++){
        all_height += vm.items[i].offsetHeight;
        // console.log(i,vm.items[i].offsetHeight)
      }
      // console.log(vm.items[vm.chatdetaillist.length-1].offsetHeight)
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
          vm.lazyload();
	    	  $("input").blur();
	        if (this.y > 5 && !$('#scroller ul').hasClass('flip')) {
	          $('#scroller ul').addClass('flip');
	        } else if (this.y < 5 && $('#scroller ul').hasClass('flip')) {
	          $('#scroller ul').removeClass('flip');
	        }
	      },
  	    onScrollEnd: function () {
  	      // if ($('#scroller ul').hasClass('flip')) {
         //    console.log('应该在这里')
  	      //   if(_this.isend){
  	      //     if(!_this.issend){
  	      //       Toast('没有更多消息');
  	      //     }
  	      // }else{
  		     //    console.info("加载")
  		     //    Indicator.open({
    		   //      text: '加载中...',
    		   //      spinnerType: 'fading-circle'
  		     //    });
  		     //    _this.GetMesData();
  	      // 	}  	        
  	      // }  	      
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
.wz_header{
  margin-top: 0.69rem;
}
.zz_title,.zz_ms{
  color: #E0B35D;
}
</style>