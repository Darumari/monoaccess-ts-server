import { Router } from 'express';

abstract class BaseRouter {
  protected router: Router = Router();
  // eslint-disable-next-line no-useless-constructor
  constructor () {}
}

export default BaseRouter;
