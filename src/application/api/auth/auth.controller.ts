import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestRegisterDTO } from '@/application/api/auth/auth.schema';

@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {
  @ApiResponse({
    status: 201,
    description: 'Register new user in application',
  })
  @Post('/register')
  register(@Body() body: RequestRegisterDTO): string {
    return body.email;
  }
}
