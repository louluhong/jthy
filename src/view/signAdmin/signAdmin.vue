<template>
	<div id="signAdmin_app">
		<ul>
			<li v-for="(item,index) in list" class="siginAdmin_list" @click="signAdminlist($event,index)" :data-chId="item.PatientID" :data-pass="pass(index)">
				<div class="siginAdmin_title clearfix">
					<i>{{item.SignYear}}</i>
					<span :class="color(index)">{{item.SignStateText}}</span>
				</div>
				<div class="siginAdmin_content">
					<img :src="item.PhotoUrl"/>
					<span class="name">{{item.CHName}}({{item.RelationName}})</span>
					<i :class="sex(index)"></i>
					<span class="age">{{item.Age}}岁</span>
				</div>
				<i class="siginAdmin_arrRight"></i>
			</li>
		</ul>
	</div>
	
	
</template>

<script>
	import Vue from 'vue';
	import { mapGetters,mapActions } from 'vuex';
	import {apiurl} from '../../service/api-config.js';
	import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				list:[]
			}
		},
		created() {
			var vm=this;
			var headers={
		        UserID:this.userid,
		     	Token:this.openid
			}
				$.ajax({
	  			type:"get",
	  			url:apiurl.GetMembersSignedDoctorInfo,
	  			async:true,
	  			headers:headers,
	  			success:function(data){
	  				if(data.suc){
	  					
	  					console.log(data.rows);
	  					vm.list=data.rows;
		  			}else{
		  				Toast(data.mes);
		  			}
	  			
	  			}
	  		});
	
		},
		computed: {
			 ...mapGetters({
		      openid:'openid',userid:'userid',userinfo:'userinfo'
		    }),
		},
		methods: {
			...mapActions([
			      'set_qyadmin','set_qyadminpass','set_medicalid','set_regstate'
		    ]),
			signAdminlist(e,index) {
				var vm=this;
				var id=$(event.currentTarget).attr('data-chId');
				this.set_qyadmin(id);
				this.set_qyadminpass($(event.currentTarget).attr('data-pass')==undefined ? 0 : $(event.currentTarget).attr('data-pass'));

				this.set_medicalid(this.list[index].MedicalApplyId);
				this.set_regstate(this.list[index].SignStateText);
				this.$router.push({'name':'adminDetails',params: { glid:vm.list[index].PatientID }});
				
			},
			color(index) {
				let color="";
				if(this.list[index].SignStateText=="未签约" || this.list[index].SignStateText=="拒绝签约"){
					color="red";
				}else if(this.list[index].SignStateText=="签约成功"){
					color="gray";
				}else{
					color="";
				}
				return color;
			},
			sex(index) {
				let sex="";
				if(this.list[index].Sex=="1"){
					sex="boy";
				}else{
					sex="girl";
				}
				return sex;
			},
			
			pass(index) {//判断详情页面签约医生、签约时间、签约社区是否显示
				if(this.list[index].SignStateText=="签约成功" || this.list[index].SignStateText=="申请通过" || this.list[index].SignStateText=="签约申请中" || this.list[index].SignStateText=="拒绝签约"){
					return 1;
				}
			},
			
		}
	}
</script>
