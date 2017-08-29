<template>
	<section class="rzok">
		<div class="rzok_laye" v-show="laye" @click="downBtn()">
			<div class="rzok_laye_box">
				<div class="rzok_laye_rwm" @click.stop="erwimg()">
					<div class="rzok_laye_header">
						<img src="../../assets/images/rzok_ewmtitle_imgbg.png"/>
					</div>
					<div class="rzok_laye_content">
						<label>{{jgname}}</label>
						<span>扫一扫二维码，即可签约你的家庭医生！</span>
						<div class="rzok_laye_imgrwm">
							<img :src="userinfo.TwoBarCodePath"/>
						</div>
					</div>
				</div>
				<div class="rzok_laye_btn">
					<!--<img src="../../assets/images/rzok_down_icon.png"/>-->
					<span>长按保存二维码</span>
				</div>
			</div>
		</div>
		
		<span class="rzok_titletext"></span>
		
		
		
		<div class="rzok_titlearr">
			<span></span>
		</div>
		<div class="rzok_notice">
			<ul class="rzok_notice_content">
				<li class="rzok_notice_top">
					<img src="../../assets/images/rzok_title_toux.png"/>
					<span>入驻成功!</span>
				</li>
				<li class="rzok_notice_modlle">
					<p>{{jgname}}</p>
				</li>
				<li class="rzok_notice_iphone">
				 	<span>{{idcard}}</span>	
				</li>
			</ul>
		</div>
		<div class="rzok_title">
			<span>以下产品可免费使用</span>
			<label></label>
		</div>
		<p class="rzok_text">
			签约、转诊、随访、慢病、考核、移动化办公一体化解决方案
		</p>
		<ul class="rzok_list">
			<li class="rzok_jyapp" @click="goPc()">
				<div class="rzok_header ys_header">
					<h2>家庭好医</h2>
					<h2>PC管理端</h2>
				</div>
				<div class="rzok_list_content">
					<p>
						“签约+服务”深度闭环式分级诊疗平台，助力社区推进分级诊疗政策。
					</p>
					<div class="rzok_btn rzok_btn_ys">
						<img src="../../assets/images/rz_ok_look1.png"/>
						<span>查看</span>
					</div>
					
				</div>
			</li>
			<li class="rzok_wxapp" @click="gozgqypt()">
				<div class="rzok_header">
					<h2>中国家庭医生签约平台</h2>
					
				</div>
				<div class="rzok_list_content">
					<p>
						方便居民找到身边的家医团队，方便医生建立与家庭的服务联系
						<!--<label class="rzok_more">
							<span>更多</span>
							<i></i>
						</label>-->
					</p>
					<div class="rzok_btn">
						<img src="../../assets/images/rzok_look_icon.png"/>
						<span>查看</span>
					</div>		
				</div>
			</li>
			<li class="rzok_wxapp" @click="goApp()">
				<div class="rzok_header ys_header">
					<h2>家庭好医</h2>
					<h2>医护版APP</h2>
				</div>
				<div class="rzok_list_content">
					<p>
						全科医生移动化办公产品。创新基层信息化建设，提升服务质量。
						<label class="rzok_more rzok_more_ys">
							<span>更多</span>
							<i></i>
						</label>
					</p>
					<div class="rzok_btn rzok_btn_ys" @click.stop="goappstore()">
						<img src="../../assets/images/rz_ok_down1.png"/>
						<span>下载</span>
					</div>
					
				</div>
			</li>
			<li class="rzok_jyapp" @click="gozgjyys()">
				<div class="rzok_header">
					<h2>中国家医</h2>
					<h2>医生端</h2>
				</div>
				<div class="rzok_list_content">
					<p>
						由健康报社主办，集卫生资讯传播、家庭医生服务、健康管理指导
						<!--<label class="rzok_more">
							<span>更多</span>
							<i></i>
						</label>-->
					</p>
					<div class="rzok_btn">
						<img src="../../assets/images/rzok_look_icon.png"/>
						<span>查看</span>
					</div>		
				</div>
			</li>
			<li class="rzok_jyapp" @click="goWx()">
				<div class="rzok_header ys_header">
					<h2>家庭好医</h2>
					<h2>居民版</h2>
				</div>
				<div class="rzok_list_content">
					<p>
						优化就医体验，掌握家人健康，提高签约获得感和医患友好度！
						<!--<label class="rzok_more rzok_more_ys">
							<span>更多</span>
							<i></i>
						</label>-->
					</p>
					<div class="rzok_btn rzok_btn_ys">
						<img src="../../assets/images/rz_ok_look1.png"/>
						<span>查看</span>
					</div>		
				</div>
			</li>
			<li class="rzok_wxapp" @click="gozgjyjm()">
				<div class="rzok_header">
					<h2>中国家医</h2>
					<h2>居民端</h2>
				</div>
				<div class="rzok_list_content">
					<p>
						由健康报社负责组织开发运营的、面向全国家庭医生签约服务...
						<!--<label class="rzok_more">
							<span>更多</span>
							<i></i>
						</label>-->
					</p>
					<div class="rzok_btn">
						<img src="../../assets/images/rzok_look_icon.png"/>
						<span>查看</span>
					</div>			
				</div>
			</li>
			<li class="rzok_wxapp" @click="lookrwm()">
				<div class="rzok_header ys_header">
					<h2>机构签约</h2>
					<h2>二维码</h2>
				</div>
				<div class="rzok_list_content">
					<p>
						简化签约流程，提高签约效率，居民签约扫一扫，轻松选择签约医生。
					</p>
					<div class="rzok_btn rzok_btn_ys">
						<img src="../../assets/images/rz_ok_look1.png"/>
						<span>查看</span>
					</div>	
				</div>
			</li>
			
			
		</ul>
		
		
	</section>
</template>

<script>
import Vue from 'vue'
import { mapGetters,mapActions } from 'vuex'
import {apiurl} from '../../service/api-config.js'
import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				laye:false,	
				userinfo:{},
				idcard:null,
				jgname:''
			}
		},
		created() {
			this.userinfo=JSON.parse(sessionStorage.getItem('rzUserInfo'));
			let subjq = JSON.parse(sessionStorage.getItem('rzUseriphone')).substr(3,6);
        	this.idcard = JSON.parse(sessionStorage.getItem('rzUseriphone')).replace(subjq,"******");
        	this.jgname =JSON.parse(sessionStorage.getItem('rzUserjglx'));
		},
		 mounted() {
			 $(".mint-tabbar").hide();
		  },
		computed() {
			 
		},
		beforeUpdate(){
			
		},
		methods: {
			lookrwm() {
				if(this.$route.params.zcok==0){
					Toast("请点击家庭好医pc管理端，登录通过认证后，会生成二维码");
					return false;
				}
				this.laye=true;
		},
			downBtn() {	
				this.laye=false;
			},
			erwimg() {
				this.laye=true;
			},
			goApp() {
				this.$router.push({'name':'Rzyhsuggest'});
			},
			goWx() {
				this.$router.push({'name':'Rzwxsuggest'});
			},
			goPc() {
				this.$router.push({'name':'Rzpcsuggest'});
			},
			gozgqypt(){
				this.$router.push({'name':'Rzzgqypt'});
			},
			goappstore() {
				window.location.href='http://www.zhuojianchina.com/zsapp_jthy.html';
			},
			gozgjyys(){
				this.$router.push({'name':'Rzzgjyysd'});
			},
   			gozgjyjm(){
				this.$router.push({'name':'Rzzgjyjmd'});
			},
			
		},
		watch:{
			
		}
	}
	
	
	
</script>


