<template>
	<div id="successFail">
		<div class="authentication_header">
			<i></i>
			<span>为了保证签约工作顺利进行， 进行实名认证！</span>
		</div>
		<div class="successFail_box">
			<div class="successFail_icon">
				<i :class="bgicon"></i>
				<span>{{content}}</span>
			</div>
			<div v-if="boor==2" class="reason clearfix">
				<label>失败理由</label>
				<i></i>
				<span>{{reason}}</span>
			</div>
			<ul class="img_list clearfix">
				<li>
					<img class="imgOne"/>
					<span v-if="boor==2 || boor==''" class="promptMsg">重新上传</span>
				</li>
				<li>
					<img class="imgTwo"/>
					<span v-if="boor==2 || boor==''" class="promptMsg">重新上传</span>
				</li>
				<li>
					<img class="imgThree"/>
					<span v-if="boor==2 || boor==''" class="promptMsg">重新上传</span>
				</li>
			</ul>
			<input v-if="boor==2 || boor==''" type="button" class="successFailSubmit" value="再次提交" @click="successFailSubmit($event)" />
		
		</div>
		
		
		
	</div>
	
	
</template>

<script>
	import Vue from 'vue';
	import { mapGetters,mapActions } from 'vuex';
	import {apiurl} from '../../service/api-config.js'
	import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				boor:'',
				content:'',
				reason:''
				
			}
		},
		mounted() {
			$(".imgOne").attr('src',this.pictureurl);
			$(".imgTwo").attr('src',this.pictureurlt);
			$(".imgThree").attr('src',this.pictureurltr);
				
			
		},
		beforeRouteEnter (to, from, next) {
    		$(".palyokconetnt").hide();
			next();
		},
		 beforeRouteLeave (to, from, next) {
		   $(".palyokconetnt").show();
		    next();
		  },
		created() {
			var vm=this;
			this.boor=this.picsuccfaval;
			this.reason=this.picmsg;
			if(this.boor==1){
				setTimeout(function(){
					vm.$router.push({'name':'ChangeFamilyMemberList', params: { pid:vm.$route.params.succ }});
				},1000)
			}
		},
		computed: {
			 ...mapGetters({
		     	openid:'openid',picsuccfaval:'picsuccfaval',picmsg:'picmsg',pictureurl:'pictureurl',pictureurlt:'pictureurlt',pictureurltr:'pictureurltr'
		    }),
			bgicon(){
				let bgicon;
				if(this.boor==1){
					bgicon="sucessicon";
					this.content="提交成功！";
				}else{
					bgicon="failicon";
					this.content="提交失败！";
				}
				return bgicon;
			}
		},
		methods: {
			successFailSubmit(e) {
				this.$router.push({'name':"playok",params: { pok:this.$route.params.suc }});
			},
			
		}
	}
	
</script>
