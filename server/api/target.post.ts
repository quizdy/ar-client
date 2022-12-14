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
  body.target.pic = decodeBase64(body.target)
  const ret = updateJson(body.target)
  return {
    ret: ret
  }
})

const decodeBase64 = (updateTarget: any): string => {
  const base64 = updateTarget.base64
  if (base64.startsWith('data:image')) {
    const data = base64.replace(/^data:\w+\/\w+;base64,/, '')
    const decoded = Buffer.from(data, 'base64')
    const ext = base64.toString().slice(base64.indexOf('/') + 1, base64.indexOf(';'))
    const dir = path.join(__dirname, IMAGES_PATH, updateTarget.venue)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    const filePath = path.join(__dirname, IMAGES_PATH, updateTarget.venue, updateTarget.title + '.' + ext)
    try {
      fs.writeFileSync(filePath, decoded, 'base64')
    } catch (e: any) {
      console.log(e)
    }

    return '/images/' + updateTarget.venue + '/' + updateTarget.title + '.' + ext
  }
  else {
    return ''
  }
}

const updateJson = (updateTarget: any): boolean => {
  const jsonPath = path.join(__dirname, JSONS_PATH, updateTarget.venue + '.json')

  if (!fs.existsSync(jsonPath)) {
    return false
  }
  
  const json: any = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const target = json.targets.filter((t: any) => t.no === updateTarget.no)

  if (target.length === 0) {
    const t = {
      no: json.targets.length + 1,
      title: updateTarget.title,
      lat: updateTarget.lat,
      lng: updateTarget.lng,
      pic: updateTarget.pic,
      comments: updateTarget.comments  
    }
    json.targets.push(t)
  }
  else if (target.length === 1) {
    target[0].no = updateTarget.no
    target[0].title = updateTarget.title
    target[0].lat = updateTarget.lat
    target[0].lng = updateTarget.lng
    target[0].pic = updateTarget.pic
    target[0].comments = updateTarget.comments
  }
  else {
    return false
  }

  try {
    fs.writeFileSync(jsonPath, JSON.stringify(json, null, 2))
  } catch (e) {
    throw new Error(e)
  }

  return true
}
