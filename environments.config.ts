const base = {
  BACKEND_API_URL: "http://18.117.187.206/python/",
  SYNC_BACKEND_API_URL: "http://localhost:8080/api/dbsync/"
}

const envs: { [key: string]: any} = {
  dev: {...base}
}

export { envs };