<template>
<div class="radiocheck-div">
     <span v-for="item in lists" class="radiocheck-item" @click="Choose(item.value)">
     	<input type="checkbox" :name="name" class="radiocheck-input" :value="item.value" checked v-if="item.checked">
     	<input type="checkbox" :name="name" class="radiocheck-input" :value="item.value" v-if="!item.checked">
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
                if($('.radiocheck-item input[value="'+index+'"]').prop('checked')){
                    $('.radiocheck-item input[value="'+index+'"]').siblings(".radiocheck-icon").removeClass('isselected');
                    $('.radiocheck-item input[value="'+index+'"]').prop('checked',false);
                }else{
                    $('.radiocheck-item input[value="'+index+'"]').siblings(".radiocheck-icon").addClass('isselected');
                    $('.radiocheck-item input[value="'+index+'"]').prop('checked',true);
                }
    		}
    	}
    }
</script>
<style scoped>
</style>