<template>
  <q-page>
	 <q-infinite-scroll @load="onGetPokemons" :offset="250">
   		<q-list bordered separator>
      	<q-item clickable v-ripple v-for="(pokemon, pokeIndex) in pokemons" v-bind:key="pokeIndex">
        	<q-item-section 
        	class="text-capitalize" @click="ShowPokemon(pokemon.url)">
        	{{pokemon.name}}
      	</q-item-section>
      </q-item>
    </q-list> 
    <template v-slot:loading>
      <div class="row justify-center q-my-md">
        <q-spinner-dots color="primary" size="40px" />
      </div>
    </template>
    </q-infinite-scroll>
    <q-dialog
      v-model="isShowPokemon"
      @hide="HidePokemon"
      persistent
      :maximized="true"
    >
      <q-card class="bg-primary">
        <q-bar>
          <q-space />
          <q-btn dense flat icon="close" @click="isShowPokemon = false">
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <div v-if="pokeInfo">
        	<q-card-section class="text-center">
          	<q-img class="gambar" v-if="pokeInfo.sprites" :src="pokeInfo.sprites.other['official-artwork'].front_default" />
        	</q-card-section>
        	<q-card-section class="bg-positive">
          	<div class="text-h3 text-center text-white text-capitalize bg-positive">{{pokeInfo.name}}</div>
        	</q-card-section>
        </div>
        <q-page-container>
         <div class="">
    				<div class="" style="max-width: 100%">
				      <q-card>
				        <q-tab-panels class="bg-primary" v-model="tab" animated>
				          <q-tab-panel name="information">
				            <PokeInf 
				            	v-bind:pokeInfo="pokeInfo"
				            />
				          </q-tab-panel>

				          <q-tab-panel name="move">
				            <Moves 
				            	v-bind:pokeInfo="pokeInfo"
				            />
				          </q-tab-panel>

				          <q-tab-panel name="more">
				            <More 
				            	v-bind:pokeInfo="pokeInfo"
				            />
				          </q-tab-panel>
				           <q-tab-panel name="menu">
				            <Menu 
				            	v-bind:pokeInfo="pokeInfo"
				            />
				          </q-tab-panel>
				        </q-tab-panels>
				        <q-separator />
				      <q-footer class="bg-blue text-white">
				        <q-tabs
				          v-model="tab"
				          dense
				          class="white"
				          active-color="black"
				          indicator-color="black"
				          align="justify"
				        >
				          <q-tab name="information" icon="info" />
				          <q-tab name="move" icon="edit" />
				          <q-tab name="more" icon="add" />
				          <q-tab name="menu" icon="more_horiz" />
				        </q-tabs>
				      </q-footer>
				      </q-card>
				    </div>
				  </div>
        </q-page-container>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>

import PokeInf from 'components/PokeInf.vue'
import Moves from 'components/Moves.vue'
import More from 'components/More.vue'
import Menu from 'components/Menu.vue'
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
  name: 'PageIndex',
  components: {
  	PokeInf,
  	Moves,
  	More,
  	Menu
  },
  computed: {
  	...mapState({
  		pokemons: 'pokemons'
  	})
  },
  data() {
  	return {
  		isShowPokemon: false,
  		pokeInfo: {},
  		tab: 'information'
  	}
  },
  methods: {
  	...mapMutations({
  		
  	}),
  	...mapActions({
  		GetPokemons: 'GetPokemons',
  		GetPokeInfo: 'GetPokeInfo'
  	}),
  	onGetPokemons (index, done) {
  		this.GetPokemons()
  		done()
  	},
  	HidePokemon () {
  		this.pokeInfo = {}
  	},
  	async ShowPokemon (pokeUrl) {
  		this.isShowPokemon = true
  		this.pokeInfo = await this.GetPokeInfo(pokeUrl)
  		console.log('PokeURL', pokeUrl)
  	}
  }
}
</script>
<style>
.gambar {
	width : 350px
}
</style>