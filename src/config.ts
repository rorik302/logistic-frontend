const settings = {
  BACKEND_HOST: import.meta.env.VITE_BACKEND_HOST
}

const validateSettings = () => {
  const errors = []
  for (const [key, value] of Object.entries(settings)) {
    if (!value) {
      errors.push({ [key]: "Отсутствует значение переменной" })
    }
  }
  if (errors.length) {
    throw new Error(JSON.stringify(errors))
  }
}

validateSettings()
export default settings
