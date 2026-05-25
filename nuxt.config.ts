// nuxt.config.ts — FellowWork (Nuxt 4)
// Add these settings to your existing config (don't overwrite blindly — merge)

export default defineNuxtConfig({
  // 1. Make SCSS variables available in EVERY component automatically
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "sass:color";\n@use "~/assets/scss/_variables.scss" as *;'
        }
      }
    }
  },

  // 2. Load Font Awesome icons (used by all components)
  app: {
    head: {
      title: 'FellowWork',
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
        }
      ]
    }
  },

  // 3. Nuxt 4 already enables the app/ directory structure by default
  // Your components in app/components/ are auto-imported (no manual import needed!)

  // 4. (Optional) If you want a global reset/base CSS
  // css: ['~/assets/scss/main.scss'],
})