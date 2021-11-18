<template>
	<div>
		<form>
			<input v-model="postBody.username" placeholder="Username" type="text">
			<input v-model="postBody.password" placeholder="Password" type="password">
			<input type="hidden" v-model="postBody.role">
			<button v-on:click="login" type="button">Send</button>
		</form>
	</div>
</template>

<script>

import api from "@/api";

export default {
	name: "loginForm",
	data() {
		return {
			postBody: {
				username: '',
				password: '',
				role: 'Admin'
			}
		}
	},
	methods: {
		login: function () {
			api.post('/login', this.postBody)
				.then((response) => {
					localStorage.setItem('token', response.data.token);
					localStorage.setItem('refreshToken', response.data.refreshToken);
					this.$router.push('/');
				}, (error) => {
					console.log(error);
				});
			// eslint-disable-next-line no-unused-vars
			let timerId = setTimeout(function tick() {
				api.post('/api/Token/refresh', {
					accessToken: localStorage.getItem('token'),
					refreshToken: localStorage.getItem('refreshToken')
				}).then((response) => {
					localStorage.setItem('token', response.data.accessToken);
					localStorage.setItem('refreshToken', response.data.refreshToken)
					timerId = setTimeout(tick, 1770000);
				})
			}, 1770000);
		}
	}
}
</script>

<style scoped>

</style>