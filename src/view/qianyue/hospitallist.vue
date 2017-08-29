<template>
<section class="hospitallist-container">
	<header class="hospitall_header">
		<div class="address" @click="addressUrl">
			<span>{{address}}</span>
			<i></i>
		</div>
		<div class="search">
			<img src="../../assets/images/search@2x.png"/>
			<input class="searchText" v-model="content" type="search" placeholder="请输入关键字" @focus="show()" @blur="hidden()" debounce="500"/>
		</div>
		<span v-show="searchOk!=true" class="searchBtn">搜索</span>
		<span v-show="searchOk" class=" searchBtn" @click="cancelBtn">取消</span>
	</header>
	<!--<div class="hospitall_layer" v-show="layerObj"></div>-->
	
    <div class="hospitallist-containeritem layercontrol" v-if="hospitallistmy.length>0">
		<div class="hospitallist-containeritemheader">
			<span class="hospitallist-containeritemheadericon"></span>
			<span class="hospitallist-containeritemheaderfont">我的社区</span>
		</div>
		<div class="hospitallist-containeritembody">
			<ul>
				<li v-for="item in hospitallistmy" :value="item.ID" @click="GoRouter($event)">
					<img :src="item.HospitalLogoUrl" alt="">
					<span class="hospitallist-containeritembodyitemtitle">{{item.HospitalName}}</span>
					<span class="hospitallist-containeritembodyitemaddress">{{item.AddressDetail}}</span>
				</li>
			</ul>
		</div>
    </div>
   <div class="hospitallist-containeritem layercontrol" v-if="hospitallistall.length>0">
		<div class="hospitallist-containeritemheader">
			<span class="hospitallist-containeritemheadericon"></span>
			<span class="hospitallist-containeritemheaderfont">附近社区</span>
		</div>
		<div class="hospitallist-containeritembody">
			<ul>
				<li v-for="item in hospitallistall" :value="item.ID" @click="GoRouter($event)">
					<img :src="item.HospitalLogoUrl" alt="">
					<span class="hospitallist-containeritembodyitemtitle">{{item.HospitalName}}</span>
					<span class="hospitallist-containeritembodyitemaddress">{{item.AddressDetail}}</span>
				</li>
			</ul>
		</div>
    </div>
    <div class="hospitallist-containeritem" v-show="searchPd">
		<div class="hospitallist-containeritembody">
			<ul v-show="keyword.length>0">
				<li v-for="item in keyword" :value="item.ID" @click="GoRouter($event)">
					<img :src="item.HospitalLogoUrl" alt="">
					<span class="hospitallist-containeritembodyitemtitle">{{item.HospitalName}}</span>
					<span class="hospitallist-containeritembodyitemaddress">{{item.AddressDetail}}</span>
				</li>
			</ul>
			<div v-show="keyword.length==0" class="hospitall_searchNo">
				<img  src="../../assets/images/hospitall_searchno@2x.png"/>
				<span>无搜索内容</span>
			</div>
		</div>
    </div>
    
    
    
</section>
</template>
<script>
import Vue from 'vue'
import { mapGetters,mapActions } from 'vuex'
import {apiurl} from '../../service/api-config.js'
import { Toast } from 'mint-ui';
var _ = require('lodash');
export default {
  	computed:{
      ...mapGetters({
      openid:'openid',selectaddress:'selectaddress',onaddress:'onaddress',userid:'userid',userinfo:'userinfo'
    })
  },
  data() {
        return {
        	hospitallistall:[],
        	hospitallistmy:[],
        	keyword:[],
        	searchPd:false,
        	searchOk:false,
        	address:"",
        	content:""
        }
  },
  methods:{
	  	GoRouter(event){
	        this.$router.push({'name':'DoctorList', params: { hid: $(event.currentTarget).attr('value'),pid:this.$route.params.pid }});
	   },
	   show() {
	   	if(this.content==""){
	   		this.keyword=[];
	   	}
		   	$(".layercontrol").hide();
		   this.searchPd=true;
		   this.searchOk=true;	
	   },
	   hidden() {
	   	if(this.content==""){
	   		this.keyword=[];
	   		$(".layercontrol").show();
	   		this.searchPd=false;
	   		this.searchOk=false;
	   	}
	   },
	   cancelBtn() {
	   		this.content="";
	   		this.keyword=[];
	   		$(".layercontrol").show();
	   		this.searchPd=false;
	   		this.searchOk=false;
	   },
	   addressUrl() {
	   	this.$router.push({'name':'addressSelect',params:{addid:(this.$route.params.pid ==0 ? "杭州市" : this.$route.params.pid)}});
	   },
	  getcontent() {
	  	var vm=this;
	  	//console.log(vm.address);
	  	var headers={
  			UserID:this.userid,
			Token:this.openid
  		};
	         $.ajax({ url: apiurl.GetCommunityHospitalsByCityName,headers:headers,data:{CityName:vm.address,pageindex:1,name:this.content,pagesize:100}, success: function(data){
		  			vm.keyword=data.rows;
		  		}});
	        
	  },
	
	
	   
 },
  created(){
  	var vm=this;
  	this.address=this.selectaddress;
  	// alert('hos'+vm.onaddress)
	if(this.address=="" || this.address==null){
		this.address=vm.onaddress;
		
	}
  		
  		var headers={
  			UserID:this.userid,
			Token:this.openid
  		};
  		$.ajax({ url: apiurl.GetCommonHospitals,headers:headers, success: function(data){
  			vm.hospitallistmy=data.rows;
  		}});
  		
  	
  		if(this.selectaddress=="" || this.selectaddress==null){
  			var data={
	  			CityName:vm.onaddress,
	  			pageindex:1,
	  			name:"",
	  			pagesize:100
  			};
  		}else{
  			var data={
	  			CityName:vm.selectaddress,
	  			pageindex:1,
	  			name:"",
	  			pagesize:100
  			};
  		}
  			
  		
  		
  		$.ajax({ url: apiurl.GetCommunityHospitalsByCityName,data:data,headers:headers, success: function(data){
  			if(data.total!=0){
  				vm.hospitallistall=data.rows;
  			}else{
  				Toast('暂时没有合作的医院！');
  			}
  			
  		}});
  		
  		
  },
  watch: {
    content: _.debounce (function(){
    	this.getcontent();
    },500)
      
 
  },
   mounted(){
   		
   	
   	
		$(".searchText").on('keypress',function(e) {  //影藏软键盘
                var keycode = e.keyCode;  
                var searchName = $(this).val();  
                if(keycode=='13') {  
                    e.preventDefault();    
                    $("input").blur();
                      
                }  
         }); 

  },
  
  
}
</script>