import fs from 'fs'
import path from 'path'
import { createCommonJS } from 'mlly'

const { __dirname } = createCommonJS(import.meta.url)

export default defineEventHandler(async(e) => {

  const dir = path.join(__dirname, '../../public/aaa/bbb/ccc')

  let ret = {
    dir: false,
    aaa: '',
    msg: ""
  };

  if (!fs.existsSync(dir)) {
    ret.dir = true
    fs.mkdirSync(dir, { recursive: true })
  }
  else {
    ret.dir = false
  }

  const aaa = path.join(__dirname, '../../public/aaa/bbb/ccc', 'test.txt');
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
