<template>
  <div v-if="pokeInfo">
    <q-card-section class="text-center">
      <div class="text-h4 text-bold text-center text-white">MORE</div>
      
    </q-card-section>
  </div>
</template>

<script>
export default {
  name: 'More',
  props: {
    pokeInfo: Object,
  },
  methods: {

  }
}
</script>
