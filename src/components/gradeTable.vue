<template lang="html">
	<div>
		<router-link to="/Tasks">Create new task</router-link>
		<h2>Results</h2>
		<table id="table">
			<thead>
			<tr>
				<th scope="col">Full Name</th>
				<th scope="col">Phone Number</th>
				<th scope="col">Email</th>
				<th scope="col">GitHub Repository</th>
				<th scope="col">State</th>
				<th scope="col">Grade</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="item in results" :key="item.submissionId">
				<td>
					<router-link class="routerLink" v-bind:to="'/Submissions/'+item.submissionId">
						{{ item.name + ' ' + item.fathersName + ' ' + item.surname }}
					</router-link>
				</td>
				<td>{{ item.phoneNumber }}</td>
				<td>{{ item.email }}</td>
				<td>
					<a class="routerLink" v-bind:href="'https://'+item.gitHubURL">{{ item.gitHubURL }}</a>
				</td>
				<td>{{ item.state }}</td>
				<td v-if="item.state==='Accepted'">{{ item.grade }}</td>
				<td v-else></td>
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
		api.get('SubmissionTable/Submissions', {requiresAuth: true}).then(response => {
			this.results = response.data
		})
	}
};
</script>

<style scoped>
table {
	font-family: "Roboto", sans-serif;
	font-size: 12px;
	color: #EFF8FD;
	border-spacing: 0;
	border-color: #EFF8FD;
	text-align: center;
	text-decoration: none;
}

th {
	padding: 20px 30px;
}

th, td {
	border-style: solid;
	border-width: 1px 1px 1px 1px;
	border-color: #EFF8FD;
	color:#EFF8FD;
}
.routerLink{
	text-decoration: none;
}

td {
	padding: 20px 30px;
}

#table{
	background: #395A71;
	text-decoration: none;
}
</style>