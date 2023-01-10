import fs from "fs";
import path from "path"
import { createCommonJS } from 'mlly'

const { __dirname } = createCommonJS(import.meta.url)

const ASSETS_PATH = "../../src/assets"
const IMAGES_PATH = "../../src/public/images"

export default defineEventHandler(async(e) => {
  console.log('aaaa')
  // const body = await readBody(e)
  // console.log(body)
  // decodeBase64(body.value.name, body.value.base64)

  // updateJson(body.value)
  // return {
  //   result: true
  // }
})

const decodeBase64 = (fileName: string, base64: string) => {
  if (base64.startsWith('data:image')) {
    const data = base64.replace(/^data:\w+\/\w+;base64,/, '')
    const decoded = Buffer.from(data, 'base64')
    const ext = base64.toString().slice(base64.indexOf('/') + 1, base64.indexOf(';'))
    try {
      const p = path.join(__dirname, IMAGES_PATH, fileName + '.' + ext)
      fs.writeFileSync(p, decoded, 'base64')
    } catch (e: any) {
      console.log(e)
    }
    fileName = '/images/' + fileName + '.' + ext
  }
}

const updateJson = (updateTarget: any) => {
  const json = path.join(__dirname, ASSETS_PATH, updateTarget.venue + ".json")

  if (!fs.existsSync(json)) {
    
  }
  
    const targets: any = JSON.parse(fs.readFileSync(json, 'utf-8'));
    updateTarget.no = targets.targets.length + 1
    targets.targets.push(updateTarget)

  console.log(targets)
  try {
    fs.writeFileSync(json, JSON.stringify(updateTarget, null, 2))
  } catch (e) {
    throw new Error(e)
  }
}

const getNewNo = () => {
  // const dir = path.resolve(root, TARGET, this.dirName)
  // const files = fs.readdirSync(dir)
  // if (files.length === 0) return 'u001'
  // const list = [].slice.call(files)
  // list.sort()
  // const last: string = list.slice(-1)[0]
  // const num = Number(last.replace(/\.[^/.]+$/, '').slice(1)) + 1
  // const userId = 'u' + String(('000' + num).slice(-3))
  // return userId
}
  /**
   * setUser
   */
  // public setUser(user: Model.IUser): string {
  //   const users = this.getUsers()

  //   if (users.length === 0 || !users.some((source) => source.userId === user.userId)) {
  //     user.userId = this.getNewUserId()
  //     user.children.forEach((child, i) => {
  //       child.userId = user.userId
  //       child.childId = 'c' + ('000' + i).slice(-3)
  //     })
  //   } else {
  //     users.forEach((source) => {
  //       if (source.userId !== user.userId) return true
  //       Object.assign(source, JSON.parse(JSON.stringify(user)))
  //     })
  //   }

  //   user.updateYmd = new Date()
  //   user.children.forEach((child) => (child.updateYmd = new Date()))

  //   try {
  //     const json = path.resolve(root, TARGET, this.dirName, user.userId + '.json')
  //     fs.writeFileSync(json, JSON.stringify(user, null, 2))
  //   } catch (e) {
  //     throw new Error(e)
  //   }

  //   user.children.forEach((child) => {
  //     this.updateChild(child)
  //   })

  //   return user.userId
  // }