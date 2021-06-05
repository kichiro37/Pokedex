<template>
  <div
  class="rounded-borders q-pa-md text-center"
  v-bind:class="`bg-`+pokeInfo.species.color.name"
  >
    <div v-if="pokeInfo">
    <q-card-section class="text-center">
      <div class="text-h4 text-bold text-white text-center">MENU</div>
    </q-card-section>
  </div>
</div>
  
</template>

<script>
export default {
  name: 'Menu',
  props: {
    pokeInfo: Object,
  },
  methods: {

  }
}
</script>
