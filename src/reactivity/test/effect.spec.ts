
import {reactive} from '../reactive'

import {effect} from '../effect'
describe('effect', ()=>{
    it.skip('happy path', ()=>{
        const user = reactive({
            age:10
        })
        let nextAge

        effect(()=>{
            nextAge = user.age + 1
        })
        expect(nextAge).toBe(11)
        

        // update

        user.age++ 
        expect(nextAge).toBe(12)
    })


    it('should return runner when call effect',()=>{
        // effect(fn) -> function(runner) -> fn -> return 
        let foo = 10

      let runner = effect(()=>{
            foo++
            return 'foo'
        })

        expect(foo).toBe(11)
       const r =  runner()
 
        expect(foo).toBe(12)
        expect(r).toBe('foo')


    })


    it("scheduler", () => {
        // 1.通过effect 的第二个参数给定一个 scheduler 的fn
        // 2.当effect 第一次执行的时候还会执行fn
        // 3.当响应式对象执行set 更新的时候 就不会执行 scheduler
        // 4.当执行runner 的时候就会再次执行fn
        let dummy;
        let run: any;
    
        const scheduler = jest.fn(() => {
          run = runner;
        });
        const obj = reactive({ foo: 1 });
        const runner = effect(
          () => {
            dummy = obj.foo;
          },
          { scheduler }
        );

        // 判断scheduler 第一个 是不是 没有执行
        expect(scheduler).not.toHaveBeenCalled();
        expect(dummy).toBe(1);
        // should be called on first trigger
        obj.foo++;
        // 判断scheduler 第一个 是不是 执行了一次

        expect(scheduler).toHaveBeenCalledTimes(1);
        // // should not run yet
        expect(dummy).toBe(1);
        // // manually run
        run();
        // // should have run
        expect(dummy).toBe(2);
      });



})