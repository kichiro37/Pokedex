<template>
  <div v-if="pokeInfo">
    <q-card-section class="text-center">
      <div class="text-h4 text-bold text-center text-white">MENU</div>
      
    </q-card-section>
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
