<template>
  <aside class="app-sidebar" :class="{ collapsed: collapsed }">
    <!-- Brand -->
    <div class="sidebar-brand">
      <div class="brand-icon">
        <i class="fas fa-briefcase"></i>
      </div>
      <Transition name="fade">
        <span v-if="!collapsed" class="brand-name">FellowWork</span>
      </Transition>
    </div>

    <!-- Navigation -->
    <nav class="sidebar-nav">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="nav-item"
        active-class="active"
      >
        <i :class="item.icon" class="nav-icon"></i>
        <Transition name="fade">
          <span v-if="!collapsed" class="nav-label">{{ item.label }}</span>
        </Transition>
        <span v-if="item.badge && !collapsed" class="nav-badge">{{ item.badge }}</span>
      </NuxtLink>
    </nav>

    <!-- Bottom section -->
    <div class="sidebar-footer">
      <NuxtLink to="/help" class="nav-item">
        <i class="fas fa-circle-question nav-icon"></i>
        <Transition name="fade">
          <span v-if="!collapsed" class="nav-label">Help & Support</span>
        </Transition>
      </NuxtLink>
    </div>
  </aside>
</template>

<script setup>
defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
})

const navItems = [
  { to: '/', label: 'Overview', icon: 'fas fa-table-columns' },
  { to: '/tasks', label: 'Tasks', icon: 'fas fa-list-check', badge: 5 },
  { to: '/calendar', label: 'Calendar', icon: 'fas fa-calendar-days' },
  { to: '/team', label: 'Team', icon: 'fas fa-users' },
  { to: '/reports', label: 'Reports', icon: 'fas fa-chart-line' },
  { to: '/settings', label: 'Settings', icon: 'fas fa-gear' },
]
</script>

<style lang="scss" scoped>
$sidebar-bg: #0c2d5a;
$sidebar-accent: #378add;
$sidebar-text: #9db6d6;

.app-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 240px;
  background: $sidebar-bg;
  display: flex;
  flex-direction: column;
  z-index: 100;
  transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;

  &.collapsed {
    width: 76px;
  }
}

/* Brand */
.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 22px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  min-height: 64px;

  .brand-icon {
    width: 32px;
    height: 32px;
    background: $sidebar-accent;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 15px;
    flex-shrink: 0;
  }

  .brand-name {
    color: #fff;
    font-weight: 700;
    font-size: 17px;
    letter-spacing: -0.3px;
    white-space: nowrap;
  }
}

/* Navigation */
.sidebar-nav {
  flex: 1;
  padding: 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 11px 14px;
  border-radius: 10px;
  color: $sidebar-text;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  position: relative;
  transition: background 0.2s ease, color 0.2s ease, transform 0.15s ease;

  .nav-icon {
    font-size: 16px;
    width: 20px;
    text-align: center;
    flex-shrink: 0;
  }

  .nav-badge {
    margin-left: auto;
    background: $sidebar-accent;
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 10px;
    min-width: 20px;
    text-align: center;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    color: #fff;
    transform: translateX(2px);
  }

  &.active {
    background: $sidebar-accent;
    color: #fff;
    box-shadow: 0 4px 12px rgba(55, 138, 221, 0.35);

    .nav-badge {
      background: rgba(255, 255, 255, 0.25);
    }
  }
}

/* Footer of sidebar */
.sidebar-footer {
  padding: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

/* Collapsed state */
.collapsed {
  .sidebar-brand {
    justify-content: center;
    padding: 20px 0;
  }

  .nav-item {
    justify-content: center;
    padding: 11px 0;

    &:hover {
      transform: none;
    }
  }
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Mobile */
@media (max-width: 768px) {
  .app-sidebar {
    transform: translateX(-100%);
    width: 240px;

    &.collapsed {
      transform: translateX(0);
      width: 240px;
    }
  }
}
</style>