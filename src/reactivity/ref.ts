import { isObject } from "./../shared/index";
import { trankEffects, tiggerEffest, isTranking } from "./effect";
import { hsaChanged } from "../shared";
import { reactive } from "./reactive";
class RefImpl {
  private _value: any;
  private dep: any;
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
