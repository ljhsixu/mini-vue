import {readonly}from '../reactive'
describe("readnoly",()=>{
    it("happy path",()=>{
        const original = {foo:1,bar:{baz:1}}
        const warpped = readonly(original)
        expect(warpped).not.toBe(original)
        expect(warpped.foo).toBe(1)
    })


    it('warn then call set'),()=>{

        console.warn = jest.fn()

        const user = readonly({
            age:20
        })

        user.age = 10

        expect(console.warn).toBeCalled()
    }
})