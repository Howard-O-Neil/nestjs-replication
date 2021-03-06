import express from 'express';
import { RouteDefinition } from './controller/route-definition';

export const app = express();
const port = 3000;

app.get('/', (_, res) => {
    res.send('hello world ');
});

// import "./application/people_info"
import './controller/test';
// after this, all decorators related to UserController is loaded
import UserController from './controller/test';

[
  UserController
].forEach((controller) => {
    // This is our instantiated class
    const instance = new controller();
    // The prefix saved to our controller
    const prefix = Reflect.getMetadata('prefix', controller);
    // Our `routes` array containing all our routes for this controller
    const routes: Array<RouteDefinition> = Reflect.getMetadata('routes', controller);

    // Iterate over all routes and register them to our express application
    routes.forEach((route) => {
        // It would be a good idea at this point to substitute the `app[route.requestMethod]` with a `switch/case` statement
        // since we can't be sure about the availability of methods on our `app` object. But for the sake of simplicity
        // this should be enough for now.
        app[route.requestMethod](prefix + route.path, (req: express.Request, res: express.Response) => {
            // Execute our method for this path and pass our express request and response object.
            //@ts-ignore
            instance[route.methodName](req, res);
        });
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
