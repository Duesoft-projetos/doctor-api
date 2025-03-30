import { Public } from '@decorators/public.decorator';
import { Body, Controller, Post } from '@nestjs/common';

import { SignInDto } from './dtos/sign-in.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post('login')
    async signIn(@Body() data: SignInDto) {
        return await this.authService.signIn(data.email, data.password);
    }
}