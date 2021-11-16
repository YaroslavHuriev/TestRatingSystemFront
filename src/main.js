import Vue from 'vue/dist/vue.js'
import App from './App.vue'
import VueRouter from 'vue-router'
import gradeTable from "@/components/gradeTable";
import submissionForm from "@/components/submissionForm";
import submissionReview from "@/components/submissionReview";

Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
	{path: '/Submissions', component: gradeTable},
	{path: '/Submissions/:id', component: submissionReview},
	{path: '/Submission/Add', component: submissionForm}
]
const router = new VueRouter({
	routes
})
new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
