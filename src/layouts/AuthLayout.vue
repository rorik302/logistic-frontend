<template>
  <div class="auth-layout">
    <router-view />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.auth-layout {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
}
</style>
