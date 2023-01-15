import fs from 'fs';
import path from 'path'
import { createCommonJS } from 'mlly'

const { __dirname } = createCommonJS(import.meta.url)

const JSONS_PATH = '../../assets/jsons'
const IMAGES_PATH = '../../public/images'

export default defineEventHandler(async(e) => {
  const body = await readBody(e)
  if (body === null) return {
    ret: false
  }
  if (body.method === 'del') {
    const ret = deleteVenue(body.venue)
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

  if (!fs.existsSync(JSONS_PATH)) fs.mkdirSync(JSONS_PATH, { recursive: true })

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

const deleteVenue = (venue: string): boolean => {
  const jsonPath = path.join(__dirname, JSONS_PATH, venue + '.json')
  if (fs.existsSync(jsonPath)) {
    fs.unlinkSync(jsonPath);
  }

  const imageDir = path.join(__dirname, IMAGES_PATH, venue)
  if (fs.existsSync(imageDir)) {
    fs.rmdirSync(imageDir, { recursive: true });
  }

  return true
}
