<template>
  <section class="profile-summary-card">
    <button
      class="profile-summary-card__avatar-button"
      type="button"
      @click="$emit('avatar-click')"
    >
      <v-avatar
        class="profile-summary-card__avatar"
        size="44"
        :image="image || undefined"
      >
        <span v-if="!image" class="profile-summary-card__avatar-fallback">{{
          initials
        }}</span>
      </v-avatar>
    </button>

    <div class="profile-summary-card__copy">
      <h1>{{ title }}</h1>
      <p v-for="line in lines" :key="line">
        {{ line }}
      </p>
    </div>
  </section>
</template>

<script>
export default {
  emits: ['avatar-click'],
  props: {
    image: {
      type: String,
      default: ''
    },
    initials: {
      type: String,
      default: 'A'
    },
    title: {
      type: String,
      required: true
    },
    lines: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-summary-card {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0.75rem;
  padding: 0.55rem 0.75rem;
  border-radius: 1rem;
  background: var(--tripr-surface);
  color: var(--tripr-text);
  box-shadow: inset 0 -4px 0 rgba(122, 117, 70, 0.16);
}

.profile-summary-card__avatar-button {
  border: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;
}

.profile-summary-card__avatar {
  border: 2px solid rgba(97, 87, 42, 0.32);
  background: #6a7340;
  color: var(--tripr-surface);
  font-weight: 700;
}

.profile-summary-card__avatar-fallback {
  letter-spacing: 0.05em;
}

.profile-summary-card__copy {
  min-width: 0;
}

.profile-summary-card__copy h1 {
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.05;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.profile-summary-card__copy p {
  margin: 0.2rem 0 0;
  font-size: 0.72rem;
  line-height: 1.1;
  letter-spacing: 0.03em;
  color: rgba(18, 19, 9, 0.92);
}

@media (min-width: 600px) {
  .profile-summary-card {
    padding: 0.7rem 0.9rem;
  }

  .profile-summary-card__copy h1 {
    font-size: 1.25rem;
  }

  .profile-summary-card__copy p {
    font-size: 0.82rem;
  }
}
</style>
