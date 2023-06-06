import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

@Injectable()
class MessageQueryParerMiddleware implements NestMiddleware {
  use(req, res: Response, next: NextFunction) {
    let where: any = {};
    const { from, to } = req.query;

    if (from) {
      where.from = {
        id: from,
      };
    }
    if (to) {
      where.to = {
        id: to,
      };
    }
    req.where = where;
    next();
  }
}

export default MessageQueryParerMiddleware;
