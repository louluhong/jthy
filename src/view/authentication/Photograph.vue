<template>
	<div id="Photograph">
		<div class="Photograph_box" >
			<img src="../../assets/images/Sample sampleofcard@2x.png" alt="身份证样本" />
			<div class="Photograph_tips">
				<i class="icon"></i>
				<p>请按示例图上传身份证证件照，要求需<i>清晰</i>
显示身份证内容！</p>
			</div>
			<input class="palyPhoto" type="button" value="拍照" @click="ChooseImage('camera')"/>
			<input class="toAlbum" type="button" value="从相册中选择" @click="ChooseImage('album')" />
		</div>
	</div>
	
	
</template>

<script>
	import Vue from 'vue';
	import { mapGetters,mapActions } from 'vuex';
	import { Toast } from 'mint-ui';
	import {apiurl} from '../../service/api-config.js';
	import {globappid} from '../../variable/variable.js'
	import wx from 'weixin-js-sdk';
	export default {
		data() {
			return {
				
			}
		},
		created() {
			var vm=this;
			// alert('跳错了')
		     var headers={
		        UserID:this.userid,
		     	Token:this.openid
		     };
			
      $.ajax({ url: apiurl.GetTicket+"?url="+encodeURIComponent(location.href.split('#')[0]),type:"post",headers:headers, success: 		function(data){
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
			},
		computed: {
			 ...mapGetters({
		       openid:'openid',pictureurl:'pictureurl',picvaluea:'picvaluea',userid:'userid',userinfo:'userinfo'
		    }),
		},
		
		beforeRouteEnter (to, from, next) {
    		$(".palyokconetnt").hide();
			next();
		},
		 beforeRouteLeave (to, from, next) {
		   $(".palyokconetnt").show();
		    next();
		  },
		
		
		
		methods: {
			...mapActions([
		      'set_pictureurl','set_pictureurlt','set_pictureurltr','set_imgtureurl','set_imgtureurlt','set_imgtureurltr'
		    ]),
		    
		    
			 ChooseImage(type){
			 	
			 	var vm=this;
			 	vm.$router.push({'name':'playok',params: { pok:this.$route.params.pok}});
			 	wx.chooseImage({
				    count: 1, // 默认9
				    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				    sourceType: [type], // 可以指定来源是相册还是相机，默认二者都有
				    success: function (res) {
				        var localIds = res.localIds; // 回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
				  		var ua = window.navigator.userAgent.toLowerCase();
       					var s = ua.match(/IPhone/i);
		  				if(s == null){
		  					if(vm.picvaluea=='0'){
		  						vm.set_pictureurl(localIds);
		  					}
		  					if(vm.picvaluea=='1'){
		  						vm.set_pictureurlt(localIds);
		  					}
		  					if(vm.picvaluea=='2'){
		  						vm.set_pictureurltr(localIds);
		  					}
		  					
		  				}else{
		  					 wx.getLocalImgData({
					            localId: '' + localIds,
					            success: function (res) {
					            	var localData = res.localData; 	
					            	// alert(localData)			            	
					            	if(vm.picvaluea=='0'){
				  						vm.set_pictureurl(localData);
				  					}
				  					if(vm.picvaluea=='1'){
				  						vm.set_pictureurlt(localData);
				  						
				  					}
				  					if(vm.picvaluea=='2'){
				  						vm.set_pictureurltr(localData);
				  						
				  					}
								}
					        });
		  				}
		  				 wx.uploadImage({
				                localId: '' + localIds,
				                isShowProgressTips: 1,
				                success: function(res) {
				                    var serverId=res.serverId;
				                    if(vm.picvaluea=='0'){
				  						vm.set_imgtureurl(serverId);
				  						// alert(localIds)
				  						
				  					}
				  					if(vm.picvaluea=='1'){
				  						vm.set_imgtureurlt(serverId);
				  				
				  					}
				  					if(vm.picvaluea=='2'){
				  						vm.set_imgtureurltr(serverId);
				  						
				  					}
				                    vm.$router.push({'name':'playok',params: { pok:this.$route.params.pok}});
				                },
				                fail:function(res){
				                  Toast('腾讯服务器上传失败，请重新上传');
				                }
				            });
		  				
		  				
		  				
				    }
				   
				});
			 
			 	
			 	
			 }
			
		
			
			
			
		}
	}
</script>

