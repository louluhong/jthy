<template>
<section class="_full_router suggestion-container">
    <div class="suggestion-containerbody">
    	<span>您的意见对我们非常重要</span>
    	<textarea placeholder="请在这里输入您的宝贵意见..." id="feedback" v-model.trim="feedback">
		</textarea>
		<!-- <button type="button">提交</button> -->
		<buttonzdy btn-name='提交' @click.native="InsertFeedback()"></buttonzdy>
    </div>
</section>
</template>
<script>
import { mapGetters,mapActions } from 'vuex'
import {apiurl} from '../../service/api-config.js'
	import buttonzdy from '../../components/button-zdy.vue';
	import { Toast } from 'mint-ui';
	export default {
    data() {
        return {
          feedback:''
        }
  },
		computed:{
      ...mapGetters({
      openid:'openid',userid:'userid',userinfo:'userinfo'
    })
  },
  methods:{
  		InsertFeedback(){
  			if(this.feedback.length==0){
Toast('请输入意见');
  			}else{
  				var headers={
  			UserID:this.userid,
			Token:this.openid
  		};
      var vm=this;
  		$.ajax({ url: apiurl.InsertFeedback+"?content="+this.feedback,type:'post',headers:headers, success: function(data){
  			Toast(data.mes);
        if(data.suc){
          setTimeout(function(){
          vm.$router.push({'path':'/Me'});
        },1000)
        }
  		}});
  			}
  		
  		}
  },
		mounted(){
			var bodyH=$('.suggestion-container').height();
			$(window).resize(function() {
				$('.suggestion-container').css('height',bodyH);
			});
		},
    	components: {
      		buttonzdy
    	}
	}
</script>