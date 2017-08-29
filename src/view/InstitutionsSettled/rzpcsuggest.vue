<template>
	<section class="rzyhsuggest">
		<header>
			<img src="../../assets/images/resuggest_pc.png"/>
			<span>深度闭环式家庭好医服务平台</span>
		</header>
		<div class="rzyhsuggest_content">
			<div class="rzyhsuggest_list clearfix">
				<img class="rzyhsuggest_img" src="../../assets/images/rzsuggest_icon1.png"/>
				<div class="rzyhsuggest_text">
					<span>签约+双向转诊系统</span>
					<p>签约服务、双向转诊、检查预约、家庭病床申请</p>
				</div>
			</div>
			<div class="rzyhsuggest_list clearfix">
				<img class="rzyhsuggest_img" src="../../assets/images/rzsuggest_icon2.png" />
				<div class="rzyhsuggest_text">
					<span>智能客服中心</span>
					<p>满意度调查、呼叫中心、一键呼叫、身份识别、来电弹屏、知识库</p>
				</div>
			</div>
			<div class="rzyhsuggest_list clearfix">
				<img class="rzyhsuggest_img" src="../../assets/images/rzsuggest_icon3.png" />
				<div class="rzyhsuggest_text">
					<span>云学院—医链</span>
					<p>学术会议、继续教育、规培教学、进修管理</p>
				</div>
			</div>
			<div class="rzyhsuggest_list clearfix">
				<img class="rzyhsuggest_img" src="../../assets/images/rzsuggest_icon4.png" />
				<div class="rzyhsuggest_text">
					<span>随访与慢病管理中心</span>
					<p>健康监测、健康干预、健康管理、随访系统慢病管理</p>
				</div>
			</div>
			<div class="rzyhsuggest_list clearfix">
				<img class="rzyhsuggest_img" src="../../assets/images/rzsuggest_icon5.png" />
				<div class="rzyhsuggest_text">
					<span>家庭好医移动版</span>
					<p>短信群发、图文咨询、患者标签化管理、健康宣教——医护版
在线预约、移动签约、在线问诊家庭健康管理——居民版</p>
				</div>
			</div>
			
			<span class="rzyhsuggest_tag">产品服务</span>
		</div>
		<footer>
			<span class="title">平台登录网址</span>
			<div style="overflow: hidden;">
				<a class="net" href="http://jthy.zwjk.com">http://jthy.zwjk.com</a>
				<span class="nettips" >(长按复制)</span>
			</div>
			<span class="tips">● 请凭您的手机号码和短信收到的密码登录了解</span>
			
		</footer>
		
		
	</section>
</template>

<script>
import Vue from 'vue'
import { mapGetters,mapActions } from 'vuex'
import {apiurl} from '../../service/api-config.js'
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
	export default {
		data() {
			return {
				
			}
		},
		created() {
	
		},
		 mounted() {
		 	$(".mint-tabbar").hide();
		  },
		computed() {
			 
		},
		beforeUpdate(){
			
		},
		methods: {
			
		},
		watch:{
			
		}
	}
	
	
	
</script>
<style scope>
.container{
  height: auto;
  /* padding-bottom: 1.34rem; */
}
</style>

