<template>
  <header class="app-navbar">
    <!-- Left: toggle + search -->
    <div class="navbar-left">
      <button class="toggle-btn" @click="emit('toggle-sidebar')" aria-label="Toggle sidebar">
        <i class="fas fa-bars"></i>
      </button>

      <div class="navbar-search">
        <i class="fas fa-search search-icon"></i>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search tasks, people..."
          class="search-input"
        />
      </div>
    </div>

    <!-- Right: actions -->
    <div class="navbar-right">  
      <!-- New task button -->
      <button class="new-task-btn" @click="emit('new-task')">
        <i class="fas fa-plus"></i>
        <span>New Task</span>
      </button>

      <!-- Notifications -->
      <button class="icon-btn" aria-label="Notifications">
        <i class="fas fa-bell"></i>
        <span v-if="notifications > 0" class="notif-dot"></span>
      </button>

      <!-- User menu -->
      <div class="user-menu" @click="userMenuOpen = !userMenuOpen">
        <div class="user-avatar">{{ userInitials }}</div>
        <div class="user-info">
          <span class="user-name">{{ userName }}</span>
          <span class="user-role">{{ userRole }}</span>
        </div>
        <i class="fas fa-chevron-down chevron"></i>

        <!-- Dropdown -->
        <Transition name="dropdown">
          <div v-if="userMenuOpen" class="user-dropdown">
            <a class="dropdown-item"><i class="fas fa-user"></i> Profile</a>
            <a class="dropdown-item"><i class="fas fa-gear"></i> Settings</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item logout"><i class="fas fa-arrow-right-from-bracket"></i> Logout</a>
          </div>
        </Transition>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['toggle-sidebar', 'new-task'])

const searchQuery = ref('')
const userMenuOpen = ref(false)
const notifications = ref(3)
const userName = ref('Mr Serd')
const userRole = ref('Admin')

const userInitials = computed(() =>
  userName.value
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
)
</script>

<style lang="scss" scoped>
$accent: #378add;

.app-navbar {
  height: 64px;
  background: #ffffff;
  border-bottom: 1px solid #e6e9ee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 50;
}

/* Left */
.navbar-left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.toggle-btn {
  width: 38px;
  height: 38px;
  border: none;
  background: transparent;
  border-radius: 8px;
  color: #5a6573;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #f0f2f5;
  }
}

.navbar-search {
  position: relative;
  max-width: 360px;
  width: 100%;

  .search-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #9aa3b0;
    font-size: 14px;
  }

  .search-input {
    width: 100%;
    height: 40px;
    padding: 0 14px 0 40px;
    border: 1px solid #e6e9ee;
    border-radius: 10px;
    font-size: 14px;
    background: #f7f8fa;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

    &::placeholder {
      color: #9aa3b0;
    }

    &:focus {
      border-color: $accent;
      background: #fff;
      box-shadow: 0 0 0 3px rgba(55, 138, 221, 0.12);
    }
  }
}

/* Right */
.navbar-right {
  display: flex;
  align-items: center;
  gap: 14px;
}

.new-task-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 18px;
  background: $accent;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.3s ease;

  &:hover {
    background: color.adjust($accent, $lightness: -6%);
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(55, 138, 221, 0.35);
  }

  &:active {
    transform: translateY(0);
  }
}

.icon-btn {
  position: relative;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  border-radius: 10px;
  color: #5a6573;
  font-size: 17px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #f0f2f5;
  }

  .notif-dot {
    position: absolute;
    top: 9px;
    right: 10px;
    width: 8px;
    height: 8px;
    background: #e24b4a;
    border-radius: 50%;
    border: 2px solid #fff;
  }
}

/* User menu */
.user-menu {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 8px 4px 4px;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  transition: background 0.2s ease;

  &:hover {
    background: #f0f2f5;
  }

  .user-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: $accent;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 700;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    line-height: 1.2;

    .user-name {
      font-size: 13px;
      font-weight: 600;
      color: #1a2533;
    }

    .user-role {
      font-size: 11px;
      color: #8a93a0;
    }
  }

  .chevron {
    font-size: 11px;
    color: #8a93a0;
  }
}

/* Dropdown */
.user-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 180px;
  background: #fff;
  border: 1px solid #e6e9ee;
  border-radius: 12px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  padding: 6px;
  z-index: 100;

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 8px;
    font-size: 13px;
    color: #5a6573;
    cursor: pointer;
    transition: background 0.15s ease;

    i {
      font-size: 14px;
      width: 16px;
      text-align: center;
    }

    &:hover {
      background: #f4f6f9;
    }

    &.logout {
      color: #e24b4a;
    }
  }

  .dropdown-divider {
    height: 1px;
    background: #e6e9ee;
    margin: 6px 0;
  }
}

/* Dropdown animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Responsive */
@media (max-width: 768px) {
  .navbar-search {
    display: none;
  }

  .new-task-btn span {
    display: none;
  }

  .new-task-btn {
    width: 40px;
    padding: 0;
    justify-content: center;
  }

  .user-info {
    display: none !important;
  }
}
</style>