<template>
	<section class="rzinfomation">
		<ul class="rzinfomation_list">
			<li>
				<span>机构类型</span>
				<div class="selectbox">
					<label @click="clicktype()" id="jgtype">{{jgtype}}
						<i class="icon_arr"></i>
					</label>
					<input type="hidden" value="" v-model="jgtypecode"/>
				</div>
			</li>
			<li>
				<span>所属区域</span>
				<select class="city_s">
					<option>省</option>
					<option v-for="item in shen" :value="item.id">{{item.text}}</option>
				</select>
				<select class="city_shi" :disabled="showobj1">
					<option>市</option>
					<option v-for="item in shi" :value="item.id">{{item.text}}</option>
				</select>
				<select class="city_q" :disabled="showobj2">
					<option>区</option>
					<option v-for="item in qu" :value="item.id">{{item.text}}</option>
				</select>
					
			
				<input v-model="Provincetext" type="hidden" value="" >
				<input v-model="Citytext" type="hidden" value="">
				<input v-model="Areatext" type="hidden" value="">
			</li>
			<li><span>机构名称</span><input type="text" v-model="jgname"/></li>
			<li><span>联系人姓名</span><input type="text" v-model="lxname"/></li>
		</ul>
		<span class="submit_btn" @click="submit">确认</span>
		<div class="rzinfomation_Previous" @click="goback()">
			<i></i>
			<span>返回上一步</span>
		</div>
	</section>
</template>

<script>
import Vue from 'vue'
import { mapGetters,mapActions } from 'vuex'
import {apiurl} from '../../service/api-config.js'
import { Toast } from 'mint-ui';
import Picker from 'better-picker'
import '../../assets/js/datePicker.js';
	export default {
		data() {
			return {
				jgtype:'请选择',
				jgtypeSlots: [{text:'省级卫计委',value:1},{text:'市级卫计委',value:2},{text:'区级卫计委',value:3},{text:'社区医院',value:4}],
				gxindex:0,
				jgtypecode:null,
				city:{},
				shen:{},
				shi:{},
				qu:{},
				jgname:'',
				lxname:'',
				cityid:null,
				Provincetext:null,
				Citytext:null,
				Areatext:null,
				showobj1:true,
				showobj2:true
			}
		},
		created() {
			let vm=this;
			$.ajax({ url: apiurl.GetCityInfo,type:'get', success:function(data){
	            vm.shen=data.rows;
	          }
	        });
		},
		 mounted() {
		 	let vm=this;
		  $('.city_s').change(function(){
		  	vm.showobj1=false;
		  	vm.showobj2=true;
		  	vm.qu='';
		  	vm.Areatext='';
		  	vm.shi='';
		  	vm.Citytext='';
		  	vm.Provincetext=$(this).val();
		  	$.ajax({ url: apiurl.GetCityInfo,data:{code:$(this).val()},type:'get', success:function(data){
	            vm.shi=data.rows;
	          }
	        });
		  })
		  $('.city_shi').change(function(){
		  	vm.Citytext=$(this).val();
		  	vm.showobj2=false;
	  		vm.qu='';
		  	vm.Areatext='';
		  	$.ajax({ url: apiurl.GetCityInfo,data:{code:$(this).val()},type:'get', success:function(data){
		  		console.log(data);
	            vm.qu=data.rows;
	          }
	        });
		  }) 
		  $('.city_q').change(function(){
		  	vm.Areatext=$(this).val();
		  })
		  
		  },
		computed:{
		      ...mapGetters({
		      openid:'openid'
		    })
  		},
		beforeUpdate(){
			
		},
		methods: {	
			submit() {
				let vm=this;
				
				if(vm.jgtype=='请选择'){
					Toast("请选择机构类型");
					return false;
				}
				if(vm.Provincetext==null || vm.Provincetext=="省"){
					Toast("请选择区域")
					return false;
				}
				if(vm.jgname==""){
					Toast("请输入机构名")
					return false;
				}
				if(vm.lxname==''){
					Toast("请输入姓名")
					return false;
				}
				var data={
					OrgType:vm.jgtypecode,
					FromProvince:vm.Provincetext,
					FromCity:vm.Citytext,
					FromArea:vm.Areatext,
					OrgName:vm.jgname,
					ContactMan:vm.lxname,
					ContactPhone:JSON.parse(sessionStorage.getItem('rzUseriphone')),
					OpenID:vm.openid
				}
				
				
				$.ajax({ url: apiurl.EnterHosInfo,data:data,type:'post', success:function(data){
					sessionStorage.setItem('rzUserjglx',JSON.stringify(vm.jgname));
             		if(data.suc){
             			Toast('入驻成功，请查收密码短信');
             			setTimeout(()=> {
             				vm.$router.push({'name':'Rzok', params: { zcok: 0}});
             			},500)
						
					}else{
						Toast(data.mes)
					}	
             		console.log(data)
		          }
		        });
				
				
				
			},
			goback() {
				window.history.go(-1);
			},
			   
			 /*机构类型选择*/
		    clicktype() {
		    	var vm=this;
		    	var picker1El = document.getElementById('jgtype');
		    	var picker1 = new Picker({
				    data: [this.jgtypeSlots],
				    selectedIndex:vm.gxindex,
				    title: '请选择'
				});
				picker1.show();
				picker1.on('picker.select', function (selectedVal, selectedIndex) {
					vm.jgtype = vm.jgtypeSlots[selectedIndex[0]].text;
					vm.jgtypecode=vm.jgtypeSlots[selectedIndex[0]].value;
				});
		    },
		    /*机构类型选择end*/
			
		},
		watch:{
			
		}
	}
	
	
	
</script>
<style scope>
.container{
  height: 100%;
  /* padding-bottom: 1.34rem; */
 
}
</style>
