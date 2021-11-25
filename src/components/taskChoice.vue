<template>
	<div>
		<div v-for="task in tasks" v-bind:key="task.id">
			<router-link v-bind:to="'/Submission/Add/'+task.id">{{task.title}}</router-link>
		</div>
	</div>
</template>

<script>
import api from "@/api";

export default {
	name: "taskChoice",
	data() {
		return {
			tasks: []
		}
	},
	mounted() {
		api.get('TaskChoosing/Tasks')
			.then(response => this.tasks = response.data)
			.catch(err => console.log(err));
	}
}
</script>

<style scoped>

</style>