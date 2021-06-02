import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// import example from './module-example'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
   	state: {
   		vueInstalled: false, 
   		pokemons: [],
   		pokeNextUrl: '/pokemon'
   	},
   	mutations: {
   		updateVueInstalled(state, arg1) {
   			state.vueInstalled = arg1
   		},
   		FetchPokemons(state, pokemons) {
   			state.pokemons = [...state.pokemons, ...pokemons]
   			//state.pokemons = pokemons
   			//pokemons.forEach(pokemon => {
   				//state.pokemons.push(pokemon)
   			//})
   			//console.log('FetchPokemons 1', state.pokemons)
   		},
   		updateNextUrl(state, pokeNextUrl) {
   			state.pokeNextUrl = pokeNextUrl
   		}
   	},
   	actions: {
   		toggleVue({state, commit, dispatch}, arg1 ) {
   			commit('updateVueInstalled', !state.vueInstalled)
   		},
   		GetPokemons({state, commit}) {
   			//alert('GetPokemons')
   			axios.get(state.pokeNextUrl)
   			.then(resp => {
   				//console.log('GetPokemons' ,resp)
   				commit('updateNextUrl', resp.data.next)
   				commit('FetchPokemons', resp.data.results)
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
