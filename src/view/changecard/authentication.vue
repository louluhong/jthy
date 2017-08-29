<template>
	<div id="authentication">
		<div class="authentication_header">
			<i></i>
			<span>为了保证签约工作顺利进行， 进行实名认证！</span>
		</div>
		<form class="authentication_box clearfix">
			 <router-link class="just_sfz" to="Photograph">
			 	<span>上传身份证正面</span>
			 </router-link>
			 <router-link class="back_sfz" to="Photograph">
			 	<span>上传身份证反面</span>
			 </router-link>
			 <router-link class="sc_sfz" to="Photograph">
			 	<span>手持身份证</span>
			 </router-link>
			 <input type="button" class="authentication_submitOk" value="提交" />
		</form>
		
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		created() {
	
		},
		computed: {
			
		},
		methods: {
			    
		}
	}
	
	
	
</script>


