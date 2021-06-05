<template>
  <div>
    <div
    class="rounded-borders q-pa-md text-center"
    v-bind:class="`bg-`+pokeInfo.species.color.name"
    >
      <div class="text-h4 text-bold text-white">MORE</div>
      <q-card-section class="">
            <q-card-section class="text-center">
              <div 
              class="text-capitalize q-ma-sm q-pa-md rounded-borders bg-white"
              >
              {{pokeInfo.species.genera['0'].genus}}
              </div>
            </q-card-section>
        </q-card-section>
    </div>
    <div
    class="rounded-borders q-pa-md q-my-md text-center"
    v-bind:class="`bg-`+pokeInfo.species.color.name"
    > 
      <div class="">
        <div class="text-h4 text-white text-bold">
          TEXT
        </div>
         <q-card-section class="text-center">
            <div class=" q-ma-sm q-pa-md bg-white rounded-borders"
            v-for="(text, pokeIndex) in pokeInfo.species.flavor_text_entries"
            v-bind:key="pokeIndex"
            v-bind:text="text"
            > 
              {{text.flavor_text}}
            </div>
          </q-card-section>
      </div>
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
