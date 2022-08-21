import { trank,tigger } from "./effect"
import {reactiveFlags} from './reactive'
import {readonly ,reactive} from './reactive'
import {isObject} from '../shared/index'
const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)
function createGetter(isReadonly = false){
    return  function get(target:any,key:any){
         // 如果传入的是 {foo: 1}
         // target 为 {foo:1}
         // key 为 1
         if(key === reactiveFlags.IS_REACTIVE){
            return !isReadonly
         }else if(key === reactiveFlags.IS_READONLY) {
            return isReadonly
         }
         let res = Reflect.get(target,key)
         if (isObject(res)) {
            // 把内部所有的是 object 的值都用 reactive 包裹，变成响应式对象
            // 如果说这个 res 值是一个对象的话，那么我们需要把获取到的 res 也转换成 reactive
            // res 等于 target[key]
            return isReadonly ? readonly(res) : reactive(res);
          }
         //TODO: 收集依赖
         if(!isReadonly){


         trank(target,key) 
         }
         return res
     }
 }
 
 function createSetter(){
     return function set(target,key,value){
         let res = Reflect.set(target,key,value)              
         //TODO: 触发依赖
         tigger(target,key) 
         return res
     }
 }


export const mutableHandlers = {
    get,
    set
}

export const readnolyHandlers = {
    get:readonlyGet,
    set:(target,key,value)=>{
        console.warn(`key${key} set 失败 因为 target 是readonly的 ${target}`)
        return true
    }
}