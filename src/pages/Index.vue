<template>
  	<q-page>
		<q-input v-if="search = true" v-model="pokeSearch" label="Search Pokemon" @input="updatePokeSearch(pokeSearch)"/>
		<q-list v-if="pokeSearch" bordered separator>
			<q-item clickable v-ripple v-for="(pokemon, pokeIndex) in pokeFilter" v-bind:key="pokeIndex">
				<q-item-section 
				class="text-capitalize" @click="ShowPokemon(pokemon.url)">
				{{pokemon.name}}
				</q-item-section>
			</q-item>
		</q-list>
		<q-infinite-scroll v-else @load="onGetPokemons" :offset="250">
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
      narrow-indicator
      persistent
      :maximized="true"
      v-if="!isLoading"
    >
      <q-card
     	v-if="pokeInfo.species"
      v-bind:class="`bg-`+pokeInfo.species.color.name"
      >
        <q-bar>
          <q-space />
          <q-btn dense flat icon="close" @click="isShowPokemon = false">
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <div v-if="pokeInfo">
			<div class="rounded-borders q-ma-md row"
			v-bind:class="`bg-`+pokeInfo.species.color.name+`-3`"> 
				<q-card-section class="col-6">
					<div class="text-capitalize">
						<span class="col text-h5 text-weight-bold text-left"> {{pokeInfo.name}} </span>
						<span class="col text-center"> #{{pokeInfo.id}} </span>
					</div>
				</q-card-section>
				<q-card-section class="col-6 text-center">
					<q-img class="gambar" v-if="pokeInfo.sprites" :src="pokeInfo.sprites.other['official-artwork'].front_default" />
				</q-card-section>
				<q-card-section class="col">
					<div class="text-capitalize text-left">
						<span
						class="garis rounded-borders q-pa-sm q-mr-sm text-center"
						v-for="(type, pokeIndex) in pokeInfo.types"
						v-bind:key="pokeIndex"
						v-bind:type="type"
						>
							{{type.type.name}}
						</span>
					</div>
				</q-card-section>
			</div>
        </div>
        <div flat>
          	<div>
				<q-tab-panels 
				v-model="tab" animated
				v-bind:class="`bg-`+pokeInfo.species.color.name"
				>
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
				<q-footer class="bg-grey text-white">
					<q-tabs
						v-model="tab"
						dense
						class="white"
						active-color="black"
						indicator-color="black"
						align="justify"
					>
						<q-tab name="information" label="Info" icon="info"  />
						<q-tab name="move" label="Moves" icon="edit" />
						<q-tab name="more" label="More" icon="add" />
						<q-tab name="menu" label="Menu" icon="more_horiz" />
					</q-tabs>
				</q-footer>
			</div>
        </div>
      </q-card>
    </q-dialog>
	<q-page-sticky position="bottom-right" :offset="[18, 18]">
		 <div class="q-mt-md">
      <q-fab
        v-model="fab2"
        external-label
				label-position="left"
        vertical-actions-align="left"
        color="red"
        icon="keyboard_arrow_up"
        direction="up"
      >
	  	<q-fab-action label-position="left" external-label color="red" icon="search" label="Search" />
        <q-fab-action label-position="left" external-label color="red" @click="sortPokeDesc" icon="sort_by_alpha" label="Sort Descending" />
        <q-fab-action label-position="left" external-label color="red" @click="sortPokeAsc" icon="sort_by_alpha" label="Sort Ascending" />
      </q-fab>
    </div>
	</q-page-sticky>
  </q-page>
</template>

<script>

import PokeInf from 'components/PokeInf.vue'
import Moves from 'components/Moves.vue'
import More from 'components/More.vue'
import Menu from 'components/Menu.vue'
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
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
  		pokemons: 'pokemons',
  	}),
  	...mapGetters({
  		pokeFilter: 'pokeFilter'
  	})
  },
  data() {
  	return {
  		isShowPokemon: false,
  		pokeInfo: {},
  		pokeSpecies: {},
  		tab: 'information',
  		isLoading: true,
  		pokeSearch: null,
		fab2: false
  	}
  },
  methods: {
  	...mapMutations({
  		updatePokeSearch: 'updatePokeSearch',
		sortPokemonAsc: 'sortPokemonAsc',
		sortPokemonDesc: 'sortPokemonDesc',
		sortPokemonID: 'sortPokemonID'
  	}),
  	...mapActions({
  		GetPokemons: 'GetPokemons',
  		GetPokeInfo: 'GetPokeInfo',
  		GetPokeSpecies: 'GetPokeSpecies'
  	}),
  	async onGetPokemons (index, done) {
  		await this.GetPokemons()
  		done()
  	},
  	HidePokemon () {
  		this.pokeInfo = {}
  	},
	sortPokeAsc () {
		this.sortPokemonAsc()
	},
	sortPokeDesc () {
		this.sortPokemonDesc()
	},
	sortPokeID () {
		this.sortPokemonID()
	},
  	async ShowPokemon (pokeUrl) {
  		this.isShowPokemon = true
  		this.isLoading = true
  		this.pokeInfo = await this.GetPokeInfo(pokeUrl)
  		const speciesUrl = this.pokeInfo.species.url
  		this.pokeSpecies = await this.GetPokeSpecies(speciesUrl)
  		this.pokeInfo.species = {...this.pokeInfo.species, ...this.pokeSpecies}
  		console.log('PokeURL', pokeUrl)
  		this.isLoading = false
  	},
  }
}
</script>
<style scoped>
.gambar {
	width : 150px
}
.garis {
	border : 1px solid black
}
.q-page-container {
	padding-top: 0px
}
</style>