<template>
  <div class="footer-action-bar">
    <v-btn class="footer-action-bar__pill" :to="leftTo" variant="outlined">
      {{ leftLabel }}
    </v-btn>

    <v-btn
      class="footer-action-bar__icon"
      icon
      variant="tonal"
      :aria-label="rightLabel"
      @click="$emit('right-click')"
    >
      <v-icon :icon="rightIcon" />
    </v-btn>
  </div>
</template>

<script>
export default {
  emits: ['right-click'],
  props: {
    leftLabel: {
      type: String,
      required: true
    },
    leftTo: {
      type: [String, Object],
      default: null
    },
    rightIcon: {
      type: String,
      default: 'mdi-arrow-right'
    },
    rightLabel: {
      type: String,
      default: 'Action'
    }
  }
}
</script>

<style lang="scss" scoped>
.footer-action-bar {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 0.75rem;
}

.footer-action-bar__pill {
  min-width: 8.6rem;
  height: 3.1rem;
  border-radius: 1rem;
  border-color: rgba(231, 219, 176, 0.4);
  background: rgba(156, 142, 87, 0.16);
  color: #d9cfac;
  letter-spacing: 0.18em;
  font-size: 1.05rem;
  box-shadow: inset 0 0 0 1px rgba(244, 233, 176, 0.05);
}

.footer-action-bar__icon {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: rgba(129, 146, 72, 0.28);
  color: #d8d38f;
}
</style>
