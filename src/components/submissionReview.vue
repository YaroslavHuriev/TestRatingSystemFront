<template>
	<div id="app">
		<h2>Task evaluation</h2>
		<div class="card">
			<img height="80" width="80" alt="avatar" v-bind:src="logo">
			<div class="content-wrap">
				<p class="name">{{ results.name + ' ' + results.surname }}</p>
				<p class="email">{{ results.email }}</p>
				<p class="url">{{ results.gitHubURL }}</p>
			</div>
		</div>
		<div class="container">
			<div class="criteria_items">
				<h3>{{task.title}}</h3>
				<p>{{task.description}}</p>
				<div class="criteria_1">
					<h2>Code structure</h2>
					<p v-if="results.state==='Resolved'">{{ results.grade }} </p>
					<form v-on:submit.prevent="feedbackPatch">
						<input type="hidden" v-bind:value="results.id" name="submissionId">
						<div v-for="item in task.criteria" :key="item.id">
							<input type="hidden" name="criterionId" v-model="item.id">
							<input class="custom-checkbox" type="checkbox" v-model="item.isPassed">
							<label v-bind:for="'checkbox'+item.id">{{ item.title }}</label>
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
			results: [],
			submissionId: null,
			task: {},
			patchBody: [],
			logo:avatar
		}
	},
	mounted() {
		this.submissionId = this.$route.params.id
		api.get('/Scoring/Submissions/' + this.submissionId, {requiresAuth: true})
			.then(response => {
				this.results = response.data;
				this.task = response.data.task;
			})
	},
	methods: {
		feedbackPatch: function () {
			let criteria = [];
			for (let i = 0; i < this.results.feedback.criteria.length; i++) {
				criteria.push({
					id: this.results.feedback.criteria[i].id,
					isPassed: this.results.feedback.criteria[i].isPassed
				});
			}
			api.patch('/Scoring/Submissions/' + this.submissionId, criteria, {requiresAuth: true})
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

.name{
	font-size: 15px;
}


/*стили для чекбоксов*/

.custom-checkbox {
	position: absolute;
	z-index: -1;
	opacity: 0;
}

.custom-checkbox:not(:disabled):not(:checked)+label:hover::before {
	border-color: #395A71;
}

.custom-checkbox:not(:disabled):active+label::before {
	background-color: #395A71;
	border-color: #395A71;
}

.custom-checkbox:focus+label::before {
	box-shadow: 0 0 0 0.2rem #92A1AB;
}
.custom-checkbox:focus:not(:checked)+label::before {
	border-color: #395A71;
}

.custom-checkbox+label {
	display: inline-flex;
	align-items: center;
	user-select: none;
}

.custom-checkbox+label::before {
	content: '';
	display: inline-block;
	width: 1em;
	height: 1em;
	flex-shrink: 0;
	flex-grow: 0;
	border: 1px solid #395A71;
	border-radius: 0.25em;
	margin-right: 0.5em;
	background-repeat: no-repeat;
	background-position: center center;
	background-size: 50% 50%;
}

.custom-checkbox:checked+label::before {
	border-color: #395A71;
	background-color: #395A71;
	background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}

.custom-checkbox:disabled+label::before {
	background-color: #395A71;
}
</style>