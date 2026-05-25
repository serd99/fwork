<template>
  <footer class="app-footer">
    <div class="footer-left">
      <span>&copy; {{ currentYear }} FellowWork</span>
      <span class="dot">·</span>
      <span>Built with Nuxt + Go</span>
    </div>
    <div class="footer-right">
      <a href="#" class="footer-link">Privacy</a>
      <a href="#" class="footer-link">Terms</a>
      <a href="#" class="footer-link">Support</a>
      <span class="version">v1.0.0</span>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style lang="scss" scoped>
.app-footer {
  height: 48px;
  background: #ffffff;
  border-top: 1px solid #e6e9ee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  font-size: 12px;
  color: #8a93a0;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 8px;

  .dot {
    color: #c5ccd6;
  }
}

.footer-right {
  display: flex;
  align-items: center;
  gap: 18px;

  .footer-link {
    color: #8a93a0;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: #378add;
    }
  }

  .version {
    color: #b5bcc6;
    font-size: 11px;
  }
}

@media (max-width: 768px) {
  .app-footer {
    padding: 12px 16px;
    flex-direction: column;
    height: auto;
    gap: 6px;
  }

  .footer-right {
    gap: 12px;
  }
}
</style>