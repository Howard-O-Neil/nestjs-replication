import 'reflect-metadata'

export const Controller = (prefix: string = ''): any => {
    return function sealed(contructor_func: {new(...args: any[]): any}): any {
        Reflect.defineMetadata('prefix', prefix, contructor_func);

        // Since routes are set by our methods this should almost never be true (except the controller has no methods)
        if (!Reflect.hasMetadata('routes', contructor_func)) {
            Reflect.defineMetadata('routes', [], contructor_func);
        }
    };
};

@Controller('test-frefix')
class TestClass {
    constructor() {

    }
}

var tl = new TestClass();
console.log(Reflect.getMetadata("prefix", TestClass))
