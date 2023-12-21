const base = {
  BACKEND_API_URL: "http://localhost:8000/python"
}

const envs: { [key: string]: any} = {
  dev: {...base}
}

export { envs };