<template>
	<form>
		<label v-bind:for="text">Enter the task title:</label>
		<input v-model="postBody.title" type="text" name="title"><br>
		<label v-bind:for="text">Enter the task description:</label>
		<input v-model="postBody.description" type="text" name="description"><br>
		<criteria-form :criteria="criteria"></criteria-form>
		<div>
			<criterion-item v-for="(criterion,index) in criteria"
							:criterion="criterion"
							:index="index"
							:key="index"
							v-on:criteriondelete="remove"
			>
			</criterion-item>
		</div>

		<button type="button" v-on:click="postTask">Save</button>
	</form>
</template>

<script>
import api from "@/api";

export default {
	name: "taskCreation",
	data() {
		return {
			criteria: [],
			criterion: {},
			postBody: {title: '', description: '', criteria: []}
		}
	},
	components: {
		'criteriaForm': {
			props: ['criteria'],
			data() {
				return {
					criterion: {
						title: '',
						isVisibleForUser: false,
						group: ''
					}
				}
			},
			template: '<div class="newCriterion">\n' +
				'<label v-bind:for="text">Enter the criterion title:</label>' +
				'\t\t<input v-model="criterion.title" type="text" class="criterionTitle"><br>\n' +
				'<label v-bind:for="checkbox">Is the criterion visible for user:</label>' +
				'\t\t<input v-model="criterion.isVisibleForUser" type="checkbox" class="isVisibleForUser"><br>\n' +
				'<label v-bind:for="text">Enter the criterion group:</label>' +
				'\t\t<input v-model="criterion.group" type="text" class="criterionGroup">\n' +
				'\t\t<button v-on:click="criterionAdd" type="button">Add</button>\n' +
				'\t</div>',
			methods: {
				criterionAdd: function (event) {
					this.criteria.push({
						title: this.criterion.title,
						isVisibleForUser: this.criterion.isVisibleForUser,
						group: this.criterion.group
					});
				}
			}
		},
		'criterionItem': {
			props: ["criterion", "index"],
			template: '<div>' +
				'<p>Title:{{criterion.title}}<br> Is Visible for User:{{criterion.isVisibleForUser}}<br> Group:{{criterion.group}}</p>' +
				'<button v-on:click="criterionDelete(index)" type="button">Delete</button>' +
				'</div>',
			methods: {
				criterionDelete: function (index) {
					this.$emit('criteriondelete', index);
				}
			}
		}
	},
	methods: {
		remove: function (index) {
			this.criteria.splice(index, 1);
		},
		postTask: function () {
			this.postBody.criteria = this.criteria;
			api.post('/Scoring/Tasks', this.postBody,{requiresAuth:true})
				.then(
					(response) => console.log(response)
				).catch(err=>console.log(err));
		}
	}
}
</script>

<style scoped>

</style>