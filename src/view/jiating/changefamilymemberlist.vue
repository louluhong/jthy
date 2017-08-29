<template>
	<section class="addfamilymember-container aaaa" style="height: 100%;">
		<router-view transition="cover" style="height:100%;"></router-view>
		<div id="addfamilyContent">
	
		<form id="form2">
		<div class="addfamilymember-kongge">
		</div>

    <input type="hidden" name="FamilyID" id="FamilyID">
    <input type="hidden" name="PatientID" id="PatientID">
    <input type="hidden" name="MemberID" id="MemberID">

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
		<div class="addfamilymember-content addfamilymember-contentgx">
			<span class="addfamilymember-contentlabel">称呼</span>
			<div @click="gxpicker" class="addfamilymember-pickergx"> <!--@click="showPicker('pickergx')"-->
				<span id="picker1" class="addfamilymember-choose">{{gx}}</span>
				<input type="hidden" :value="gx" name="RelationName">
				<img src="../../assets/images/jiantou@2x.png" alt="" class="addfamilymember-jiantou">
			</div>
		</div>
		<div class="addfamilymember-content">
			<span class="addfamilymember-contentlabel">姓名</span>
			<div>
				<input type="text" value='' placeholder="请输入真实姓名" name="CHName" id="PatientName" maxlength="5"  class="changefamilydom">
			</div>
		</div>
		<div class="addfamilymember-content choose_familymember">
			<span class="addfamilymember-contentlabel">身份证</span>
			<div @click="goAuthentication">
				<span class="addfamilymember-choose">身份证实名验证</span>
				<img src="../../assets/images/jiantou@2x.png" alt="" class="addfamilymember-jiantou">
				<input type="hidden" :value="imgsUrl" name="PatientIdCardPhotoUrl"/>
				<input type="hidden" :value="imgsTitle" name="PatientIdCardPhoto"/>
			</div>
		</div>
		<div class="addfamilymember-content">
			<span class="addfamilymember-contentlabel">身份证</span>
			<div>
				<input type="hidden"  :value="idcard" placeholder="请输入真实的身份证号" name="IDCard" id="IDCard" class="changefamilydom">
				<input type="text"  value="" placeholder="请输入真实的身份证号" id="IDCard1" class="changefamilydom" v-model.trim="idcard">
				<input type="hidden"  value="" placeholder="请输入真实的身份证号" id="IDCard2" class="changefamilydom">
			</div>
		</div>
		<div class="addfamilymember-content aaa" style="display:none;">
			<span class="addfamilymember-contentlabel">出生日期</span>
			<div>
				<input type="text" placeholder="请输入真实的出生日期" :value='birthVal' readonly="readonly"  name="Birthday" id="BirthData" class="changefamilydom">
			</div>
		</div>
		
		
		<div class="addfamilymember-content">
			<span class="addfamilymember-contentlabel">性别</span>
			<div>
				<radiocheckzdy :lists="sexlist" name="Sex"></radiocheckzdy>
				<input type="hidden" name="Sex" id="Sex1" :value="Sex" class="Sex1">
				<div class="radio_mask">遮罩</div>
			</div>
		</div>
		<div class="addfamilymember-content">
			<span class="addfamilymember-contentlabel">年龄</span>
			<div>
				<input type="text" name="Age" v-model.number="age" placeholder="请输入真实年龄" maxlength="3" class="changefamilydom" readonly='true'>
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
				<div @click="GoRouter()">
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
	export default{
		computed:{
	      	...mapGetters({
	      		openid:'openid',familymember:'familymember',picbackimgs:'picbackimgs',picimgs:'picimgs',userid:'userid',userinfo:'userinfo',pictureurl:'pictureurl'
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
    		getCodeMsg:'获取验证码',
    		isCanSendCode:true,
    		countdown:60,
				street:'请选择街道',
				badyshow:false,
				yblist:[{name:"市医保",value:"1"},{name:"省医保",value:"2"},{name:"其他",value:"6"},{name:"市医保大学生",value:"4"},{name:"市医保儿童",value:"5"}],
				sexlist:[{text:"男",value:"1",checked:true,disabled:true},{text:"女",value:"0",checked:true,disabled:true}],
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
				pinfo:[]
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
	      	var headers={
		        UserID:this.userid,
		      	Token:this.openid
	      	};

      		$.ajax({ url: apiurl.GetTicket+"?url="+encodeURIComponent(location.href.split('#')[0]),type:"post",headers:headers, success: function(data){
	        	if(data.suc){
		            wx.config({
		              debug:false,
		               appId:globappid.appid,//wxb0c5ae7e817919e7
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
       	 		$('.addfamilymember-btncontainer button').text('确认修改');
        		$('.jiatinginfo-dialog span').text('修改成功');
			    var headers={
			        UserID:this.userid,
			      	Token:this.openid
			    };
    			$.ajax({url: apiurl.LoginByOpenId,data:{OpenId:this.openid},type:'get',success:function(data){
    			//获取用户信息
        			$.ajax({ url: apiurl.GetPatientByPatientID+"?PatientId="+vm.$route.params.pid,headers:headers, success: function(data){
	        				if(data.suc){
	        					if(data.extra.Province==''&&data.extra.City==''&&data.extra.Area==''){

	        					}else{
	        						vm.pickeraddress=data.extra.Province+" "+data.extra.City+" "+data.extra.Area;
	        					}					        	
					        	vm.Provincetext=data.extra.Province;
					        	vm.Citytext=data.extra.City;
					        	vm.Areatext=data.extra.Area;
					        	vm.imgsTitle=data.extra.PatientIdCardPhoto;
										vm.imgsUrl=data.extra.PatientIdCardPhotoUrl;
				          	$('.addfamilymember-headimg').attr('src', data.extra.PatientImageUrl);
				          	$("#MemberID").val(data.extra.FamilyMemberId);
				          	$("#FamilyID").val(data.extra.FamilyId);
				          	$("#PatientID").val(data.extra.PatientId);
				          	$("#PatientName").val(data.extra.PatientName);
				          	vm.idcard=data.extra.PatientCardId;
				          	$('.radiocheck-item input').removeAttr('checked');
				          	$('.radiocheck-item .radiocheck-icon').removeClass('isselected');
				          	$('.radiocheck-item input[value="'+(data.extra.PatientSex)+'"]').siblings(".radiocheck-icon").addClass('isselected');
				          	$('.radiocheck-item input[value="'+(data.extra.PatientSex)+'"]').siblings(".radiocheck-icon").addClass('isselected');
          					vm.age=data.extra.PatientAge;
          					vm.addressProvince=(data.extra.Province==null?"":data.extra.Province)+(data.extra.City==null?"":data.extra.City)+(data.extra.Area==null?"":data.extra.Area);
          					vm.street=data.extra.Street;
          					vm.Sex=data.extra.PatientSex;
          					$("#DetailedAddress").val(data.extra.DetailedAddress);
          					$('.circheck-zdydiv[name="MedicalCardType"] input[value="'+data.extra.MedicalCardType+'"]').prop("checked",true);
          					$('.circheck-zdydiv[name="MedicalCardType"] input[value="'+data.extra.MedicalCardType+'"]').parent().addClass('selected');
          					vm.phone=data.extra.PatientPhone;
          					vm.gx=data.extra.RelationName;
          					data.extra.PatientBirthday=(data.extra.PatientBirthday).replace(new RegExp("-","gm"),"/")
          					vm.birthVal=new Date(data.extra.PatientBirthday).getFullYear()+'-'+(new Date(data.extra.PatientBirthday).getMonth()+1)+'-'+new Date(data.extra.PatientBirthday).getDate();
	          				switch(data.extra.RelationName){
          						case '爷爷':
          							vm.gxindex=[0];
												vm.bady=false;
												break;
											case '奶奶':
												vm.gxindex=[1];
												vm.bady=false;
												break;
											case '外公':
												vm.gxindex=[2];
												vm.baby=false;
												break;
											case '外婆':
												vm.gxindex=[3];
												vm.baby=false;
												break;
											case '爸爸':
												vm.gxindex=[4];
												vm.baby=false;
												break;
											case '妈妈':
												vm.gxindex=[5];
												vm.baby=false;
												break;
											case '兄弟':
												vm.gxindex=[6];
												vm.baby=false;
												break;
											case '姐妹':
												vm.gxindex=[7];
												vm.baby=false;
												break;
			          						case '宝宝':
												vm.gxindex=[8];
												vm.bady=true;
												break;
											case '其他':
												vm.gxindex=[9];
												vm.baby=false;
												break;
	          				}
	          				if(data.extra.IsEgis==1){
	          					var _Id_Card=vm.idcard;
											var _str_Start=_Id_Card.substr(0,3);
											var _str_End=_Id_Card.substr(14,4);
											var _ss=function(){var s="";for(var i=0;i<18-7;i++) s+="*";return s;};
											console.log($('#IDCard'))
											$('#IDCard1').attr('type','hidden');
											$('#IDCard2').attr('type','text');
											$('#IDCard2').val(_str_Start+_ss()+_str_End);
          						$('.choose_familymember').hide();
          						$('.changefamilydom').attr('readonly','true');
          						$('.changefamilydom').css('color','#999');
          						$('.radio_mask').show();
	          				}else{
	          					$('#IDCard2').attr('type','hidden');
											$('#IDCard1').attr('type','text');
	          					$('#IDCard1').val(vm.idcard);
	          				}
	        				}else{
	          					Toast(data.mes);
	        				}
      					}});      
      			}});  
      		}
  		},
		methods: {
		 	...mapActions([
      			'set_userinfo' ,'set_familymember','set_ishavebaby'
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
  				var data = new FormData($('#form2')[0]); 
  				var yearold=new Date($('#BirthData').val()).getFullYear();
					var monthold=new Date($('#BirthData').val()).getMonth();
					var datedayold=new Date($('#BirthData').val()).getDate();
					var dataobj = new Date();
     			var yearnow = dataobj.getFullYear();
     			var month = dataobj.getMonth()+1;
     			var dateday = dataobj.getDate();
     			if(yearnow<yearold && monthold > month && datedayold > dateday){
     				Toast("出生日期不能大于当前日期");
     				return false;
     			}

      		var url=apiurl.AddFamilyMember;
      		console.log(this.$route.params.pid)
      		if(this.$route.params.pid>0){
        		var url=apiurl.UpdateFamilyMember;
      		}
  				$.ajax({ url: url,type:"post",processData: false,contentType: false,data:data,headers:headers, success: function(data){
  					console.log(data,'bbb')
	  					if(data.suc){
	  						$.ajax({ url: apiurl.GetMemberUsers,headers:headers, success: function(data){
			  					if(data.suc){
			         		 		vm.set_userinfo(data.extra.CurrentLoginMember);
							  		vm.set_familymember(data.extra.OtherMembers);
			  					}
	  						}});
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
		        	
		        	setTimeout(function() { 
		          		vm.CountDown() 
		        	},1000) 
		      	} 		      
		    },
    		GetDuanXinCode(){
    			if(this.phone.length==0){
  					Toast('请输入手机号');
  				}else if(this.phone.length!=11){
  					Toast('请输入正确手机号');
  				}else{
  					if(this.isCanSendCode){
          				this.isCanSendCode=false;
          				this.getCodeMsg="正在发送";
  						var vm=this;
  						$.ajax({ url: apiurl.SendDuanXinCode,type:'post',data:{PhoneNumber:this.phone,OpenID:this.openid}, 
  							success: function(data){
	               				if(!data.suc){
	                  				vm.isCanSendCode=true;
				               	}else{
				                  	vm.CountDown();
				               	}
	               				Toast(data.mes);
        					}
        				});
      				}else{
      					Toast('请在'+this.getCodeMsg+'秒后再试')
      				}
  				}
    		},
		   	GoRouter(){
	   			if(document.title=='添加宝宝')
	   			{
	   				this.set_ishavebaby(1);
	   			}
	   			this.$router.push({'path':this.form});		   		
		    },
		    goAuthentication() {
		    	this.$router.push({'name':'playokchange',params: { pok:this.$route.params.pid}});
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

		    },
			gx: function(newGx, oldGx){
	  			var vm=this;
				if(newGx=="宝宝"){
					$('.aaa').show();
					vm.bady=true;
				}else{
					vm.bady=false;
					$('.aaa').hide();
				}
			}


	  	},
	  	// beforeRouteUpdate(to, from, next){
	  	// 	console.log(this.$route.params.pid)
	  	// },
	  // 	beforeRouteEnter (to, from, next) {
		 //  	next(vm => {
			// 	vm.form=from.path;  
			// });
		 //  	if(from.name=="ChooseFamilyMember"){
		 //  		document.title="家庭成员编辑";
		 //  	}
		 //  	if(from.path=="/Me"){
		 //  		document.title="修改个人信息";
		 //  	}
		 //   	if(from.name=="ymjzIndex" || from.name=="ymjzindexhave"){
		 //  		document.title="添加宝宝";
		 //  	}
	  // 	},
	  	beforeRouteLeave (to, from, next) {
		   $(".gearDate").hide();
		    next();
		},  
	}
</script>