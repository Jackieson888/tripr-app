<template>
  <v-card>
    <v-card-title>
      <slot name="modal-title"></slot>
    </v-card-title>
    <v-card-text>
      <slot name="modal-body"></slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  setup() {
    return {}
  }
}
</script>
