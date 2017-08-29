<template>
	<section class="badybox">
		<div class="ymjz_addbaby" v-if="!ishavebaby">
			<img class="nobady" src="../../assets/images/nobaby2@2x.png" />
			<span class="nobadytext">暂无宝宝信息</span>
			<div class="addbady_btn" @click="addbadya()">
				<span class="addicon">+</span>
				<span>添加宝宝信息</span>
			</div>
			<div class="lookAllym" @click="GOlookym">
				<span>查看全部疫苗接种计划</span>
				<img src="../../assets/images/ic_next@2x.png"/>
			</div>
		</div>
		<div class="ymjzindexhave" v-if="ishavebaby">
			<header class="header">
				<ul class="ymjzindexhave_ul clearfix">
					<li v-for="(item,key) in badylist">
						<img @click="clickme($event,key)"  class="ymjzindexhave_img" :class="{ active:key==index}" :src="item.PatientImageUrl"/>
						<div class="ymjzindexhave_text" :class="{ show:key==index}">
							<span>{{item.PatientName}}</span>
							<label>|</label>
							<span class="num">{{item.Bornday}}</span>
						</div>
						<div class="arr" :class="{ arrshow:key==index}">
							<img src="../../assets/images/bady_img_arr2x.png" />
						</div>
					</li>
					<li>
						<i @click="addbady"></i>
					</li>
				</ul>
			</header>
			<div class="content">
				<div v-show="!maxyear">
					<div class="Progressbar">
						<div class="Progressbar_img">
							<div class="circleChart" id="circle1"></div> 
							<div class="dataTips">
								<div class="datanum">
									<span class="tian">{{text}}</span>
									<span v-if="text!=0">天后</span>
								</div>
								
								<span>可接种疫苗</span>
								<span class="datatime">{{riqi}} {{weekday}}</span>
							</div>
						</div>
					
					</div>
					<ul class="ymname" @click="gobadyymxq(badylist[index].BornMonth)" v-show="ym.lenght!=0">
						<li class="clearfix" v-for="item in ym">
							<i></i><span>{{item.BacterinName}}</span>
						</li>
						
						<li class="arr">
							
						</li>
					</ul>
				</div>
				<div v-show="maxyear" class="overbady">
					<img class="overbady_img" src="../../assets/images/badyover_img@2x.png" />
					<div class="lookAllym" @click="GOlookym">
						<span>查看全部疫苗接种计划</span>
						<img src="../../assets/images/ic_next@2x.png"/>
					</div>
				</div>
				
				
				
				
				
			</div>
		</div>
		
		
	</section>


</template>

<script>
import Vue from 'vue'
import { mapGetters,mapActions } from 'vuex'
import {apiurl} from '../../service/api-config.js'
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import '../../assets/js/jquery-1.11.0.min.js';
import '../../assets/js/circleChart.es5.min.js';
	export default {
		data() {
			return {
				badylist:[],
				index:null,
				val:'',//进度的值
				text:null,
				riqi:'',
				ym:{},
				weekday:'',
				maxyear:false
				
			}
		},
		created() {
			if(this.badyactive!=null){
				this.index=this.badyactive;
			}else{
				this.index=0;
			}
			
		},
		mounted() {
			
			var vm=this;
			var headers={
	  			UserID:this.userid,
				Token:this.openid
			};
			
				
			if(this.ishavebaby>0){//判断是否已经有宝宝
				Indicator.open({
				  text: '加载中...',
				  spinnerType: 'fading-circle'
				});
			$.ajax({
				type:'get',
				url:apiurl.GetBabyMember,
				headers:headers,
				success: function(data){
					Indicator.close();
					console.log(data);
					if(data.suc){
						vm.badylist=data.rows;
						if(data.rows[vm.index].BornMonth>72){
							vm.maxyear=true;
							return false;
						}else{
							vm.maxyear=false;
						}
						
						var badybir=vm.ishavebaby!=0 ? data.rows[vm.index].PatientBirthday : vm.nowdate();
						vm.set_badybirthday(badybir);
						$.ajax({
							type:'get',
							url:apiurl.GetBacterinNearList,
							headers:headers,
							data:{PatientBirthday:badybir},
							success:function(data){
								if(data.suc){
									vm.ym=data.rows;	
									vm.riqi=data.rows[0].BacterinAppointmentDate.substring(0,10);
									vm.text=(data.rows[0].LeaveDay!=0) ? data.rows[0].LeaveDay : "今天";
									vm.weekday=data.rows[0].DayWeek;
									
									if(data.rows[0].LeaveDay>100){
										vm.val=100-parseInt(data.rows[0].LeaveDay*100/1080);
									}else{
										vm.val=100-data.rows[0].LeaveDay;
									}
									
									vm.creatYuan(vm.val);
								}else{
									Toast(data.mes);
								}
							}
						});
					}else{
						Toast(data.mes);
					}
  					
  				},
  				error:function(XMLHttpRequest){
						Indicator.close();
						Toast("网络出错了！");
				}
			});
			
			}	
		},
		computed: {
			 ...mapGetters({
		      openid:'openid',userid:'userid',badyactive:'badyactive',ishavebaby:'ishavebaby',userinfo:'userinfo'
		    })
		},
		methods: {
			...mapActions(['set_bormmonth','set_badybirthday','set_badyactive']),
			clickme(event,key) {
				var vm=this;
				vm.index=key;
				vm.set_badyactive(key);
				var headers={
		  			UserID:this.userid,
					Token:this.openid
	  			};
			$.ajax({
				type:'get',
				url:apiurl.GetBabyMember,
				headers:headers,
				success: function(data){
					if(data.suc){
						if(data.rows[key].BornMonth>72){
							vm.maxyear=true;
							return false;
						}else{
							vm.maxyear=false;
						}
						vm.badylist=data.rows;
						var badybir=vm.ishavebaby!=0 ? data.rows[key].PatientBirthday : vm.nowdate();
						vm.set_badybirthday(badybir);

						$.ajax({
							type:'get',
							url:apiurl.GetBacterinNearList,
							headers:headers,
							data:{PatientBirthday:badybir},
							success:function(data){
								if(data.suc){
									vm.ym=data.rows;	
									vm.riqi=data.rows[0].BacterinAppointmentDate.substring(0,10);
									vm.text=(data.rows[0].LeaveDay!=0) ? data.rows[0].LeaveDay : "今天";
									vm.weekday=data.rows[0].DayWeek;
									if(data.rows[0].LeaveDay>100){
										vm.val=100-parseInt(data.rows[0].LeaveDay*100/1080);
									}else{
										vm.val=100-data.rows[0].LeaveDay;
									}
									
									vm.creatYuan(vm.val);
								}else{
									Toast(data.mes);
								}
							}
						});
					}else{
						Toast(data.mes);
					}
						
  				}
			});
				
				
				
				 var el = event.currentTarget;
				  if(!$(el).hasClass('active')){
				  	$(el).addClass('active').parent().siblings().children('.ymjzindexhave_img').removeClass("active");
       				$(el).siblings('.ymjzindexhave_text').addClass('show').parent().siblings().children('.ymjzindexhave_text').removeClass("show");
       				$(el).siblings('.arr').addClass('arrshow').parent().siblings().children('.arr').removeClass("arrshow");
				  }else{
				  	vm.$router.push({'name':'modifybadyinfo',params:{modbadyid: key}});
				  }
			},
			addbady() {
				if($(".ymjzindexhave_ul li").length<6){
					this.$router.push({'name':'AddFemilyMember', params: { pid: 0 }});
				}else{
					Toast("您的孩子已经多于5个，无法再添加！");
				}
				
			},
			gobadyymxq(BornMonth) {
				this.set_bormmonth(BornMonth);
				this.$router.push({name:'ymxqlist',params:{login:1}});
			},
			addbadya() {
				this.$router.push({'name':'AddFemilyMember', params: { pid: 0 }});
			},
			GOlookym() {
				this.set_bormmonth(0);
				this.$router.push({'name':'ymxqlist',params:{login:0}});
			},
			creatYuan(val) {
				$("#circle1").circleChart({//http://www.htmleaf.com/html5/html5-canvas/201705154511.html
					color: "#518DFD",
					backgroundColor: "#E5F1FD",
					background: true,
					speed: 2000,
					widthRatio: 0.15,
					value: val,
					unit: 'percent',//设置圆形进度条当前进度值的单位。例如：percent、deg、rad。
					counterclockwise: false,
					size: 215,
					startAngle: 25,//设置圆形进度条动画的开始角度。
					animate: true,
					backgroundFix: true,
					lineCap: "round",
					animation: "easeInOutCubic",
					//text: "",
					redraw: true,//定义圆形进度条是否重新开始整个动画，或是从最后的值开始动画。布尔值。
					cAngle: 0,
					textCenter: true,//设置是在圆形进度条下方显示文字，还是在圆形进度条里面显示文字。
					textSize: false,
					textWeight: 'normal',
					textFamily: 'sans-serif',//设置文字的字体。如：sans-serif, monospace等。
					relativeTextSize: 1 /10,
					autoCss: true,
					onDraw: false    
				});
			},
			nowdate() {
				var date = new Date();
			    var seperator1 = "-";
			    var seperator2 = ":";
			    var month = date.getMonth() + 1;
			    var strDate = date.getDate();
			    if (month >= 1 && month <= 9) {
			        month = "0" + month;
			    }
			    if (strDate >= 0 && strDate <= 9) {
			        strDate = "0" + strDate;
			    }
			    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
			            + " " + date.getHours() + seperator2 + date.getMinutes()
			            + seperator2 + date.getSeconds();
			    return currentdate;
			}
		
			
		}
	}
</script>

<style>
</style>