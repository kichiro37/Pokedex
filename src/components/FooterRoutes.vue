<template>
  <q-item
    clickable
    tag="a"
    :to="link"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
    <q-icon :name="icon" />
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'footerbutton',
  props: {
    link: {
      type: String,
      default: '#'
    },
    icon: {
      type: String,
      default: ''
    }
  }
}
</script>
