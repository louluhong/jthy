<template>
	<section class="addfamilymember-container" style="height: 100%;">
		<router-view transition="cover" style="height:100%;"></router-view>
<div id="addfamilyContent">
	
		<form id="form1">
		<div class="addfamilymember-kongge">
		</div>
    <input type="hidden" name="FamilyID" id="FamilyID">
    <input type="hidden" name="PatientID" id="PatientID">
    <input type="hidden" name="MemberID" id="MemberID">
    <input type="hidden" name="UserId" :value="UserIdvalue" />
     <input type="hidden" name="OpenID" :value="OpenIDvalue" />
		<div class="addfamilymember-header addfamilymember-content" style="display:none;">
			<span class="addfamilymember-contentlabel">头像</span>
			<div @click="ChooseImage('album')">
				<input type="hidden" v-model="serverId" name="mediaid">
				<img class="addfamilymember-field addfamilymember-headimg">
				<img src="../../assets/images/jiantou@2x.png" alt="" class="addfamilymember-jiantou">
			</div>
		</div>
		<div class="addfamilymember-kongge">
		</div>
		<div class="addfamilymember-content addfamilymember-contentgx" v-if="UserIdvalue!=-1">
			<span class="addfamilymember-contentlabel">称呼</span>
			<div @click="gxpicker" class="addfamilymember-pickergx"> <!--@click="showPicker('pickergx')"-->
				<span id="picker1" class="addfamilymember-choose">{{gx}}</span>
				<input type="hidden" v-model="gx" name="RelationName">
				<img src="../../assets/images/jiantou@2x.png" alt="" class="addfamilymember-jiantou">
			</div>
		</div>
		<div class="addfamilymember-content">
			<span class="addfamilymember-contentlabel">姓名</span>
			<div>
				<input type="text" value="" placeholder="请输入真实姓名" name="CHName" id="CHName" maxlength="5" class="changefamilydom">
			</div>
		</div>
		<div class="addfamilymember-content choose_familymember">
			<span class="addfamilymember-contentlabel">身份证</span>
			<div @click="goAuthentication">
				<span class="addfamilymember-choose">身份证实名验证</span>
				<img src="../../assets/images/jiantou@2x.png" alt="" class="addfamilymember-jiantou">
				<input type="hidden" :value="imgsUrl" name="PatientIdCardPhotoUrl"/>
				<input type="hidden" :value="imgsTitle" name="PatientIdCardPhoto"/>
				<!--<input type="text" name="" v-model.trim="idcard" placeholder="请输入真实的身份证号" name="IDCard" id="IDCard">-->
			</div>
		</div>
		<div class="addfamilymember-content">
			<span class="addfamilymember-contentlabel">身份证</span>
			<!-- <div> -->
				<!-- <input type="text"  value="" placeholder="请输入真实的身份证号" id="IDCard1" class="changefamilydom"> -->
				<!-- <input type="text" name="" v-model.trim="idcard" placeholder="请输入真实的身份证号" name="IDCard" id="IDCard"> -->
				<!-- <input type="text" name="" v-model.trim="idcard" placeholder="请输入真实的身份证号" name="IDCard" id="IDCard" class="changefamilydom"> -->
			<!-- </div> -->
			<div>
				<input type="hidden"  :value="idcard" placeholder="请输入真实的身份证号" name="IDCard" id="IDCard" class="changefamilydom">
				<input type="text"  value="" placeholder="请输入真实的身份证号" id="IDCard1" class="changefamilydom" v-model.trim="idcard">
				<input type="hidden"  value="" placeholder="请输入真实的身份证号" id="IDCard2" class="changefamilydom">
			</div>
		</div>
		<div class="addfamilymember-content" v-if="bady">
			<span class="addfamilymember-contentlabel">出生日期</span>
			<div>
				<input type="text" placeholder="请输入真实的出生日期" readonly="readonly" :value="birthVal" name="Birthday" id="BirthData">
			</div>
		</div>
		
		
		<div class="addfamilymember-content">
			<span class="addfamilymember-contentlabel">性别</span>
			<div>
				<radiocheckzdy :lists="sexlist" name="Sex"></radiocheckzdy>
				<input type="hidden" name="Sex" id="Sex" :value="Sex" class="Sex1">
				<div class="radio_mask">遮罩</div>
			</div>
		</div>
		<div class="addfamilymember-content">
			<span class="addfamilymember-contentlabel">年龄</span>
			<div>
			<!--<input type="hidden" v-model="age" name="RelationName">
				<span class="addfamilymember-choose">{{age}}</span>
			</div>-->
			
				<input type="text" name="Age" v-model.number="age" placeholder="请输入真实年龄" maxlength="3" readonly='true' style="color:#999;" class="changefamilydom">
			</div>
		</div>
		<div class="addfamilymember-content">
			<span class="addfamilymember-contentlabel">地区</span>
			<div @click="clickMe" class="addfamilymember-pickeraddress">
				<input v-model="Provincetext" type="hidden" value="" name="Province">
				<input v-model="Citytext" type="hidden" value="" name="City">
				<input v-model="Areatext" type="hidden" value="" name="Area">
				<span id="name"  class="addfamilymember-choose">{{pickeraddress}}</span>
				<img src="../../assets/images/jiantou@2x.png" alt="" class="addfamilymember-jiantou">
			</div>
		</div>
		<div class="addfamilymember-content">
			<textarea placeholder="请填写详细地址，不少于5字" name="DetailedAddress" id="DetailedAddress">
			</textarea>
		</div>
		<div class="addfamilymember-kongge">
		</div>
		<div class="addfamilymember-content addfamilymember-contentyb">
			<span class="addfamilymember-contentlabel">医保类型</span>
			<div class="addfamilymember-contentybtype">
				<circheckzdy :lists="yblist" name="MedicalCardType" single="true"></circheckzdy>
			</div>
		</div>
		<div class="addfamilymember-kongge">
		</div>
		<div class="addfamilymember-contentphone">
			<span class="addfamilymember-contentlabel">联系方式</span>
			<input type="text" name="PhoneNumber" v-model.trim="phone" class="addfamilymember-contentphonevalue" placeholder="请输入手机号">
			<input type="text" name="DuanXinCode" value="" class="addfamilymember-contentcodevalue" placeholder="输入验证码">
			<span class="addfamilymember-contentgetcode" @click="GetDuanXinCode()">{{getCodeMsg}}</span>
		</div>
		</form>
		<div class="addfamilymember-btncontainer">
			<buttonzdy btn-name='确认添加' @click.native="AddFamilyMember()"></buttonzdy>
		</div>
		
		<div class="jiatinginfo-successbg" style="display: none">
			<div class="jiatinginfo-dialog">
				<span>添加家庭成员成功！</span>
				<div @click="GoRouter">
					知道了
				</div>
			</div>
		</div>
</div>
	</section>
</template>
<script>
	import Vue from 'vue'
	import { Field  } from 'mint-ui';
	Vue.component(Field.name, Field)
	import buttonzdy from '../../components/button-zdy.vue';
	import circheckzdy from '../../components/circheck-zdy.vue';
	import radiocheckzdy from '../../components/radiocheck-zdy.vue';
	import { mapGetters,mapActions } from 'vuex'
	import { Toast } from 'mint-ui';
	import {apiurl} from '../../service/api-config.js'
	import {globappid} from '../../variable/variable.js'
	import wx from 'weixin-js-sdk'
	import Picker from 'better-picker'
	import '../../assets/js/datePicker.js';
	let city = require('../../mock/city');
	//let address = require('../../mock/address')
	
	export default{
		computed:{
      ...mapGetters({
      	openid:'openid',familymember:'familymember',picbackimgs:'picbackimgs',picimgs:'picimgs',userid:'userid',userinfo:'userinfo'
    	}),
  	},
		data() {
			return {
				imgsTitle:'',
				imgsUrl:'',
				form:'/Index',
				bady:true,
				birthVal:'',
				phone:'',
				gx: '请选择关系',
				idcard:'',
				serverId:'',
				Sex:'0',
				age:null,
				UserIdvalue:null,
				OpenIDvalue:'',
    		getCodeMsg:'获取验证码',
    		isCanSendCode:true,
    		countdown:60,
				street:'请选择街道',
				badyshow:false,
				yblist:[{name:"市医保",value:"1"},{name:"省医保",value:"2"},{name:"其他",value:"6"},{name:"市医保大学生",value:"4"},{name:"市医保儿童",value:"5"}],
				sexlist:[{text:"男",value:"1",checked:true},{text:"女",value:"0",checked:false}],
				value1: [],
				first:[],//地址开始
				second:[],
				third:[],
				pickeraddress:'请选择地址',
				Provincetext:'',
				Citytext:'',
				Areatext:'',
				checked:[0,0,0],
				selectedIndex:[0,0,0],//地址end
				data1:[{text:'爷爷',value:1},{text:'奶奶',value:2},{text:'外公',value:3},{text:'外婆',value:4},{text:'爸爸',value:5},{text:'妈妈',value:6},{text:'兄弟',value:7},{text:'姐妹',value:8},{text:'宝宝',value:9},{text:'其他',value:10}],
				gxindex:[0],
				StreetSlots: [{text:'闸弄口街道',value:1},{text:'四季青街道',value:2},{text:'笕桥街道',value:3}],
				streetindex:[0],
				did:null,
			}
		},
		beforeUpdate() {			
			if(this.picbackimgs!='')
			{
			  this.imgsTitle=this.picbackimgs;
				this.imgsUrl=this.picimgs;
			}
		},
		
		created(){
			var vm=this;
			console.log(this.userid)
			vm.did=vm.$route.params.did;
			if(this.$route.params.pid==-1){
				vm.OpenIDvalue=this.openid;
				vm.UserIdvalue=this.$route.params.pid;
			}else{
				vm.OpenIDvalue=this.openid;
				vm.UserIdvalue=this.userid;
			}			
	    var headers={
	        UserID:this.userid,
	      	Token:this.openid
	    };		
    	$.ajax({ url: apiurl.GetTicket+"?url="+encodeURIComponent(location.href.split('#')[0]),type:"post",success: function(data){
        if(data.suc){
          wx.config({
            debug:false,
            appId:globappid.appid,
            timestamp:data.extra.timestamp,
            nonceStr:data.extra.noncestr,
            signature:data.extra.signature,
            jsApiList:['chooseImage','uploadImage']
          });
        }else{
          Toast(data.mes);
        }
    	}});
		},
	  mounted(){
	  	var vm=this;
	  	if(this.$route.params.pid==-1){
	  		document.title='完善信息';
			$('.addfamilymember-btncontainer button').text('确认');
	      $('.jiatinginfo-dialog span').text('提交成功');
	  	}
			if(document.title!='添加宝宝'){
				vm.bady=false;
			}else{
				vm.gx="宝宝";
				vm.gxindex=[8];
				$('.jiatinginfo-dialog span').text("宝宝添加成功！");
			}
	  	/*出生日期插件初始化*/
			var calendar = new datePicker();
			calendar.init({//http://www.jq22.com/jquery-info13151
		    'trigger': '#BirthData', /*按钮选择器，用于触发弹出插件*/
		    'type': 'date',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
		    'minDate':'1900-1-1',/*最小日期*/
		    'maxDate':'2100-12-31',/*最大日期*/
		    'onSubmit':function(){/*确认时触发事件*/
		        vm.birthVal=calendar.value;
		    },
		    'onClose':function(){/*取消时触发事件*/
		    }
			});  	
	    //判断是否修改
	    if(this.$route.params.pid>0){
	      $(".addfamilymember-contentgx").hide();
	      //console.info($('.addfamilymember-btncontainer button'))
	      $('.addfamilymember-btncontainer button').text('确认修改');
	      $('.jiatinginfo-dialog span').text('修改成功');
	      //$('.addfamilymember-headimg').attr('src', this.userinfo.PhotoUrl);
	      var headers={
	        UserID:this.userid,
	      	Token:this.openid
	      };
	      //获取用户信息
	    	$.ajax({url: apiurl.LoginByOpenId,data:{OpenId:this.openid},type:'get',
	    		success:function(data){
		        $.ajax({ url: apiurl.GetMember+"?memberID="+data.extra.CurrentLoginMember.Id,headers:headers, 
		        	success: function(data){
		        		console.log(data)
		        		if(data.suc){
		        			vm.pickeraddress=data.extra.Province+" "+data.extra.City+" "+data.extra.Area;
		        			vm.Provincetext=data.extra.Province;
		        			vm.Citytext=data.extra.City;
				        	vm.Areatext=data.extra.Area;
				        	vm.imgsTitle=data.extra.PatientIdCardPhoto;
									vm.imgsUrl=data.extra.PatientIdCardPhotoUrl;
				          $('.addfamilymember-headimg').attr('src', data.extra.PhotoUrl);
				          $("#MemberID").val(data.extra.MemberID);
				          $("#FamilyID").val(data.extra.FamilyID);
				          $("#PatientID").val(data.extra.PatientID);
				          $("#CHName").val(data.extra.CHName);
				          // $("#Sex1").val(data.extra.PatientSex);
				          vm.idcard=data.extra.IDCard;
				          $('.radiocheck-item input').removeAttr('checked');
				          $('.radiocheck-item .radiocheck-icon').removeClass('isselected');
				          $('.radiocheck-item input[value="'+(data.extra.Sex-1)+'"]').siblings(".radiocheck-icon").addClass('isselected');
				          vm.age=data.extra.Age;
				          vm.addressProvince=(data.extra.Province==null?"":data.extra.Province)+(data.extra.City==null?"":data.extra.City)+(data.extra.Area==null?"":data.extra.Area);
				          vm.street=data.extra.Street;
				          $("#DetailedAddress").val(data.extra.DetailedAddress);
				          $('.circheck-zdydiv[name="MedicalCardType"] input[value="'+data.extra.MedicalCardType+'"]').prop("checked",true);
				          $('.circheck-zdydiv[name="MedicalCardType"] input[value="'+data.extra.MedicalCardType+'"]').parent().addClass('selected');
				          vm.phone=data.extra.PhoneNumber;
				          vm.gx="";
									if(data.extra.IsEgis==1){
				  					var _Id_Card=vm.idcard;
										var _str_Start=_Id_Card.substr(0,3);
										var _str_End=_Id_Card.substr(14,4);
										var _ss=function(){var s="";for(var i=0;i<18-7;i++) s+="*";return s;};
										$('#IDCard1').attr('type','hidden');
										$('#IDCard2').attr('type','text');
										$('#IDCard2').val(_str_Start+_ss()+_str_End);
										$('.choose_familymember').hide();
										$('.changefamilydom').attr('readonly','true');
										$('.changefamilydom').css('color','#999');
										$('.radio_mask').show();
				  						// $('.addfamilymember-content input[name="Age"]').attr('readonly','true');
				  				}else{
				  					$('#IDCard2').attr('type','hidden');
									$('#IDCard1').attr('type','text');
				  					$('#IDCard1').val(vm.idcard);
				  				}
		        		}else{
		          		Toast(data.mes);
		        		}
			      	}
			    	});	      
			    }
		    });  
	    }
	  },
		methods: {
		 	...mapActions([
		    'set_userinfo' ,'set_familymember','set_ishavebaby','set_isLogined','set_userid'
		  ]),
			ChooseImage(type){ 
				var vm=this;
		    wx.chooseImage({
			    count: 1, // 默认9
			    sizeType: ['original', 'compressed'],
			    sourceType: [type], 
			    success: function (res) {         
		        var localIds = res.localIds;
		        var ua =window.navigator.userAgent.toLowerCase();
		        var s = ua.match(/IPhone/i);
		        if(s == null){
		            $('.addfamilymember-headimg').attr('src', localIds);
		        }else{
		          wx.getLocalImgData({
		            localId: '' + localIds,
		            success: function (res) {
		              var localData = res.localData; 
		              $('.addfamilymember-headimg').attr('src', localData);
		            }
		          });
		        }
			      wx.uploadImage({
		          localId: '' + localIds,
		          isShowProgressTips: 1,
		          success: function(res) {
		              vm.serverId=res.serverId;
		          }
		      	});
			    }
				});
		  },    		
		  AddFamilyMember(){
		    console.log(this.form+"--123");
		    this.countdown=0;
		    if(this.idcard.length==0){
		      Toast('请输入身份证号');
		      return false;
		    }
		  	if(this.age>150){
		  		Toast('年龄不能超过150岁！');
		  		return false;
		  	}
		  	var vm=this;
				var headers={
					UserID:this.userid,
					Token:this.openid
				};
				var data = new FormData($('#form1')[0]);  
		    var url=apiurl.AddFamilyMember;
		    if(this.$route.params.pid>0){
		      url=apiurl.UpdateFamilyMember;
		    }
		    console.log(headers)
		  	$.ajax({ url: url,type:"post",processData: false,contentType: false,data:data,headers:headers, 
		  		success: function(data){
		  			console.log(headers)
		  			if(data.suc){
		  				// if(headers.UserID!=null){
		  					$.ajax({ url: apiurl.GetMemberUsers,headers:headers, 
			  					success: function(data){
						  			if(data.suc){
						         		 vm.set_userinfo(data.extra.CurrentLoginMember);
										 vm.set_familymember(data.extra.OtherMembers);
						  			}
				  				}
				  			});
		  				// }		  				
		  				$(".jiatinginfo-successbg").height(document.body.scrollHeight);
		  				$("body").scrollTop(0);
		  				$(".jiatinginfo-successbg").show();
		  			}else{
		  				Toast(data.mes);
		  			}
		  		}
		  	});
		  },
	  	CountDown(){
	    	var vm=this;
	      if (this.countdown == 0) { 
	        this.isCanSendCode=true;
	        this.countdown = 60; 
	        this.getCodeMsg="获取验证码";
	      } else { 
	        this.countdown--; 
	        vm.getCodeMsg=this.countdown; 
	        var vm=this;
	        setTimeout(function() { 
	          vm.CountDown() 
	        },1000) 
	      }       
	  	},
	    GetDuanXinCode(){
	  		var vm=this;
	    	if(this.phone.length==0){
	  				Toast('请输入手机号');
	  		}else if(this.phone.length!=11){
	  				Toast('请输入正确手机号');
	  		}else{
	  			if(this.isCanSendCode){
	          this.isCanSendCode=false;
	          this.getCodeMsg="正在发送";
	  				$.ajax({ url: apiurl.SendDuanXinCode,type:'post',data:{PhoneNumber:this.phone,OpenID:this.openid}, success: function(data){
	               if(!data.suc){
	                  vm.isCanSendCode=true;
	               }else{
	                  vm.CountDown();
	               }
	               Toast(data.mes);
	        	}});
	      	}else{
						Toast('请在'+this.getCodeMsg+'秒后再试')
					}
	  		}
	    },
	   	GoRouter(){
	   		var vm=this;
	   		console.log('点不点')
	 			if(document.title=='添加宝宝'){
	 				this.set_ishavebaby(1);
	 			}
	 			if(vm.$route.params.pid==-1){
	 				//获取用户信息	
	 				$.ajax({url: apiurl.LoginByOpenId,data:{OpenId:vm.openid},type:'get',
	 					success:function(data){
	   					console.log('aa',data)
			        	if(data.suc){
				 					if(data.extra.CurrentLoginMember){
					 				//var reg = new RegExp("(^|&)" + "#/DoctorDetailQY/" + "([^&]*)(&|/)");
									// var r = window.location.hash.match(reg);
	                  vm.set_isLogined(true);
	                  vm.set_userinfo(data.extra.CurrentLoginMember);
	                  vm.set_userid(data.extra.CurrentLoginMember.UserID);
	                  vm.set_familymember(data.extra.OtherMembers);
	                  vm.set_ishavebaby(data.extra.IsHaveBaby);
	                  if(vm.did>0){
	                  	console.log('这里么？')
	                  	vm.$router.push({'name':'HealthInfo', params: { pid: data.extra.CurrentLoginMember.PatientID,did:vm.did}});
	                  }else{
	                  	console.log('跳这里')
	                  	vm.$router.push({'path':vm.form});
	                  }
	                  
	                }
				 				}
		        }
		      });   				
	 			}else{
	 				console.log(this.form,"sws");
	 				vm.$router.push({'path':this.form});
	 			}   		
	    },
	    goAuthentication() {
	    	this.$router.push({'name':'playok',params: { pok:this.$route.params.pid}});
	    },
	    /*地址start*/
		  creatList(obj, list) {
			 	obj.forEach(function(item, index, arr){
				  var temp = new Object();
				  temp.text = item.name;
				  temp.value = index;
				  list.push(temp);
				})
			},			
			clickMe() {
				var vm=this;
				var nameEl = document.getElementById('name');
				vm.first=[];
				vm.second=[];
				vm.third=[];

				this.creatList(city, this.first);
				if (city[this.selectedIndex[0]].hasOwnProperty('sub')) {
				  this.creatList(city[this.selectedIndex[0]].sub, this.second);
				} else {
				  this.second = [{text: '', value: 0}];
				}
				if (city[this.selectedIndex[0]].sub[this.selectedIndex[1]].hasOwnProperty('sub')) {
				  this.creatList(city[this.selectedIndex[0]].sub[this.selectedIndex[1]].sub, this.third);
				} else {
				  this.third = [{text: '', value: 0}];
				}
				var picker = new Picker({
					data: [this.first, this.second,this.third],
				  	selectedIndex:vm.selectedIndex,
					title: '请选择地址'
				});
			
				picker.show();
				picker.on('picker.select', function (selectedVal, selectedIndex) {
				  var text1 = vm.first[vm.selectedIndex[0]].text;
				  var text2 = vm.second[selectedIndex[1]].text;
				  var text3 = vm.third[selectedIndex[2]] ? vm.third[selectedIndex[2]].text : '';
					vm.pickeraddress = text1 + ' ' + text2 + ' ' + text3;
					vm.Provincetext=text1;
					vm.Citytext=text2;
					vm.Areatext=text3;
					
				});
				picker.on('picker.change', function (index, selectedIndex) {
				  if (index === 0){
				    vm.firstChange(selectedIndex,picker)
				  } else if (index === 1) {
				    vm.secondChange(selectedIndex,picker);
				  }
				});
			},
			firstChange(selectedIndex,picker) {
		   	this.second = [];
		    this.third = [];
		    this.checked[0] = selectedIndex;
		    var firstCity = city[selectedIndex];
		    if (firstCity.hasOwnProperty('sub')) {
		      this.creatList(firstCity.sub, this.second);	
		      var secondCity = city[selectedIndex].sub[0]
		      if (secondCity.hasOwnProperty('sub')) {
		       	this.creatList(secondCity.sub, this.third);
		      } else {
		        this.third = [{text: '', value: 0}];
		        this.checked[2] = 0;
		      }
		    } else {
		      this.second = [{text: '', value: 0}];
		      this.third = [{text: '', value: 0}];
		      this.checked[1] = 0;
		      this.checked[2] = 0;
		    }	
		    picker.refillColumn(1, this.second);
		    picker.refillColumn(2, this.third);
		    picker.scrollColumn(1, 0)
		    picker.scrollColumn(2, 0)
			},
			secondChange(selectedIndex,picker) {
		    this.third = [];
		    this.checked[1] = selectedIndex;
		    var first_index = this.checked[0];
		    if (city[first_index].sub[selectedIndex].hasOwnProperty('sub')) {
		      var secondCity = city[first_index].sub[selectedIndex];
		      this.creatList(secondCity.sub, this.third);
		      picker.refillColumn(2, this.third);
		      picker.scrollColumn(2, 0)
		    } else {
		      this.third = [{text: '', value: 0}];
		      this.checked[2] = 0;
		      picker.refillColumn(2, this.third);
		      picker.scrollColumn(2, 0)
		    }
		  },
	    /*地址end*/
	    /*关系选择*/
	    gxpicker() {
	    	var vm=this;
	    	var picker1El = document.getElementById('picker1');
	    	var picker1 = new Picker({
			    data: [this.data1],
			    selectedIndex:vm.gxindex,
			    title: '请选择关系'
				});
				picker1.show();
				picker1.on('picker.select', function (selectedVal, selectedIndex) {
					    vm.gx = vm.data1[selectedIndex[0]].text;
				});
	    },
	    /*关系选择end*/
	   
	    	/*街道选择*/	
	    	/*pickerjdclick() {
	    		var vm=this;
		    	var picker2El = document.getElementById('picker2');
		    	var picker2 = new Picker({
				    data: [this.StreetSlots],
				    selectedIndex:vm.streetindex,
				    title: '请选择街道'
				});
				picker2.show();
				picker2.on('picker.select', function (selectedVal, selectedIndex) {
					    vm.street = vm.StreetSlots[selectedIndex[0]].text;
				});
	    	},*/
	    	/*街道选择end*/	    
	  },
  	components: {
    	buttonzdy,circheckzdy,radiocheckzdy
  	},
	  watch: {
	    idcard: function(newValue, oldValue) {
	      if(newValue.length==18){
	      	var date = new Date();
			 		var year = date.getFullYear(); 
			 		var birthday_year = parseInt(newValue.substr(6,4));
	 				this.age= year - birthday_year;
			 		if (parseInt(newValue.substr(16, 1)) % 2 == 1){
			 			$('.radiocheck-div .radiocheck-item input').removeAttr('checked');
			    			$('.radiocheck-div .radiocheck-item .radiocheck-icon').removeClass('isselected');
			    			$('.radiocheck-div .radiocheck-item input[value="1"]').siblings(".radiocheck-icon").addClass('isselected');
			 		}else{
			 			$('.radiocheck-div .radiocheck-item input').removeAttr('checked');
			    			$('.radiocheck-div .radiocheck-item .radiocheck-icon').removeClass('isselected');
			    			$('.radiocheck-div .radiocheck-item input[value="0"]').siblings(".radiocheck-icon").addClass('isselected');
			 		}
	      }
	    }
	  },
	  beforeRouteEnter (to, from, next) {
	  	next(vm => {
				vm.form=from.path;
				console.log(vm.form)
			 });
	  	if(from.name=="ChooseFamilyMember"){
	  		document.title="家庭成员编辑";
	  	}
	  	if(from.path=="/Me"){
	  		document.title="修改个人信息";
	  	}
	   	if(from.name=="ymjzIndex" || from.name=="ymjzindexhave"){
	  		document.title="添加宝宝";
	  	}
	  },
	  beforeRouteLeave (to, from, next) {
	   	$(".gearDate").hide();
	    next();
		},
  
  
	}
</script>




