class ReactiveEffect {
  private _fn: any;

  constructor(fn) {
    this._fn = fn;
  }

  run() {
    // 在每次执行Effect时 都将 activeEffect 等于这个 实例化的 ReactiveEffect
    activeEffect = this;
    this._fn();
  }
}
// 收集依赖必须 有一容器
const targetMap = new Map();
// 收集依赖
export function trank(target, key) {
  // 如果收集依赖必须 要根据映射关系 target -> key -> dep

  // 根据target 将 key 存到 大容器里面 然后根据 target 取出key 在从 key 里面取出对应的方法

  // 通过 targe 来取出 对应的 依赖map depsMap
  let depsMap = targetMap.get(target);
  // 同时判断如果初始化 没有 对应的depsMap
  if (!depsMap) {
    // 初始化一个depsMap
    depsMap = new Map();
    // 同时将他放入到 对应的target容器中
    targetMap.set(target, depsMap);
  }
  // 通过key 来取出对应的 fn
  let dep = depsMap.get(key);
  // 同时判断如果初始化 没有 对应的dep
  if (!dep) {
    // 初始化一个Set
    dep = new Set();
  }
  // 当每次执行trank 时就将activeEffect 收集起来
  dep.add(activeEffect);
}
// 触发依赖
export function tigger(target, key) {
  // 同上 将 取出来dep
  let depsMap = targetMap.get(target);
  let dep = depsMap.get(key);
  // 将dep 取出来 遍历 因为 每一个都是 effect 都是 一个 类 ReactiveEffect 所以执行里面的effect 里面的run 方法 就将 所有的fn 都执行了
  for (let effect of dep) {
    effect.run();
  }
}

// 创建一个 全局变量
let activeEffect;
export function effect(fn) {
  // 封装一个 ReactiveEffect 里面 定义方法触发 传递进来的fn
  const _effect = new ReactiveEffect(fn);

  _effect.run();
}
