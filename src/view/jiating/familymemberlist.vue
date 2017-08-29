<template>
<!-- 0 认证失败 -1未认证 1已认证 -->
	<section class="_full_router familymemberlist-container">
		<div class="main">
			<div class="familymember-wrap" v-for="item in familymember">
				<div class="familymember-item">
					<div class="familymember" @click="GoPatientRouter(item.PatientID)">
						<a href="javascript:void(0)">
							<img :src="item.PhotoUrl">
							<span class="details">详细资料<img src="../../assets/images/jiantou@2x.png" alt=""></span>
							<div class="info">
								<p class="name">{{item.CHName}}</p>
								<span class="info_isegis" v-if='item.IsEgis=="1"'>已认证</span>
								<span class="info_isegis" v-if='item.IsEgis=="-1"'>未认证</span>
								<span class="info_isegis" v-if='item.IsEgis=="0"'>认证失败</span>
							</div>
						</a>
					</div>
					<div class="familydoctor" v-if="item.DoctorInfo!=null" @click="goDoctordetail(item.DoctorInfo.Id,item.SignState,item.PatientID)">
						<a>
							<img :src="item.DoctorInfo.PhotoUrl">
							<span class="details"><img src="../../assets/images/jiantou@2x.png" alt=""></span>
							<div class="info">
								<h3>我的家庭医生</h3>
								<p class="name">{{item.DoctorInfo.Name}}<span class="tit">签约医生</span></p>
								<span class="docstate">{{item.SignStateText}}</span>
							</div>
						</a>
					</div>
					<div class="familylink" v-if="item.DoctorInfo!=null">
						<img src="../../assets/images/link@2x.png" alt="">
						<img src="../../assets/images/link@2x.png" alt="">
					</div>
				</div>
			</div>
			<div class="familymemberbtn-wrap">
				<button type="button" class="btn btn-default" @click="GoRouter()"><span>+</span>添加家庭成员</button>
			</div>
		</div>
	</section>
</template>
<script>
import { mapGetters,mapActions } from 'vuex'
import { Toast } from 'mint-ui';
export default{
	computed:{
      ...mapGetters({
      familymember:'familymember'
    })
  },
  created(){
  	console.log(this.familymember)
  },
  methods:{
  	GoRouter(){
        this.$router.push({'name':'AddFemilyMember', params: { pid:0 ,did:0}});
    },
    GoPatientRouter(pid){
    	this.$router.push({'name':'PatientDetail', params: { pid:pid }});
    },
    goDoctordetail(docid,item,pid){
    	if(parseInt(item)==4){
    		Toast("服务将在下年度生效，暂不可用!");
    		return false;
    	}
    	// this.$router.push({'name':'DoctorDetail', params: { did: docid }});
    	this.$router.push({'name':'DoctorDetail', params: { did: docid,wzid:pid}});
    }
  }
}
</script>