import {Controller} from './controller';
import {Get} from './route';
import {Request, Response} from 'express';

@Controller('/user')
export default class UserController {
  @Get('/')
  public index(req: Request, res: Response) {
    return res.send('User overview');
  }

  @Get('/:name')
  public details(req: Request, res: Response) {
    return res.send(`You are looking at the profile of ${req.params.name}`);
  }

  constructor() {

  }
}

const user = new UserController()
// console.log(Reflect.getMetadata(''))
