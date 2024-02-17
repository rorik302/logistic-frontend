<template>
  <component :is="layout"></component>
</template>

<script setup lang="ts">
import { markRaw, ref, watch } from "vue"
import { useRoute } from "vue-router"
import type { RouteMeta } from "@/router"

const route = useRoute()

const layout = ref()

watch(
  () => route.meta as RouteMeta,
  (routeMeta) => {
    const layoutName = routeMeta.layout ? routeMeta.layout : "DefaultLayout"
    import(`@/layouts/${layoutName}.vue`).then((layoutComponent) => {
      layout.value = markRaw(layoutComponent.default)
    })
  }
)
</script>

<style lang="scss" scoped></style>
