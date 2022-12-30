import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreatePostDto } from './dto/posts.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  createPost(@Body() post: CreatePostDto) {
    return this.postsService.createPost(post);
  }

  @Get()
  getPost() {
    return this.postsService.getPosts();
  }
}
