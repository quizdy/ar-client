import fs from "fs";
import path from "path"
import { createCommonJS } from 'mlly'

const { __dirname } = createCommonJS(import.meta.url)
const JSONS_PATH = "../../assets/jsons"

export default defineEventHandler(() => {
  const jsonsDir = path.join(__dirname, JSONS_PATH)

  if (!fs.existsSync(jsonsDir)) {
    

    try {
      fs.mkdirSync(jsonsDir, { recursive: true })
    }
    catch(e) {
      const jsons = {
        path: jsonsDir + '_bbb_' + fs.existsSync(jsonsDir),
        msg: JSON.stringify(e),
      }
      return {
        jsons
      }
    }
  }
 
  try {
    const jsons = {
      path: jsonsDir,
      msg: JSON.stringify(fs.readdirSync(jsonsDir)),
    }
    return {
      jsons
    }
  }
  catch(e) {
    const jsons = {
      path: jsonsDir + '_aaaa_' + fs.existsSync(jsonsDir),
      msg: JSON.stringify(e),
    }
    return {
      jsons
    }
}
  const venues = []
  // for(let i = 0; i < jsons.length; i++) {
  //   const venue = {
  //     no: i,
  //     title: path.basename(jsons[i], '.json'),
  //     image: "/images/" + path.basename(jsons[i], '.json') + "/_.png"
  //   }
  //   venues.push(venue)
  // }


})