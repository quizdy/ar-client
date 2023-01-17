const $config = useRuntimeConfig();

export default defineEventHandler(async (e) => {
  const query = getQuery(e)
  const imageUrl = query.image as string
  console.log('GetImage', query.image)
  const res = await $fetch(imageUrl)
  console.log('res', res)
  // const blob = await res.blob()
  // console.log('blob', blob)
  return res
})