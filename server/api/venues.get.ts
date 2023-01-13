import fs from "fs";
import path from "path"
import { createCommonJS } from 'mlly'

const { __dirname } = createCommonJS(import.meta.url)
const JSONS_PATH = "../../assets/jsons"

export default defineEventHandler(() => {
  const jsonsDir = path.join(__dirname, JSONS_PATH)
  if (!fs.existsSync(jsonsDir)) fs.mkdirSync(jsonsDir, { recursive: true })
  const jsons = fs.readdirSync(jsonsDir)
  return {
    jsons
  }
})