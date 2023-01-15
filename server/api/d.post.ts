import fs from 'fs'
import path from 'path'
import { createCommonJS } from 'mlly'

const { __dirname } = createCommonJS(import.meta.url)

const JSONS_PATH = '../../assets/jsons'
const IMAGES_PATH = '../../public/images'

export default defineEventHandler(async(e) => {
  let ret;
  const p = path.join(__dirname, '../../public/', 'test.txt')
  try {
    fs.writeFileSync(p, 'test_test')
    ret = p
  }
  catch(e) {
    ret = JSON.stringify(e)
  }

  return {
    ret: ret
  }
})

const decodeBase64 = (venue: string, updateTarget: any): string => {
  const base64 = updateTarget.base64
  if (base64.startsWith('data:image')) {
    const data = base64.replace(/^data:\w+\/\w+;base64,/, '')
    const decoded = Buffer.from(data, 'base64')
    const ext = base64.toString().slice(base64.indexOf('/') + 1, base64.indexOf(';'))
    const dir = path.join(__dirname, IMAGES_PATH, venue)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    const filePath = path.join(__dirname, IMAGES_PATH, venue, updateTarget.title + '.' + ext)
    try {
      fs.writeFileSync(filePath, decoded, 'base64')
    } catch (e: any) {
      console.log(e)
      return JSON.stringify(e)
    }
    return '/images/' + venue + '/' + updateTarget.title + '.' + ext
  }
  else {
    return ''
  }
}

const updateJson = (venue: string, updateTarget: any): boolean => {
  const jsonPath = path.join(__dirname, JSONS_PATH, venue + '.json')

  if (!fs.existsSync(jsonPath)) {
    return false
  }
  
  const json = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
  const targets = json.targets.filter((t: any) => t.no === updateTarget.no)

  if (targets.length === 0) {
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
  else if (targets.length === 1) {
    targets[0].no = updateTarget.no
    targets[0].title = updateTarget.title
    targets[0].lat = updateTarget.lat
    targets[0].lng = updateTarget.lng
    targets[0].pic = updateTarget.pic
    targets[0].comments = updateTarget.comments
  }
  else {
    return false
  }

  try {
    fs.writeFileSync(jsonPath, JSON.stringify(json, null, 2))
  } catch (e) {
    return false
  }

  return true
}