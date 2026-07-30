<template>
  <button class="trip-badge-action" type="button" @click="$emit('click')">
    <span class="trip-badge-action__badge">
      <img :src="imageSrc" :alt="imageAlt" aria-hidden="true" />
    </span>
    <span class="trip-badge-action__label">{{ label }}</span>
  </button>
</template>

<script>
export default {
  emits: ['click'],
  props: {
    imageSrc: {
      type: String,
      required: true
    },
    imageAlt: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.trip-badge-action {
  appearance: none;
  border: 0;
  padding: 0;
  background: transparent;
  display: grid;
  justify-items: center;
  gap: 1rem;
  cursor: pointer;
  color: #ece9b3;
  transition:
    transform 140ms ease,
    filter 140ms ease;
}

.trip-badge-action:hover,
.trip-badge-action:focus-visible {
  transform: translateY(-2px);
  filter: brightness(1.03);
}

.trip-badge-action__badge {
  width: clamp(9rem, 46vw, 13rem);
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  border-radius: 50%;
}
.trip-badge-action__badge img {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.trip-badge-action__label {
  font-size: clamp(1.35rem, 5vw, 1.75rem);
  letter-spacing: 0.5rem;
  text-indent: 0.5rem;
  font-weight: 600;
}
</style>
