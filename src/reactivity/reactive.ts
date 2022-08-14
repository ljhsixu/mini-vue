
import {mutableHandlers,readnolyHandlers}from './baseHandlers'

export function reactive (raw){

    return  creatActiveObject(raw,mutableHandlers)
}


export function readonly(raw){
    return creatActiveObject(raw,readnolyHandlers) 
}


function creatActiveObject(raw:any,baseHandlers){
         // 返回一个 proxy
    return new Proxy(raw,baseHandlers)
}