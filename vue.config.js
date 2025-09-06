const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
 
  
  // 代理服务器部分
  
    devServer:{
      proxy:{
        '/api':{
          target:'http://127.0.0.1:5000'
        }
      }
    }
  

})
