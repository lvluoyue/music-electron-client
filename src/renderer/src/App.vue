<script setup lang="ts">
import player from '@renderer/layout/player/index.vue'
import { useAppStore } from '@renderer/store'

const appStore = useAppStore()

const isPageLeave = usePageLeave()
// eslint-disable-next-line no-undef
let timeoutId: NodeJS.Timeout
watch(isPageLeave, (newValue) => {
  if (newValue) {
    timeoutId = setTimeout(() => {
      appStore.isPageLeave = true
    }, 3000)
  } else {
    clearTimeout(timeoutId)
    appStore.isPageLeave = false
  }
})

onMounted(async () => {
  console.log(
    await window.api.sqlQuery<string>({
      sql: 'SELECT * FROM test'
    })
  )
})
</script>

<template>
  <router-view />
  <player></player>
</template>

<style scoped lang="sass"></style>
