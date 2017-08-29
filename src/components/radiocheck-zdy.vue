<template>
<div class="radiocheck-div" :name="name">
     <span v-for="item in lists" class="radiocheck-item" @click="Choose(item.value)">
     	<input type="radio" :name="name" class="radiocheck-input" :value="item.value" checked v-if="item.checked" disabled="item.disabled">
     	<input type="radio" :name="name" class="radiocheck-input" :value="item.value" v-if="!item.checked" disabled="item.disabled">
     	<span class="radiocheck-icon isselected" v-if="item.checked">
     	</span>
     	<span class="radiocheck-icon" v-if="!item.checked">
     	</span>
     	<span class="radiocheck-text">
     	{{item.text}}
     </span>
     </span>
</div>
</template>
<script>
    export default {
    	name:'radiocheck-zdy',
    	props: ['lists','name'],
    	methods:{
    		Choose(index){
                $('.radiocheck-div[name="'+this.name+'"] input').prop("checked",false);
                $('.radiocheck-div[name="'+this.name+'"] input').siblings(".radiocheck-icon").removeClass('isselected');
                // if(isSelect){
                    $('.radiocheck-div[name="'+this.name+'"] input[value="'+index+'"]').prop("checked",true);
                $('.radiocheck-div[name="'+this.name+'"] input[value="'+index+'"]').siblings(".radiocheck-icon").addClass('isselected');

    // 			$('.radiocheck-div input[value="'+index+'"]').attr("checked","checked");
				// $('.radiocheck-div input[value="'+index+'"]').parent().siblings().find('input').attr("checked","");
    // 			$('.radiocheck-div .radiocheck-icon').removeClass('isselected');
    // 			$('.radiocheck-div input[value="'+index+'"]').siblings(".radiocheck-icon").addClass('isselected');
                $('.Sex1').attr('value',$('.radiocheck-input[value="'+index+'"]').attr('value'))
                console.log($('#Sex1'))
    		}
    	}
    }
</script>
<style scoped>
</style>