<template>
  <div class="stat-card">
    <div class="stat-card__inner">
      <span class="stat-card__label">{{ label }}</span>
      <span class="stat-card__value">{{ value }}</span>
      <span
        class="stat-card__change"
        :class="{ 'stat-card__change--negative': isNegative }"
      >{{ change }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  value: { type: String, required: true },
  change: { type: String, required: true },
})

const isNegative = computed(() => props.change.startsWith('-'))
</script>

<style src="./StatCard.scss"></style>
