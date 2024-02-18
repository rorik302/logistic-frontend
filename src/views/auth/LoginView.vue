<template>
  <el-card class="login-card">
    <template #header>
      <div class="login-card__header">
        <span>Вход</span>
      </div>
    </template>

    <LoginForm />
  </el-card>
</template>

<script setup lang="ts">
import LoginForm from "@/blocks/forms/LoginForm.vue"
</script>

<style lang="scss" scoped>
.login-card {
  width: 25rem;
}
</style>
