import fs from "fs";
import path from "path"
import { createCommonJS } from 'mlly'

const { __dirname } = createCommonJS(import.meta.url)
const JSONS_PATH = "../../assets/jsons"

export default defineEventHandler(() => {
  const jsonsDir = path.join(__dirname, JSONS_PATH)
  if (!fs.existsSync(jsonsDir)) fs.mkdirSync(jsonsDir, { recursive: true })
  const venues = fs.readdirSync(jsonsDir).map((json) => path.basename(json, '.json'))
  return {
    venues
  }
})