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
    dddd: false,
    aaa: '',
    msg: ""
  };

  if (!fs.existsSync(dir)) {

    // fs.mkdirSync(dir, { recursive: true })
    const basePath = path.join(__dirname, ROOT_DIR)
    mkDirByPathSync(basePath)

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
    fs.writeFileSync(aaa, 'test_test_aaaaaaaaaaaaaaa')
    ret.msg = 'write ok'
  }
  catch(e) {
    ret.msg = JSON.stringify(e)
  }

  return {
    ret: ret
  }
})

function mkDirByPathSync(targetDir, { isRelativeToScript = false } = {}) {
  const sep = path.sep;
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  const baseDir = isRelativeToScript ? __dirname : '.';

  return targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir);
    try {
      fs.mkdirSync(curDir);
    } catch (err) {
      if (err.code === 'EEXIST') { // curDir already exists!
        return curDir;
      }

      // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
      if (err.code === 'ENOENT') { // Throw the original parentDir error on curDir `ENOENT` failure.
        throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
      }

      const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
      if (!caughtErr || caughtErr && curDir === path.resolve(targetDir)) {
        throw err; // Throw if it's just the last created dir.
      }
    }

    return curDir;
  }, initDir);
}
