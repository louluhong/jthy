<template>
	<section class="qianyueapplyinfo-container">
		<div class="main">
			<div class="info-flag-wrap">
				<div class="info-flag">
					<div class="info-flag-dl">
						<dl>
							<dt>姓名</dt>
							<dd>{{pinfo.PatientName}}
							<img class="sex" src="../../assets/images/female@2x.png" alt="" v-if="pinfo.Sex==0" />
							<img class="sex" src="../../assets/images/male@2x.png" alt="" v-if="pinfo.Sex==1" /></dd>
						</dl>
						<dl>
							<dt>年龄</dt>
							<dd>{{pinfo.PatientAge}}岁</dd>
						</dl>
						<dl>
							<dt>身份证</dt>
							<dd>{{idcard}}</dd>
						</dl>
						<dl>
							<dt>医保类型</dt>
							<dd>{{pinfo.MedicalCardType}}</dd>
						</dl>
						<dl>
							<dt>地址</dt>
							<dd>{{pinfo.Address}}{{pinfo.DetailedAddress}}</dd>
						</dl>
					</div>					
				</div>
				<div class="changeapplyinfo" @click="GoChangeFamilyMemberList(pinfo.Id)"><span>修改信息</span></div>
			</div>
		</div>
	</section>
</template>
<script>
import { mapGetters,mapActions } from 'vuex'
import { Toast } from 'mint-ui';
import {apiurl} from '../../service/api-config.js'
export default{
	computed:{
      ...mapGetters({
      openid:'openid',userid:'userid',userinfo:'userinfo'
    })
  },
  data() {
    return {
    	pinfo:[],
    	idcard:''
    }
  },
  methods:{
   	...mapActions([
      'set_familymember','set_signstate','set_picvalue','set_picvaluet','set_picvaluetr','set_picimgs','set_picbackimgs','set_pictureurl','set_pictureurlt','set_pictureurltr'
    ]),
    GoChangeFamilyMemberList(pid){
        this.$router.push({'name':'ChangeFamilyMemberList', params: { pid:pid }});
        // this.$router.push({'name':'playokchange',params: { pok:pid}});
    },
	},
  created(){
		var vm=this;
		this.set_picvalue("");
  	this.set_picvaluet("");
  	this.set_picvaluetr("");
  	this.set_picimgs("");
  	this.set_picbackimgs("");
  	this.set_pictureurl("");
		this.set_pictureurlt("");
		this.set_pictureurltr("");
		var headers={
			UserID:this.userid,
			Token:this.openid
		};
		$.ajax({ url: apiurl.GetPatientInfoHistory+"?patientID="+vm.$route.params.pid,headers:headers, success: function(data){
			console.log(data)
			if(data.suc){
				let subjq = data.extra.PatientCardId.substr(6,9);
        vm.idcard = data.extra.PatientCardId.replace(subjq,"*********");
				vm.pinfo=data.extra;
				
			}else{
				Toast(data.mes);
			}
		}});
  }
}
</script>