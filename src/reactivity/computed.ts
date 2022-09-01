import { ReactiveEffect } from "./effect";
class ComputedRefImpl {
  private _getter: any;
  private _value: any;
  private _diry: boolean = true;
  private _effect: any;
  constructor(getter) {
    this._getter = getter;
    this._effect = new ReactiveEffect(getter,()=>{
        this._diry = true
    });
  }
  get value() {
    if (this._diry) {
      this._diry = false;
      this._value = this._effect.run();
    }
    return this._value;
  }
}

export function computed(getter) {
  return new ComputedRefImpl(getter);
}
