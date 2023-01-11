import fs from "fs";
import path from "path"
import { createCommonJS } from 'mlly'

const { __dirname } = createCommonJS(import.meta.url)
const JSON_PATH = "../../assets/jsons"

export default defineEventHandler((e) => {
console.log(__dirname)
  const query = getQuery(e)
  const jsonPath = path.join(__dirname, JSON_PATH, query.venue + ".json")
  // const json: any = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  const json = {
    "venue": "test",
    "targets": [{
            "no": 1,
            "title": "自宅",
            "lat": 35.18935466026968,
            "lng": 136.9887402834986,
            "pic": "/images/aaa.png",
            "comments": "家のテーブル"
        },
        {
            "no": 2,
            "title": "オンデイズ1",
            "lat": 35.16105678202227,
            "lng": 136.98562526441762,
            "pic": "/images/20220422133654_061702_30028589.jpg",
            "comments": "無印良品"
        }
    ],
    "jsonPath": jsonPath
}

  return {
    json
  }
})