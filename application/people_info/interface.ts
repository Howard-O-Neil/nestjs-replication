import {app} from "@/main"

app.get('/hello', (_, res) => {
    res.send("hello world api")
})

class Point {
    constructor(public x: number, public y: number) {}
}
const strictedMetadataKey = Symbol("stricted");

class Line {
    private _start: Point;
    private _end: Point;

    set start(value: Point) {
        this._start = value;
    }

    get start() {
        return this._start;
    }

    set end(value: Point) {
        this._end = value;
    }

    get end() {
        return this._end;
    }

    @validate_func
    check(@stricted a: Point, @stricted b: Point) {
        console.log("\n ============ \n")
        console.log(a, b)
    }

    constructor() {
        this._start = new Point(0, 0)
        this._end = new Point(0, 1)
    }
}

function stricted(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    let existingRequiredParameters: number[] = Reflect.getOwnMetadata(strictedMetadataKey, target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(strictedMetadataKey, existingRequiredParameters, target, propertyKey);
}

type generic_func = (...x: any[]) => any | void
function validate_func(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<generic_func>) {
    let method = descriptor.value!;
    descriptor.value = function (...args: any[]) {
        console.log(target)
        let metaDataTypes: any[] = Reflect.getMetadata("design:paramtypes", target, propertyKey)
        let requiredParameters: number[] = Reflect.getMetadata(strictedMetadataKey, target, propertyKey)

        if (requiredParameters) {
            for (let index of requiredParameters) {
                if (index >= requiredParameters.length || args[index] == undefined
                    || !(args[index] instanceof metaDataTypes[index])) {
                    console.log('throw new TypeError(\'Invalid type\')')
                }
            }
        }

        return method.apply(this, args)
    }
}

const line = new Line()
// @ts-ignore
line.start = new Point(0, 1)

// @ts-ignore
line.check("hello world", new Point(0, 2))
