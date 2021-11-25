<template>
	<div class="login">
		<div class="container-login" id="login-form">
			<img alt="avatar" v-bind:src="logo">
			<form>
				<div class="dws-input">
					<input v-model="postBody.username" type="text" name="username" placeholder="Username">
				</div>
				<div class="dws-input">
					<input v-model="postBody.password" type="password" name="password" placeholder="Password">
				</div>
				<input type="hidden" v-model="postBody.role">
				<button v-on:click="login" class="dws-submit" type="button" name="submit">Send</button>
			</form>
		</div>
	</div>

</template>

<script>

import api from "@/api";
import avatar from '/src/img/avatar.png'
export default {
	name: "loginForm",
	data() {
		return {
			postBody: {
				username: '',
				password: '',
				role: 'Admin'
			},
			logo:avatar
		}
	},
	methods: {
		login: function () {
			api.post('/login', this.postBody)
				.then((response) => {
					localStorage.setItem('token', response.data.token);
					localStorage.setItem('refreshToken', response.data.refreshToken);
					this.$router.push('/Submissions');
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
body{
	background-image: url("/src/header-bg.jpg");
}
 .login{
	padding-top: 180px;
 }
.container-login{
	width:450px;
	background-color: #395A71;
	text-align: center;
	margin: auto;
	padding-bottom: 20px;
	border-radius: 10px;
}
.container-login img{
	width:120px;
	height:120px;
	margin: -60px 0 30px 0;
	border: 5px solid #395A71;
	border-radius: 50%;
}

input[type="text"],input[type="password"]{
	width: 300px;
	height:50px;
	font-size: 18px;
	margin-bottom: 25px;
	border-radius: 4px;
	padding-left: 10px;
}
.dws-input input:hover{
	box-shadow: 0 0 6px 3px rgba(58, 219, 253, 0.35);
}
.dws-submit {
	padding: 13px 30px;
	margin: 5px 0 20px 0;
	font-size: 15px;
	color: #DBEFF8;
	background-color: #395A71;
	border-color: #DBEFF8;
	border-radius: 7px;
	cursor: pointer;
}
.dws-submit:hover{
	transition: all 0.5s;
	background: #DBEFF8;
	color: #395A71;
}

.dws-input::before{
	font-family: "Roboto";
	position: absolute;
	font-size: 30px;
	color: #2c536c;
}

.dws-input:hover::before{
	color: #319ebc;
	transition: all 0.3s;
}
</style>