<template>
  <div class="card">
    <div class="card__inner">
      <div class="card__header">
        <span class="card__title">{{ title }}</span>
      </div>
      <div class="card__body">
        <span class="card__value">{{ value }}</span>
        <span
          class="card__change"
          :class="`card__change--${trend}`"
        >
          {{ change }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  value: { type: String, required: true },
  change: { type: String, required: true },
  trend: { type: String, default: 'up' },
})
</script>

<style src="./Card.scss" scoped></style>
