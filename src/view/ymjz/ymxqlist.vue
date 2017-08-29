<template>
	<section class="ymxqlist">
		<header class="header_nav">
			<nav class="nav">
				<span v-for="(item,key) in navmouth" @click="addClass(key,item.StartMonthAge)" :class="(key==keyval)?border='spanBorder':border=''">{{item.AgeGroupName}}</span>
			</nav>
		</header>
		<div class="select_arr" @click="clickshow()">
			<i></i>
		</div>
		<div class="mouthlist" v-show="showH">
			<ul class="mouthlist_box">
				<li v-for="(item,key) in mouthlist" @click="addBg(key,item.StartMonthAge)" :class="(key==index)?bgcolorval='bgcolor':bgcolorval=''">{{item.AgeGroupName}}</li>
			</ul>
		</div>
		<ul class="ymxqlist_content">
			<li v-for="item in ym" @click="Goymxq(item.BacterinId)">
				<div class="time_tips" v-if="datashow">
					<span>预计：{{item.BacterinAppointmentDate.substring(0,10)}} {{item.DayWeek}}</span>
				</div>
				<div class="ym_list">
					<img src="../../assets/images/ymxq_list_icon@2x.png" />
					<div class="ym_list_content">
						<div class="text">
							<label>{{item.BacterinName}}</label>
							<span>(免费)</span>
						</div>
						<span class="num">{{item.BacterinTime}}／共{{item.BacterinCount}}剂</span>
					</div>
					<i class="arr"></i>
				</div>
			</li>
			
		</ul>
	</section>


</template>

<script>
import Vue from 'vue'
import { mapGetters,mapActions } from 'vuex'
import {apiurl} from '../../service/api-config.js'
import { Toast } from 'mint-ui';


	export default {
		data() {
			return {
				navmouth:[],
				mouthlist:[],
				border:'',
				keyval:1,
				bgcolorval:'',
				index:null,
				showH:false,
				ym:[],
				datashow:false
			}
		},
		created() {
			let vm=this;
			if(vm.$route.params.login==0){//判断预计时间是否显示
				vm.datashow=false;
			}else if(vm.$route.params.login==1){
				vm.datashow=true;
			}
			
			var headers={
	  			UserID:this.userid,
				Token:this.openid
	  		};
			$.ajax({
				type:"get",
				url:apiurl.GetAgeGroup,
				async:true,
				headers:headers,
				success: function(data){
					if(data.suc){
						vm.mouthlist=data.rows;
						//console.log(vm.mouthlist);
						if(vm.bormmonth!="" && vm.bormmonth!=null){
							if(0<=vm.bormmonth && vm.bormmonth<=6){
								for(var i=0;i<vm.mouthlist.length;i++){
									if(vm.mouthlist[i].StartMonthAge==vm.bormmonth){
										vm.conmonFuntion(i);
										vm.conmonApi(i);
										vm.index=i;
									}
								}
							}else{
								if(vm.bormmonth==8 || vm.bormmonth==7){
									vm.conmonFuntion(7);
									vm.index=7;
									vm.conmonApi(7);
								}else if(vm.bormmonth==9){
									vm.conmonFuntion(8);
									vm.index=8;
									vm.conmonApi(8);
								}else if(10<=vm.bormmonth && vm.bormmonth<=18){
									vm.conmonFuntion(9);
									vm.conmonApi(9);
									vm.index=9;
								}else if(19<=vm.bormmonth && vm.bormmonth<=24){
									vm.conmonFuntion(10);
									vm.conmonApi(10);
									vm.index=10;
								}else if(25<=vm.bormmonth && vm.bormmonth<=36){
									vm.conmonFuntion(11);
									vm.conmonApi(11);
									vm.index=11;
								}else if(37<=vm.bormmonth && vm.bormmonth<=72){
									vm.conmonFuntion(12);
									vm.conmonApi(12);
									vm.index=12;
								}
		
							}
							
						}else{
							/*默认*/
							let letAgeGroupName=[];
							for(let i=0;i<3;i++){
								letAgeGroupName.push(vm.mouthlist[i]);
							}
							vm.navmouth=letAgeGroupName;
							vm.keyval=0;
							vm.conmonApi(0);
							vm.index=0;
							/*默认end*/
						}
						
						
					}else{
						Toast(data.mes);
					}
				}
				
			});
			
			
			
			
			
			
		},
		mounted() {
			let vm=this;
			setTimeout(function(){
				vm.oncolor();
			},100);
			
		},
		computed: {
			 ...mapGetters({
		      openid:'openid',bormmonth:'bormmonth',badybirthday:'badybirthday',userid:'userid',userinfo:'userinfo'
		    })
		},
		methods: {
			...mapActions(['set_bormmonth']),
			conmonFuntion(pos) {
				let vm=this;
				vm.index=pos;
				if(pos!=0 && pos!=vm.mouthlist.length-1){
					vm.navmouth=[vm.mouthlist[pos-1],vm.mouthlist[pos],vm.mouthlist[pos+1]];
					vm.keyval=1;
				}else if(pos==0){
					vm.navmouth=[vm.mouthlist[pos],vm.mouthlist[pos+1],vm.mouthlist[pos+2]];
					vm.keyval=0;
				}else if(pos==vm.mouthlist.length-1){
					vm.navmouth=[vm.mouthlist[pos-2],vm.mouthlist[pos-1],vm.mouthlist[pos]];
					vm.keyval=2;
				}
			},
			conmonApi(pos) {
				let vm=this;
				var headers={
		  			UserID:this.userid,
					Token:this.openid
		  		};
	  			$.ajax({
					type:"get",
					url:apiurl.GetBacterinInfoListByAge,
					async:true,
					headers:headers,
					data:{StartMonthAge:vm.mouthlist[pos].StartMonthAge,PatientBirthday:vm.badybirthday},
					success: function(data){
						if(data.suc){
							vm.ym=data.rows;
							//console.log(vm.ym);
						}else{
							Toast(data.mes);
						}
					}
				
				});
		  		
			},
			conmonfunA(StartMonthAge) {
				let vm=this;
				if(0<=StartMonthAge && StartMonthAge<=6){
					for(var i=0;i<vm.mouthlist.length;i++){
						if(vm.mouthlist[i].StartMonthAge==StartMonthAge){
							vm.conmonApi(i);
						}
					}
				}else{
					if(StartMonthAge==8){
						vm.conmonApi(7);
					}else if(StartMonthAge==9){
						vm.conmonApi(8);
					}else if(10<=StartMonthAge && StartMonthAge<=18){
						vm.conmonApi(9);
					}else if(19<=StartMonthAge && StartMonthAge<=24){
						vm.conmonApi(10);
					}else if(25<=StartMonthAge && StartMonthAge<=36){
						vm.conmonApi(11);
					}else if(37<=StartMonthAge && StartMonthAge<=72){
						vm.conmonApi(12);
					}

				}
			},
			addClass(key,StartMonthAge) {
				let vm=this;
				vm.set_bormmonth(StartMonthAge);
				vm.showH=false;
				let el = event.currentTarget;
				vm.keyval=key;
				vm.conmonfunA(StartMonthAge);
				if($(el).hasClass("spanBorder")){
					return false;
				}
				setTimeout(function(){
					vm.oncolor();
				},100);
			},
			addBg(key,StartMonthAge) {
				this.set_bormmonth(StartMonthAge);
				var el = event.currentTarget;
				this.conmonFuntion(key);
				this.conmonfunA(StartMonthAge);
				this.showH=!this.showH;
			},
			clickshow() {
				this.showH=!this.showH;
			},
			Goymxq(BacterinId) {
				this.$router.push({name:"ymxq",params:{BacterinId:BacterinId}});
			},
			oncolor() {
				let vm=this;
				$(".nav span").each(function(){
					if($(this).hasClass("spanBorder")){
						for(let i=0;i<vm.mouthlist.length;i++)
						{
							if($(this).text()==vm.mouthlist[i].AgeGroupName){
								vm.index=i;
							}
						}
						
					}
				});
			}
		}
	}
</script>

<style>
</style>