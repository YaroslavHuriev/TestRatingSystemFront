<template lang="html">
	<div>
		<h2>Results</h2>
		<table id="table" style="color: #EFF8FD">
			<thead>
			<tr>
				<th scope="col">Id</th>
				<th scope="col">Name</th>
				<th scope="col">Surname</th>
				<th scope="col">Fathers Name</th>
				<th scope="col">Phone Number</th>
				<th scope="col">Email</th>
				<th scope="col">GitHub Repository</th>
				<th scope="col">State</th>
				<th scope="col">Grade</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="item in results" :key="item.submissionId">
				<th scope="row">
					<router-link v-bind:to="'Submissions/'+item.submissionId">{{ item.submissionId }}</router-link>
				</th>
				<td>{{ item.name }}</td>
				<td>{{ item.surname }}</td>
				<td>{{ item.fathersName }}</td>
				<td>{{ item.phoneNumber }}</td>
				<td>{{ item.email }}</td>
				<td>
					<a v-bind:href="'https://'+item.gitHubURL">{{ item.gitHubURL }}</a>
				</td>
				<td>{{ item.state }}</td>
				<td v-if="item.state==='New'"></td>
				<td v-else>{{ item.grade }}</td>
			</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import api from "@/api";

export default {
	name: "gradeTable",
	data() {
		return {
			results: []
		};
	},
	mounted() {
		api.get('/Submissions', {requiresAuth: true}).then(response => {
			this.results = response.data
		})
	}
};
</script>

<style scoped>
</style>