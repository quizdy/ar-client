import fs from "fs";
import path from "path"
import { createCommonJS } from 'mlly'

const { __dirname } = createCommonJS(import.meta.url)
const JSONS_PATH = "../../assets/jsons"

export default defineEventHandler((e) => {
  const query = getQuery(e)
  const jsonPath = path.join(__dirname, JSONS_PATH, query.venue + ".json")
  if (!fs.existsSync(jsonPath)) {
    return {
      json: {
        venue: "",
        targets: []
      }
    }
  }

  const json = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  return {
    json
  }
})