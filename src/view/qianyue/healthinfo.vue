<template>
	<section class="healthinfo-container">
	<form id="form1">
	<div class="itemline">
		
	</div>
		<section class="healthinfo-baseitem infoitem">
		<input type="hidden" :value="this.$route.params.pid" name="PatientID">
				<header><h4>基本情况</h4></header>
				<div class="item">
					<span>1.职业</span>
					<circheckzdy :lists="[{name:'学龄前儿童',value:'1'},{name:'学生',value:'2'},{name:'在职',value:'3'},{name:'离职',value:'4'},{name:'待业',value:'5'}]" name="JobStatus" single="true"></circheckzdy>
				</div>
				<div class="item">
					<span>2.婚姻状况</span>
					<circheckzdy :lists="[{name:'未婚',value:'0'},{name:'已婚',value:'1'},{name:'离异',value:'2'},{name:'丧偶',value:'3'}]" name="MaritalStatus" single="true"></circheckzdy>
				</div>
				<div class="item">
					<span>3.过去1年个人月收入</span>
					<circheckzdy :lists="[{name:'1000元以下',value:'1'},{name:'1000元到2000元之间',value:'2'},{name:'2000元到5000元之间',value:'3'},{name:'5000元到10000元之间',value:'4'},{name:'10000元以上',value:'5'}]" name="MonthIncomeStatus" single="true"></circheckzdy>
				</div>
				<div class="item">
					<span>4.家中居住人</span>
					<input type="hidden" name="LiveWithWhoLabel" id="LiveWithWhoLabel">
					<circheckzdy :lists="[{name:'独居',value:'1',single:true},{name:'配偶',value:'2'},{name:'子女',value:'3'},{name:'保姆',value:'4'}]" name="LiveWithWhoLabelSingle" single="true"></circheckzdy>
				</div>
		</section>
		<div class="itemline">
		
	</div>
		<section class="healthinfo-baseitem infoitem">
				<header><h4>健康需求</h4></header>
				<div class="item">
					<span>1.疾病史</span>
					<input type="hidden" name="SickenHistoryLabel" id="SickenHistoryLabel">
					<circheckzdy :lists="[{name:'无基础疾病',value:'0',single:true},{name:'高血压',value:'1'},{name:'脑卒风（中风）',value:'2'},{name:'糖尿病',value:'3'},{name:'冠心病',value:'4'},{name:'慢性阻塞性肺病',value:'5'},{name:'血脂异常',value:'6'},{name:'肿瘤',value:'7'},{name:'其他',value:'8'}]" name="SickenHistoryLabelSingle" single="false"></circheckzdy>
				</div>
				<div class="item">
					<span>2.生活自理能力</span>
					<circheckzdy :lists="[{name:'完全自理',value:'0'},{name:'基本自理',value:'1'},{name:'行动方便',value:'2'},{name:'卧床不起',value:'3'}]" name="TakeSelfStatus" single="true"></circheckzdy>
				</div>
				<div class="item">
					<span>3.你需要哪方面保健指导</span>
					<input type="hidden" name="HealthGuidanceLabel" id="HealthGuidanceLabel">
					<circheckzdy :lists="[{name:'中医',value:'1'},{name:'口腔',value:'2'},{name:'不需要',value:'3',single:true}]" name="HealthGuidanceLabelSingle" single="false"></circheckzdy>
				</div>
				<div class="item">
					<span>4.社区医疗服务方式</span>
					<input type="hidden" name="MedicalServiceModelLabel" id="MedicalServiceModelLabel">
					<circheckzdy :lists="[{name:'定期上门',value:'1'},{name:'定期电话',value:'2'},{name:'需要时联系',value:'3'}]" name="MedicalServiceModelLabelSingle" single="false"></circheckzdy>
				</div>
				<div class="item">
					<span>5.定期上门服务方式</span>
					<input type="hidden" name="DoorWayServiceModeLabel" id="DoorWayServiceModeLabel">
					<circheckzdy :lists="[{name:'上门随访',value:'1'},{name:'上门康复',value:'2'},{name:'居家护理',value:'3'},{name:'用药指导',value:'4'},{name:'健康教育',value:'5'},{name:'心理疏导',value:'6'},{name:'不需要',value:'7',single:true}]" name="DoorWayServiceModeLabelSingle" single="false"></circheckzdy>
				</div>
				<div class="item">
					<span>6.方便的联系方式</span>
					<input type="hidden" name="ContactWayLabel" id="ContactWayLabel">
					<circheckzdy :lists="[{name:'家庭好医公众号',value:'1'},{name:'发短信',value:'2'},{name:'打电话',value:'3'}]" name="ContactWayLabelSingle" single="false"></circheckzdy>
				</div>
		</section>
		</form>
		<div class="btncontainer">
			<buttonzdy btn-name='提交' @click.native="AddPatientPlusInfo()"></buttonzdy>
		</div>
	</section>
</template>
<script>
import { mapGetters,mapActions } from 'vuex'
import buttonzdy from '../../components/button-zdy.vue';
import circheckzdy from '../../components/circheck-zdy.vue';
import {apiurl} from '../../service/api-config.js'
import { Toast } from 'mint-ui';
export default{
	computed:{
      ...mapGetters({
      openid:'openid',userid:'userid',userinfo:'userinfo'
    })
  },
	components: {
      	circheckzdy,buttonzdy
    },
    mounted(){
      if(this.$route.params.did<=0){
        $('.btncontainer').hide();
       this.GetPatientPlusInfo();
    }
    },
    methods: {
    	AddPatientPlusInfo(){
    	var arrChk=$('.circheck-zdydiv[name="LiveWithWhoLabelSingle"] input:checked');
    	var strChk="";
    	$(arrChk).each(function(){
       		    strChk+=this.value+",";  
    	});
    	if(strChk.length>0){
    		$("#LiveWithWhoLabel").val(strChk.substring(0,strChk.length-1)); 
    	}else{
    		Toast("家中居住人必填项");
    		return false;
    	}
    	arrChk=$('.circheck-zdydiv[name="SickenHistoryLabelSingle"] input:checked');
    	strChk="";
    	$(arrChk).each(function(){
       		    strChk+=this.value+","; 
    	});
    	if(strChk.length>0){
    		$("#SickenHistoryLabel").val(strChk.substring(0,strChk.length-1)); 
    	}else{
    		Toast("疾病史必填项");
    		return false;
    	}
    	arrChk=$('.circheck-zdydiv[name="HealthGuidanceLabelSingle"] input:checked');
    	strChk="";
    	$(arrChk).each(function(){
       		    strChk+=this.value+",";
    	});
    	
    	if(strChk.length>0){
    		$("#HealthGuidanceLabel").val(strChk.substring(0,strChk.length-1)); 
    	}else{
    		Toast("保健指导必填项");
    		return false;
    	}
    	arrChk=$('.circheck-zdydiv[name="MedicalServiceModelLabelSingle"] input:checked');
    	strChk="";
    	$(arrChk).each(function(){
       		    strChk+=this.value+","; 
    	});
    	if(strChk.length>0){
    		$("#MedicalServiceModelLabel").val(strChk.substring(0,strChk.length-1)); 
    	}else{
    		Toast("医疗服务方式必填项");
    		return false;
    	}
    	arrChk=$('.circheck-zdydiv[name="DoorWayServiceModeLabelSingle"] input:checked');
    	strChk="";
    	$(arrChk).each(function(){
       		    strChk+=this.value+","; 
    	});
    	if(strChk.length>0){
    		$("#DoorWayServiceModeLabel").val(strChk.substring(0,strChk.length-1)); 
    	}else{
    		Toast("上门服务方式必填项");
    		return false;
    	}
    	arrChk=$('.circheck-zdydiv[name="ContactWayLabelSingle"] input:checked');
    	strChk="";
    	$(arrChk).each(function(){
       		    strChk+=this.value+","; 
    	});
    	if(strChk.length>0){
    		$("#ContactWayLabel").val(strChk.substring(0,strChk.length-1)); 
    	}else{
    		Toast("联系方式必填项");
    		return false;
    	}
    	var vm=this;
  		var headers={
  			UserID:this.userid,
			Token:this.openid
  		};
  		var data = $("#form1").serialize(); 
  		$.ajax({ url: apiurl.AddPatientPlusInfo,type:"post",data:data,headers:headers, success: function(data){
  			if(data.suc){
  				vm.$router.push({'name':'QianyueApplyInfo', params: { pid: vm.$route.params.pid,did: vm.$route.params.did}});
  			}else{
  				Toast(data.mes);
  			}
  		}});
    	},
      GetPatientPlusInfo(){
         var vm=this;
      var headers={
        UserID:this.userid,
      Token:this.openid
      };
      $.ajax({ url: apiurl.GetPatientPlusInfo+"?patientID="+this.$route.params.pid,headers:headers, success: function(data){
          if(data.suc){
            $.each(data.extra,function(name,value) {
              if(name!="PatientID"){
                if(name=="JobStatus"||name=="MaritalStatus"||name=="MonthIncomeStatus"||name=="TakeSelfStatus"){
                  $('.circheck-zdydiv[name="'+name+'"] input[value="'+value+'"]').prop("checked",true);
                    $('.circheck-zdydiv[name="'+name+'"] input[value="'+value+'"]').parent().addClass('selected');
                }else{
                  $("#"+name).val(value);
                  var values = value.split(',');
                  $.each(values,function (index, obj) {
                      $('.circheck-zdydiv[name="'+name+'Single"] input[value="'+obj+'"]').prop("checked",true);
                    $('.circheck-zdydiv[name="'+name+'Single"] input[value="'+obj+'"]').parent().addClass('selected');
                  });
                }
              }
            });
          }else{
            Toast(data.mes);
          }
        }});
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
    if(from.name=="QianyueApplyInfo"){
        if(vm.$route.params.did>0){
            vm.GetPatientPlusInfo();
        }
      }
  })
    
  }
}
</script>