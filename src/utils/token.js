// 存储token
export const storageToken=(token)=>{
  localStorage.setItem('token',token)
}

// 读取token
export const getstorageToken=()=>{
  return localStorage.getItem('token')
}

// 删除token
export const removeToken=()=>{
  localStorage.removeItem('token')
}