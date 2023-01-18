const $config = useRuntimeConfig();

export default defineEventHandler(async (e) => {
  const body = await readBody(e)
  const res = await $fetch($config.public.API_URL + "/api/delete-target", {
    method: "POST",
    body: { venue: body.venue, target: body.target },
  })
  return res
})
