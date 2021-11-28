<template>
	<div>
		<div class="offer" v-if="this.$router.currentRoute.path==='/'">
			<div id="app" class="container">
				<h1 v-if="this.$router.currentRoute.path==='/'">
					Technical requirement
				</h1>
				<p v-if="this.$router.currentRoute.path==='/'">A portal that simplifies the creation, distribution, and evaluation of a technical requirement.
				</p>
				<router-link id = "login" class="btn" v-if="this.$router.currentRoute.path==='/'" to="/Submissions">Submission Rating</router-link>
				<router-link id = "tr" class="btn" v-if="this.$router.currentRoute.path==='/'" to="/Task/Choose">Submit the job
				</router-link>
				<button class="log-out" v-on:click="logOut" type="button" v-if="this.$router.currentRoute.path==='/' && this.token">Log Out</button>
			</div>
		</div>
		<router-link v-if="this.$router.currentRoute.path!=='/'" to="/">Main</router-link>
		<router-link v-if="this.$router.currentRoute.path!=='/' && this.$router.currentRoute.path!=='/Submissions'" to="/Submissions">Submission Rating</router-link>
		<div>
			<router-view></router-view>
		</div>
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

		}
	}
}
</script>

<style>
.offer{
	padding-top: 206px;
}
</style>
