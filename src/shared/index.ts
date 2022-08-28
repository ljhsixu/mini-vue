export const extend = Object.assign 

export const isObject = (val:any)=>{
   return  val !== null && typeof val === 'object'
}

export const hsaChanged = (value,newValue)=>{
   return Object.is(value,newValue)
}