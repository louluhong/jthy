<template>
	<section class="wz_chatinfo_con">
		<div class="wz_con">
			<div class="wz_symptom">
				<span class="symptom_title">症状</span>
				<input type="text" value='' placeholder="简述您的症状,如发烧、感冒(少于10个字)" maxlength="10"  class="symptom_title_text">
			</div>
			<div class="wz_describe">
				<span class="describe_title">描述</span>
				<textarea placeholder="请详细描述您的疾病和身体状况，便于医生更准确的分析(至少10个字)" class="describe_title_text">
				</textarea>
			</div>
			<div class="wz_photo clearfix">
				<div class="wz_photopustk" v-model="serverId">
					<!-- <img src="../../assets/images/camera@2x.png" alt="" class="chat_img" @click='chatimgGO()'> -->
				<!-- <img src="../../assets/images/camera@2x.png" alt="" class="chat_img"> -->
				</div>
				<img src="../../assets/images/camera@2x.png" alt="" class="chat_img chat_img_click" @click='GoPhoto()'>				
			</div>
			<div class="wz_commit">
				<span class="wz_button" @click='GoRouter()'>提交</span>
			</div>
			<!-- <div class="wz_photo_mask">
				<div class="wz_mask">遮罩</div>
				<div class="wz_photo_k">
					<div class="wz_photo_camera" @click='GoPhoto()'>拍照</div>
					<div class="wz_photo_pic" @click='GoPhoto()'>从手机相册中选择</div>
					<div class="wz_photo_hide" @click='GOPhotoHide()'>取消</div>
				</div>				
			</div> -->
		</div>
	</section>
</template>
<script>
	import Vue from 'vue'
	import { mapGetters,mapActions } from 'vuex'
	import {apiurl} from '../../service/api-config.js'
	import {globappid} from '../../variable/variable.js'
	import { Toast } from 'mint-ui';
	import wx from 'weixin-js-sdk';
	export default{
		computed:{
		    ...mapGetters({
		    	openid:'openid',userinfo:'userinfo',userid:'userid'
		    })
		},
		data() {
		    return {
		        chattalklist:[],
		        photoArr:[],
		        updataPhoto:'',
		        serverId:''
		    }
		},
		methods:{
			GOPhotoHide(){
				$('.wz_photo_mask').hide();
			},
			GoMask(){
				$('.wz_photo_mask').show();
			},
			chatimgGO(){
				// alert('aaa');
				$('.wz_photopustk .chat_img').each(function(i,v){
					// alert(i);
				})
			},
			GoPhoto(){
				var vm=this;
				// $('.wz_photo').appendChild('<img src='+vm.$route.params.wzid+ 'alt="" class="chat_img">')
				// var images = {localIds:[],serverId:[]};

				wx.chooseImage({
				  count: 1, // 默认9
				  sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				  sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				  success: function (res) {
				    var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
	  				// images.localIds = res.localIds;
       //      var uploadCount = 0;
       //      var localIdLength = images.localIds.length;
       //      var m = 0;
				  	var ua = window.navigator.userAgent.toLowerCase();
       			var s = ua.match(/IPhone/i);
		  			if(s == null){
		  				// alert('这里'+localIds)	  	
		  				if($('.wz_photopustk .chat_img').length>=8){
								$('.chat_img_click').hide();
							}else{
								$('.chat_img_click').show();
							}
			        $('.wz_photopustk').append('<img src="'+localIds+ '"alt="" class="chat_img">');
			        $('.wz_photopustk .chat_img').click(function(){
			        	$(this).remove();
			        	if($('.wz_photopustk .chat_img').length<10){
									$('.chat_img_click').show();
								}
			        	// alert($(this).index);
			        })				
		  			}else{
		  				// for(var i=0;i<images.localIds.length;i++){
		  					wx.getLocalImgData({
						      localId: '' + localIds,
						      success: function (res) {
						        var localData = res.localData;
						        // vm.newld[uploadCount].push(res.localData);
						        // alert(localData)
						        if($('.wz_photopustk .chat_img').length>=8){
											$('.chat_img_click').hide();
										}else{
											$('.chat_img_click').show();
										}
						        $('.wz_photopustk').append('<img src="'+localData+ '"alt="" class="chat_img">');
						        $('.wz_photopustk .chat_img').click(function(){
						        	$(this).remove();
						        	if($('.wz_photopustk .chat_img').length<10){
												$('.chat_img_click').show();
											}
						        	// alert($(this).index);
						        })
						        // $('.chat_img').append('<span>叉</span>');
									}
						    });
		  				// }  
		  			}
		  			// var upload = function() {
                wx.uploadImage({
                    localId:'' + localIds,
                    success: function(res) {
                    	vm.serverId=res.serverId;
                    	// alert(vm.serverId)
                    	var i=$('.wz_photopustk .chat_img').length-1;
                    	$('.wz_photopustk .chat_img').eq(i).attr('value',vm.serverId);
                    	// vm.photoArr.push(vm.serverId)
                    	// alert(vm.photoArr)
                    	// alert('里面'+vm.serverId);
                    	// alert('里面的'+vm.photoArr.push(vm.serverId))
                        // images.serverId.push(res.serverId);
                        // $('.wz_photo').append('<img src="'+res.serverId+ '"alt="" class="chat_img">')
                        //如果还有照片，继续上传
                        // ajaxupload(res.serverId);
                        //这个方法是你需要把所谓的媒体meidaid进行下载到本地的ajax处理如果你需要的话就写一个ajax方法
                        // uploadCount++;
                        // if (uploadCount < localIdLength) {
                        //     upload();
                        // }
                    }
                });                    
            // };
            // upload();
		  			// wx.uploadImage({
				   //    localId: '' + localIds,
				   //    isShowProgressTips: 1,
				   //    success: function(res) {
				   //      var serverId=res.serverId;
				        
				   //    },
				   //      fail:function(res){
				   //        Toast('腾讯服务器上传失败，请重新上传');
				   //      }
				   //  });
				  }
				});
			},
	    GoRouter(){
				var vm=this;
				vm.photoArr=[];
	    	var headers={
	        UserID:this.userid,
	        Token:this.openid
		    };
		    // alert(vm.photoArr);
		    // vm.photoArr.push(vm.serverId);
		    // $('.wz_photopustk .chat_img').each(function(i,v){
		    // 	vm.photoArr.push($(v).attr('src'));
		    // })
		    // if(vm.photoArr.length<=0){
		    // 	vm.updataPhoto=''
		    // }else{
		    	$('.wz_photopustk .chat_img').each(function(i,v){
		    		vm.photoArr.push($(v).attr('value'))
		    	})
		    	// alert(vm.photoArr,vm.photoArr.length)
		    	// vm.photoArr=$('.wz_photopustk .chat_img').attr('value');
		    	vm.updataPhoto=(vm.photoArr.toString()).replace(/,/g,'|');
		    // }
		    // vm.wzTitle=$('.symptom_title_text').val();
		    // if(vm.wzTitle.length>=9){

		    // }
		    // wzid:问诊id did:医生id

		    var data={
		    	PatientId:vm.$route.params.wzid,
		    	DiseaseName:$('.symptom_title_text').val(),
		    	DiseaseDescription:$('.describe_title_text').val(),
		    	DiseaseImageList:vm.updataPhoto||'',
		    	DoctorId:vm.$route.params.did
		    };
		    $.ajax({ url: apiurl.InquiryInsert,type:'post',data:data,headers:headers,
		    	success:function(data){
		    		 console.log(data)
		    		if(data.suc){
		    			// alert("正确")
		    			vm.$router.push({'name':'WenZhenDetail', params: { iid:data.extra.Id,pid:vm.$route.params.wzid,did:vm.$route.params.did,isfalse:1}});
		    		}else{
		    			Toast(data.mes);
		    		}
	        }
	      });
	        // this.$router.push({'name':'ChatDetail', params: { uid: uid,iuid:this.userid }});
	        // this.$router.push({'name':'Chat'});
	    }
		},
		mounted(){
			var vm=this;
			// $('.wz_photopustk .chat_img').
			// alert($('.wz_photopustk .chat_img').length)
			// $('.wz_photopustk').append('<img src="../../assets/images/camera@2x.png" class="chat_img">');
		},
		created(){
		    var vm=this;
		    var headers={
		        UserID:this.userid,
		        Token:this.openid
		    };
		    // console.log($('.chat_img').length);
		    $.ajax({ url: apiurl.GetTicket+"?url="+encodeURIComponent(location.href.split('#')[0]),type:"post",headers:headers, 
		    	success:function(data){
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
	      	}
      	});
		}
	}
</script>