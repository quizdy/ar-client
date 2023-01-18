const $config = useRuntimeConfig();

export default defineEventHandler(async (e) => {
  const query = getQuery(e)
  let url = query.image as string

  const response = await fetch($config.public.API_URL + url)
  const contentType = response.headers.get('content-type')
  const arrayBuffer = await response.arrayBuffer()
  const APPLY_MAX = 1024
  let encodedStr = ''

  for (let i = 0; i < arrayBuffer.byteLength; i += APPLY_MAX) {
    encodedStr += String.fromCharCode.apply(
      null,
      new Uint8Array(arrayBuffer.slice(i, i + APPLY_MAX))
    )
  }

  let base64String = btoa(encodedStr)
  const base64 = `data:${contentType};base64,${base64String}`

  return {
    base64: base64
  }
})