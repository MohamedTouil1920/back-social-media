import { Body, Controller, Param, Post } from '@nestjs/common';
import { LikesService } from './like.service';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikesService) {}

  @Post('post/:postId')
  async toggleLikeOnPost(
    @Param('postId') postId: number,
    @Body('userId') userId: number,
  ) {
    return await this.likeService.toggleLikeOnPost(postId, userId);
  }

  @Post('comment/:commentId')
  async toggleLikeOnComment(
    @Param('commentId') commentId: number,
    @Body('userId') userId: number,
  ) {
    return await this.likeService.toggleLikeOnComment(commentId, userId);
  }
}
