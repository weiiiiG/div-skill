<template>
  <div class="card__outer">
    <div class="card__inner">
      <div class="card__header">
        <span class="card__label">{{ label }}</span>
        <span v-if="change" class="card__change" :class="changeClass">{{ change }}</span>
      </div>
      <span class="card__value">{{ value }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  change: { type: String, default: '' }
})

const changeClass = computed(() => {
  if (!props.change) return ''
  return props.change.startsWith('+') ? 'card__change--up' : 'card__change--down'
})
</script>

<style src="./Card.scss" />
