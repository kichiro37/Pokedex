<template>
  <div v-if="pokeInfo">
    <div class="text-h4 text-bold text-center text-white">MOVES</div>
    <q-card-section class="text-center">
      <div class="text-capitalize q-ma-sm bg-white rounded-borders"
      v-for="(move, pokeIndex) in pokeInfo.moves"
      v-bind:key="pokeIndex"
      v-bind:move="move"
      > 
        {{move.move.name}}
      </div>
    </q-card-section>
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
