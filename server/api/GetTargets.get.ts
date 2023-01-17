const $config = useRuntimeConfig();

export default defineEventHandler(async (e) => {
  const query = getQuery(e)
  const res = await $fetch($config.public.API_URL + "/api/targets", {
    method: "GET",
    params: { venue: query.venue },
  })
  console.log('targets', res)
  return res
})