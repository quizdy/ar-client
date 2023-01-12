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
  const ret = updateJson(body.venue)
  return {
    ret: ret
  }
})

const updateJson = (venue: string): boolean => {
  const jsonPath = path.join(__dirname, JSONS_PATH, venue + '.json')

  let json = {}
  if (!fs.existsSync(jsonPath)) {
    json = {
      venue: venue,
      targets: []
    }
  }
  else {
    json = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    json.venue = venue
  }

  try {
    fs.writeFileSync(jsonPath, JSON.stringify(json, null, 2))
  } catch (e) {
    throw new Error(e)
  }

  return true
}
