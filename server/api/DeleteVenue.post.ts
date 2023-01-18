const $config = useRuntimeConfig();

export default defineEventHandler(async (e) => {
  const body = await readBody(e)
  const res = await $fetch($config.public.API_URL + "/api/delete-venue", {
    method: "POST",
    body: { venue: body.venue },
  })
  return res
})
