import Vue from 'vue'
import Vuex from 'vuex'
import { pushTo } from './utils'

Vue.use(Vuex)

const ADD_PERSON = 'ADD_PERSON'
const ADD_EXPENSE = 'ADD_EXPENSE'
const SET_PARTICIPATIONS = 'SET_PARTICIPATIONS'

export default new Vuex.Store({
	state: {
		people: [],
		expenses: []
	},
	mutations: {
		[ADD_PERSON]: pushTo('people'),
		[ADD_EXPENSE]: pushTo('expenses'),
		[SET_PARTICIPATIONS]: (state, { id, participations }) => {
			let i = state.people.findIndex(p => p.id == id)
			state.people[i].participations = participations
		}
	},
	actions: {},
	modules: {}
})
