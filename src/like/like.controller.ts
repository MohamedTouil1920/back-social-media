import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { LikesService } from './like.service';
import { AuthGuard } from 'src/auth/auth.guard';

  @UseGuards(AuthGuard)

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikesService) {}

  @Post('post/:postId')
  async toggleLikeOnPost(
    @Param('postId') postId: number,
    @Req() req  ) {
    return await this.likeService.toggleLikeOnPost(postId, req.user.id);
  }

  @Post('comment/:commentId')
  async toggleLikeOnComment(
    @Param('commentId') commentId: number,
    @Body('userId') userId: number,
  ) {
    return await this.likeService.toggleLikeOnComment(commentId, userId);
  }
}
