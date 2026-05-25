<template>
  <div class="stat-card" :class="`accent-${color}`">
    <div class="stat-header">
      <i :class="icon" class="stat-icon"></i>
      <span class="stat-label">{{ label }}</span>
    </div>
    <div class="stat-value">{{ displayValue }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  value: { type: [Number, String], required: true },
  icon: { type: String, default: 'fas fa-list-check' },
  color: { type: String, default: 'blue' }, // blue | green | amber | red
})

const displayValue = ref(0)

onMounted(() => {
  const target = Number(props.value) || 0
  if (target === 0) {
    displayValue.value = 0
    return
  }
  const duration = 800
  const start = performance.now()
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
    displayValue.value = Math.round(eased * target)
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
})
</script>

<style lang="scss" scoped>
.stat-card {
  background: #ffffff;
  border: 1px solid #e6e9ee;
  border-radius: 12px;
  padding: 18px 20px;
  position: relative;
  overflow: hidden;
  animation: cardFadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    transition: width 0.25s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px -8px rgba(0, 0, 0, 0.12);

    &::before {
      width: 5px;
    }
  }
}

.stat-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;

  .stat-icon {
    font-size: 14px;
  }

  .stat-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.6px;
  }
}

.stat-value {
  font-size: 30px;
  font-weight: 800;
  color: #1a2533;
  line-height: 1;
  letter-spacing: -1px;
}

/* Color variants */
.accent-blue {
  &::before { background: #378add; }
  .stat-icon, .stat-label { color: #378add; }
}
.accent-green {
  &::before { background: #1d9e75; }
  .stat-icon, .stat-label { color: #1d9e75; }
}
.accent-amber {
  &::before { background: #ba7517; }
  .stat-icon, .stat-label { color: #ba7517; }
}
.accent-red {
  &::before { background: #e24b4a; }
  .stat-icon, .stat-label { color: #e24b4a; }
}

@keyframes cardFadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .stat-card {
    animation: none;
  }
}
</style>