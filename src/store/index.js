import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import _ from 'lodash'

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
      pokeFilter: state => {
        console.log('pokeFilter 0')
        return state.pokemons.filter(pokemon => {
          let re = new RegExp(state.pokeSearch, 'i')
          return re.exec(pokemon.name)
        })
      }
    },
   	mutations: {
      sortPokemonIdAsc(state) {
        state.pokemons = _.sortBy(state.pokemons, ['id'])
        console.log(state.pokemons);
      },
       sortPokemonIdDesc(state) {
        state.pokemons = _.sortBy(state.pokemons, ['id']).reverse();
        console.log(state.pokemons);
      },
      sortPokemonAsc(state) {
        state.pokemons = _.sortBy(state.pokemons, ['name'])
        console.log(state.pokemons);
      },
      sortPokemonDesc(state) {
        state.pokemons = _.sortBy(state.pokemons, ['name']).reverse();
        console.log(state.pokemons);
      },
      toggleReverse(state) {
        state.pokeReverse = !state.pokeReverse
        let pokemons = []
        const pokemonReverse = (pokemon) => {
        return pokemon.name.split('').reverse().join('')
        }
          pokemons = state.pokemons.map(pokemon => {
            pokemon.name = pokemonReverse(pokemon)
            return pokemon
          })
        state.pokemons = pokemons
      },
      updatePokeSearch(state, pokeSearch) {
        state.pokeSearch = pokeSearch
      },
   		updateVueInstalled(state, arg1) {
   			state.vueInstalled = arg1
   		},
   		FetchPokemons(state, pokemons) {
   			state.pokemons = [...state.pokemons, ...pokemons]
   		},
   		updateNextUrl(state, pokeNextUrl) {
   			state.pokeNextUrl = pokeNextUrl
   		},
   	},
   	actions: {
   		toggleVue({state, commit, dispatch}, arg1 ) {
   			commit('updateVueInstalled', !state.vueInstalled)
   		},
   		GetPokemons({state, commit, dispatch}) {
   			//alert('GetPokemons')
        return new Promise ((resolve, reject) => {
          axios.get(state.pokeNextUrl)
            .then(resp => {
              commit('updateNextUrl', resp.data.next)
              //commit('FetchPokemons', resp.data.results)
              console.log('GetPokemons' ,resp.data.results)
              resolve(resp.data.results)
          })
          .catch(err => {
            reject()
          })
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
