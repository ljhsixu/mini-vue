import { isObject } from "./../shared/index";
import { trankEffects, tiggerEffest, isTranking } from "./effect";
import { hsaChanged } from "../shared";
import { reactive } from "./reactive";
class RefImpl {
  private _value: any;
  private dep: any;
  private __v_isRef = true
  constructor(value) {
    this._value = convert(value);
    this.dep = new Set();
  }
  get value() {
    trankRefValue(this);
    return this._value;
  }

  set value(newValue) {
    // 先判断 新旧两个值是否相等 如果相等 就 不进行执行 tiggerEffest
    if (hsaChanged(newValue, this._value)) return;
    this._value = convert(newValue);
    tiggerEffest(this.dep);
  }
}

function convert(value) {
  return isObject(value) ? reactive(value) : value;
}
function trankRefValue(ref) {
  if (isTranking()) {
    trankEffects(ref.dep);
  }
}
export function ref(value) {
  return new RefImpl(value);
}

export function isRef(ref) {
  return !!ref.__v_isRef
}

export function unRef(ref){
  return ref.__v_isRef? ref.value : ref
}

export function proxyRefs(objectWithRefs){
  return new Proxy(objectWithRefs,{

    get:(target,key)=>{
      return unRef(Reflect.get(target, key))
    },

    set(target,key,value){
      if(isRef(target[key]) && !isRef(value)){
       return  target[key].value = value
      }else {
       return  Reflect.set(target,key,value)
      }
    }

    
  })
  
  
}