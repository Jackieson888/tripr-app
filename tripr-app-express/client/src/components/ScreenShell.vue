<template>
  <section class="screen-shell">
    <div class="screen-shell__panel">
      <div v-if="$slots.header" class="screen-shell__header">
        <slot name="header" />
      </div>

      <div class="screen-shell__body">
        <slot />
      </div>

      <div v-if="$slots.footer" class="screen-shell__footer">
        <slot name="footer" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.screen-shell {
  min-height: 100vh;
  padding: 0.75rem;
}

.screen-shell__panel {
  min-height: calc(100vh - 1.5rem);
  display: flex;
  flex-direction: column;
  border-radius: 1.25rem;
  padding: 0.75rem;
  background:
    radial-gradient(circle at top, rgba(255, 255, 255, 0.08), transparent 42%),
    linear-gradient(180deg, #49562d 0%, #3f4a27 100%);
  border: 1px solid rgba(236, 228, 171, 0.08);
  box-shadow: 0 18px 40px var(--tripr-shadow);
}

.screen-shell__header {
  flex: 0 0 auto;
}

.screen-shell__body {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.screen-shell__footer {
  flex: 0 0 auto;
  padding-top: 0.5rem;
}

@media (min-width: 600px) {
  .screen-shell {
    padding: 1rem;
  }

  .screen-shell__panel {
    min-height: calc(100vh - 2rem);
    padding: 1rem;
  }
}
</style>
