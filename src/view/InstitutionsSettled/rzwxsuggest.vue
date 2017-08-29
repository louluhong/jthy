<template>
	<section class="rzyhsuggest">
		<header>
			<img src="../../assets/images/resuggest_wx.png"/>
			<span>加强签约居民感受度</span>
		</header>
		<div class="rzyhsuggest_content">
			<div class="rzyhsuggest_list clearfix">
				<img class="rzyhsuggest_img" src="../../assets/images/rzsuggest_icon6.png"/>
				<div class="rzyhsuggest_text">
					<span>移动签约</span>
					<p>自主选择签约医生，家庭成员相互帮辅签约；</p>
				</div>
			</div>
			<div class="rzyhsuggest_list clearfix">
				<img class="rzyhsuggest_img" src="../../assets/images/rzsuggest_icon7.png" />
				<div class="rzyhsuggest_text">
					<span>预约检查</span>
					<p>实名认证，续约提醒，患者自发申请；</p>
				</div>
			</div>
			<div class="rzyhsuggest_list clearfix">
				<img class="rzyhsuggest_img" src="../../assets/images/rzsuggest_icon8.png" />
				<div class="rzyhsuggest_text">
					<span>预约门诊</span>
					<p>门诊、疫苗、孕产、体检预约；</p>
				</div>
			</div>
			<div class="rzyhsuggest_list clearfix">
				<img class="rzyhsuggest_img" src="../../assets/images/rzsuggest_icon9.png" />
				<div class="rzyhsuggest_text">
					<span>在线问诊</span>
					<p>微信端图文咨询；</p>
				</div>
			</div>
			<div class="rzyhsuggest_list clearfix">
				<img class="rzyhsuggest_img" src="../../assets/images/rzsuggest_icon5.png" />
				<div class="rzyhsuggest_text">
					<span>预约社区专家门诊</span>
					<p>专家坐诊预约；</p>
				</div>
			</div>
			<div class="rzyhsuggest_list clearfix">
				<img class="rzyhsuggest_img" src="../../assets/images/rzsuggest_icon10.png" />
				<div class="rzyhsuggest_text">
					<span>健康宣教</span>
					<p>健康百科，智能导诊；</p>
				</div>
			</div>
			<div class="rzyhsuggest_list clearfix">
				<img class="rzyhsuggest_img" src="../../assets/images/rzsuggest_icon4.png" />
				<div class="rzyhsuggest_text">
					<span>家庭健康管理</span>
					<p>家人健康管理；</p>
				</div>
			</div>
			
			
			<span class="rzyhsuggest_tag">产品服务</span>
		</div>
		<footer>
			<div class="rzyhsuggest_left rzwxsiggest_left">
				<img src="../../assets/images/rzsuggest_wx_ewm.jpg"/>
				<span>居民版(长按扫码)</span>
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
			gogzwx() {
				window.location.href='https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI3OTY1NzQyMA==&scene=124#wechat_redirect';
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

