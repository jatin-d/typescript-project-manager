//Autobind Decorator
export function autobind(_:any, _2:string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const bindFn = originalMethod.bind(this)
      return bindFn
    }
  }
  return adjustedDescriptor
}