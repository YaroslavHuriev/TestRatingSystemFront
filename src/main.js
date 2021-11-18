import Vue from 'vue/dist/vue.js'
import App from './App.vue'
import VueRouter from 'vue-router'
import gradeTable from "@/components/gradeTable";
import submissionForm from "@/components/submissionForm";
import submissionReview from "@/components/submissionReview";
import loginForm from "@/components/loginForm";
import './main.css'
import api from './api'

Vue.prototype.$http = api;
api.defaults.timeout = 10000;
Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
	{path: '/'},
	{path: '/Submissions', component: gradeTable, meta: {requiresAuth: true}},
	{path: '/Submissions/:id', component: submissionReview, meta: {requiresAuth: true}},
	{path: '/Submission/Add', component: submissionForm},
	{path: '/Login', component: loginForm}
]
const router = new VueRouter({
	routes
});
api.interceptors.request.use(
	config => {
		if (config.requiresAuth) {
			const token = localStorage.getItem("token");
			if (token) {
				config.headers = { Authorization: 'Bearer '+ token};
			}
			return config;
		} else return config;
	},
	error => {
		return Promise.reject(error);
	}
);
api.interceptors.response.use(
	response => {
		if (response.status === 200 || response.status === 201) {
			return Promise.resolve(response);
		} else {
			return Promise.reject(response);
		}
	},
	error => {
		if (error.response.status) {
			switch (error.response.status) {
				case 400:
					break;

				case 401:
					router.push('/Login');
					break;
				case 404:
					alert('page not exist');
					break;

			}
			return Promise.reject(error.response);
		}
	}
);
new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
