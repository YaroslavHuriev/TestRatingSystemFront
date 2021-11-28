<template>
	<div id="app">
		<h2>{{ 'Task evaluation:' + results.task.title }}</h2>
		<div class="card">
			<img height="80" width="80" alt="avatar" v-bind:src="logo">
			<div class="content-wrap">
				<p class="name">{{ results.name + ' ' + results.surname }}</p>
				<p><a :href="'mailto:'+results.email" class="email">{{ results.email }}</a></p>
				<p><a class="url" v-bind:href="'https://'+results.gitHubURL">{{ results.gitHubURL }}</a></p>
			</div>
		</div>
		<div class="container">
			<div class="criteria_items">
				<p>{{ results.task.description }}</p>
				<div class="criteria_1">
					<h2>Code structure</h2>
					<p v-if="results.state==='Resolved'">{{ results.grade }} </p>
					<form v-on:submit.prevent="feedbackPatch">
						<input type="hidden" v-bind:value="results.id" name="submissionId">
						<div v-for="item in results.criteria" :key="item.submissionCriterionId">
							<input type="hidden" name="criterionId" v-model="item.submissionCriterionId">
							<input class="custom-checkbox" type="checkbox" v-model="item.isCompleted">
							<label v-bind:for="'checkbox'+item.submissionCriterionId">{{ item.title }}</label>
						</div>
						<button>Save</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import api from "@/api";
import avatar from '/src/img/avatar.png'

export default {
	name: "submissionReview",
	data() {
		return {
			results: {
				task: {
					title: '',
					description: ''
				}
			},
			submissionId: null,
			patchBody: {
				criteria: [],
				state: ''
			},
			logo: avatar
		}
	},
	mounted() {
		this.submissionId = this.$route.params.id
		api.get('/Scoring/Submissions/' + this.submissionId, {requiresAuth: true})
			.then(response => {
				this.results = response.data;
			}).catch(err => console.log(err));
	},
	methods: {
		feedbackPatch: function () {
			for (let i = 0; i < this.results.criteria.length; i++) {
				this.patchBody.criteria.push({
					id: this.results.criteria[i].submissionCriterionId,
					isCompleted: this.results.criteria[i].isCompleted,
				});
			}
			this.patchBody.state = 'Accepted';
			api.patch('/Scoring/Submissions/' + this.submissionId, this.patchBody, {requiresAuth: true})
				.then(() => this.$router.push('/Submissions'));
		}
	}
}
</script>

<style scoped>
/*стили для карты*/
.card {
	width: 400px;
	border: none;
	background-color: #395A71;
	border-radius: 52px;
	padding: 30px;
	margin: 30px 0;
}

.card::after {
	content: "";
	clear: both;
	display: table;
}

a{
	text-decoration: none;
}

.card img {
	float: left;
	margin-right: 20px;
	border-radius: 50%;
}

@media (max-width: 500px) {
	.card {
		text-align: center;
	}

	.card img {
		margin: auto;
		float: none;
		display: block;
	}
}

p {
	font-family: 'Roboto', sans-serif;
	font-size: 12px;
	color: #EFF8FD;
	margin-bottom: 20px;
}

.name {
	font-size: 15px;
}
</style>