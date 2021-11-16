<template>
	<div id="app">
		<h1>Task evaluation:table of hours worked</h1>
		<p>{{ results.name + ' ' + results.surname }}</p>
		<p>{{ results.email }}</p>
		<p>{{ results.gitHubURL }}</p>
		<div class="container">
			<div class="criteria_items">
				<div class="criteria_1">
					<h2>Code structure</h2>
					<form action="/">
						<input type="hidden" v-bind:value="results.id" name="submissionId">
						<div v-for="item in results.feedback.criteria" :key="item.id">
							<input type="hidden" v-bind:value="item.id" name="criterionId">
							<input v-bind:id="'checkbox'+item.id" type="checkbox" v-bind:checked="item.isPassed">
							<label v-bind:for="'checkbox'+item.id">{{item.title}}</label>
						</div>
					</form>
				</div>
			</div>
			<button>Save</button>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "submissionReview",
	data() {
		return {
			results: [],
			submissionId: null,
			criteria: [],
			patchBody: []
		}
	},
	mounted() {
		this.submissionId = this.$route.params.id
		axios.get('https://localhost:44334/Submissions/' + this.submissionId)
			.then(response => {
				this.results = response.data;
				this.criteria = response.data.criteria;
			})
	},
	methods: {
		feedbackPatch: function () {

		}
	}
}
</script>

<style scoped>

</style>