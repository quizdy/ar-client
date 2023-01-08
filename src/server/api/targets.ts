export default defineEventHandler(async(event) => {
  const targets: any = await import('~/assets/targets.json')
  return {
    targets
  }
})