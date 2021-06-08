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
   		pokeNextUrl: '/pokemon',
      pokeSearch: null,
      pokeReverse: false
   	},
    getters: {
      pokemonsFilter: (state) => {
        return state.pokemons.filter(pokemon => {
          let re = new RegExp(state.pokeSearch, 'i')
          return re.exec(pokemon.name) != null
        })
      }
    },
   	mutations: {
      updatePokeSearch(state, pokeSearch) {
        state.pokeSearch = pokeSearch
      },
      togglePokeReverse(state) {
        state.pokeNextUrl = '/pokemon'
        state.pokemons = []
        state.pokeReverse = !state.pokeReverse
      },
   		updateVueInstalled(state, arg1) {
   			state.vueInstalled = arg1
   		},
   		FetchPokemons(state, pokemons) {
        const REVERSER_EASY = str => {
          return str.split('').reverse().join('')
        }
        const REVERSER_MANUAL = str => {
          let str_reversed = '' 
          // for (let i = 0; i < str.length; i++) {
          //   str_reversed += str[str.length - i - 1]
          // }

          for (let i = str.length; i > 0; i--) {
            str_reversed += str[i-1]
          }

          return str_reversed
        }
        pokemons = pokemons.map(pokemon => {
          const NAME_REVERSE = REVERSER_MANUAL(pokemon.name)
          pokemon.name = state.pokeReverse ? NAME_REVERSE : pokemon.name
          return pokemon
        })
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
   			return axios.get(state.pokeNextUrl)
   			.then(resp => {
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
   		},
      GetPokeSpecies({}, speciesUrl) {
        return new Promise ((resolve, reject) => {
          console.log('getSpecies 0', speciesUrl)
          axios.get(speciesUrl)
          .then(resp => {
            resolve(resp.data)
            console.log('getSpecies 1T', resp.data)
          })
          .catch(err => {        
            reject(err)
            console.log('getSpecies 1F', err)
          })
        })
      },
   	}
  })

  return Store
}
