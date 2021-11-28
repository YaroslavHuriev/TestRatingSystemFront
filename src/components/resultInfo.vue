<template>
	<div>
		<h1>Thank you for your submission!</h1>
		<p>You can check the results here:</p>
		<router-link v-bind:to="'Submission/Results'+$route.params.guid">{{'http://localhost:8080/Submission/Results'+$route.params.guid}}</router-link><br>
	</div>
</template>

<script>
export default {
	name: "resultInfo"
}
</script>

<style scoped>

</style>