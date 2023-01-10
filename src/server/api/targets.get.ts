import fs from "fs";
import path from "path"
import { createCommonJS } from 'mlly'

const { __dirname } = createCommonJS(import.meta.url)
const ASSETS_PATH = "../../src/assets"

export default defineEventHandler((e) => {

  const query = getQuery(e)
  const json = path.join(__dirname, ASSETS_PATH, query.venue + ".json")
  const targets: any = JSON.parse(fs.readFileSync(json, 'utf-8'));

  return {
    targets
  }
})