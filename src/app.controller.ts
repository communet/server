import { AppPostDto } from '@/app.schema';
import { AppService } from '@/app.service';
import { IRedisProvider } from '@/infra/nest-redis-adapter/redis.provider';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// NOTE: Swagger API example
@ApiTags('App')
@Controller()
export class AppController {
  constructor(
    @Inject(AppService)
    private readonly appService: AppService,

    @Inject(IRedisProvider)
    private readonly redis: IRedisProvider,
  ) {}

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
  async postHello(@Body() body: AppPostDto): Promise<string> {
    await this.redis.connection.set('test', 'test');
    console.log(await this.redis.connection.get('test'));
    await this.redis.connection.del('test');

    console.log(body.username);

    return this.appService.getHello();
  }
}
