<template>
  <div class="status-circle">
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
      <circle
        :cx="center"
        :cy="center"
        :r="radius"
        fill="none"
        stroke="#e6e9ee"
        :stroke-width="stroke"
      />
      <circle
        :cx="center"
        :cy="center"
        :r="radius"
        fill="none"
        :stroke="strokeColor"
        :stroke-width="stroke"
        stroke-linecap="round"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
        :transform="`rotate(-90 ${center} ${center})`"
        class="progress-ring"
      />
    </svg>
    <span class="percent-label">{{ percent }}%</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  percent: { type: Number, default: 0 },
  size: { type: Number, default: 28 },
  stroke: { type: Number, default: 3 },
})

const center = computed(() => props.size / 2)
const radius = computed(() => (props.size - props.stroke) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const dashOffset = computed(() => circumference.value * (1 - props.percent / 100))

const strokeColor = computed(() => {
  if (props.percent >= 100) return '#1d9e75' // green - complete
  if (props.percent >= 50) return '#378add'  // blue - in progress
  if (props.percent > 0) return '#ba7517'    // amber - started
  return '#c5ccd6'                           // gray - not started
})
</script>

<style lang="scss" scoped>
.status-circle {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  svg {
    flex-shrink: 0;
  }

  .progress-ring {
    transition: stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .percent-label {
    font-size: 13px;
    font-weight: 600;
    color: #5a6573;
    min-width: 34px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .progress-ring {
    transition: none;
  }
}
</style>