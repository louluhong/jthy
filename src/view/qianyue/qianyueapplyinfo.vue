<template>
	<section class="_full_router qianyueapplyinfo-container">
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
							<dd>{{pinfo.PatientCardId}}</dd>
						</dl>
						<dl>
							<dt>医保类型</dt>
							<dd>{{pinfo.MedicalCardType}}</dd>
						</dl>
						<!-- <dl>
							<dt>职业</dt>
							<dd>{{pinfo.Age}}</dd>
						</dl> -->
						<dl>
							<dt>地址</dt>
							<dd>{{pinfo.Address}}{{pinfo.DetailedAddress}}</dd>
						</dl>
					</div>
				</div>
			</div>
			<div class="healthinfo-sure-wrap" @click="GoHealthRouter()">
				<img src="../../assets/images/Questionnaire@2x.png" alt="" class="healthinfo-sure-wrap-icon">
				<span class="healthinfo-sure-wrap-text">健康情况信息</span>
				<img src="../../assets/images/Combined Shape@2x.png" alt="" class="healthinfo-sure-wrap-jiantou">
			</div>
			<div class="qianyueapplyinfo-sure-wrap">
				<checkboxzdy :lists="checklist" name="qycheck"></checkboxzdy>
				<span class="qianyueapplyinfo-sureinfo-wrap" @click="ReadMedicalRegisterInfo()">签约协议</span>
			</div>
			<div class="qianyueapplyinfo-btn-wrap">
				<button type="button" class="btn btn-primary" @click="MedicalRegisterInfoApply()">确定签约</button>
			</div>
		</div>
		<div class="qianyueapplyinfo-successbg" style="display: none">
			<div class="qianyueapplyinfo-dialog">
				<img src="../../assets/images/qyapplysuc@2x.png" alt="">
				<span>申请签约成功！医生会尽快联系你</span>
				<span>线下见面，请关注短信和平台通知！</span>
				<div @click="GoRouter()">
					知道了
				</div>
			</div>
		</div>
	</section>
</template>
<script>
import { mapGetters,mapActions } from 'vuex'
import { Toast } from 'mint-ui';
import {apiurl} from '../../service/api-config.js'
import checkboxzdy from '../../components/checkbox-zdy.vue';
export default{
	computed:{
      ...mapGetters({
      openid:'openid',familymember:'familymember',userid:'userid',userinfo:'userinfo'
    })
  },
  data() {
        return {
        	checklist:[{text:"同意",value:"1",checked:true}],
        	pinfo:[]
        }
  },
   methods:{
   	...mapActions([
      'set_familymember','set_signstate'
    ]),
    ReadMedicalRegisterInfo(){
    	this.$router.push({'name':'Other', params: { href: encodeURIComponent("http://182.254.138.91:8099/home/MedicalRegisterAgreement") }});
    },
   	MedicalRegisterInfoApply(){
   		if($('.radiocheck-item input').prop('checked')){
   			var vm=this;
  		var headers={
  			UserID:this.userid,
			Token:this.openid
  		};
  		var data={
			patientID:vm.$route.params.pid,
			doctorID:vm.$route.params.did
  		};
  		$.ajax({ url: apiurl.MedicalRegisterInfo,type:"post",data:data,headers:headers, success: function(data){
  			if(data.suc){
  				$(".qianyueapplyinfo-successbg").show();
  				vm.set_signstate(vm.$route.params.pid);
  			}else{
  				Toast(data.mes);
  			}
  		}});
   		}else{
   			Toast('请先同意签约协议');
   		}
   	},
   	GoRouter(){
        this.$router.push({'path':'/Index'});
    },
    GoHealthRouter(){
    	this.$router.push({'name':'HealthInfo', params: { pid: this.$route.params.pid,did: 0}});
    }
	},
  created(){
  		var vm=this;
  		var headers={
  			UserID:this.userid,
			Token:this.openid
  		};
  		$.ajax({ url: apiurl.GetPatientInfoHistory+"?patientID="+vm.$route.params.pid,headers:headers, success: function(data){
  			if(data.suc){
  				vm.pinfo=data.extra;
  			}else{
  				Toast(data.mes);
  			}
  		}});
  },
    	components: {
      		checkboxzdy
    	}
}
</script>