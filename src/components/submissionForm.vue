<template>
	<div class="container">
		<div class="user_items">
			<div class="register-form-container">
				<h3>{{ task.title }}</h3>
				<p>{{ task.description }}</p>
				<form class="form" v-on:submit.prevent="submitForm">
					<div class="form_group">
						<p class="error" v-for="error in errors.Surname" v-bind:key="error">{{error}}</p>
						<input v-model="postBody.surname" class="form__control" type="text" placeholder="Surname">
					</div>

					<div class="form_group">
						<p class="error" v-for="error in errors.Name" v-bind:key="error">{{error}}</p>
						<input v-model="postBody.name" class="form__control" type="text" placeholder="Name">
					</div>

					<div class="form_group">
						<p class="error" v-for="error in errors.FathersName" v-bind:key="error">{{error}}</p>
						<input v-model="postBody.fathersName" class="form__control" type="text" placeholder="Father`s name">
					</div>

					<div class="form_group">
						<p class="error" v-for="error in errors.PhoneNumber" v-bind:key="error">{{error}}</p>
						<input v-model="postBody.phoneNumber" class="form__control" type="text" placeholder="Phone number">
					</div>

					<div class="form_group">
						<p class="error" v-for="error in errors.Email" v-bind:key="error">{{error}}</p>
						<input v-model="postBody.email" class="form__control" type="text" placeholder="Email">
					</div>

					<div class="form_group">
						<p class="error" v-for="error in errors.GitHubURL" v-bind:key="error">{{error}}</p>
						<input v-model="postBody.gitHubURL" class="form__control" type="text" placeholder="GitHub URL">
					</div>

					<div class="form_group">
						<input v-model="postBody.notes" class="form__control" type="text" placeholder="Notes">
					</div>
					<div class="send">
						<button>Send</button>
					</div>

				</form>
			</div>
		</div>
	</div>
</template>

<script>
import api from "@/api";

export default {
	name: "submissionForm",
	data() {
		return {
			postBody: {
				surname: '',
				name: '',
				fathersName: '',
				phoneNumber: '',
				email: '',
				gitHubURL: '',
				notes: '',
				taskId:this.$route.params.taskId
			},
			task: {
				title: '',
				description: ''
			},
			errors:{}
		};
	},
	mounted() {
		api.get('/SubmissionAdding/Task/' + this.$route.params.taskId)
			.then((response) => {
				this.task = response.data;
			}).catch(err => console.log(err));
	},
	methods: {
		submitForm: function () {
			api.post('/Submissions', this.postBody)
				.then((response) => {
					console.log(this.postBody);
					this.$router.push('/Info/'+ response.data);
				})
				.catch((error) => {
					this.errors = error.data.errors;
				})
		}
	}
}
</script>

<style scoped>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body {
	font-family: 'Roboto', sans-serif;
	background-image: url(../img/header-bg.jpg);
}

.error{
	color: red;
}

input {
	height: 45px;
	width: 100%;
	color: #000;
	font-size: 15px;
	line-height: 16px;
	border-bottom: 2px solid #DBEFF8;
	border-radius: 5px;
	padding-left: 25px;
}

template {
	background-image: url(../img/header-bg.jpg);
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.register-form-container {
	opacity: 0;
	position: relative;
	margin: auto;
	z-index: 2;
	max-width: 415px;
	width: 100%;
	background: #395A71;
	box-shadow: 0 6px 50px rgba(217, 229, 255, 0.7);
	border-radius: 20px;
	padding-left: 30px;
	padding-right: 30px;
	padding-top: 38px;
	padding-bottom: 38px;
	animation-name: fadeForm;
	animation-duration: .7s;
	animation-timing-function: ease-in-out;
	animation-delay: 1.4s;
	animation-iteration-count: 1;
	animation-fill-mode: forwards;
}

@keyframes fadeForm {
	0% {
		opacity: 0;
	}
	25% {
		opacity: .25;
	}
	50% {
		opacity: .5;
	}
	75% {
		opacity: .75;
	}
	100% {
		opacity: 1;
	}
}

.form_group {
	margin-bottom: 30px;
}

.send {
	margin: auto;
	display: flex;
	justify-content: center;
}

.container {
	padding-top: 50px;
}
</style>