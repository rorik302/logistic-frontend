<template>
  <el-form
    ref="formRef"
    :model="formModel"
    :rules="formRules"
    class="login-form"
    label-position="top"
    @keydown.enter="submitForm(formRef)"
  >
    <el-form-item label="Электронная почта" prop="email" :error="formErrors.email">
      <el-input v-model="formModel.email" />
    </el-form-item>
    <el-form-item label="Пароль" prop="password" :error="formErrors.password">
      <el-input v-model="formModel.password" type="password" />
    </el-form-item>
    <el-row justify="end">
      <el-button type="primary" @click="submitForm(formRef)">Войти</el-button>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import { ElMessage, type FormInstance, type FormRules } from "element-plus"
import authService, { type LoginData } from "@/api/auth"
import router from "@/router"
import type { AxiosError } from "axios"

const initialModel: LoginData = {
  email: "",
  password: ""
}
const initialErrors = {
  email: "",
  password: ""
}

const formRef = ref()
const formModel = reactive({ ...initialModel })
const formRules = reactive<FormRules>({
  email: [
    { required: true, message: "Введите электронную почту", trigger: "blur" },
    { type: "email", message: "Неверный формат электронной почты", trigger: "blur" }
  ],
  password: [{ required: true, message: "Введите пароль", trigger: "blur" }]
})
const formErrors = reactive({ ...initialErrors })

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  Object.assign(formErrors, { ...initialErrors })
  formEl.validate((valid) => {
    if (valid) {
      authService
        .login(formModel)
        .then(() => {
          router.push("/")
        })
        .catch((error: AxiosError) => {
          if (error.response?.status === 401) {
            formErrors.email = " "
            formErrors.password = " "
            ElMessage.error({
              message: "Пользователь не найден или неверный пароль",
              showClose: true,
              duration: 10000
            })
          }
          if (error.response?.status === 403) {
            formErrors.email = "Пользователю доступ закрыт"
          }
        })
    }
  })
}
</script>

<style lang="scss" scoped></style>
