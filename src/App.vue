<template>
	<div id="app" class="container">
		<h1 v-if="this.$router.currentRoute.path==='/'">
			Technical requirement
		</h1>
		<p v-if="this.$router.currentRoute.path==='/'">A portal that simplifies the creation, distribution, and evaluation of a SOW.
		</p>
		<router-link id = "login" class="btn" v-if="this.$router.currentRoute.path==='/'" to="/Submissions">login</router-link>
		<router-link id = "sow" class="btn" v-if="this.$router.currentRoute.path==='/'" to="/Submission/Add">Submit the SOW
		</router-link>
		<button v-on:click="logOut" type="button" v-if="this.$router.currentRoute.path==='/' && this.token">Log Out</button>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'App',
	components: {},
	data(){
		return{
			token:localStorage.getItem('token')
		}
	},
	methods:{
		logOut:function () {
			localStorage.removeItem('token');
			localStorage.removeItem('refreshToken');
			this.$router.push('/');
		}
	}
}
</script>

<style>

</style>
