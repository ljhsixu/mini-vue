import { trank,tigger } from "./effect"

export function reactive (raw){
     // 返回一个 proxy
    return new Proxy(raw,{
        get(target,key){
            // 如果传入的是 {foo: 1}
            // target 为 {foo:1}
            // key 为 1
            let res = Reflect.get(target,key)

            //TODO: 收集依赖

            trank(target,key)
            return res
        },


        set(target,key,value){
            let res = Reflect.set(target,key,value)
            
            
            
            //TODO: 触发依赖

            tigger(target,key) 
            return res
        }
        
    })
}