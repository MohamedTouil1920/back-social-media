import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @Patch(':id/read')
  async markAsRead(@Param('id') id: number) {
    return this.notificationService.markAsRead(id);
  }
}
