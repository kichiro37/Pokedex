<template>
  <div v-if="pokeInfo">
  	<div class="text-h4 text-bold text-center text-white">INFORMATION</div>
    <q-card-section class="text-center">
    	<div class="q-my-md">
    		<div class="text-h6 q-my-sm">
    			Type
    		</div>
    		<div class="bg-white">
    			<div class="text-capitalize" 
    			v-for="(type, pokeIndex) in pokeInfo.types"
    			v-bind:key="pokeIndex"
    			v-bind:type="type"
    			>
    				{{type.type.name}}
    			</div>
    		</div>
    	</div>
    	<div class="q-my-md">
    		<div class="text-h6 q-my-sm">
    			Abilities
    		</div>
    		<div class="bg-white">
    			<div class="text-capitalize"
    			v-for="(ability, pokeIndex) in pokeInfo.abilities"
    			v-bind:key="pokeIndex"
    			v-bind:ability="ability"
    			> 
    				{{ability.ability.name}}
    			</div>
    		</div>
    	</div>
    	<div class="q-my-md">
    		<div class="text-h6 q-my-sm">
    			Base Stats
    		</div>
    		<div class="bg-white q-py-md text-white">
    			<div class="text-capitalize row q-ma-sm" style="max-width: 100%" v-if="pokeInfo.stats">
	    			<span class="bg-red col">HP</span>
	    			<span class="bg-positive col">{{pokeInfo.stats['0'].base_stat}}</span>
    			</div>
      		<div class="text-capitalize row q-ma-sm" v-if="pokeInfo.stats">
	    			<span class="bg-red col">Attack</span>
	    			<span class="bg-positive col">{{pokeInfo.stats['1'].base_stat}}</span>
    			</div>
    			<div class="text-capitalize row q-ma-sm" v-if="pokeInfo.stats">
	    			<span class="bg-red col">Defence</span>
	    			<span class="bg-positive col">{{pokeInfo.stats['2'].base_stat}}</span>
    			</div>
    			<div class="text-capitalize row q-ma-sm" v-if="pokeInfo.stats">
	    			<span class="bg-red col">Sp. Attack</span>
	    			<span class="bg-positive col">{{pokeInfo.stats['3'].base_stat}}</span>
    			</div>
    			<div class="text-capitalize row q-ma-sm" v-if="pokeInfo.stats">
	    			<span class="bg-red col">Sp. Defence</span>
	    			<span class="bg-positive col">{{pokeInfo.stats['4'].base_stat}}</span>
    			</div>
    			<div class="text-capitalize row q-ma-sm" v-if="pokeInfo.stats">
	    			<span class="bg-red col">Speed</span>
	    			<span class="bg-positive col">{{pokeInfo.stats['5'].base_stat}}</span>
    			</div>
    		</div>
    	</div>
    </q-card-section>
  </div>
</template>

<script>
export default {
  name: 'pokeInf',
  props: {
  	pokeInfo: Object,
  },
  data () {
  	return {

  	}
  },
  methods: {

  }
}
</script>
