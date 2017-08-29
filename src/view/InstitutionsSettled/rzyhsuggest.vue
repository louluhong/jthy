<template>
	<section class="rzyhsuggest">
		<header>
			<img src="../../assets/images/resuggest_app.png"/>
			<span>创新基层信息化建设，提升服务质量</span>
		</header>
		<div class="rzyhsuggest_content">
			<div class="rzyhsuggest_list clearfix">
				<img class="rzyhsuggest_img" src="../../assets/images/rzsuggest_icon1.png"/>
				<div class="rzyhsuggest_text">
					<span>双向转诊</span>
					<p>当医生出诊、外出时，患者有转诊需求，随时随地一键转诊。</p>
				</div>
			</div>
			<div class="rzyhsuggest_list clearfix">
				<img class="rzyhsuggest_img" src="../../assets/images/rzsuggest_icon11.png" />
				<div class="rzyhsuggest_text">
					<span>移动签约</span>
					<p>实名认证，续约提醒，患者自发申请。</p>
				</div>
			</div>
			<div class="rzyhsuggest_list clearfix">
				<img class="rzyhsuggest_img" src="../../assets/images/rzsuggest_icon12.png" />
				<div class="rzyhsuggest_text">
					<span>群发消息</span>
					<p>分门别类群发健康宣教信息。</p>
				</div>
			</div>
			<div class="rzyhsuggest_list clearfix">
				<img class="rzyhsuggest_img" src="../../assets/images/rzsuggest_icon13.png" />
				<div class="rzyhsuggest_text">
					<span>患者管理</span>
					<p>标签化管理，自定义分组。</p>
				</div>
			</div>
			<div class="rzyhsuggest_list clearfix">
				<img class="rzyhsuggest_img" src="../../assets/images/rzsuggest_icon14.png" />
				<div class="rzyhsuggest_text">
					<span>健康宣教</span>
					<p>健康活动推送、健康宣教内容推送。</p>
				</div>
			</div>
			<div class="rzyhsuggest_list clearfix">
				<img class="rzyhsuggest_img" src="../../assets/images/rzsuggest_icon9.png" />
				<div class="rzyhsuggest_text">
					<span>随     访</span>
					<p>移动随访、随访信息随查随到。</p>
				</div>
			</div>
			<div class="rzyhsuggest_list clearfix">
				<img class="rzyhsuggest_img" src="../../assets/images/rzsuggest_icon15.png" />
				<div class="rzyhsuggest_text">
					<span>在线问诊</span>
					<p>随时随地医患互动，提高医患友好度。</p>
				</div>
			</div>
			<div class="rzyhsuggest_list clearfix">
				<img class="rzyhsuggest_img" src="../../assets/images/rzsuggest_icon16.png" />
				<div class="rzyhsuggest_text">
					<span>慢性病监测</span>
					<p>物联网设备实时监测指标情况，异常情况实时提醒，智能分析。</p>
				</div>
			</div>
			<div class="rzyhsuggest_list clearfix">
				<img class="rzyhsuggest_img" src="../../assets/images/rzsuggest_icon17.png" />
				<div class="rzyhsuggest_text">
					<span>社区通讯录</span>
					<p>团队专属通讯录，提高办公效率。</p>
				</div>
			</div>
			<span class="rzyhsuggest_tag">产品服务</span>
		</div>
		<footer>
			<div class="rzyhsuggest_left">
				<img src="../../assets/images/rzsuggest_ewmapp.jpg"/>
				<span>医护版</span>
			</div>
			<div class="rzyhsuggest_right" @click="goappstore()">
				<img src="../../assets/images/rzok_down .png"/>
				<span>下载</span>
			</div>
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
			goappstore() {
				window.location.href='http://www.zhuojianchina.com/zsapp_jthy.html';
			}
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

