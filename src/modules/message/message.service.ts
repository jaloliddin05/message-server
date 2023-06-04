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
        name: 'ASC',
      },
    });
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
    const response = this.messageRepository.create(data);
    return await this.messageRepository.save(response);
  }
}
