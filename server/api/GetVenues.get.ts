const $config = useRuntimeConfig();

export default defineEventHandler(async (e) => {
  const res = await $fetch($config.public.API_URL + "/api/venues", {
    method: "GET",
  })
  return res
})