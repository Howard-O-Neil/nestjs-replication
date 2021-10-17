import 'reflect-metadata'
import {RouteDefinition} from './route-definition';

export const Get = (path: string): any => {
    // `target` equals our class, `propertyKey` equals our decorated method name
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor): any => {
        // In case this is the first route to be registered the `routes` metadata is likely to be undefined at this point.
        // To prevent any further validation simply set it to an empty array here.

        console.log(target.constructor)
        console.log(target)

        if (!Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor);
        }

        // Get the routes stored so far, extend it by the new route and re-set the metadata.
        const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>;
        console.log(routes)
        routes.push({
            requestMethod: 'get',
            path,
            methodName: propertyKey
        });
        Reflect.defineMetadata('routes', routes, target.constructor);
    };
};
