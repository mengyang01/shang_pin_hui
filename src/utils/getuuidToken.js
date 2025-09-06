import { v4 as uuidv4 } from 'uuid';

export default  () => {
  let uuid_token = localStorage.getItem('uuid_token')
  // 如果浏览器没有储存uuid_token，那么就生成一个，并且持久化保存
  if (!uuid_token) {
    uuid_token = uuidv4();
    localStorage.setItem('uuid_token', uuid_token)
  }

  return uuid_token
}

