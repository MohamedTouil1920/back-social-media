import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { User } from '../user/entities/user.entity';
import { Publication } from '../publication/entities/publication.entity';

import { Commentaire } from 'src/commentaire/entities/commentaire.entity';


@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async create(notificationDto: {
    userId: number;
    triggeredById: number;
    type: string;
    commentId?: number;
    publicationId?: number;
  }): Promise<Notification> {
    const { userId, triggeredById, type, commentId, publicationId } = notificationDto;

    const notification = new Notification();
    notification.user = { id: userId } as User; 
    notification.triggeredBy = { id: triggeredById } as User; 
    notification.type = type;
    notification.timestamp = new Date(); 

    if (commentId) {
      notification.commentaire = { id: commentId } as Commentaire; // Use 'comment' here
    }

    if (publicationId) {
      notification.publication = { id: publicationId } as Publication; 
    }

    return this.notificationRepository.save(notification);
  }

  async getNotificationsForUser(userId: number): Promise<Notification[]> {
    const notifications = await this.notificationRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'triggeredBy', 'publication', 'comment'], // Ensure 'comment' is included here
      order: { timestamp: 'DESC' },
    });

    if (!notifications) {
      throw new NotFoundException('No notifications found for this user');
    }

    return notifications;
  }

  async markAsRead(notificationId: number): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      where: { id: notificationId },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    notification.isRead = true; // Mark as read
    return this.notificationRepository.save(notification);
  }

  // Mark all notifications for a user as read
  async markAllAsRead(userId: number): Promise<Notification[]> {
    const notifications = await this.notificationRepository.find({
      where: { user: { id: userId }, isRead: false },
    });

    if (!notifications.length) {
      throw new NotFoundException('No unread notifications found for this user');
    }

    notifications.forEach(notification => notification.isRead = true); // Mark all as read
    return this.notificationRepository.save(notifications);
  }
}


