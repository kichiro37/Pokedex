import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// import example from './module-example'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
   	state: {
   		vueInstalled: false, 
   		pokemons: []
   	},
   	mutations: {
   		updateVueInstalled(state, arg1) {
   			state.vueInstalled = arg1
   		},
   		updatePokemons(state, pokemons) {
   			state.pokemons = pokemons
   			console.log('updatePokemons 1', state.pokemons)
   		}
   	},
   	actions: {
   		toggleVue({state, commit, dispatch}, arg1 ) {
   			commit('updateVueInstalled', !state.vueInstalled)
   		},
   		GetPokemons({commit}) {
   			axios.get('/pokemon')
   			.then(resp => {
   				commit('updatePokemons', resp.data.results)
   			})
   			.catch(err => {
   			})
   		},
   		GetPokeInfo ({}, pokeUrl) {
   			return new Promise ((resolve, reject) => {
   				axios.get(pokeUrl)
   				.then(resp => {
   					resolve(resp.data)
   					console.log('GetPokeInfo 1T', resp.data)
   				})		
   				.catch(err => {
   					reject(err)
   					console.log('getPokeInfo 1F', err)
   				})
   			})
   		}
   	}
  })

  return Store
}
