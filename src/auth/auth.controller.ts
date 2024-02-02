import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccessKeyDto } from './dtos/accessKey.dto';
import { SignupDto } from './dtos/signup.dto';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signUp(signupDto);
  }

  @Post('/access-key')
  async accessKey(@Body() accessKeyDto: AccessKeyDto) {
    return this.authService.getApiKey(accessKeyDto);
  }
}
