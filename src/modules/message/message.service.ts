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

Injectable();
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: MessageRepository,
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
    const data = await this.messageRepository.findOne({
      where: { id },
    });

    if (!data) {
      throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
    }
    return data;
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
