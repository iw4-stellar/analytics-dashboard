<template>
  <div class="tooltip tooltip-right" data-tip="Switch theme">
    <label class="theme-switch swap swap-rotate btn btn-square btn-ghost">
      <input type="checkbox" @change="toggle">
      <i class="swap-off pi pi-moon"></i>
      <i class="swap-on pi pi-sun"></i>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

type Theme = 'light' | 'dark'

export default defineComponent({
  name: 'ThemeSwitch',
  methods: {
    toggle() {
      const theme = this.getTheme() === 'light' ? 'dark' : 'light'
      this.setTheme(theme)
    },
    getMediaPreference(): Theme {
      const hasDarkPreference = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;

      return hasDarkPreference ? 'dark' : 'light'
    },
    getTheme() {
      return localStorage.getItem('theme')
    },
    setTheme(theme: Theme) {
      localStorage.setItem('theme', theme)
      document.documentElement.setAttribute('data-theme', theme)
    },
  },
  mounted() {
    const initTheme = localStorage.getItem('theme') as Theme || this.getMediaPreference()
    this.setTheme(initTheme)
  },
})
</script>