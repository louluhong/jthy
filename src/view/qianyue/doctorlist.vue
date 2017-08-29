<template>
<section class="doctorlist-container">
    <div class="doctorlist-containerbody">
		<div class="hospitallist-containerheader">
			<div class="hospitallist_sech">
				<img src="../../assets/images/search@2x.png" />
				<input class="searchinput" type="search" v-model="keyWordobj" placeholder="请输入关键字搜索" @focus="show()" @blur="hidden()"/>
				<span v-show="searchOk!=true">搜索</span>
				<span v-show="searchOk" @click="cancelBtn">取消</span>
			</div>
			
		</div>
		<div class="hospitallist-containercontent">
			<ul class="hospitallistobj">
				<li v-for="item in hospitaldoctorlist" :value="item.Id" @click="GoRouter($event)">
					<img :src="item.PhotoImageUrl" alt="">
					<span class="hospitallist-containercontentitemname">{{item.DoctorName}}</span>
					<span class="hospitallist-containercontentitemtitle">{{item.DoctorIntroduction}}</span>
          <span class="hospitallist-containercontentitemqianyue">签约<span class="hospitallist-containercontentitemnum">{{item.RegisteredNumber}}</span></span>
					<!-- <span class="hospitallist-containercontentitemqianyue">签约</span>
          <span class="hospitallist-containercontentitemnum">{{item.RegisteredNumber}}</span> -->
				</li>
			</ul>
			
			
			<div v-show="searchPd">
				<ul v-show="hospitaldoctormy.length>0">
				<li v-for="item in hospitaldoctormy" :value="item.Id" @click="GoRouter($event)">
					<img :src="item.PhotoImageUrl" alt="">
					<span class="hospitallist-containercontentitemname">{{item.DoctorName}}</span>
					<span class="hospitallist-containercontentitemtitle">{{item.DoctorIntroduction}}</span>
	          <span class="hospitallist-containercontentitemqianyue">签约<span class="hospitallist-containercontentitemnum">{{item.RegisteredNumber}}</span></span>
						<!-- <span class="hospitallist-containercontentitemqianyue">签约</span>
	          <span class="hospitallist-containercontentitemnum">{{item.RegisteredNumber}}</span> -->
					</li>
				</ul>
				
				<div v-show="hospitaldoctormy.length==0" class="hospitall_searchNo">
					<img  src="../../assets/images/hospitall_searchno@2x.png"/>
					<span>无搜索内容</span>
				</div>
				
			</div>
		</div>
    </div>
</section>
</template>
<script>
import Vue from 'vue'
import { mapGetters,mapActions } from 'vuex'
import {apiurl} from '../../service/api-config.js'
import { Search } from 'mint-ui';
var _ = require('lodash');
Vue.component(Search.name, Search);
export default {
  	computed:{
      ...mapGetters({
      openid:'openid',userid:'userid',userinfo:'userinfo'
    })
  },
  data() {
        return {
        	keyWordobj:"",
        	hospitaldoctorlist:[],
        	hospitaldoctormy:[],
        	searchPd:false,
        	searchOk:false

        }
  },
  methods:{
  	GoRouter(event){
        this.$router.push({'name':'DoctorDetailQY', params: { did: $(event.currentTarget).attr('value'),pid:this.$route.params.pid }});
    },
    GetData() {
    	var vm=this;
  		//console.info(store.getters.openid)
  		var headers={
  			UserID:this.userid,
			Token:this.openid
  		};
    	var data={
  			hospitalID:this.$route.params.hid,
  			pageindex:1,
  			keyWord:this.keyWordobj,
  			pagesize:100
  		};
  		$.ajax({ url: apiurl.GetCommunityDoctors,data:data,headers:headers, success: function(data){
  			vm.hospitaldoctormy=data.rows;
  		}});
    },
    show() {
    	if(this.keyWordobj==""){
    		this.hospitaldoctormy=[];
    	}
    	$(".hospitallistobj").hide();
	   this.searchPd=true;
	   this.searchOk=true;	
	   },
	   hidden() {
	   		if(this.keyWordobj==""){
		   		$(".hospitallistobj").show();
		   		this.searchPd=false;
	   			this.searchOk=false;
	   		}
	   		
	   },
	   cancelBtn() {
	   		this.keyWordobj="";
	   		this.hospitaldoctormy=[];
	   		$(".hospitallistobj").show();
	   		this.searchPd=false;
	   		this.searchOk=false;
	   },
	  
	   
	   
	   
  },
  created(){
  		var vm=this;
  		var headers={
  			UserID:this.userid,
			Token:this.openid
  		};
    	var data={
  			hospitalID:this.$route.params.hid,
  			pageindex:1,
  			keyWord:"",
  			pagesize:100
  		};
  		$.ajax({ url: apiurl.GetCommunityDoctors,data:data,headers:headers, success: function(data){
  			vm.hospitaldoctorlist=data.rows;
  		}});
  },
  mounted(){
  		var vm=this;
		$(".mintui-search").click(function(){
			vm.GetData($(".mint-searchbar-core").val())
		});
		
		$(".searchinput").on('keypress',function(e) {  //影藏软键盘
                var keycode = e.keyCode;  
                var searchName = $(this).val();  
                if(keycode=='13') {  
                    e.preventDefault();    
                    $("input").blur();
                      
                }  
         }); 
		
  },
   watch: {
    keyWordobj: _.debounce(function(){
    	this.GetData();
    },500)
      
    
  },
  
}
</script>