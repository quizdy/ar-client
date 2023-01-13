import fs from "fs";
import path from "path"
import { createCommonJS } from 'mlly'

const { __dirname } = createCommonJS(import.meta.url)
const JSONS_PATH = "../../assets/jsons"

export default defineEventHandler(() => {
  const jsonsDir = path.join(__dirname, JSONS_PATH)
  // const jsons = fs.readdirSync(jsonsDir)
  const venues = []
  // for(let i = 0; i < jsons.length; i++) {
  //   const venue = {
  //     no: i,
  //     title: path.basename(jsons[i], '.json'),
  //     image: "/images/" + path.basename(jsons[i], '.json') + "/_.png"
  //   }
  //   venues.push(venue)
  // }
  const venue = {
    no: 1,
    title: 'aa.json',
    image: "/images/aa/_.png"
  }
  venues.push(venue)
  return {
    venues
  }
})