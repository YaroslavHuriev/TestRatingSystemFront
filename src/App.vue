<template>
	<div id="app">
		<router-link v-if="this.$router.currentRoute.path==='/'" to="/Submissions">Перейти до таблиці</router-link>
		<router-link v-if="this.$router.currentRoute.path==='/'" to="/Submission/Add">Перейти до форми
		</router-link>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'App',
	components: {}
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
