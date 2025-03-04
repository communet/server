import { AppPostDto } from '@/app.schema';
import { AppService } from '@/app.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// NOTE: Swagger API example
@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get Hello' })
  @ApiResponse({
    status: 200,
    description: 'Hello World',
  })
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @ApiOperation({ summary: 'Post Hello' })
  @ApiResponse({
    status: 200,
    description: 'Hello World',
  })
  postHello(@Body() body: AppPostDto): string {
    console.log(body);
    return this.appService.getHello();
  }
}
