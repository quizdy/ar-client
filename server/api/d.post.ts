import fs from 'fs'
import path from 'path'
import { createCommonJS } from 'mlly'

const { __dirname } = createCommonJS(import.meta.url)

const ROOT_DIR = '../../public/'

export default defineEventHandler(async(e) => {

  let ret = {
    dir: false,
    filessss: false,
    aaa: '',
    msg: ""
  };
  
  if(fs.existsSync(path.join(__dirname, '../../public/'))) {ret.dir =true}

  const dir = path.join(__dirname, ROOT_DIR)

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  const aaa = path.join(__dirname, ROOT_DIR, 'a.txt');

  try {
    fs.writeFileSync(aaa, 'adfdfafdfdad')
    ret.msg = 'write ok'
  }
  catch(e) {
    ret.msg = JSON.stringify(e)
  }
  
  if(fs.existsSync(path.join(__dirname, '../../public/a.txt'))) {ret.filessss =true}
  ret.aaa = aaa

  return {
    ret: ret
  }
})
