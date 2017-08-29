<template>
<div class="errormsg">
	<iframe :src="href" width="99%" height="99%" style="border:none"></iframe>
</div>
</template>

<script>
	export default{
		computed:{
			href: function() {
                return decodeURIComponent(this.$route.params.href);
            }
		}
	}
</script>
<style scope>
.container{
  height:100%;
  /* padding-bottom: 1.34rem; */
}
	.errormsg{
		width: 100%;
		height: 100%;
		iframe{
			width: 100%;
			height: 100%;
		}
	}
</style>