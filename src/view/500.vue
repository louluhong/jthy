<template>
<div class="errormsg">
	{{this.$route.params.msg}}
</div>
</template>

<script>

</script>
<style scope>
	.errormsg{
		width: 100%;
		height: 2rem;
		color: red;
		padding-top: 1rem;
		font-size: 30px;
	}
</style>