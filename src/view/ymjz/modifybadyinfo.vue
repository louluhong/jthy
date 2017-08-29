<template>
	<section class="modifybadyinfo">
			<ul class="modifybadyinfo_list">
				<li>
					<label>姓名</label>
					<span>{{badylist.PatientName}}</span>
				</li>
				<li>
					<div @click="ChooseImage('album')">
						<label>头像</label>
						<img class="sexImg" :src="badylist.PatientImageUrl" />
						<i></i>
					</div>
				</li>
				<li>
					<label>出生日期</label>
					<input id="EndDate" :value="text" readonly="readonly" />
					<i></i>
				</li>
			</ul>
 		<input @click="upbadyinfo" class="modifybadyinfo_btnOk" type="button" value="确定" />

	</section>


</template>

<script>
import Vue from 'vue'
import { mapGetters,mapActions } from 'vuex'
import {apiurl} from '../../service/api-config.js'
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
import wx from 'weixin-js-sdk';
import { DatetimePicker } from 'mint-ui';
Vue.component(DatetimePicker.name, DatetimePicker);
import '../../assets/js/datePicker.js';

	export default {
		data() {
			return {
				sex:"男",
				text:'',
				badylist:{},
				serverId:''
			}
		},
		created() {
			let vm=this;
			
			var headers={
	  			UserID:this.userid,
				Token:this.openid
  			};
  			
  			$.ajax({//获取宝宝信息
				type:'get',
				url:apiurl.GetBabyMember,
				headers:headers,
				success: function(data){
					vm.badylist=data.rows[vm.$route.params.modbadyid];
					//console.log(vm.badylist);
					vm.text=vm.badylist.PatientBirthday.substring(0,10);
  				}
			});
  			$.ajax({ url: apiurl.GetTicket+"?url="+encodeURIComponent(location.href.split('#')[0]),type:"post",headers:headers, success: function(data){
		        if(data.suc){
		            wx.config({
		              debug:false,
		              appId: 'wxb0c5ae7e817919e7',
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
		mounted() {
			var vm=this;
			var calendar = new datePicker();
				calendar.init({//http://www.jq22.com/jquery-info13151
				    'trigger': '#EndDate', /*按钮选择器，用于触发弹出插件*/
				    'type': 'date',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
				    'minDate':'1900-1-1',/*最小日期*/
				    'maxDate':'2100-12-31',/*最大日期*/
				    'onSubmit':function(){/*确认时触发事件*/
				        vm.text=calendar.value;
				    },
				    'onClose':function(){/*取消时触发事件*/
				    }
				});
		},
		computed: {
			...mapGetters({
		      openid:'openid',userid:'userid',userinfo:'userinfo'
		    }),
			
		},
		methods: {
			ChooseImage(type){
		 		var vm=this;
		        wx.chooseImage({
			    count: 1, // 默认9
			    sizeType: ['original', 'compressed'],
			    sourceType: [type], 
			    success: function (res) {
			        var localIds = res.localIds;
			        var ua =window.navigator.userAgent.toLowerCase();
			        var s = ua.match(/IPhone/i);
			        if(s == null){
			            $('.sexImg').attr('src', localIds);
			        }else{
			          wx.getLocalImgData({
			            localId: '' + localIds,
			            success: function (res) {
			              var localData = res.localData; 
			              $('.sexImg').attr('src', localData);
			            }
			          });
			        }
			        wx.uploadImage({
			                localId: '' + localIds,
			                isShowProgressTips: 1,
			                success: function(res) {
			                    vm.serverId=res.serverId;
			                }
			            });
				   	}
				});
    },
			upbadyinfo() {
				let vm=this;
				var yearold=parseInt(vm.text.substring(0,4));
				var monthold=parseInt(vm.text.substring(5,7));
				var datedayold=parseInt(vm.text.substring(8,10));
				console.log(monthold,datedayold)
				var dataobj = new Date();
     			var yearnow = dataobj.getFullYear();
     			var month = dataobj.getMonth()+1;
     			var dateday = dataobj.getDate();
     			if(yearnow<yearold || monthold > month || datedayold > dateday){
     				Toast("出生日期不能大于当前日期");
     				return false;
     			}
				Indicator.open({
				  text: '更新中...',
				  spinnerType: 'fading-circle'
				});
				let data = {
					PatientId:vm.badylist.PatientID,
					media_id:vm.serverId,
					PatientBirthday:vm.text
				};
				let headers={
		  			UserID:this.userid,
					Token:this.openid
	  			};
				$.ajax({//更新宝宝信息
					url:apiurl.UpdateBabyInfo,
					type:'post',
					headers:headers,
					data:data,
					success:function(data){
						Indicator.close();
						Toast("修改成功！");
						setTimeout(function(){
							vm.$router.push({'name':'ymjzindexhave'});
						},1000);
						
						
					},
					error:function(XMLHttpRequest){
						Indicator.close();
						Toast("网络出错了，需要您重新添加！");
				}
				});
			},
		},
		beforeRouteLeave (to, from, next) {
		   $(".gearDate").hide();
		    next();
		  },
		
		
	}
</script>

<style>
</style>