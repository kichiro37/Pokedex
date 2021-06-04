<template>
  <div class="text-center">
    <div v-if="pokeInfo.species">
      <q-card-section class="text-center">
        <div class="text-h4 text-bold text-center text-white">MORE</div>
          <q-card-section class="text-center">
          <div class="text-capitalize q-ma-sm q-pa-md rounded-borders bg-white"> 
          {{pokeInfo.species.genera['0'].genus}}
          </div>
      </q-card-section>
      </q-card-section>
    </div>
    <div class="q-my-md">
        <div class="text-h4 q-my-sm text-white">
          TEXT
        </div>
         <q-card-section class="text-center">
            <div class=" q-ma-sm q-pa-md rounded-borders bg-white"
            v-for="(text, pokeIndex) in pokeInfo.species.flavor_text_entries"
            v-bind:key="pokeIndex"
            v-bind:text="text"
            > 
              {{text.flavor_text}}
            </div>
          </q-card-section>
      </div>
  </div>
    
</template>

<script>
export default {
  name: 'More',
  props: {
    pokeInfo: Object
  },
  methods: {

  }
}
</script>
