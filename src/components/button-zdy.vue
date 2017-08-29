<template>
	<button type="button">{{btnName}}</button>
</template>
<script>
    export default {
    	name:'button-zdy',
    	props: ['btnName'],
    	data(){
    		return{
    			
    		}
    	},
    	created(){

    	}
    }
</script>
<style scoped>
    button{
    width: 100%;
    border-radius: 0.1rem;
    background: #47a6f8;
    height: 1.28rem;
    color:#ffffff;
    border:0;
}
</style>