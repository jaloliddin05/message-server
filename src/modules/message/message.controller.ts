import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
  Delete,
  Patch,
  Param,
  Get,
  Query,
  Req,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import { CreateMessageDto, UpdateMessageDto } from './dto';
import { Message } from './message.entity';
import { MessageService } from './message.service';
import { PaginationDto } from '../../infra/shared/dto';
import { Route } from '../../infra/shared/decorators/route.decorator';

@ApiTags('Message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('/')
  @ApiOperation({ summary: 'Method: returns all messages' })
  @ApiOkResponse({
    description: 'The messages were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getData(
    @Route() route: string,
    @Query() query: PaginationDto,
    @Req() req,
  ) {
    try {
      return await this.messageService.getAll({ ...query, route }, req.where);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Method: returns single message by id' })
  @ApiOkResponse({
    description: 'The message was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getMe(@Param('id') id: string): Promise<Message> {
    return this.messageService.getOne(id);
  }

  @Get('/count-inbox/:userId')
  @ApiOperation({ summary: 'Method: returns single message by id' })
  @ApiOkResponse({
    description: 'The message was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getInBoxMessagesCount(@Param('userId') id: string) {
    try {
      return this.messageService.getInboxUnViewedMessagesCount(id);
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new message' })
  @ApiCreatedResponse({
    description: 'The message was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() data: CreateMessageDto) {
    try {
      return await this.messageService.create(data);
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Method: updating message' })
  @ApiOkResponse({
    description: 'Message was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() positionData: UpdateMessageDto,
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    try {
      return await this.messageService.change(positionData, id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting message' })
  @ApiOkResponse({
    description: 'Message was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    try {
      return await this.messageService.remove(id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
