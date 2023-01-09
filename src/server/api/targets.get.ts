export default defineEventHandler(async(e) => {

  const query = getQuery(e)
  console.log(query)

  const targets: any = await import('~/assets/targets.json')
  return {
    targets
  }
})