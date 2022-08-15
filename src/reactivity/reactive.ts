
import {mutableHandlers,readnolyHandlers}from './baseHandlers'
export const enum reactiveFlags  {
    IS_REACTIVE = "__v_isReactive",
    IS_READONLY = "__v_isReadonly",
}
export function reactive (raw){

    return  creatActiveObject(raw,mutableHandlers)
}


export function readonly(raw){
    return creatActiveObject(raw,readnolyHandlers) 
}
export function isReactive(value){
// 如果 value 是 proxy 的话
  // 会触发 get 操作，而在 createGetter 里面会判断
  // 如果 value 是普通对象的话
  // 那么会返回 undefined ，那么就需要转换成布尔值
 return !!value[reactiveFlags.IS_REACTIVE]
}

export function isReadOnly(value){

    return !!value[reactiveFlags.IS_READONLY]
 }

function creatActiveObject(raw:any,baseHandlers){
         // 返回一个 proxy
    return new Proxy(raw,baseHandlers)
}