import { trank,tigger } from "./effect"

const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)
function createGetter(isReadOnly = false){
    return  function get(target:any,key:any){
         // 如果传入的是 {foo: 1}
         // target 为 {foo:1}
         // key 为 1
         let res = Reflect.get(target,key)
         //TODO: 收集依赖
         if(!isReadOnly){
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