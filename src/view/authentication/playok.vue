<template>
<div>
	<router-view transition="cover" style="height:100%;" ></router-view>
	<div class="palyokconetnt">
		<div id="palyok">
			<div class="authentication_header">
				<i></i>
				<span>为了保证签约工作顺利进行， 进行实名认证！</span>
			</div>
			<form class="playok_content">
				<div class="imgList clearfix">
					<img src="../../assets/images/bg_faceofcard@2x.png" @click="gophotograph('0')" data-val="-1" />
					<img src="../../assets/images/bg_theothersideofcard@2x.png" @click="gophotograph('1')" data-val="-1"/>
					<img src="../../assets/images/Rectangle@2x.png" @click="gophotograph('2')" data-val="-1"/>
				</div>
				<input class="playok_btn" type="button" value="提交" @click="playokSubmit" />
			</form>
	
		</div>
	</div>
</div>
	
</template>

<script>
	import Vue from 'vue';
	import { mapGetters,mapActions } from 'vuex';
	import {apiurl} from '../../service/api-config.js';
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				valueindex:"",
				imgs:[],
				updata:""
			}
		},
		created() {
			
		},
		
		mounted() {
			var vm=this;
		    var headers={
		        UserID:this.userid,
		      	Token:this.openid
		    };
			if(this.$route.params.pok>0){
				 $.ajax({url: apiurl.LoginByOpenId,data:{OpenId:this.openid},type:'get',success:function(data){
					$.ajax({ url: apiurl.GetMember+"?memberID="+data.extra.CurrentLoginMember.Id,headers:headers, success: function(data){
						console.log(vm.pictureurl,data)
				        if(data.suc){
				        	if(vm.pictureurl==""){
				        		var imgurl=data.extra.PatientIdCardPhotoUrl.split(",");
					        	vm.set_pictureurl(imgurl[0]);
					        	vm.set_pictureurlt(imgurl[1]);
					        	vm.set_pictureurltr(imgurl[2]);
				        	}
				        	$(".imgList img").eq(0).attr("src",vm.pictureurl);
				        	$(".imgList img").eq(0).attr("data-val",0);
				        	$(".imgList img").eq(1).attr("src",vm.pictureurlt);
				        	$(".imgList img").eq(1).attr("data-val",1);
				        	$(".imgList img").eq(2).attr("src",vm.pictureurltr);
				        	$(".imgList img").eq(2).attr("data-val",2);
				        	$('.playok_btn').addClass('displaycolor');
				        }else{
				          Toast(data.mes);
				         }
			        	}
	        		});
	        	}});  
			}
			

			if(this.picvalue!='' && this.pictureurl!='' ){
				$(".imgList img").eq(0).attr("src",this.pictureurl);
				$(".imgList img").eq(0).attr("data-val",this.picvalue);
			}
			if(this.picvaluet!='' && this.pictureurlt!=''){
				$(".imgList img").eq(1).attr("src",this.pictureurlt);
				$(".imgList img").eq(1).attr("data-val",this.picvaluet);
			}
			if(this.picvaluetr!='' && this.pictureurltr!=''){
				$(".imgList img").eq(2).attr("src",this.pictureurltr);
				$(".imgList img").eq(2).attr("data-val",this.picvaluetr);
			}
			for(var i=0;i<$(".imgList img").length;i++){
				if($(".imgList img").eq(i).attr('data-val')==-1){
					$('.playok_btn').removeClass('displaycolor');
					return;
				}
				$('.playok_btn').addClass('displaycolor');
			}			
		},
		beforeUpdate() {
			if(this.picvalue!='' && this.pictureurl!='' ){
				$(".imgList img").eq(0).attr("src",this.pictureurl);
				$(".imgList img").eq(0).attr("data-val",this.picvalue);
			}
			if(this.picvaluet!='' && this.pictureurlt!=''){
				$(".imgList img").eq(1).attr("src",this.pictureurlt);
				$(".imgList img").eq(1).attr("data-val",this.picvaluet);
			}
			if(this.picvaluetr!='' && this.pictureurltr!=''){
				$(".imgList img").eq(2).attr("src",this.pictureurltr);
				$(".imgList img").eq(2).attr("data-val",this.picvaluetr);
			}
			for(var i=0;i<$(".imgList img").length;i++){
				if($(".imgList img").eq(i).attr('data-val')==-1){
					$('.playok_btn').removeClass('displaycolor');
					return;
				}
				$('.playok_btn').addClass('displaycolor');
			}
		},
		computed: {
			 ...mapGetters({
		      openid:'openid',pictureurl:'pictureurl',pictureurlt:'pictureurlt',pictureurltr:'pictureurltr',picvalue:'picvalue',picvaluet:'picvaluet',picvaluetr:'picvaluetr',imgtureurl:'imgtureurl',imgtureurlt:'imgtureurlt',imgtureurltr:'imgtureurltr',userid:'userid',userinfo:'userinfo'
		    }),
		},
		methods: {
			...mapActions([
		      'set_pictureurl','set_pictureurlt','set_pictureurltr','set_picvalue','set_picsuccfaval','set_picimgs','set_picbackimgs','set_picvaluet','set_picvaluetr','set_picvaluea','set_picmsg'
		    ]),
			gophotograph(value) {
				this.set_picvaluea(value);
				if(value=="0")
				{
					this.set_picvalue(value);
				}
				if(value=="1"){
					this.set_picvaluet(value);
				}
				if(value=="2"){
					this.set_picvaluetr(value);
				}
				this.$router.push({'name':"Photograph"});
			},
			playokSubmit(){
				
				var vm=this;
				if(vm.imgfor()==false)
				{
					return false;
				}
				if(this.$route.params.pok>0){
					vm.imgs.push((vm.imgtureurl=="") ? vm.pictureurl : vm.imgtureurl);
					vm.imgs.push((vm.imgtureurt=="") ? vm.pictureurlt : vm.imgtureurlt);
					vm.imgs.push((vm.imgtureurltr=="") ? vm.pictureurltr : vm.imgtureurltr);
				}else{
					vm.imgs.push(vm.imgtureurl);
					vm.imgs.push(vm.imgtureurlt);
					vm.imgs.push(vm.imgtureurltr);
				}
				vm.updata=(this.imgs.toString()).replace(/,/g,'|');
				Indicator.open({
				  text: 'Loading...',
				  spinnerType: 'fading-circle'
				});
				
				var headers={
			        UserID:this.userid,
			     	Token:this.openid
			    };
				$.ajax({
	  			type:"get",
	  			url:apiurl.GetPatientIdCardPhotoInfo,
	  			async:true,
	  			headers:headers,
	  			data:{media_id:vm.updata},
	  			success:function(data){
	  				Indicator.close();
	  				if(data.suc){
	  					vm.set_picbackimgs(data.rows[0].PatientIdCardPhotoList);
	  					vm.set_picimgs(data.rows[0].PatientIdCardPhotoUrlList);
		  				vm.set_picsuccfaval(1);//1代表成功就跳转到成功信息
		  				vm.$router.push({'name':"successFail",params: { suc:vm.$route.params.pok}});
		  			}else{
		  				vm.set_picbackimgs("");
	  					vm.set_picimgs("");
		  				vm.set_picsuccfaval(2);//2代表失败跳转到失败信息
		  				vm.set_picmsg(data.mes);//出错信息
		  				vm.$router.push({'name':"successFail",params: { suc:vm.$route.params.pok}});
		  			}
	  			
	  			},
	  			error:function(XMLHttpRequest){
					Indicator.close();
					Toast("网络出错了，需要您重新添加！");
				}
	  		});
				 
				 
			},
			
			imgfor() {
				for(var i=0;i<$(".imgList img").length;i++){
					if($(".imgList img").eq(i).attr('data-val')==-1){
						return false;
					}
				}
			}
		},
	
	
	
	
	
	beforeRouteEnter (to, from, next) {
    		$("#addfamilyContent").hide();
			next();
		},
		 beforeRouteLeave (to, from, next) {
		   $("#addfamilyContent").show();
		    next();
		  },
	}
</script>
<style scope>
.container{
  height:100%;
  /* padding-bottom: 1.34rem; */
}
</style>
