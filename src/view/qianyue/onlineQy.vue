<template>
	<section id="onlineQy">
		<ul class="onlineQy_list">
			<li @click="goHospitalList">
				<div class="onlineQy_img">
					<img src="../../assets/images/shenqingqianyue@2x.png"/>
				</div>
				<span>申请签约</span>
			</li>
			<li @click="goAuthentication">
				<div class="onlineQy_img">
					<img src="../../assets/images/qianyueguanli@2x.png"/>
				</div>
				<span>签约管理</span>
			</li>
		</ul>
	</section>
	
</template>

<script>
	import { mapGetters,mapActions } from 'vuex'
	import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				
			}
		},
		created() {
			var vm=this;
		},
		computed: {
			...mapGetters({
				onaddress:'onaddress'
		    })
		},
		methods: {
			...mapActions([
		      'set_onaddress'
		    ]),
			goHospitalList() {
				this.$router.push({'name':'HospitalList',params: { pid:0 }});
			},
			goAuthentication() {
				this.$router.push({'name':'signAdmin'});
			}
		},
		
	}
	
	
	
</script>
