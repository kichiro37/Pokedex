<template>
  <q-page v-if="dark == true" class="darkmode">
		<q-input
			filled 
			dark
			text-white
			label-color="white"
			v-if="search == true"
			autofocus 
			class="text-white" 
			v-model="pokeSearch" 
			label="Search Pokemon" 
			@input="updatePokeSearch(pokeSearch)"/>
		<q-list v-if="pokeSearch" bordered separator>
			<q-item clickable v-ripple v-for="(pokemon, pokeIndex) in pokeFilter" v-bind:key="pokeIndex">
				<q-item-section 
				class="text-capitalize text-white" @click="ShowPokemon(pokemon)">
				{{pokemon.name}}
				</q-item-section>
			</q-item>
		</q-list>
		<q-infinite-scroll v-else @load="onGetPokemons" :offset="250" class="q-gutter-md q-pa-md">
			<div bordered separator clickable v-ripple 
				v-for="(pokemon, pokeIndex) in pokemons" 
				v-bind:key="pokeIndex" 
				class="garis text-capitalize text-black bg-red rounded-borders flex row" 
				@click="ShowPokemon(pokemon)"
				>
				<q-card-section class="col-6 flex">
					<div>
						<span class="col text-left"> #{{pokemon.id}} </span>
						<span class="col text-center text-weight-bold"> {{pokemon.name}} </span>
					</div>
					<div class="self-end">
						<div class="text-capitalize q-gutter-sm">
							<span
							class="garis rounded-borders q-pa-sm text-center"
							v-for="(type, pokeIndex) in pokemon.types"
							v-bind:key="pokeIndex"
							v-bind:type="type"
							>
								{{type.type.name}}
							</span>
						</div>
					</div>
				</q-card-section>
				<q-card-section class="col-2">
				</q-card-section>
				<q-card-section class="radius-pokemon col-4 text-right bg-blue">
					<q-img class="gambar2" v-if="pokemon.sprites" :src="pokemon.sprites.other['official-artwork'].front_default" />
				</q-card-section>
			</div>
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
      v-if="!isLoading">
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
						<q-card-section class="col-6 flex">
							<div class="text-capitalize">
								<span class="col text-h5 text-weight-bold text-left"> {{pokeInfo.name}} </span>
								<span class="col text-center"> #{{pokeInfo.id}} </span>
							</div>
							<div class="self-end">
								<div class="text-capitalize text-center q-gutter-sm">
									<span
									class="garis rounded-borders q-pa-sm text-center"
									v-for="(type, pokeIndex) in pokeInfo.types"
									v-bind:key="pokeIndex"
									v-bind:type="type"
									>
										{{type.type.name}}
									</span>
								</div>
							</div>
						</q-card-section>
						<q-card-section class="radius-pokemon col-6 text-center"
						v-bind:class="`bg-`+pokeInfo.species.color.name+`-9`">
							<q-img class="gambar" v-if="pokeInfo.sprites" :src="pokeInfo.sprites.other['official-artwork'].front_default" />
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
						<q-footer class="opacity bg-grey-9 text-white rounded-borders">
							<q-tabs
								v-model="tab"
								dense
								class="white"
								active-color="pink-5"
								indicator-color="pink-5"
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
					direction="up">
					<q-fab-action label-position="left" external-label color="red" @click="SearchPoke" icon="search" label="Search" />
					<q-fab-action label-position="left" external-label color="red" @click="open('bottom')" icon="sort_by_alpha" label="Sort by" />
					<q-fab-action label-position="left" external-label color="red" @click="DarkMode" icon="dark_mode" label="Dark Mode" />
				</q-fab>
	    </div>
	    <q-dialog v-model="sort" :position="position">
	      <q-card class="radius-sort" dark>
	        <q-card-section class="text-center">
	          Sort by...
	          <div class="row q-gutter-sm q-mt-md">
		          <q-fab-action class="col-5" color="red" @click="sortPokeIdAsc" label="ID Ascending" />
		          <q-fab-action class="col-6" color="red" @click="sortPokeIdDesc" label="ID Descending" />
		          <q-fab-action class="col-5" color="red" @click="sortPokeAsc" label="Name Ascending" />
		          <q-fab-action class="col-6" color="red" @click="sortPokeDesc" label="Name Descending" />       
		        </div>
	        </q-card-section>
	      </q-card>
	    </q-dialog>
		</q-page-sticky>
  </q-page>
	<q-page v-else>
		<q-input
			filled
			v-if="search == true"
			v-model="pokeSearch" 
			label="Search Pokemon"
			autofocus  
			@input="updatePokeSearch(pokeSearch)"/>
		<q-list v-if="pokeSearch" bordered separator>
			<q-item clickable v-ripple v-for="(pokemon, pokeIndex) in pokeFilter" v-bind:key="pokeIndex">
				<q-item-section 
				class="text-capitalize" @click="ShowPokemon(pokemon)">
				{{pokemon.name}}
				</q-item-section>
			</q-item>
		</q-list>
		<q-infinite-scroll v-else @load="onGetPokemons" :offset="250" class="q-gutter-md q-pa-md">
			<div bordered separator clickable v-ripple 
				v-for="(pokemon, pokeIndex) in pokemons" 
				v-bind:key="pokeIndex" 
				class="garis text-capitalize text-black bg-red rounded-borders flex row" 
				@click="ShowPokemon(pokemon)"
				>
				<q-card-section class="col-6 flex">
					<div>
						<span class="col text-left"> #{{pokemon.id}} </span>
						<span class="col text-center text-weight-bold"> {{pokemon.name}} </span>
					</div>
					<div class="self-end">
						<div class="text-capitalize q-gutter-sm">
							<span
							class="garis rounded-borders q-pa-sm text-center"
							v-for="(type, pokeIndex) in pokemon.types"
							v-bind:key="pokeIndex"
							v-bind:type="type"
							>
								{{type.type.name}}
							</span>
						</div>
					</div>
				</q-card-section>
				<q-card-section class="col-2">
				</q-card-section>
				<q-card-section class="radius-pokemon col-4 text-right bg-blue">
					<q-img class="gambar2" v-if="pokemon.sprites" :src="pokemon.sprites.other['official-artwork'].front_default" />
				</q-card-section>
			</div>
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
      v-if="!isLoading">
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
						<q-card-section class="col-6 flex">
							<div class="text-capitalize">
								<span class="col text-h5 text-weight-bold text-left"> {{pokeInfo.name}} </span>
								<span class="col text-center"> #{{pokeInfo.id}} </span>
							</div>
							<div class="self-end">
								<div class="text-capitalize text-center q-gutter-sm">
									<span
									class="garis rounded-borders q-pa-sm text-center"
									v-for="(type, pokeIndex) in pokeInfo.types"
									v-bind:key="pokeIndex"
									v-bind:type="type"
									>
										{{type.type.name}}
									</span>
								</div>
							</div>
						</q-card-section>
						<q-card-section class="radius-pokemon col-6 text-center"
						v-bind:class="`bg-`+pokeInfo.species.color.name+`-9`">
							<q-img class="gambar" v-if="pokeInfo.sprites" :src="pokeInfo.sprites.other['official-artwork'].front_default" />
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
				<q-footer class="opacity bg-grey-9 text-white">
					<q-tabs
						autofocus
						v-model="tab"
						dense
						class="white"
						active-color="pink-5"
						indicator-color="pink-5"
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
					direction="up">
					<q-fab-action label-position="left" external-label color="red" @click="SearchPoke" icon="search" label="Search" />
					<q-fab-action label-position="left" external-label color="red" @click="open('bottom')" icon="sort_by_alpha" label="Sort by" />
					<q-fab-action label-position="left" external-label color="red" @click="DarkMode" icon="dark_mode" label="Dark Mode" />
				</q-fab>
	    </div>
	    <q-dialog v-model="sort" :position="position">
	      <q-card class="radius-sort">
	        <q-card-section class="text-center">
	          Sort by...
	          <div class="row q-gutter-sm q-mt-md">
		          <q-fab-action class="col-5" color="red" @click="sortPokeIdAsc" label="ID Ascending" />
		          <q-fab-action class="col-6" color="red" @click="sortPokeIdDesc" label="ID Descending" />
		          <q-fab-action class="col-5" color="red" @click="sortPokeAsc" label="Name Ascending" />
		          <q-fab-action class="col-6" color="red" @click="sortPokeDesc" label="Name Descending" />       
		        </div>
	        </q-card-section>
	      </q-card>
	    </q-dialog>
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
			fab2: false,
			search: false,
			dark: false,
			sort: false,
			position: 'top'
  	}
  },
  methods: {
  	...mapMutations({
  		updatePokeSearch: 'updatePokeSearch',
			sortPokemonAsc: 'sortPokemonAsc',
			sortPokemonDesc: 'sortPokemonDesc',
			sortPokemonIdAsc: 'sortPokemonIdAsc',
			sortPokemonIdDesc: 'sortPokemonIdDesc',
			FetchPokemons: 'FetchPokemons'
  	}),
  	...mapActions({
  		GetPokemons: 'GetPokemons',
  		GetPokeInfo: 'GetPokeInfo',
  		GetPokeSpecies: 'GetPokeSpecies'
  	}),
  	async onGetPokemons (index, done) {
  		const pokemons = await this.GetPokemons()
  		const NEW_POKEMONS = await Promise.all(pokemons.map(pokemon => {
  			return this.GetPokeInfo(pokemon.url)
  		}))
  		this.FetchPokemons(NEW_POKEMONS)
  		console.log('onGetPokemons await', pokemons)
  		console.log('onGetPokemons state', this.pokemons)
  		done()
  	},
  	open (position) {
  		this.position = position
  		this.sort = true
  	},
	  HidePokemon () {
			this.pokeInfo = {}
		},
		sortPokeIdAsc () {
			this.sortPokemonIdAsc()
		},
		sortPokeIdDesc () {
			this.sortPokemonIdDesc()
		},
		sortPokeAsc () {
			this.sortPokemonAsc()
		},
		sortPokeDesc () {
			this.sortPokemonDesc()
		},
		SearchPoke () {
			this.search = !this.search
		},
		DarkMode () {
			this.dark = !this.dark
		},
  	async ShowPokemon (pokemon) {
  		this.isShowPokemon = true
  		this.isLoading = true
  		//this.pokeInfo = await this.GetPokeInfo(pokeUrl)
  		this.pokeInfo = pokemon
  		const speciesUrl = this.pokeInfo.species.url
  		this.pokeSpecies = await this.GetPokeSpecies(speciesUrl)
  		this.pokeInfo.species = {...this.pokeInfo.species, ...this.pokeSpecies}
  		this.isLoading = false
  	},
  }
}
</script>
<style scoped>
.gambar {
	width : 150px
}
.gambar2 {
	width : 80px
}
.garis {
	border : 1px solid #23282c
}
.garisdark {
	border : 1px solid #23282c
}
.q-page-container {
	padding-top: 0px
}
.darkmode {
	background: #1D1D1D
}
.fontdark {
	color: #1D1D1D
} 
.opacity {
	opacity: 0.98
}
.radius-pokemon {
	border-radius: 100px 0px 0px 100px
}
.radius-sort {
	border-radius: 30px 30px 0px 0px
}
</style>