const $config = useRuntimeConfig();

export default defineEventHandler(async (e) => {
  const body = await readBody(e)
  console.log("body", body.venue)
  const res = await $fetch($config.public.API_URL + "/api/update-venue", {
    method: "POST",
    body: { venue: body.venue },
  })
  return res
})

