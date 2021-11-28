<template>
	<div>
		<h1>Thank you for your submission!</h1>
		<p>You can check the results on the following URL:</p>
		<a v-bind:href="'https://test.com/'+$route.params.guid">{{'http://localhost:8080/Submission/'+$route.params.guid}}</a><br>
	</div>
</template>

<script>
export default {
	name: "resultInfo"
}
</script>

<style scoped>

</style>