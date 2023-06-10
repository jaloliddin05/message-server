import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

import { Message } from './message.entity';
import { MessageRepository } from './message.repository';
import { CreateMessageDto, UpdateMessageDto } from './dto';
import { UserService } from '../user/user.service';

Injectable();
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: MessageRepository,
    private readonly userService: UserService,
  ) {}

  async getAll(
    options: IPaginationOptions,
    where?: FindOptionsWhere<Message>,
  ): Promise<Pagination<Message>> {
    return paginate<Message>(this.messageRepository, options, {
      order: {
        date: 'DESC',
      },
      where,
      relations: {
        from: true,
        to: true,
      },
    });
  }

  async getInboxUnViewedMessagesCount(id: string) {
    const count = await this.messageRepository.count({
      where: { to: { id }, isViewed: false },
    });
    return count;
  }

  async getOne(id: string) {
    if (!id) {
      throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
    }
    const data = await this.messageRepository.findOne({
      where: { id },
      relations: {
        to: true,
        from: true,
      },
    });

    if (!data) {
      throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
    }
    return data;
  }

  async getTwoUserMessages(
    options: IPaginationOptions,
    firstId: string,
    secondName: string,
  ): Promise<Pagination<Message>> {
    return paginate<Message>(this.messageRepository, options, {
      order: {
        date: 'DESC',
      },
      relations: {
        from: true,
        to: true,
      },
      where: [
        { from: { id: firstId }, to: { name: secondName } },
        { from: { name: secondName }, to: { id: firstId } },
      ],
    });
  }

  async getTaggedMessages(
    options: IPaginationOptions,
    id:string
  ): Promise<Pagination<Message>> {
    return paginate<Message>(this.messageRepository, options, {
      order: {
        date: 'DESC',
      },
      relations: {
        from: true,
        to: true,
      },
      where: [
        { from: { id }, isFromTagged:true },
        { isToTagged:true, to: { id }},
      ],
    });
  }

  async remove(id: string) {
    const response = await this.messageRepository.delete(id);
    return response;
  }

  async change(value: UpdateMessageDto, id: string) {
    const response = await this.messageRepository
      .createQueryBuilder()
      .update()
      .set(value as unknown as Message)
      .where('id = :id', { id })
      .execute();
    return response;
  }

  async create(data: CreateMessageDto) {
    const user = await this.userService.getUserByName(data.to);
    if (user) {
      data.to = user.id;
    } else {
      const newUser = await this.userService.create({ name: data.to });
      data.to = newUser.id;
    }
    const response = this.messageRepository
      .createQueryBuilder()
      .insert()
      .into(Message)
      .values(data as unknown as Message)
      .returning('id')
      .execute();

    return response;
  }
}
