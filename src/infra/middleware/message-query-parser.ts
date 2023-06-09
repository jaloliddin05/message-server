import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

@Injectable()
class MessageQueryParerMiddleware implements NestMiddleware {
  use(req, res: Response, next: NextFunction) {
    let where: any = {};
    const { from, to, isFromTagged, isToTagged } = req.query;

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
    if (isFromTagged || isFromTagged === false) {
      where.isFromTagged = isFromTagged;
    }
    if (isToTagged || isToTagged === false) {
      where.isToTagged = isToTagged;
    }

    req.where = where;
    next();
  }
}

export default MessageQueryParerMiddleware;
