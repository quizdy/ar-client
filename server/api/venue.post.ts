import fs from 'fs';
import path from 'path'
import { createCommonJS } from 'mlly'

const { __dirname } = createCommonJS(import.meta.url)

const JSONS_PATH = '../../assets/jsons'

export default defineEventHandler(async(e) => {
  const body = await readBody(e)
  if (body === null) return {
    ret: false
  }
  if (body.method === 'del') {
    const ret = deleteJson(body.venue)
    return {
      ret: ret
    }
  }
  else {
    const ret = updateJson(body.venue)
    return {
      ret: ret
    }
  }

})

const updateJson = (venue: string): boolean => {
  const jsonPath = path.join(__dirname, JSONS_PATH, venue + '.json')

  const json = {
    venue: venue,
    targets: []
  }

  if (fs.existsSync(jsonPath)) {
    json.venue = venue
    json.targets = JSON.parse(fs.readFileSync(jsonPath, 'utf-8')).targets;
  }

  try {
    fs.writeFileSync(jsonPath, JSON.stringify(json, null, 2))
  } catch (e) {
    return false
  }

  return true
}

const deleteJson = (venue: string): boolean => {
  console.log('delete', venue)
  return true
}
