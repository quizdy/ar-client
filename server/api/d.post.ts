import fs from 'fs'
import path from 'path'
import { createCommonJS } from 'mlly'

const { __dirname } = createCommonJS(import.meta.url)

const ROOT_DIR = '../../public/aaa/bbb'

export default defineEventHandler(async(e) => {

  const dir = path.join(__dirname, ROOT_DIR)

  let ret = {
    dir: false,
    dir1: false,
    dir2: false,
    aaa: '',
    msg: ""
  };

  if (!fs.existsSync(dir)) {

    fs.mkdirSync(dir, { recursive: true })

    if(fs.existsSync(path.join(__dirname, '../../public/'))) {ret.dir =true}
    if(fs.existsSync(path.join(__dirname, '../../public/aaa'))) {ret.dir1 =true}
    if(fs.existsSync(path.join(__dirname, '../../public/aaa/bbb'))) {ret.dir2 =true}
  }
  else {
    ret.dir = false
  }

  const aaa = path.join(__dirname, ROOT_DIR, 'test.txt');
  ret.aaa = aaa


  try {
    fs.writeFileSync(p, 'test_test_aaaaaaaaaaaaaaa')
    ret.msg = 'write ok'
  }
  catch(e) {
    ret.msg = JSON.stringify(e)
  }

  return {
    ret: ret
  }
})
