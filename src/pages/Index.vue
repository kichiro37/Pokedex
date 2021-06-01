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
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space />
          <q-btn dense flat icon="close" @click="isShowPokemon = false">
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <div v-if="pokeInfo">
          <q-card-section class="text-center">
            <!-- q-img class="gambar" v-if="pokeInfo.sprites" :src="pokeInfo.sprites.other['dream_world'].front_default" / -->
            <q-img class="gambar" v-if="pokeInfo.sprites" :src="pokeInfo.sprites.front_default" />
          </q-card-section>
          <q-card-section class="bg-positive">
            <div class="text-h3 text-center text-capitalize bg-positive">{{pokeInfo.name}}</div>
          </q-card-section>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
 
import {mapState, mapActions} from 'vuex'
export default {
  name: 'PageIndex',
  computed: {
  	...mapState({
  		pokemons: 'pokemons'
  	})
  },
  data() {
  	return {
  		isShowPokemon: false,
  		pokeInfo: {}
  	}
  },
  methods: {
  	...mapActions({
  		GetPokemons: 'GetPokemons',
  		GetPokeInfo: 'GetPokeInfo'
  	}),
    onGetPokemons(index, done) {
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
