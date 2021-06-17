<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-red">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          PokéSun
        </q-toolbar-title>

        <div @click="Reverse">Bossun v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-red text-h3 text-weight-bold text-center"
        >
          PokéSun
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import {mapMutations, mapActions} from 'vuex'

const linksData = [
  {
    title: 'Github',
    caption: 'github.com/kichiro37/Pokedex',
    icon: 'code',
    link: 'https://github.com/kichiro37/Pokedex'
  },
  {
    title: 'Discord Channel',
    caption: 'Channel/EGG Breaker',
    icon: 'chat',
    link: 'https://discord.gg/JQkmRjqC'
  },
  
  {
    title: 'Facebook',
    caption: 'Aditya Andre Kurniawan',
    icon: 'public',
    link: 'https://www.facebook.com/Kichiro37/'
  },
  {
    title: 'Donation',
    caption: 'Saweria',
    icon: 'volunteer_activism',
    link: 'https://saweria.co/kichiro37'
  }
];

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
  methods: {
    ...mapMutations({
      toggleReverse: 'toggleReverse'
    }),
     ...mapActions({
      GetPokemons: 'GetPokemons'
    }),
    Reverse() {
      this.toggleReverse()
      this.GetPokemons()
    }
  }
}
</script>
