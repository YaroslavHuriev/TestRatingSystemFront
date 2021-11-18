import axios from 'axios'

export default axios.create({
	baseURL: 'https://localhost:44334',
	headers: {
		'Accept': 'application / json',
		'Content-Type': 'application / json'
	}
})