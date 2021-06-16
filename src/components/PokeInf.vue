<template>
	<div class="text-center">
		<span class="text-weight-bold"> Species </span>
		<div class="rounded-borders bg-white">
			<q-card-section class="q-my-md">
				<div class="garispokeinf rounded-borders q-pa-xs">
					<div
					v-if="pokeInfo.species.flavor_text_entries[81] != null"
					>
						{{pokeInfo.species.flavor_text_entries[81].flavor_text}}
					</div>
					<div
					v-else
					>
						{{pokeInfo.species.flavor_text_entries[71].flavor_text}}
					</div>
	    	</div>
				<div class="row text-center q-mt-lg q-gutter-sm">
					<div class="garispokeinf rounded-borders col">
						<div>
							{{pokeInfo.height/10}} m 
						<div>
						</div>
							<span class="text-weight-bold"> Height </span>
						</div>
					</div>
					<div class="garispokeinf rounded-borders col">
						<div>
							{{pokeInfo.weight/10}} kg
						<div>
						</div>
							<span class="text-weight-bold"> Weight </span>
						</div>
					</div>
				</div>
			</q-card-section>
	  </div>
		<span class="text-weight-bold"> Abilities </span>
		<div class="rounded-borders bg-white">
			<q-card-section class="q-my-md">
				<div class="bg-white rounded-borders q-gutter-sm">
	    			<div class="text-capitalize garispokeinf rounded-borders"
	    			v-for="(ability, pokeIndex) in pokeInfo.abilities"
	    			v-bind:key="pokeIndex"
	    			v-bind:ability="ability"
	    			> 
	    				{{ability.ability.name}}
	    			</div>
	    		</div>
			</q-card-section>
	  </div>
		<span class="text-weight-bold"> Base Stats </span>
		<div class="rounded-borders bg-white">
			<q-card-section class="q-my-md">
				<div class="bg-white rounded-borders q-py-md text-white">
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
			</q-card-section>
	  </div>
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
<style scoped>
.garispokeinf {
	border : 1px solid rgb(87, 87, 87)
}
</style>