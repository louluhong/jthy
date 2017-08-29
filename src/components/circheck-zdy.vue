<template>
<div class="circheck-zdydiv" :name="name">
    <span v-for="item in lists" class="checkitems" @click="Choose(item.value)">
    <input type="checkbox" :name="name" class="checkbox-input" :value="item.value" :single="item.single">
     {{item.name}}   
    </span>
</div>
</template>
<script>
    export default {
    	name:'circheck-zdy',
    	props: ['lists','name','single'],
    	methods:{
    		Choose(index){
                if(this.single=="true"||($('.circheck-zdydiv[name="'+this.name+'"] input[value="'+index+'"]').attr("single")=="true"&&!$('.circheck-zdydiv[name="'+this.name+'"] input[value="'+index+'"]').is(':checked'))){
                    var isSelect=false;
                    if(!$('.circheck-zdydiv[name="'+this.name+'"] input[value="'+index+'"]').is(':checked')){
                    isSelect=true
                    }
                    $('.circheck-zdydiv[name="'+this.name+'"] input').prop("checked",false);
                    $('.circheck-zdydiv[name="'+this.name+'"] input').parent().removeClass('selected');
                    if(isSelect){
                        $('.circheck-zdydiv[name="'+this.name+'"] input[value="'+index+'"]').prop("checked",true);
                    $('.circheck-zdydiv[name="'+this.name+'"] input[value="'+index+'"]').parent().addClass('selected');
                    }else{
                        $('.circheck-zdydiv[name="'+this.name+'"] input[value="'+index+'"]').prop("checked",false);
                    $('.circheck-zdydiv[name="'+this.name+'"] input[value="'+index+'"]').parent().removeClass('selected');
                    }

                }else{
                    if($('.circheck-zdydiv[name="'+this.name+'"] input[value="'+index+'"]').is(':checked')){
	                    $('.circheck-zdydiv[name="'+this.name+'"] input[value="'+index+'"]').prop("checked",false);
	                    $('.circheck-zdydiv[name="'+this.name+'"] input[value="'+index+'"]').parent().removeClass('selected');
	                }else{
	                    $('.circheck-zdydiv[name="'+this.name+'"] input[single="true"]').prop("checked",false);
	                    $('.circheck-zdydiv[name="'+this.name+'"] input[single="true"]').parent().removeClass('selected');
	                    $('.circheck-zdydiv[name="'+this.name+'"] input[value="'+index+'"]').prop("checked",true);
	                    $('.circheck-zdydiv[name="'+this.name+'"] input[value="'+index+'"]').parent().addClass('selected');
	                }
                }
    		}
    	}
    }
</script>
<style scoped>
.circheck-zdydiv input{
	display: none;
}
</style>