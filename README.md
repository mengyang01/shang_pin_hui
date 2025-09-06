# Vue2项目——尚品汇前台购物和后台管理系统

> [!IMPORTANT]
>
> 常犯错误：名称写错、关键词key写错



## Day1

#### 1.项目的一般配置

​	

​	 `vue-cli`脚手架初始化项目，用`vue create name`创建项目结构，下面是文件夹解读：

​	`node _modules`文件夹:存放依赖文件夹

​	`public`文件夹：存放静态资源，如图片、logo、html整体代码等。<u>**注意，`public` 文件夹在`webpack`打包后,会原封不动的放到`dist`文件夹中**</u>

​	`src`文件夹:  存放项目源代码的文件夹,里面包含一些项目文件夹:

​			`assets`文件夹:  存放网页的静态资源<u>**(一般是多个组件共享的静态资源)**</u>,**<u>在`webpack`打包时,`webpack`会把`assets`文件里的资源当做一个模块,打包到JS文件里</u>**

​			`components`文件夹:  存放非路由组件或全句组件,公用的组件?(存疑)

​			`pages`|`views`文件夹:  存放路由组件

​	`App.vue`文件:  项目中唯一的根目录,`Vue`的组件

​	`main.js`文件:  项目的入口文件,也是程序最先执行的文件

​	`.gitignore`文件:  git忽略文件,与github相关操作有关

​	`babel.config.js`文件:  与`babel`相关的配置文件	——"翻译官",可以将es6语法解析翻译为兼容好点的es5,

​	`package-lock.json`文件：缓存文件，记录下载过的`modules`等相关的信息，如下载地址、版本号、名称等

​	`packlock.json`文件：记录项目的相关信息，如项目名称、依赖文件、运行过程等，相当于项目的”身份证“

​	`READ.me`文件：项目的相关介绍，如功能、使用方法等等

#### 2.项目的其他配置

**2.1浏览器自动打开**

```js
package.json文件夹里面的

"scripts": {
    "serve": "vue-cli-service serve --open",//在这个后面添加个 --open 即可
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
```

**2.2关闭语法检查`eslint`**

​	目的：在学习时，如果想故意报错，也可以展现画面，或者减少不必要的报错：如定义一个用不到的变量，不会报错

```js
vue.config.js文件里面的

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false//添加这行代码即可
})
```

**2.3通过规则代替src路径名称为@**

​	好像现在不需要我们自己设置了，系统自动生成

```js
jsconfig.json文件里面

{
    "compilerOptions":{
        "baseUrl":"./",
        "paths": {
                  "@/*": ["src/*"]
        		},
    	},
    "exclude":["node_modules","dist"],//表示除了node_modules和dist文件
}
```

#### 3.项目的路由组件与非路由组件

​	路由组件：Home组件、Login组件、Register组件、Search组件

​	非路由组件：

​			Header头部组件（首页、搜索页、登录和注册页有header但是要去掉搜索框）

​			Footer底部组件（首页、搜索页有，但是登录和注册页没有）

#### 4、完成非路由组件Header与Footer业务

​	在咱们项目当中，不以HTML +CSS为主，主要搞业务、逻辑在开发项目的时候:
​		1:书写静态页面(HTML +CSS)
​		2:拆分组件
​		3:获取服务器的数据动态展示
​		4:完成相应的动态业务逻辑
​	**注意1**:  创建组件的时候，组件结构+组件的样式 +图片资源 ,组件的步骤：1、书写组件内容 2.引入组件文件 3.注册组件 4.标签化使用组件

​	**注意2**:  咱们项目采用的less样式，浏览器不识别less样式，需要通过less、less-loader【安装五版本的】进行处理把less样式变为css样式，浏览器才可以识别less

​	**注意3**:  如果想让组件识别less样式，需要在style标签的身上加上lang=less

#### 5.路由组件的Login、Register、Search业务

​	在上面分析的时候，路由组件应该有四个:Home、search、Login、Register

​	`src/components`文件夹:经常放置的非路由组件(共用全局组件)

​	`src/pages || src/views`文件夹:经常放置路由组件

​	**5.1配置路由**

​	项目当中路由配置一般放置在router文件夹中

​	**5.2总结**

​	1.路由组件与非路由组件的区别?
​		路由组件一般放置在pages|views文件夹，非路由组件一般放置components文件夹中

​	2:路由组件一般需要在router文件夹中进行注册(使用的即为组件的名字)，非路由组件在使用的时候，一般都是以标签的形式使用
​		$route:一般获取路由信息【路径、query、params等等】

​		$router: 操控路由器，一般进行**编程式导航**进行路由跳转【push || replace】 this.$router.push("./path")

​	**5.3路由跳转方式**

​		声明式路由跳转：`<router-link to="/home">  内容  </router-link>`或者`<router-link :to="{name:'home'}">  内容  </router-link>`

​		编程式路由跳转：`this.$router.push('/home')`||`this.$router.replace('/search')`

#### 6.Footer的显示与隐藏

​	**6.1利用`v-show`或`v-if`进行直接的路径判断**

​	推荐`v-show`，因为`v-if`是操作DOM元素直接**删除**或**添加**的，频繁操作DOM性能不好

​	缺点：如果要判断的路由过多，需要全部写出判断条件，太繁琐

```html
//Footer代码部分
	<div 
		class="footer"
		v-show="$route.path=='home'||$route.path=='search'"	//当路径是home和search时显示
	>
		······
     </div>
```

​	**6.2在`router/index.js`路由配置文件中添加元信息**

​	如:	

```js
在src/router/index.js文件下

export default new VueRouter({
	routes:[
        {
            path:'/home',
            component:Home,
            meta:{
                isFooterShow:true		// 添加此信息
            }
        },
        {
            path:'/login',
            component:Login,
            meta:{isFooterShow:false}	// 添加此信息
        }
    ]
})
```

​	这样一来，我们只需要判断路由信息`$route.meta`里面的`isShow`属性值即可决定展示与否,

​		`<div class="footer"  v-show="$route.meta.isFooterShow">······<div>`

## Day2

#### 	1.路由传参

​	去看vue的基础知识的`18.路由`一章内容，[Vue基本使用](D:\code practice\front-end-web\Vue2\03VueCLI\vue_cli_exercise\README.md)

> [!NOTE]
>
> <u>**重写`push`和`replace`方法**</u>
>
> 1）**问题**:**编程式路由**跳转到当前路由(参数不变)，多次执行会抛出`Navigation(导航)Duplicated(重复)`的警告错误?
>
> ​      **原因**：编程式路由：`this.$router.push/replace({xxx})`中的`push`和`replace`是`VueRouter.prototype`上的一个方法,返回的是一个`promise`类型的数据,如果使用编程式路由,此时只传入路由配置参数,没有`promise`中的`resolve`和`reject`回调函数参数,
>
> ​      **解决**:
>
> ​	  **方法一**(治标不治本,如果多次编程式跳转，有几个就要添上几个空函数):`this.$router.push({name:'search',params:{content:this.searchContent}},()=>{},()=>{})`,同时传入空函数作为resolve与reject的回调函数,这样就不会报错
>
> ​	  **方法二**(治本,二次覆写push和replace方法,注意要在配置文件`router/index.js`修改，毕竟只有那里才引入了`VueRouter`)
>
> ```js
> //当前文件为src/router/index.js文件
> const originPush=VueRouter.prototype.push	//保存原版本的push方法
> const originReplace=VueRouter.prototype.replace	//保存原版本的replace方法
> 
> //第一个参数：路由跳转的配置信息;第二个参数:成功的回调函数;第三个参数:失败的回调函数
> VueRouter.prototype.push=function(localData,resolve,reject){
> if(resolve&&reject){	//如果跳转时传有promise成功与失败的回调函数
>  originPush.call(this,localData,resolve,reject)//关键的一步，改变this指向，否则originPush直接调用的话，里面的this指向的是window,这里一修改,方法就是指向VueRouter实例对象了,属于实例对象的
> }else{	//如果没传,就在这里设置为空函数
>  originPush.call(this,localData,()=>{},()=>{})
> }
> }
> 
> //第一个参数：路由跳转的配置信息;第二个参数:成功的回调函数;第三个参数:失败的回调函数
> VueRouter.prototype.replace=function(localData,resolve,reject){
> if(resolve&&reject){
>  originReplace.call(this,localData,resolve,reject)//关键的一步，改变this指向，否则originReplace直接调用的话，里面的this指向的是window
> }else{
>  originReplace.call(this,localData,()=>{},()=>{})
> }
> }
> ```
>
> 

#### 	2.Home模块组件拆分

​		流程: 静态页面-->拆分静态组件-->获取服务器数据进行展示-->动态业务

#### 3.axios二次封装

> [!NOTE]
>
> 常见Ajax使用：XMLHttpRequest（原生）、fetch、JQuery、axios

**3.1为什么需要进行二次封装axios?**
	请求拦截器、响应拦截器:请求拦截器，可以在<u>**发请求之前**</u>可以处理一些业务、响应拦截器，当服务器**<u>数据返回以后</u>**，可以处理一些事情

**3.2二次封装代码**

​	写在`src/api/request.js`文件里面

```js
//当前文件为src/api/request.js
import axios from "axios";
// request就是axios，我们封装用
const requests=axios.create({
  baseURL:'/api',
  timeout:5000
})
// 请求拦截器:发请求之前，请求拦截器可以检测到。从而在请求之前处理一些业务
requests.interceptors.request.use(
  (config)=>{
      // 成功的回调
        // config：配置对象，包含headers请求头
      return config   // 返回这个配置对象，如果没有返回，这个请求就不会发送出去

  },
  (err)=>{
      // 失败的回调，返回失败状态的Promise类型数据
      return Promise.reject(err)
  }
)
//响应拦截器，服务器返回数据以后，响应拦截器检测到，可以处理一些事情
requests.interceptors.response.use(
  (res)=>{
        // 成功的回调
        return res.data //返回里面的数据，在使用这个axios时，获取到的东西就是这里返回的东西
  },
  (err)=>{
      // 失败的回调，返回错误信息
      return Promise.reject(err)
  }
)
export default requests

```

#### 4.API统一管理

​	**4.1 一般使用方法：**在3中提到的,是`axios`二次封装，但是如何使用`axios`发送请求呢 ?

​		一个简单的方法就是:`axios({url:"/dataURL",method:"get"···})`或 `axios.get/post(······)`  ，这里面url不需要写上`/api`,因为上面的`baseURL`已经设置过了

​	**4.2 问题：**不过,如果有100个接口，需要写100个这样的`axios`来请求。太过麻烦冗杂

​	**4.3 <u>解决</u>：<u>统一管理API</u>**

​		在`src/api/index.js`中书写统一管理代码，引入该文件后，直接一个函数调用即可完成API请求，如`TypeNav(  )`。

```js
//	src/api/index.js文件内部
import requests from "./request.js";
// 三级联动-商品分类导航API请求,暴露成函数形式，到时候直接函数调用即可完成请求
export const TypeNav=()=>{
  return requests({
      url:"/product/getBaseCategoryList",
      method:"get",
  })
}
```

#### 5.进度条设置

​	`nprogress`可以设置进度条，在**请求拦截器**里面**开启**进度条`nprogress.start()`，在**响应拦截器**里面**关闭**拦截器`nprogress.done()`

​	使用方法：

```js
//在axios二次封装操作的 requests.js文件中操作代码
import nProgress from "nprogress";  // 引入进度条
import 'nprogress/nprogress.css' ;	// 引入进度条样式

// 请求拦截器:发请求之前，请求拦截器可以检测到。从而在请求之前处理一些业务
requests.interceptors.request.use(
  (config)=>{// 成功的回调
      nProgress.start()						// 开始进度条计时
        // config：配置对象，包含headers请求头
      return config   // 返回这个配置对象，如果没有返回，这个请求就不会发送出去
  },
  (err)=>{
      // 失败的回调，返回失败状态的Promise类型数据
      return Promise.reject(err)
  }
)
//响应拦截器，服务器返回数据以后，响应拦截器检测到，可以处理一些事情
requests.interceptors.response.use(
  (res)=>{
      nProgress.done()						// 结束进度条计时
      // 成功的回调
      return res.data //返回里面的数据，在使用这个axios时，获取到的东西就是这里返回的东西
  },
  (err)=>{
      // 失败的回调，返回错误信息
      return Promise.reject(err)
  }
)
```

#### 6.Vuex

​	详见Vue基础内容[Vue基本使用](D:\code practice\front-end-web\Vue2\03VueCLI\vue_cli_exercise\README.md)

## Day3

#### 1.TypeNav三级导航菜单动态数据

​	**1.1申请数据部分**：在`store/home/index.js`下，使用`Vuex`进行仓库管理操作

```js
// Home模块化的小Vuex仓库
import {TypeNav} from '@/api' //引入请求发送函数TypeNav

const state={
  List:[]	//初始值
};
const actions={
  async TypeNavList(context,payload){
    let result=await TypeNav(payload)	//result是请求成功的Promise结果
    if(result.code===200){		//成功获取数据
      context.commit('TYPENavList',result.data)		//调用commit修改state
    }
  }
};
const mutations={
  TYPENavList(state,value){
    state.List=value	//修改state值
  }
};
const getters={};	//相当于Vue中的计算属性computed

export default {
  namespaced:true,//开启命名空间，下面的变量是独立的不混淆
  state,
  actions,
  mutations,
  getters
}
```

​	在`components/TypeNav/index.vue`中，进行数据请求与展示

```js
import { mapState } from 'vuex';
export default {
  name: 'TypeNav',
  mounted(){	//一开始就去仓库进行网路请求
    this.$store.dispatch('home/TypeNavList')	//对应home中的actions的TypeNavList方法
  },
  computed:{
    ...mapState({
      List:(state)=>state.home.List	
        //左侧为计算属性的名字,右侧为函数,参数为大仓库的State,返回home的state中的List值
    })
  }
}
```

​	**数据结构展示:**		

```js
id为1表示一级分类；id为2表示二级分类；id为3表示三级分类
const data=[
        {
            id:1,
            name:'电子书',
            children:[
                {
                    id:2,
                    name:'小说',
                    children:[
                        {
                            id:3,
                            name:'校园青春',
                        },
                        {
                            id:3,
                            name:'武侠奇幻'
                        }
                    ]
                },
                {
                    id:2,
                    name:'自传',
                    children:[
                        {
                            id:3,
                            name:'人生成长'
                        },
                        {
                            id:3,
                            name:'解密人物'
                        }
                    ]
                }
            ]
        },
        {
            id:1,
            name:'家电',
            children:[
                {
                    id:2,
                    name:'厨房用具',
                    children:[
                        {
                            id:3,
                            name:'抽油烟机'
                        },
                        {
                            id:3,
                            name:'电磁炉'
                        }
                    ]
                },
                {
                    id:2,
                    name:'卫生用具',
                    children:[
                        {
                            id:3,
                            name:'洗衣机'
                        },
                        {
                            id:3,
                            name:'烘干机'
                        }
                    ]
                }
            ]
        }
]
```

​	**1.2数据展示代码**：在`components/TypeNav/index.vue`文件中

```vue
<div @mouseleave="hovIndex = -1"> <!--事件委托，共同的父亲掌管离开事件-->
        <h2 class="all" >全部商品分类</h2>
    
        <div class="sort">
          <div class="all-sort-list2">
            <div
              class="item"
              v-for="(t1, index) in List"
              :key="t1.id"
              @mouseenter="hov(index)"	修改hovIndex与鼠标划过的当前index相等
              :class="{ hov: hovIndex === index }"	如果hovIndex与index相等则添加hov类名
            >
              <h3>
                <a href="">{{ t1.name }}</a>
              </h3>
              <div class="item-list" :style="{display:hovIndex===index?'block':'none'}">	使用js控制二三级分类标签是否展示
                <div class="subitem" v-for="t2 in t1.children" :key="t2.id">
                  <dl class="fore">
                    <dt>
                      <a href="">{{ t2.name }}</a>
                    </dt>
                    <dd>
                      <em v-for="t3 in t2.children" :key="t3.id">
                        <a href="">{{ t3.name }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

<script>
    import { mapState } from "vuex";
    import throttle from 'lodash/throttle'

    export default {
      name: "TypeNav",
      data() {
        return {
          hovIndex: -1,
        };
      },
      mounted() {
        this.$store.dispatch("home/TypeNavList");
      },
      computed: {
        ...mapState({
          List: (state) => state.home.List,
        }),
      },
      methods: {
        // hov(index){
        //   this.hovIndex=index
        // }
        // 节流处理：
        hov:throttle(function(index){
          this.hovIndex=index
        },100)
      }
    };
</script>
```



#### 	2.防抖节流

​			防抖：类似于【回城】，被打断后重新计时。**连续快速触发，只会执行最后一次**

​			节流：类似于【技能冷却】，不执行完不能被打断。**执行时间内连续快速触发，只会进行最开始的操作**

​		**项目中我们采用`lodash`库快速实现,原生js封装见 [JavaScript进阶知识内容](D:\code practice\front-end-web\JavaScript\+AA笔记\JS进阶\Day4-JS进阶-高阶技巧.md)**

```js
// 节流处理:(防抖为debounce函数)
import throttle from "lodash/throttle"  //或者 import {throttle} from "lodash",详见下方

    hov:throttle(function(index){
      this.hovIndex=index	//改变data中的hovIndex值,当鼠标滑入的标签index与hovIndex相同,就加上背景颜色
    },100)
  }	
  
  //防抖手写
  function debounce(fn,t)
{
    let timer;
    return function() {
            if(timer)
                clearTimeout(timer);
            timer=setTimeout(function(){
                fn();
            },t);
    	}
}

//节流手写
 function throttle(fn,t)
{
    let timer=null;
    return function() {
            if(!timer)
            {
                timer=setTimeout(function(){
                    fn();
                    timer=null;
                },t);
            }
        }
}
```

> [!NOTE]
>
> ### **导入方式对比**
>
> #### **场景 1：`import throttle from "lodash/throttle"`**
>
> - **路径解析**：`lodash/throttle` 指向单独文件（如 `lodash/throttle.js`）。
> - **导出方式**：该文件使用 **默认导出**（如 `module.exports = throttle;`）。
> - **导入正确性**：正确 ✅，使用默认导入语法匹配默认导出。
>
> #### **场景 2：`import { throttle } from "lodash"`**
>
> - **路径解析**：`lodash` 指向主入口文件（如 `lodash/index.js`）。
>
> - 导出方式：主入口文件使用 
>
>   命名导出：
>
>   ```js
>   export { throttle }
>   ```
>
>   复制
>
>   ```javascript
>   // lodash/index.js
>   export { throttle } from './throttle';
>   ```
>
> - **导入正确性**：正确 ✅，从命名导出的模块中解构。
>
> #### **场景 3：`import { throttle } from "lodash/throttle"`**
>
> - **路径解析**：`lodash/throttle` 指向单独文件。
> - **导出方式**：该文件使用 **默认导出**（如 `module.exports = throttle;`）。
> - **导入正确性**：错误 ❌，试图从默认导出的模块中解构命名导出，但该文件没有 `throttle` 这个命名导出。



#### 3.三级导航实现路由跳转与参数传递功能

> [!NOTE]
>
> **思考过程**：	
>
> ​	初始想法：使用`<router-link to='/search'>`的*<u>**声明式路由导航**</u>*进行跳转，但是！！如果有数以百计的`<a>...</a>`标签跳转，统统用`<router-link>`，会让页面变得十分卡顿,因为`<router-link>`是个组件，一瞬间创造数以百计的组件，故而非常卡顿
>
> ​	所以，我们只好选择<u>***编程式路由导航***</u>。
>
> ​	在进一步初想，如果使用`<router-link @click="Route_search1"></router-link>`，则数以百计的跳转，需要写数以百计的单独的`Route_search`函数，因为每个标签跳转的路由都不一样，因此*<u>**重复写函数跳转，也不可取**</u>*
>
> ​	<u>***解决思路：使用  编程式导航+事件委托 ！！***</u>，

​	

​	事件委托代码演示：

```vue
<!--在父级添加编程式路由跳转函数-->
<div class="sort" @click="jumpRoute">	
	<a>跳转1</a>
    <a>跳转2</a>
</div>
```

​	**事件委托**有2个问题 【1.跳转必须用`<a>`标签，**如何判断点击的标签是不是`<a>`，又是如何判断是几级`<a>`标签**；2.**如何给事件委托传参，从而跳转到点击的`<a>`标签的相关定位和信息**，如产品名字、ID】

​	**解决**：

​		问题1：使用自定义属性：

​		在a标签上加自定义属性` <data-xxxx>`，如，如果有`data-TypeName`属性或`data-TypeId1`则说明是`<a>`标签，并且可以根据该属性的值来判断 具体是几级`<a>`标签

```vue
<!--一级标签这样写-->
<a href="#" :data-TypeName="t1.name" :data-TypeId1="t1.id">{{ t1.name }}</a>
<!--二级标签这样写-->
<a href="#" :data-TypeName="t2.name" :data-TypeId2="t2.id">{{ t2.name }}</a>
<!--三级标签这样写-->
<a href="#" :data-TypeName="t3.name" :data-TypeId3="t3.id">{{ t3.name }}</a>
```

​		问题2：自己定义设置一个`location`变量

​				js部分演示如下

```js
jumpRoute(e){
      // console.log(e.target)  e.target即为点击的目标标签
      e.preventDefault(); //阻止默认行为，跳转/刷新，阻止测试时点击a标签就刷新，无法查看控制台情况的情况
      // console.log(e.target.dataset)  e.target.dataset表示所有自定义属性的集合对象，即所有“data-xxx='yyy'”后面的内容集合{xxx:yyy},注意，这里的xxx一律输出为小写！！！
      const {typename,typeid1,typeid2,typeid3} =e.target.dataset
      
      if(typename){     //如果有typename的值，说明就是a标签，执行下面操作
            let location={name:'search'}   //所有的分类标签都是跳转到search路由上的
            let query={typename:typename}  //参数设置，typename就是标签名字
            if(typeid1){  //有typeid1表示是一级分类
              query.typeid1=typeid1 
            }
            else if(typeid2){  //有typeid2表示是二级分类
              query.typeid2=typeid2
            }
            else{   //前两个都不是则说明是三级分类
              query.typeid3=typeid3
            }

            location.query=query  //完成location的query参数
            this.$router.push(location)   //最后实现跳转
      }
    }
```

> [!NOTE]
>
> 标签的`dataset`打印出来后为：
>
> ​	对应标签为:`<button data-nihao="html-trysd"></button>`
>
> ​	使用`console.dir(this.dataset)`打印标签的`dataset`属性
>
> ![image-20250708095452600](D:\Typora\image save\image-20250708095452600.png)

**完整代码演示一下：**

```vue
<template>
	<div class="sort" @click="jumpRoute">	<!--在父级添加编程式路由跳转函数-->
	  中间省略v-for部分
        <!--一级标签这样写-->
        <a href="#" :data-TypeName="t1.name" :data-TypeId1="t1.id">{{ t1.name }}</a>
        <!--二级标签这样写-->
        <a href="#" :data-TypeName="t2.name" :data-TypeId2="t2.id">{{ t2.name }}</a>
        <!--三级标签这样写-->
        <a href="#" :data-TypeName="t3.name" :data-TypeId3="t3.id">{{ t3.name }}</a>
	</div>
</template>

<script>
	......
    methods:{
        jumpRoute(e){
      	  // console.log(e.target)  e.target即为点击的目标标签
           e.preventDefault(); //阻止默认行为，跳转/刷新，阻止测试时点击a标签就刷新，无法查看控制台情况的情况||以及无法实现路由跳转情况
          // console.log(e.target.dataset)  e.target.dataset表示所有自定义属性的集合对象，即所有“data-xxx='yyy'”后面的内容集合{xxx:yyy},注意，这里的xxx一律输出为小写！！！
          const {typename,typeid1,typeid2,typeid3} =e.target.dataset	//解构赋值获得对应属性

          if(typename){     //如果有typename的值，说明就是a标签，执行下面操作
                let location={name:'search'}   //所有的分类标签都是跳转到search路由上的
                let query={typename:typename}  //参数设置，typename就是标签名字
                if(typeid1){  //有typeid1表示是一级分类
                  query.typeid1=typeid1 
                }
                else if(typeid2){  //有typeid2表示是二级分类
                  query.typeid2=typeid2
                }
                else{   //前两个都不是则说明是三级分类
                  query.typeid3=typeid3
                }

                location.query=query  //完成location的query参数
                this.$router.push(location)   //最后实现跳转
          }
        }
    }
</script>
```

## Day4

#### 	1.搜索页三级分类展示与动画

​	Vue中动画`<transition>`标签要与`v-show`/`v-if`搭配使用才能奏效

```vue
<div @mouseleave="ListLeave" @mouseenter="ListShow">//鼠标进入、离开激发函数，改变isShow值
    <h2> 标题部分：全部商品分类   </h2>
    <transition name="sort">	//动画名称为sort
    	动画主体部分
        <div v-show="isShow" ...>	//根据isShow值选择是否展示动画
            ......
        </div>
    </transition>
```

```vue
<script>
    data(){
        return {
            ...
            isShow:true
        }
    }
	...
    methods:{
        ...
        ListLeave(){
            if(this.$route.path!=='/home'){
                //如果不是home主页路由的话，鼠标离开需要改变isShow的值
            	this.isShow=false
                ...
            }
        },
        ListShow(){
            if(this.$route.path!=='/home')
                this.isShow=true
        }
    }
</script>
```
- **Vue中less样式谨记**：
  - 所有需要将父选择器（如 `.sort`）与后续部分（`:hover`、`-enter-active` 等）直接拼接的场景，必须使用 `&`**。**无 `&` 会导致选择器层级错误，样式无法生效。
  - 该规则适用于 Vue 的过渡类名、伪类、修饰符等所有需要连续拼接的样式场景。

```vue
<style	scoped lang="less">	
	...
    .sort{
        height:461px;
        ...
        //动画需要写在在这里且加上&
        &-enter-active,
        &-leave-active{
            transition:all .5s;
        }
        &-enter-from,
        &-leave-to{
            ...
        }
        &-enter-to,
        &-leave-from{
            ...
        }
    }
</style>
```

#### 2.三级列表路由优化

​	**问题所在**：

​		每次切换路由时，带有`<TypeNav>`的组件，都会因为`<TypeNav>`而去请求一次服务器数据，多次切换，多次请求，然而服务器返回的数据仍然是第一次请求就返回的数据，因此，这样的多次请求就造成性能浪费了，需要优化

​	**优化思路**：

​		1）为何`<TypeNav>`会去请求服务器？

​			因为其内部有`mounted(){ this.$store.dispatch('home/TypeNavList')}`，这个`home`小仓库中的 `TypeNavList`actions是用来请求服务器数据的。因此**每次切换有TypeNav时，都会去请求数据**

​		2）从哪着手？

​			因为是`TypeNav`组件使用频率高，所以多次请求数据。因此我们可以把请求数据的操作放到使用频率低的组件身上。所以**着手点就是找一个使用频率低的组件，加个请求数据的方法**

​		3）解决：

​			将`this.$store.dispatch('home/TypeNavList')`放到使用频率仅为一次的vm组件身上，即`App.vue`组件身上，这样一开始就请求数据，但是后面就因App只使用一次而不再请求数据。且该数据也保存在`home`(路径为`src/store/home/index.js`)小仓库的`state`当中

​	**注意**

​		这里不是缓存路由的知识，缓存路由是用于缓存路由组件的，详见[Vue基本使用](D:\code practice\front-end-web\Vue2\03VueCLI\vue_cli_exercise\README.md)，用于保存路由组件当前值，跳转到别的路由组件再跳转回来，仍然有该路由值

#### 3.合并参数

​	**问题**：

​		已知：点击搜索框之后，**搜索框中的内容**作为**params路由参数**传递过去；点击**三级标签**之后，标签的数据内容会作为**query参数**传递过去。

​		如果先执行其中一个事件去传递参数，再执行另一个事件传递另一种类型的参数，最后的参数会覆盖前面的路径，也就是路径内容无法保存第一个参数，只能是`http://localhost:8080/#/search?typename=电子书&typeid1=11【query参数传递时】`或`http://localhost:8080/#/search/123【params参数传递时】`，无法合并到一块

​	**解决**：

​		在对应参数传递的时候，传递的是一个整体值。然后先检验是否存在另一参数，如果存在就保存另一参数，然后再传递整体值

```js
//示例代码:下面函数是传递params参数的函数
searchRoute(){
    	//记录location初始信息
      let location={name:'search',params:{keyword:this.searchContent||undefined}}
      if(this.$route.query){	//判断是否存在query参数,如果有就保存下来
        location.query=this.$route.query
      }
      this.$router.push(location)
    }
```

#### 4.Mock.js模拟数据

​	`mock.js`是个插件，能生成随机数据，拦截`ajax`请求（即模拟后端给前端发数据，但是不会真的给后端发请求，可以认为是**伪基站||伪服务器**，可以请求它并返回模拟数据）

​	此项目mock数据来源：[尚品汇Vue电商项目前台PC](D:\code practice\front-end-web\AAA-Vue-Programs\shang_pin_hui\资料\1前台项目\sph_qiantai\前台项目_STUDENT (1)\课件\尚硅谷_Vue电商项目-前台PC.doc)

​	**使用方法**

​		1.创建：在`src/`文件下创建`mock`文件夹,用于存放模拟`JSON数据`和`mockjs仿服务器`

​		2.资源：将模拟`JSON数据`放到`mock/`文件夹。JSON中提到的资源放到`public/`文件夹下,这样打包后也会直接带到`dist`文件夹中

​		3.引入：在`mock/mock.js`（服务器名字随便起）中,`import Mock from 'mockjs'`引入mock，以及`import banner from './banner.json'`引入数据
​				*<u>注：Webpack默认图片资源、JSON文件是对外暴露的，无需写export</u>*

​		4.配置（组装）：类似于服务器`app.all/get("这里是服务器路径",相关函数)`，第一个参数是**服务器地址**，不过mock**第二个参数是数据**`Mock.mock('/banner',{code:200,data:banner})`

​		5.使用：类似于服务器需要启动，这里我们是把写好的`mockServer.js`直接引入到入口文件`main.js`，加载时自动启动了，可**参考CSS样式表的引入**

​	**代码示例：**

```js
//在mockServer.js文件中
import Mock from 'mockjs' //引入mock

// 引入数据
import banner from './banner.json'
import floors from './floors.json'

// 配置数据
Mock.mock('/mockServer/banner',{code:200,data:banner})
Mock.mock('/mockServer/floors',{code:200,data:floors})

```

```js
//在main.js文件中写这行代码,就会一加载就执行这个服务器

import "@/mock/mockServer.js" //启动mock模拟服务器
```

#### 5.获取mock数据

​	1.`mock`接口处理

​		在`src/api`文件中，创建`Mock_request.js`对axios进行二次封装,见``Day2`知识的第3点

​		然后在`index.js`的API统一管理文件中，写出``banner`特有的请求函数

```js
//axios二次封装内容见Day2知识	
//	只改动的是baseURL为'/mock'


//下面是API统一管理文件中所写的banner请求函数
export const banner=function(){
	return mock({
		url:'/banner',
		method:'post'
	})
}
```

​	2.组件中Vuex去管理请求数据，详细内容可参考`Day3`知识的第1点

#### 6.BannerList的swiper使用

​	**6.1基础使用**

​		安装swiper`npm i swiper@5`

​		组件内使用`import Swiper from "swiper"`引入swiper

​		`main.js`文件里面写上`import "swiper/css/swiper.css"`引入分页器样式

​	基础使用详见[中文api - Swiper中文网](https://www.swiper.com.cn/api/index.html)

​	**6.2注意问题**

​		基础代码如下：

```vue
<template>
	<div class="swiper-container" id="mySwiper">
          <div class="swiper-wrapper">
            <div 
              class="swiper-slide" 
              v-for="carousl in BannerList" 
              :key="carousl.id"
            >
              <img :src="carousl.imgUrl" />
            </div>
</template>

<script>
	import Swiper from "swiper";
    import { mapState } from "vuex";
    export default {
      name: "ListContainer",
      computed: {
        ...mapState({
          BannerList: (state) => state.home.BannerList,
        }),
      },
      mounted() {
        this.$store.dispatch("home/bannerList");
        // 轮播图实例创建,！！！！！！！！！！问题所在！！！！！！！！！！！！！！！！！！！！！
        new Swiper("#mySwiper", {
          direction: "horizontal", // 垂直切换选项
          loop: true, // 循环模式选项

          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination",
          },

          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },


        });
      },
    };
</script>
```

​		**6.2.1问题所在：**

​			在结构里有`<div v-for="carousl in BannerList" :key="carousl.id">`，用到了**BannerList**数据，但是在`script`中，**<u>`BannerList`数据是通过Vuex中的`actions`发送异步请求</u>**，获取到的服务器数据，**<u>即非同步获取数据，这时候如果直接在`mounted`中写同步的`New Swiper`会造成结构先引用，数据后送达，从而使轮播图不起作用</u>**

![image-20250413200121518](D:\Typora\image save\image-20250413200121518.png)

​			可以看到，`mounted`直接使用`new Swiper`的话，数据还未修改就创建swiper了

​		**6.2.2解决方案：**

​			<u>**核心思路：将`new Swiper`的创建，即结构的出现放在数据出现之后**</u>

​			**方法1**：将`new Swiper`放到`update`的生命钩子中

​				原理：`update`钩子是，页面数据发生变化就会执行。这样就能保证先获取`BannerList`数据，之后再创建轮播图结构。**但是，不管页面什么数据发生变化，都会激活此函数，没必要**

​			**方法2**：简单粗暴上`setTimeout`函数，强制转为异步任务

​				`setTimeout(()=>{new Swiper...},0)`

​			**方法3**：**通过`watch+nextTick`实现监测`BannerList`数据变化即可（最完美的解决方案）**

​				`watch`保证数据有了，`nextTick`保证`v-for`遍历完全再创建`new Swiper`，`watch`的用法详见 [VueBasic](D:\code practice\front-end-web\Vue2\01Vue_basic\11-天气案例监视属性)

​				代码示例：

```js
 watch: {
    BannerList: {//当BannerList数据变动时触发
      handler(newval, oldval) {
        this.$nextTick(() => {	//当全部数据遍历完后执行
            console.log("swiper创建");
            // 轮播图实例创建
            new Swiper("#mySwiper", {
              direction: "horizontal", // 垂直切换选项
              loop: true, // 循环模式选项

              // 如果需要分页器
              pagination: {
                el: ".swiper-pagination",
                clickable: true,	//可以点击原点切换
              },

              // 如果需要前进后退按钮
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
          });
        });
      },
    },
  },
```

> [!NOTE]
>
> 注意：根组件的`mounted`钩子是在所有子组件的`mounted`执行之后才触发的，所以把dispatch请求放到App的mounted里面也是不行的

![image-20250413220247011](D:\Typora\image save\image-20250413220247011.png)修改后为这样的顺序

#### 7.FloorList的swiper使用

​	这里与上面有所不同。请看父组件组成。

<img src="D:\Typora\image save\image-20250414202402432.png" alt="image-20250414202402432" style="zoom:50%;" />

​	多个`Floor`组件需要**同一份数据**，在父组件中统一请求数据后通过`props`分发，可以避免每个`Floor`组件独立发起重复请求

```vue
<Floor v-for="floor in floorList" :key="floor.id" :list="floor"/>
```

​	一般情况下，使用**父组件`mounted`挂载请求**的情况:

​			1.**组件复用**，避免了重复`dispatch`，优化性能

​			2.**数据依赖父组件的上下文**：如果`Floor`的数据需要基于父组件的某些状态（如路由参数、全局配置等），则需在父组件中获取数据后传递

​			3. **统一管理副作用**：在父组件中集中处理错误、加载状态、权限校验等副作用，避免子组件各自实现冗余逻辑。

​			4.**动态生成子组件**：若`Floor`组件是动态生成的（例如根据接口返回的数量渲染），父组件需先获取数据再决定渲染几个`Floor`

​			5.**遵循单向数据流**：保持子组件为“纯展示组件”，通过`props`接收数据，逻辑集中在父组件，提升可维护性。

> [!NOTE]
>
> 疑问：
>
> ​	6中曾说：父组件`monted`会在所有子组件`mounted`执行后再执行，而这里在父组件的`mounted`里面`dispatch`，子组件的`mounted`中的`new Swiper`还是会先执行，为什么这里就不会出错呢？
>
> 解答：
>
> ​	在Vue的生命周期中，父组件的`mounted`钩子确实在所有子组件的`mounted`之后执行。但问题中的现象之所以能正常运行，关键在于**子组件的渲染时机和数据的响应式更新**。以下是详细解释：
>
> 1. **初始渲染阶段**：
>    - 父组件初始化时，`floorList`为空数组，`v-for`不会渲染任何`Floor`子组件，因此子组件的`mounted`钩子此时不会执行。
>
> 2. **父组件获取数据**：
>    - 父组件在`mounted`中异步请求数据。当数据返回后，通过Vue的响应式系统，`floorList`被更新。
>
> 3. **重新渲染子组件**：
>    - `floorList`的更新触发父组件重新渲染，此时`v-for`根据新数据生成`Floor`子组件。
>    - 子组件在创建时已通过`props`接收到数据（`list="floor"`），因此其`mounted`钩子执行时，数据已存在。
>
> 4. **Swiper初始化**：
>    - 子组件的`mounted`在数据到位后执行，此时DOM中包含完整的轮播图结构，`new Swiper`可以正确绑定元素。
>
> **总结**：虽然父组件的`mounted`在子组件之后执行，但由于初始数据为空，子组件并未渲染。数据到达后，子组件在更新阶段才被创建并挂载，此时`mounted`中已能访问到数据，因此`Swiper`能正常工作。若需要应对动态数据变化，可在子组件中添加`watch`或使用`observer: true`配置Swiper自动响应DOM变化。

#### 8.Banner/Carousel组件复用

​	代码如下：

```vue
<template>
    <div class="swiper-container" ref="mySwiper">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="carousel in List"
              :key="carousel.id"
            >
              <img :src="carousel.imgUrl" />
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>

          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from 'swiper';
export default {
  name:'Banner',
  props:['List'],
  
  watch: {
    List: {
      immediate:true,
      handler(newval, oldval) {
        this.$nextTick(() => {
            // 轮播图实例创建
            console.log("swiper创建");
            new Swiper(this.$refs.mySwiper, {
              direction: "horizontal", // 水平切换选项
              loop: true, // 循环模式选项

              // 如果需要分页器
              pagination: {
                el: ".swiper-pagination",
                clickable: true,
              },

              // 如果需要前进后退按钮
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
          });
        });
      },
    },
  }
}
</script>

<style>

</style>
```

#### 9.Search模块开发
> [!NOTE]
> 就四步：
> ​	1.静态页面+静态组件
> ​	2.发请求，写API
> ​	3.Vuex管理数据
> ​	4.组件获取仓库数据动态展示

##### 9.1 静态组件不管了，拆分与上面类似

##### 9.2 api书写

​	这里是带参数的请求，参数里面包含搜索的商品信息等等内容；注意，这里**metadata参数至少是一个空对象**，不能什么也没有，否则请求会失败
```js
export const reqSearchList = (metadata) => mock({
  url: '/searchlist',
  method: 'post',
  data: metadata	//注意axios里面的参数是data，而router、route里面才区分query和params参数种类
})
```
​	请求时：至少为`reqSearchList({})`，而非`reqSearchList()`，因为函数有形参，因而必须传递有参数

##### 9.3 getters简化书写

​	便于从仓库捞数据，简化

​	下面是仓库内容：

```js
// Search模块化的小Vuex仓库

import {reqSearchList} from '@/api'

const state={
  searchList:{}
};

const actions={
  async searchList({commit},metadata={}){
    let result=await reqSearchList(metadata)
    if(result.code>=200&&result.code<300){
      commit('SearchList',result.data)
    }
  }
};

const mutations={
  SearchList(state,val){
    state.searchList=val
  }
};

const getters={
  goodsList(state){
    return state.searchList.goodsList || []
  },
  trademarkList(state){
    return state.searchList.trademarkList || []
  },
  attrsList(state){
    return state.searchList.attrsList || []
  }
};

export default {
  namespaced:true,//开启命名空间，下面的变量是独立的不混淆
  state,
  actions,
  mutations,
  getters
}
```

如果直接从仓库捞数据，得写成 `...mapState({List:state=>state.search.searchList.searchList})`才能捞到，太繁杂；如果使用`getters`来捞数据，那么就只需要写`...mapGetters({'search',['searchList']})`<u>*(如果小仓库没开启`namespaced`，就可以直接写`...mapGetters(['goodsList'])`)*</u>

##### 9.4 search功能封装为函数

```js
mounted(){
      this.$store.dispatch('search/searchList',this.good)
    },
```

​	写成mounted去发送请求，而没有其他请求指令，搜索框就不适用了，只能最开始加载一下子。

​	解决方法：将发请求的指令封装成函数，这样谁需要谁去调用这个函数即可。

```js
    mounted(){
      this.search()
    },
    methods:{
      search(){
        this.$store.dispatch('search/searchList',this.goodSearch)
      }
    }
```

​	另外，需要注意的是在跳转到Search页（比如从首页点击一个商品标签跳转到搜索页）之前，需要把Search页需要的参数（即首页点的标签）带过去，比如通过点击NavList中的标签跳转到对应Search页，**需要在Search页挂载之前、加载之前获取到发请求的参数**，这样才会在mounted发请求时，发过去的是一个修改过的有效的参数而非写死的参数。

​	可以选择在`mounted`之前的生命周期，进行参数处理整合，但是不能选择`beforeCreat`，此时还未进行数据代理等等，无法通过vm访问到data数据、method方法。详情参考 [Vue生命周期图像](D:\code practice\front-end-web\Vue2\01Vue_basic\17-生命周期\生命周期.png)

```js
  data() {
    return {
      goodSearch: {
        typeid1: "", // 1级导航
        typeid2: "", // 2级导航
        typeid3: "", //3级导航
        typename: "", //分类名字
        keyword: "", //关键字
        order: "", //排序
        pageNo: 1, //第几页
        pageSize: 3, //一页展示几个
        props: [], //平台售卖属性
        trademark: "", //品牌
      },
    };
  },
  beforeMount() {//在挂载之前修改一下搜索参数
    // 复杂写法
    // this.typeid1=this.$route.query.typeid1 || ''
    // this.typeid2=this.$route.query.typeid1 || ''
    // this.typeid3=this.$route.query.typeid1 || ''
    // ......
    // 使用ES6的Object.assign合并对象方法简化
    Object.assign(this.goodSearch, this.$route.query, this.$route.params);
  },
  mounted() {
    this.search();
  },
  methods: {
    search() {
      this.$store.dispatch("search/searchList", this.goodSearch);
    },
  },
```

## Day5

#### 1.监听路由信息实现多次发送请求
​	**1.1场景问题**：在Day4的9.4中，存在问题：用户只能最开始发送一次请求，如果在请求后的页面进行发请求操作，则无反应。如下图场景，点击搜索后，未重新发送请求。
![image-20250709110232609](D:\Typora\image save\image-20250709110232609.png)
![image-20250709110428586](D:\Typora\image save\image-20250709110428586.png)
​	**1.2解决方法**：监听路由属性变化即可

```js
  watch: {
    $route(newVal, oldVal) {
      //必须在发送请求之前先清空一下已经有的之前的id参数
      this.goodSearch.typeid1 = " ";
      this.goodSearch.typeid2 = " ";
      this.goodSearch.typeid3 = " ";
      // 发送请求前需要再次整理参数
      Object.assign(this.goodSearch, this.$route.query, this.$route.params);
      // 重新发送请求
      this.search();
    },
  },
```
​	两点需要注意：
​		1.发送请求前，必须得再整理合并数据，**更新**要发请求的数据，即`Object.assign(this.goodSearch,this.$route.params,this.$route.query)`
​		2.发送请求前，必须先**清空**一下之前的id数据、之前的搜索数据，`this.goodSearch.typeid1=""`等等重置数据过程，否则就会出现如下图所示的情况，存在之前搜索的残留数据：
![image-20250712161534298](D:\Typora\image save\image-20250712161534298.png)
![image-20250712162000068](D:\Typora\image save\image-20250712162000068.png)

#### 2.面包屑处理分类操作
##### 	2.1 根据数据显示面包屑

​	目的：根据用户点击情况，显示当前搜索关键词----面包屑

![image-20250712211120235](D:\Typora\image save\image-20250712211120235.png)

​	思路：使用`v-if`实现，`query`中有`typename`则显示，无则不显示
​	实现：`<li class="with-x" v-if="goodSearch.typename">{{goodSearch.typename}}<i>×</i></li>`

##### 2.2 点击删除面包屑---query参数

​	目的：点击“×”号删除面包屑

![image-20250712210928189](D:\Typora\image save\image-20250712210928189.png)

​	思路：
​		针对**数据**：添加`click`事件，触发后清空路由`query`数据，再根据参数重新请求一次数据即可恢复。
​		针对**路由信息**：修改`query`数据后，编程式路由跳转重新跳转到当前页即可

```js
//写在methods里面的方法，点击“×”号可以删除
	removeBread() {
      // 清空导航参数,用defined好处：当参数值为空时，就直接不传递当前参数了，增加传输效率
      this.goodSearch.typename = undefined;
      this.goodSearch.typeid1 = undefined;
      this.goodSearch.typeid2 = undefined;
      this.goodSearch.typeid3 = undefined;
      // 重新发送请求,改变商品展示数据
      this.search();
      // 改变路由信息(改变地址栏),但是要注意上面清空的只是query信息
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
 //// 注意注意,如果有watch监视$route的变化了，并且是route变化一次就重新调用一次请求函数，那么可以在这里(指删除面包屑函数里面)不需要再次调用请求函数了
 //// 因为这里重新路由跳转到当前页，参数是完全覆盖的，每次完全覆盖都会引起watch监视到，进行重新发请求。这里是写啥参数有啥参数，比如上面只写了params，那么跳转后路由里面只有params，没有query参数，这样就实现了路由信息改变
```

这里有几个细节：
	1.清空数据时，不使用空字符串`“”`，使用`undefined`，好处是：当参数值为空时，发送请求时就不会带上这个参数了，提高网络传输效率
	2.注意在路由跳转到当前页时，需要保留未被删除修改的`params`参数，目的看下图

<img src="D:\Typora\image save\image-20250712211916095.png" alt="image-20250712211916095" style="zoom:50%;" />

<img src="D:\Typora\image save\image-20250712212146137.png" alt="image-20250712212146137" style="zoom:50%;" />

##### 2.3 点击删除面包屑--params参数（组件间通信总结）

​	步骤与2.2一致，清空——重新请求——路由更新，但是多了一个步骤：清空输入框里面的内容，需要用到[组件通信相关内容。](D:\code practice\front-end-web\Vue2\03VueCLI\vue_cli_exercise\README.md)

> [!NOTE]
>
> 组件通信方式（简单概括原理，详情请移步上面链接内容）：
> 	1.`props`：**父=>子**
> 	2.自定义事件：**子=>父**，`this.$on(‘xxx’,function)`父组件中绑定xxx事件，接收数据并函数处理 `this.$emit(‘xxx’,data)`触发xxx事件发送数据
> 	3.`pubsub`库进行消息订阅与发布：**任意**，`this.pubid = pubsub.subscribe('xxx',function)`订阅xxx消息，接收数据并处理，`pubsub.publish('xxx',function)`发布xxx消息，发送数据
> 	4.Vuex：**任意**，各组件都能访问到仓库内容，适合通信
> 	5.事件总线`$bus`：**任意**，相当于没有Vuex时候的一种通信，`$bus`充当中间值管理存储数据，`this.$bus.$on('xxx',function)`绑定事件并接收数据，`this.$bus.$emit('xxx',data)`传输数据
> 	6.插槽`slot`：**父=>子**，父组件在使用子组件标签中间插入html结构，如`<kid><div>你好</div></kid>`，子组件用`<slot></slot>`接收到

​	清空输入框内容步骤：1.创建全局事件总线$bus；2.绑定事件名称与回调处理函数；3.指定某人去触发事件传递函数

```js
//创建全局事件总线$bus，在main.js里面设置
new Vue({
    store,
    router,
    render:h=>h(App),
    beforeCreate({
        Vue.prototype.$bus=this;
    })
})
//绑定事件，在Header/index.vue中添加
  mounted(){
	this.$bus.$on('clear',()=>{
		this.searchContent = '';
    })
  }

```

```js
//在search/index.vue里面写的函数
    removeParams() {
      // 清空导航参数,用ndefined好处：当参数值为空时，就直接不传递当前参数了
      this.goodSearch.keyword = undefined;
      // 重新发送请求,改变商品展示数据
      this.search();
      // 通知header组件清空搜索框
      this.$bus.$emit('clear');
      // 改变路由信息(改变地址栏),但是要注意上面清空的只是params信息
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
      else
        this.$router.push({ name: "search" });
    },
```

##### 2.4 品牌面包屑的添加与删除

​	目的：![image-20250713144021842](D:\Typora\image save\image-20250713144021842.png)
​	思路：找到`Search`组件下的`searchSelector`子组件，里面包含着品牌信息展示。这里需要实现**子传父**，即将子组件中的品牌数据传给父组件搜索页，然后父组件进行面包屑更新以及数据请求。这里使用了**自定义事件**传递数据

```vue
//父组件中
<template>
	<!--子组件-->
	<SearchSeclector @trademark="trademarkBread"/>
	<!--面包屑相关内容-->
	<li v-if="goodsearch.trademark">
    	{{goodsearch.trademark.split(':')[1]}} <i @click="removeMark">X</i>
    </li>
</template>
<script>
	methods:{
        trademarkBread(mark){
            //获取到子组件发来的品牌数据
            this.goodSearch.trademark=`${mark.tmId}:${mark.tmName}`;
            //重新发送请求更新商品数据
            this.search();
        },
        removeMark(){
            this.goodSearch.trademark=undefined;
            this.search();
        }
    }
</script>

////<SeachSelector>这个子组件里面书写下面代码
<template>
   	<li v-for="(mark,index) in trademark" :key="mark.tmId" @click="update(mark)">
    	{{mark.tmName}}
    </li>
</template>
<script>
    computed:{
        ...mapGetters('search',['trademark']);
    },
    methods:{
        update(mark){
            //在这里使用自定义事件传递点击到的品牌数据对象,包括tmId与tmName两种属性
            this.$emit('trademark',mark);
        }
    }
</script>
```

> [!NOTE]
>
> 请注意，在父组件中的`goodSearch.trademark`是用于请求的数据，而通过`…mapGetters(‘search’,[‘trademark’])`是已经获得到的全部品牌信息，不要搞混了

##### 2.5 平台售卖属性面包屑的添加与删除

​	过程与上面类似，也是通过子传父的自定义事件来传数据，注意接口规范即可，注意这里的面包屑有数组，是通过数组的遍历、增删改实现展示，注意数组去重，不能重复添加
​	下面是关键函数部分书写

```vue
//父组件里面书写
<template>
	//面包屑展示部分
    <li class="with-x" v-for="(prop, index) in goodSearch.props" :key="index">
      {{ prop.split(':')[1] }}<i @click="removeAttr(index)">×</i>
    </li>

	//子组件为SearchSeclector
    <SearchSeclector 
        @trademark="trademarkBread" 
        //添加用于收集平台售卖属性的自定义事件attrInfo
        @attrInfo="attrInfo"
    />
</template>

<script>
    methods:{
        attrInfo(attr,attrValue){
            //添加子组件中传递过来的数据
            let prop = `${attr.id}:${attrValue}:${attr.name}`
            if(this.goodSearch.props.indexOf(prop)==-1)
                //防止重复
                this.goodSearch.props.push(prop)
            //发请求
            this.search()
        },
        removeAttr(index){
            //删除面包屑数据
            this.goodSearch.props.splice(index,1)
            //发请求
            this.search()
        }    
    }

</script>

/////<SeachSelector>这个子组件里面书写下面代码
<template>
   	<div v-for="(attr,index) in attrsList" :key="attr.attrId">
        <li @click="attrInfo(attr,attrValue)">
    		{{attrValue}} 
    	</li>
    </div>
</template>

<script>
	methods:{
        attrInfo(attr,attrValue){
            this.$emit("attrInfo",attr,attrValue);
        },
    }    
</script>

```

#### 3.商品排序

```js
  data() {
    return {
      goodSearch: {
        ......
        order: "", //排序对应的数值
       	......
      },
    };
  },
```

​	这里规定了：“**1代表综合、2代表价格；asc代表升序、des代表降序**”。
​	组合规则为：“种类：顺序”，如“ <u>1：des</u>”代表“<u>按照**综合**降序展示</u> ”；“ <u>2：asc</u>”代表“<u>按照**价格**升序展示</u> ”。。下面则按照”**<u>先确定好样式、再改动数据</u>**“的顺序书写具体代码

​	**①静态后台切换`order`数据时实现样式改变的具体代码**：
​	下面是后台手动修改`order`数据时，`active`样式动态切换（动态样式）的设定代码，实现效果：【谁`active`状态，谁就带有箭头，并且箭头根据升降序切换方向】

```vue
<template>
  <ul class="sui-nav">
    <li :class="{'active':isOne}">
     //这里的isOne也为变量,表示是否为active选中状态
      <a href="#">
        综合 
       	<span v-show="isOne" :class="['iconfont',`icon-direction-${sort}`]"></span>
        //注意这里的动态样式的切换，需要牢记。"v-show"表示箭头是否显示，"icon-direction-${sort}"表示箭头的朝向,sort根据order值可能值为"up"和"down"
    </a><li :class="{'active':isOne}">
     //这里的isOne也为变量,表示是否为active选中状态
      <a href="#">
        综合 
       	<span v-show="isOne" :class="['iconfont',`icon-direction-${sort}`]"></span>
        //注意这里的动态样式的切换，需要牢记。"v-show"表示箭头是否显示，"icon-direction-${sort}"表示箭头的朝向,sort根据order值可能值为"up"和"down"
    </a>
    </li>
  </ul>
</template>

<script>
  export default{
      data(){
          return{
              goodSearch:{
                  ......
                  order:"1:desc",///////表示综合降序
                  ......
              }
          }
      },
      computed:{
          isOne(){
              return this.goodSearch.order.split(':')[0]=='1'//是否为1，如果是返回true
          },
          sort(){
              if(this.goodSearch.order.split(':')[1]=='asc')
                return "up"
              else 
                return "down"          
          }
      }
    }
</script>
```

​	②**用户点击标签后，实现改动`order`数据**

​	给每个li标签添加点击`click`事件，点击标签后即可实现切换`order`数据，增加了`changeOrder`函数实现切换

```vue
<template>
  <ul class="sui-nav">
    <li :class="{'active':isOne}" @click=changeOrder('1')>//changeOrder函数实现点击自动更新数据
      <a href="#">
        综合 
       	<span v-show="isOne" :class="['iconfont',`icon-direction-${sort}`]"></span>
      </a>
    </li>
  </ul>
</template>

<script>
  export default{
      data(){
          return{
              goodSearch:{
                  ......
                  order:"1:desc",//表示综合降序
                  ......
              }
          }
      },
      computed:{
          isOne(){
              return this.goodSearch.order.split(':')[0]=='1'
          },
          sort(){
              if(this.goodSearch.order.split(':')[1]=='asc')
                return "up"
              else 
                return "down"          
          }
      },
      methods:{
          ......
          changeOrder(flag){
              //注意这里变量都是字符串
              let originOrder=this.goodSearch.order;
              let originFlag=originOrder.split(":")[0];
              let originSort=originOrder.split(":")[1];
              let newOrder="";
              if(flag==originFlag){//说明点击的正是当前激活的板块，那么需要更换排序
                newOrder=flag+":"+(originSort=='desc'? 'asc':'desc');//切换顺序
              }
              else{
        		//点击的是另一些板块，flag与当前激活板块不同，只需更换板块名称即可，默认降序
             	newOrder=flag+":desc"; 
              }
              this.goodSearch.order=newOrder;//更新数据
              this.search();//重新请求数据
          }
      }
    }
</script>
```

#### 4.分页器--重点

##### 4.1 基础内容

​	4.1.1 为什么需要分页器?——数据太多，不适合一页直接加载展示
​	4.1.2 分页器需要哪些基本数据？
​		`pageNo`=当前页数、
​		`pageSize`=每一页展示多少条数据、
​		`total`=总共数据条数----【总页数（`total/pageSize`）】、
​		`continues`=连续的页码数（展示哪些页，一般是奇数，对称好看），这里重要的是**起始**与**结束**页码

##### **4.2 *实现代码**

​	<u>4.2.1 静态展示</u>

​		我们这里先使用静态手动传数据，即父组件将4.1.2中的数据传给子组件，通过props方式传递

```vue
//父组件Search.vue这样写
<Pagination :pageNo="8" :pageSize="10" :total="301" :continues="5"/>
```

```vue
子组件Pagination.vue这样写，展示数据
<template>
  <div>
  	<button>1</button>
  	<button>......</button>
  	<!--下面是连续页码展示-->
    <button>3</button>
    <button>4</button>
    <button>5</button>
    <button>6</button>
    <button>7</button>
  	<button>......</button>
    <!--末尾展示总页数、下一页-->
    <button>{{ totalPage }}</button>
    <button>下一页</button>
    <button style="margin-left: 30px">共 {{ total }} 条数据</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  //接收父组件传来的数据
  props: ["total", "pageSize", "pageNo", "continues"],
  computed: {
    // 总页数，向上取整，保证数据都展示出来
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
  }
}
</script>
```

​	<u>4.2.2 中间连续页码的起始确定</u>

​		即要确定好【连续页码】展示的开始与结尾

```js
export default{
	computed:{
		Continues_Start_End(){
			const {totalPage,pageNo,continues}=this;
            let start = 0 , end = 0;
            //如果【连续页码数量超过总页数】
            if(continues>=totalPage){
                start=1;
                end=totalPage;
            }
            else{
                start=pageNo-Math.floor(continues/2);
                end=pageNo+Math.floor(continues/2);
                //处理start、end超出边界值的情况
                if(start<1){
                    start=1;
                    end=continues;
                }
                if(end>totalPage){
                    start=totalPage-continues+1;
                    end=totalPage;
                }
            }
            return {start,end};
		}
	}
}
```

​	<u>**4.2.3 *分页器的动态展示**</u>

​	分为上、中、下三个部分，先处理中间区域。

> [!NOTE]
>
> 这里我们选用连续页码的`start`、`end`作边界条件进行判断

​	

​	上——起始页码、省略号处理
​		【问题】：
​		<img src="D:\Typora\image save\image-20250828224237931.png" alt="image-20250828224237931" style="zoom: 50%;" />
​		<img src="D:\Typora\image save\image-20250828224012642.png" alt="image-20250828224012642" style="zoom:50%;" />
​		<img src="D:\Typora\image save\image-20250828224115614.png" alt="image-20250828224115614" style="zoom:50%;" />
​	【思路】：可以看到，当`start>1`的时候，前面的数字1才能发挥作用;`start>2`的时候，省略号才有意义；
​	【代码】:

```vue
<!-- 上=起始页码、省略号处理 -->
<button>上一页</button>
<button v-if="Continues_Start_End.start>1">1</button>
<button v-if="Continues_Start_End.start>2">···</button>
```
​	【效果】：
​		<img src="D:\Typora\image save\image-20250828230348256.png" alt="image-20250828230348256" style="zoom:50%;" />	
​		<img src="D:\Typora\image save\image-20250828230430235.png" alt="image-20250828230430235" style="zoom:50%;" />
​		<img src="D:\Typora\image save\image-20250828230452472.png" alt="image-20250828230452472" style="zoom:50%;" />



​	中——连续页码的遍历：
​		【要点】：**实现连续页码从start遍历至end位置的遍历**，这里采用了`v-if`将`start`前面的数值隐藏

```vue
<!-- 中=连续页码的遍历 -->
<button 
	v-for="(page,index) in Continues_Start_End.end" 
	:key="index" 
	v-if="page>=Continues_Start_End.start">
		{{ page }}
</button>
```

​	【效果】：<img src="D:\Typora\image save\image-20250828223405988.png" alt="image-20250828223405988" style="zoom:50%;" />



​	下——结尾页码、省略号的处理
​		【思路】：与“上“类似，但需要调整代码细节，这里我们将不作过多解释
​	【问题】：
​		<img src="D:\Typora\image save\image-20250828231116469.png" alt="image-20250828231116469" style="zoom:50%;" />
​		<img src="D:\Typora\image save\image-20250828231159289.png" alt="image-20250828231159289" style="zoom:50%;" />
​		<img src="D:\Typora\image save\image-20250828231238017.png" alt="image-20250828231238017" style="zoom:50%;" />
​	【代码】：

```vue
<!-- 下=结尾页码、省略号的处理 -->
<button v-if="Continues_Start_End.end<totalPage-1">···</button>
<button v-if="Continues_Start_End.end<totalPage">
    {{ totalPage }}
</button>
<button>下一页</button>
<button style="margin-left: 30px">共 {{ total }} 条数据</button>
```

​	【效果】：
​		<img src="D:\Typora\image save\image-20250828232142947.png" alt="image-20250828232142947" style="zoom:50%;" />
​		<img src="D:\Typora\image save\image-20250828232209266.png" alt="image-20250828232209266" style="zoom:50%;" />
​		<img src="D:\Typora\image save\image-20250828232246243.png" alt="image-20250828232246243" style="zoom:50%;" />

##### 4.3 实现组件通信

​	子组件点击后父组件能反应。使用自定义事件，子组件点击哪一页等等事件，父组件能获取到这些内容，并且申请拿到对应的服务器数据
​	代码如下：

```vue
<!--父组件Search.vue写-->
<template>
    <Pagination 
         :pageNo="goodSearch.pageNo" 		
         :pageSize="goodSearch.pageSize" 
         :total="301" 
         :continues="5" 
         @pageChange="pageChange"
    />
</template>

<script>
	export default{
        data(){
           return {
               goodSearch:{
                   ......,
                   pageNo:2,
                   pageSize:10,
                   ......
               }
           }
        },
        methods:{
            pageChange(page){
                this.goodSearch.pageNo=page;
                this.search();
            }
        }
    }
</script>
```

```vue
<!--子组件Pagination.vue写-->
<template>
  <div class="pagination">
        <!-- 上=起始页码、省略号处理 -->
        <button :disabled="pageNo==1" 
           @click="pageChange(pageNo-1)"
         >
            上一页
        </button>
        <button 
           v-if="Continues_Start_End.start>1" 
           @click="pageChange(1)"
        >
            1
        </button>
        <button 
           v-if="Continues_Start_End.start>2"
        >
            ...
    	</button>
        <!-- 中=连续页码的遍历 -->
        <button 
          v-for="(page,index) in Continues_Start_End.end" 
          :key="index" 
          v-if="page>=Continues_Start_End.start"
          @click="pageChange(page)"
          >
            {{ page }}
        </button>
	</div>
</template>

<script>
	export default{
        ......,
      	methods:{
            pageChange(page){
              this.$emit("pageChange",page);
            }
  }
    }
</script>
```

##### 4.4 样式补齐

​	`:class="{active:pageNo==页码}"`即可

#### 5.开发商品详情页

​	1.静态组件 = > 2.发请求 = > 3.vuex = > 4.动态展示组件

##### 5.1 静态组件

​	补充组件`Detail`到路由组件文件夹`/pages`后，需要到`router/index.js`里面**<u>注册路由</u>**，路由信息如下图所示

```js
    {
      path:'/detail/:skuid?',
         //:skuid为params占位符，可以传递商品id;“?”表示参数可传可不传
      component:Detail,
      name:'Detail',
      meta:{
        isFooterShow:true
      }
    },
```

​	接下来需要让每个商品点击后能够跳转到对应商品的详情页，注意还要带上商品的`id`或自身相关属性

```vue
需要将原来的<a>标签换为能够进行路由跳转的<router-link>标签
<!--
<a href="#" target="_blank">
    <img src="./images/mobile01.png"/>
</a>
-->
<router-link :to="`/detail/${good.id}`">
	<img src="./images/mobile01.png">    
</router-link>
```

> [!NOTE]
>
> 小细节：
> 	路由跳转后，滚动条会翻转到最后，需要用到[滚动行为 | Vue Router](https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html)的知识，用到`scrollBehavior`的内容
>
> ```js
> const router = createRouter({
>   history: createWebHashHistory(),
>   routes: [...],
>   scrollBehavior (to, from, savedPosition) {
>     // return 期望滚动到哪个的位置
>   }
> })
> ```
>
> 这里我们写
>
> ```js
>   scrollBehavior (to, from, savedPosition) {
>    	return {y:0}	或者	{top:0}
>   			||				||
>     	VueRouter^3.x   VueRouter^4.x
>   }
> ```

##### 5.2 Vuex仓库、请求数据API的书写管理

​	这里我不太想写了，就是基本的Vuex交互，服务器、数据的处理这些内容，着实让我花费一些时间。

> [!NOTE]
>
> ​	注意异步获取数据，当数据为对象，`return  数据||{}`，避免出现因为`undefined.属性`的红色报错，报错如下图：
> ​		<img src="D:\Typora\image save\image-20250901215742378.png" alt="image-20250901215742378" style="zoom: 50%;" />
> ​	这是因为异步加载数据，数据还未到达，仍为`undefined`的时候使用了`数据.内容`或者`数据[0]`去拿其中的东西进行展示，报错。因此，当异步加载数据时，使用return  数据||{}``以及`return 数据||[]`可以不报错。
>
> ```js
> const getters={
>       categoryView(state){
>         return state.goodDetailInfo.categoryView||{}
>       }
> }
> ```

## Day6

#### 1.分页器复习

#### 2.zoom放大镜展示数据

​	解决轮播图的**默认显示**图片内容，重点**解决5.2中提到的数据初始化问题**
​				<img src="D:\Typora\image save\image-20250902172242277.png" alt="image-20250902172242277" style="zoom:33%;" />

#### 3.detail路由组件展示售卖属性

​	解决右侧售卖属性的数据展示工作
​				<img src="D:\Typora\image save\image-20250902172514709.png" alt="image-20250902172514709" style="zoom: 60%;" />

#### 4.产品售卖属性值排他操作

​	通过下面代码，实现上方售卖属性的选择切换

```js
 methods:{
    changeAttrActive(attrvalue,attrvalueList){
      attrvalueList.forEach(item=>{
        item.isChecked='0'
      })
      attrvalue.isChecked='1'
    }
  }
```

#### 5.商品放大镜模块

##### **5.1 ImageList轮播**

​	`watch+this.$nextTick`实现，先加载轮播图数据、再创建轮播图实例

```js
watch:{
      skuImageList(oldvalue,newvalue){
        this.$nextTick(()=>{
            new Swiper(this.$refs.detailSwiper, {
              direction: "horizontal", // 水平切换选项

              // 如果需要前进后退按钮
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },

              // 每页展示的slide数量
              slidesPerView : 2, 
              // 每次切换的slide数量
              slidesPerGroup : 2,
        });
        })
      }
    }
```

​	实现效果：
​					<img src="D:\Typora\image save\image-20250903190712503.png" alt="image-20250903190712503" style="zoom: 33%;" />

##### **5.2 点击后切换至当前选中的图片内容**

​	通过事件总线，实现**兄弟组件间通信**，通过`‘chooseImg’`事件来传递数据

​	接收数据的`Zoom.vue`书写：

```js
//Zoom.vue中书写
	data(){
      return{
        currentIndex:0
      }
    },
    computed:{
      defaultImage(){
        return this.skuImageList[this.currentIndex]||{};
      }
    },
    mounted(){
      this.$bus.$on('chooseImg',(index)=>{
        this.currentIndex=index
      })
    },
```

​	传递数据的`ImageList.vue`书写：

```js
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    chooseImg(index) {
      this.currentIndex = index;
      this.$bus.$emit("chooseImg", index);
    },
  },
```

​	实现效果：
​					<img src="D:\Typora\image save\image-20250903190847154.png" alt="image-20250903190847154" style="zoom: 33%;" />

##### 5.3 移动放大镜并实现放大

​	代码如下：

```js
methods:{
      maskmove(e){
        let mask=this.$refs.mask
        let leftmove=0,topmove=0
        leftmove=e.offsetX-mask.offsetWidth/2
        topmove=e.offsetY-mask.offsetHeight/2
        
        if(leftmove<0) leftmove=0
        if(leftmove>mask.clientWidth) leftmove=mask.clientWidth
        if(topmove<0) topmove=0
        if(topmove>mask.clientHeight) topmove=mask.clientHeight

        this.$refs.mask.style.left=leftmove+'px'
        this.$refs.mask.style.top=topmove+'px'

        this.$refs.bigImg.style.left=-2*leftmove+'px'
        this.$refs.bigImg.style.top=-2*topmove+'px'
    }
  }
```

​	实现效果：
​				<img src="D:\Typora\image save\image-20250903191013416.png" alt="image-20250903191013416" style="zoom:33%;" />

#### 6.购买产品的个数选择

​	我的代码如下，实现输入非法Num时，返回输入前的初始值，但是不好的一点就是自己手动去改Dom了，没有较好的利用到Vue的根据数据变化动态渲染的机制。

> [!NOTE]
> 为什么这个方法必须自己去动Dom？
> 	因为这里的操作：` this.skuNum=originNum`,数据`skuNum`相较于原来并没有发生改变，此时Vue并不会触发重新渲染机制，因而`input`输入框内部的非法数据还是存在，因而需要手动刷新

```vue
<template>
	<div class="controls">
        <input autocomplete="off" class="itxt" :value="skuNum" @change="changeNum" ref="input"/>
        <a href="javascript:" class="plus" @click="skuNum++">+</a>
        <a href="javascript:" class="mins" @click="skuNum<=1?skuNum=1:skuNum--">-</a>
    </div>
</template>

<script>
	methods:{
        changeNum(e){
          let num=e.target.value
          let originNum=this.skuNum
          if(num<1||isNaN(num)){//当skuNum既有数字、又有字符串时，为NaN数据
            this.skuNum=originNum
            //this.$refs.input.value=originNum
            this.$nextTick(() => {//下一轮更新,避免自己改dom造成展示、后台数据不统一
              this.$refs.input.value = this.skuNum;
            });
            return
          }
          this.skuNum=parseInt(num)//防止输入小数
        }
    }
</script>
```

​	老师的实现：
​		利用`v-model`在输入时就自动改数据，但是这个时候不能返回手动输入数据前的最后一次的合法Num了，只能返回数字1。
​		修改input内部的数据时，`v-model`会率先修改后台数据，之后再触发`change`事件进行数据的修正，因而下面这个实现不能返回最开始的合法Num；然而，另一方面，`v-model`这样的快速修改data中的数据，又让数据动态更新，从而让Vue进行不断的页面重新渲染，无需手动更新页面（上面的代码如果`this.skuNum=originNum`这部分也写`this.skuNum=1`，那么也会部分实现重新更新，但是如果输入非法数据前的数据就是1，那么也无法实现页面更新，输入框还是显示非法数据）

```vue
<template>
    <div class="controls">
        <input autocomplete="off" class="itxt" v-model="skuNum" @change="changeNum" />
        <a href="javascript:" class="plus" @click="skuNum++">+</a>
        <a href="javascript:" class="mins" @click="skuNum<=1?skuNum=1:skuNum--">-</a>
    </div>
</template>

<script>
	methods:{
        changeNum(e){
          let num=e.target.value
          if(num<1||isNaN(num)){
            this.skuNum=1
            return
          }
          this.skuNum=parseInt(num)
        }
    }
</script>
```

#### 7.购物车

##### 	7.1加入购物车成功

​	本质上也是可以用基础`Vuex`数据管理完成的，即`actions`中去请求加入购物车的`api`、`state`中记录返回的结果状态，`mutations`去修改`state`中的状态，之后前端就去`dispatch`这个仓库，然后去`state`里面捞数据
​	但是！！这里的返回结果比较简单，因此无需那么复杂的步骤即可完成请求是否成功的判断

```json
//返回数据内容
{
    "code": 200,
    "message": "成功",
    "data": null,
    "ok": true
}

```

​	因此，只需要通过`Promise`特性,完成对数据加载成功的判断,如下放`actions`中的书写格式,即可完成对数据是否添加成功这样的信息接收，非常简单。。无需`state`、`mutations`等等仓库步骤了

```js
const actions={
 async addToShopCart({commit},{skuId,skuNum}){
    const result=await reqAddToShopCart(skuId,skuNum)
    if(result.code===200)
      return "成功"
    else{
      return Promise.reject(new Error("加入失败"))
    }
  } 
}

```

​	而在组件中，则只需书写如下代码即可完成，加入购物车，并且接收是否成功加入的信息。（<u>*如果成功，则会进行路由的跳转，如果失败，则会抛出错误*</u>）

```vue
<template>
  <div class="add">
	<a  @click="addToShopCart">加入购物车</a>
  </div>
</template>

<sctipt>
...
methods:{
    async addToShopCart() {
      try{
        // 发送请求,如果成功则路由跳转，如果失败则会抛出错误
        await this.$store.dispatch("detail/addToShopCart", {
          skuId: this.$route.params.skuid,
          skuNum: this.skuNum,
        })
        // 路由跳转
        this.$router.push({
          path:'/addtoshopcart',
          query:{
            skuInfo:this.skuInfo,
            skuNum:this.skuNum
          }
        })
      }catch(e){
        alert(e)
      }
    },
}
</sctipt>
```

> [!NOTE]
>
> ​	目前路由跳转后，也可以实现目的，但是可以看到，目前上方地址栏太乱了，尽量保持地址栏简洁，因此将简单信息显示在地址栏里面
> ![image-20250904172425371](D:\Typora\image save\image-20250904172425371.png)
> ​	具体做法就是，将大段的内容信息，利用浏览器存储技术，添加到会话存储里面【`sessionStorage`】，这样可以实现目的
> ​					<img src="D:\Typora\image save\image-20250904190106648.png" alt="image-20250904190106648" style="zoom: 50%;" />
>
> ```js
>     async addToShopCart() {
>       try{
>         // 发送请求,如果成功则路由跳转，如果失败则会抛出错误
>         await this.$store.dispatch("detail/addToShopCart", {
>           skuId: this.$route.params.skuid,
>           skuNum: this.skuNum,
>         })
>         // 浏览器存储复杂数据，主要是用于前端取用数据进行展示的方便，并非给服务器传输考虑，没有给服务器传输skuInfo，因为服务器本身就有这个数据了，只需传个id即可查到
>         sessionStorage.setItem('skuInfo',JSON.stringify(this.skuInfo))
>         // 路由跳转
>         this.$router.push({
>           name:'AddCartSuccess',
>           query:{
>             skuNum:this.skuNum,
>           }
>         })
>       }catch(e){
>         alert(e)
>       }
>     },
> ```
>
> 

##### 7.2 购物车页面

​	静态组件页面的注册等等这里不再介绍。

​	值得注意的一点是：购物车页面是需要知道用户的身份信息的，因为**<u>每个用户的购物车都是不一样的</u>**。为了显示此效果，我们这里采用了**<u>`uuid`</u>**技术生成唯一的id值来表示**<u>临时游客身份</u>**的`id`

​	**7.2.1 书写购物车页面的Vuex四大件**以及**相关的前端API接口**	

​		肯定要有仓库管理这个页面的数据、其次仓库要有申请接口，这里不再书写

​	**7.2.2 【重点】利用uuid创建唯一用户身份作为临时游客身份id**
​		购物车页面是需要知道用户的身份信息的，因为**<u>每个用户的购物车都是不一样的</u>**。为了显示此效果，我们这里采用了**<u>`uuid`</u>**技术生成唯一的id值来表示**<u>临时游客身份</u>**的`id`

​		首先，需要书写生成uuid的函数文件，并且放在<u>**`utils`**</u>文件夹里面（<u>**`utils`**</u>是专门存放正则、token的文件夹）

```js
//getuuidToken.js文件,用于生成uuid
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


```

​		其次，需要在仓库的`state`的相关属性那里写上该函数并调用

```js
//	store/shopcart/index.js

import {reqShopCartList} from '@/api/index'
//引入uuid创建的函数
import getuuidtoken from '@/utils/getuuidToken'

const state={
  shopcartlist:[{}],
  // 临时用户身份id
  tempId:getuuidtoken()
}

const actions={
  async shopCartList(){
    let result = await reqShopCartList()
    console.log(result)
  }
}
```

​	并且接口`reqShopCartList`的基础请求接口需要改动

```js

...
requests.interceptors.request.use(
  (config)=>{
    nProgress.start()
    if(store.state.shopcart.tempId){
      // 请求头添加一个字段，从而让服务器知道用户id,该字段需要与后端沟通好
      config.headers.userTempId=store.state.shopcart.tempId
    }
    return config
  },

  (err)=>{
    return Promise.reject(err)
  }
)
...
```

##### 7.3 动态展示购物车展示数据---仓库基本操作

​	不再赘述，基本步骤

##### 7.4 产品数量修改

​	这里点击**+**、**-**以及手动输入值，都需要**给服务器传递的是<u>变化量</u>**，不是直接将新值传递过去，因此也不需要修改商品的`skuNum`等等属性值，因为每次修改后都是拿到服务器给的数据，自己修改了也无济于事

```vue
<template>
<li class="cart-list-con5">
<!-- 这里的加减需要发送服务器请求，让服务器知道调整后的最终的个数----因此不能直接简单的写skuNum++这样的逻辑了，就需要用函数来进行数目、请求的处理 -->
    <a href="javascript:void(0)" class="mins" @click="changeNum('sub',-1,good)">-</a>
    <input autocomplete="off" type="text" :value="good.skuNum" minnum="1" class="itxt" @change="changeNum('change',$event.target.value*1,good)">
    <!-- $event.target.value*1将字符串转换为数字 -->
    <a href="javascript:void(0)" class="plus" @click="changeNum('add',1,good)">+</a>
</li>
</template>
<script>
...
	methods:{
      // 获取购物车数据
      getCartData(){
        this.$store.dispatch('shopcart/shopCartList')
      },
      // 改变数目
      async changeNum(type,disnum,good){
        // type 表示类别
        // disnum 表示数目变化量
        // good 表示商品信息【哪个商品需要变】
        switch(type){
          case 'add':
            disnum=1
            break;
          case 'sub':
            disnum=(good.skuNum<=1)?0:-1
            break;
          case 'change':
            if(disnum<1||isNaN(disnum))
              disnum=0
            else{
              disnum=parseInt(disnum)-good.skuNum
            }
            break;
        }
        // 向修改产品数目的服务器发请求说明我这边修改数据了
        try{
          await this.$store.dispatch('detail/addToShopCart',{skuId:good.skuId,skuNum:disnum})

          // 重新请求获取更新后的购物车数据
          this.getCartData()
        }catch(e){
          alert(e)
        }
      }
    }
</script>

```

> [!NOTE]
>
> 注意设置节流，防止用户点击过快造成数据错乱
>
> ```js
> changeNum: throttle(async function (type, disnum, good){
>     ......
> }
> ```

##### 7.5 删除购物车商品

​	用到了删除接口，仍然是写接口、写仓库、点击之后调仓库
​	下面是接口

```js
//	/api/index.js请求接口文件中，这里请求方式为delete,用于删除服务器资源的请求
export const reqDeleteCart=(skuId)=>mock({
  url:`/cart/deleteCart/${skuId}`,
  method:'delete'
})
```
​	下面是仓库
```js
//  在/store/shopcart.js仓库中 
import {reqDeleteCart} from '@/api/index'
const actions={
     async deleteCart({commit},skuId){
        let result=await reqDeleteCart(skuId)
        if(result.code===200){
          return '删除成功'
        }else{
          return Promise.reject(new Error('删除失败'))
        }
      }
 }
```

​	下面是前端vue文件

```vue
<template>
......
    <li class="cart-list-con7">
        <a href="#none" class="sindelet" @click="deleteCart(good.skuId)">删除</a>
        <br>
        <a href="#none">移到收藏</a>
    </li>
......
</template>

<script>
...
	methods:{
      // 删除商品
      async deleteCart(skuId){
        try{
          let result=await this.$store.dispatch('shopcart/deleteCart',skuId)
          // console.log(result)
          // 重新申请数据
          this.getCartData()
        }catch(e){
          alert(e)
        }
      }
    }
</script>
```

##### 7.6 修改购物车产品状态

​	取消勾选产品时，也需要发送给服务器，让服务器进行数据的修改
​	下面是前端api接口书写

```js
//	/api/index.js
// 修改商品选中状态mock接口
export const reqChangeChecked=(skuId,isChecked)=>mock({
  url:`/cart/checkCart/${skuId}/${isChecked}`,
  method:'get'
})
```

​	下面是store仓库中书写

```js
//	/store/shopcart/index.js
import {reqChangeChecked} from '@/api/index'
const actions={
     async deleteCart({commit},{skuId,isChecked}){
        let result=await reqChangeChecked(skuId,isChecked)
        if(result.code===200){
          return '修改成功'
        }else{
          return Promise.reject(new Error('修改失败'))
        }
      }
 }

```

​	下面是前端文件书写

```vue
<template>
    ......
      <li class="cart-list-con1">
        <input type="checkbox" name="chk_list" :checked="good.isChecked" @click="changeChecked(good.skuId,$event)"/>
      </li>
    ......
</template>
<script>
	......
    methods:{
        // 修改商品选中状态
        async changeChecked(skuId,$event){
          //需要将$event.target.checked的布尔值转换为数字1或0
          let isChecked=$event.target.checked?1:0
          try{
            await this.$store.dispatch('shopcart/changeChecked',{skuId,isChecked})
            // 重新申请服务器数据
            this.getCartData()
          }catch(e){
            alert(e)
          }
        }
    }
    ......
</script>
```

## Day 7

##### 7.7 删除购物车中的全部勾选商品

​	由于没有全部删除勾选的商品这样的后端接口，因此这里我们采用的是，遍历购物车中的商品，每次遍历都调用之前的删除一个商品的接口，实现全部删除功能
​	【为了**<u>方便管理</u>**，将遍历调用过程写在`Vuex`仓库中（仓库中获取数据也相对比较方便，有上下文环境），前端页面代码中只需调用一次改函数，即可自己去遍历完成】

​	前端页面vue书写代码如下

```vue
<template>
	......
      <div class="option">
        <a @click="deleteAllChecked">删除选中的商品</a>
      </div>
	......
</template>
<script>
	......
    methods:{
            // 删除全部勾选内容
        async deleteAllChecked(){
          try{
            await this.$store.dispatch('shopcart/deleteAllChecked')
            // 重新获取数据
            this.getCartData
          }catch(e){
            alert(e)
          }
        }
    }
    ......
</script>
```

​	`Vuex`仓库中书写【过程非常妙，利用到了Promise的一些属性方法】

```js
const actions={
  // 删除全部选中的商品
  deleteAllChecked({getters,dispatch}){
    // 记录所有的promise,用于后续Promise.all判断是否全部成功
    let promiseAll=[]

    let cartInfoList=getters.cartInfoList
    // 遍历cartInfoList，并且调用上方deleteCart进行删除被勾选的产品
    cartInfoList.forEach(item => {
      if(item.isChecked){
      	// 调用当前仓库actions中的action方法去请求删除商品接口
        let promise=dispatch('deleteCart',item.skuId)
        // 将状态都记录下来
        promiseAll.push(promise)
      }
    });
  	// 如果所有promise都为成功状态，那么最后返回的也是个成功的Promise结构
    return Promise.all(promiseAll)
  }
}
```

##### 7.8 购物车全选商品状态切换

​	这里只有一个商品的选中状态的切换接口，因此也是遍历，思路与上面书写的一致
​	【思路】：根据全选框的checked属性值，修改所有商品的`isCheked`值

​	前端Vue代码书写如下：

```vue
<template>
	......
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="totalchoosed"  @change="changeAllChecked"/>
        <span>全选</span>
      </div>
	......
</template>
<script>
	......
methods:{
 async changeAllChecked(e){
  try{
    let isAllChecked=e.target.checked?1:0
    await this.$store.dispatch('shopcart/changeAllChecked',isAllChecked)
    //重新请求数据
    this.getCartData()        
  }catch(e){
	alert(e)
  }
 }
}
......
</script>
```

​	仓库中书写

```js
const actions={
  // 删除全部选中的商品
  changeAllChecked({getters,dispatch},isAllChecked){
    // 记录所有的promise,用于后续Promise.all判断是否全部成功
    let promiseAll=[]

    let cartInfoList=getters.cartInfoList
    // 遍历cartInfoList，并且调用上方deleteCart进行删除被勾选的产品
    cartInfoList.forEach(item => {
      	// 调用当前仓库actions中的action方法去请求删除商品接口
       let promise=dispatch('changeChecked',{skuId:item.skuId,isAllChecked})
        // 将状态都记录下来
        promiseAll.push(promise)
    });
  	// 如果所有promise都为成功状态，那么最后返回的也是个成功的Promise结构
    return Promise.all(promiseAll)
  }
}
```

