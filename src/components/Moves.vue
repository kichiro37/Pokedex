<template>
  <div>
    <div
    class="rounded-borders"
    v-bind:class="`bg-`+pokeInfo.species.color.name"
    >
      <div class="text-h4 text-bold text-white text-center">MOVES</div>
      <q-card-section class="text-center row q-ml-sm">
        <span class="col-5 text-capitalize q-ma-sm bg-white rounded-borders"
        v-for="(move, pokeIndex) in pokeInfo.moves"
        v-bind:key="pokeIndex"
        v-bind:move="move"
        > 
          {{move.move.name}}
        </span>
      </q-card-section>
      <div
      class="rounded-borders q-pa-md"
      v-bind:class="`bg-`+pokeInfo.species.color.name"
      >
        
      </div>
    </div>
  </div>
  
 </template>

<script>
export default {
  name: 'Moves',
  props: {
  	pokeInfo: Object,
  },
  methods: {

  }
}
</script>
