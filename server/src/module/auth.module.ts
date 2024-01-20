import { Module, HttpModule } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UserModule } from '../module/user.module';
import { PassportModule } from '@nestjs/passport';
import { Oauth2Strategy } from '../security/passport.oauth2.strategy';
import { UserOauth2Controller } from '../web/rest/user.oauth2.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorityRepository } from '../repository/authority.repository';

import { PublicUserController } from '../web/rest/public.user.controller';
import { AccountController } from '../web/rest/account.controller';
import { IdeationModule } from '../module/ideation.module';
import {IdeationController} from "../web/rest/ideation.controller";

@Module({
    imports: [TypeOrmModule.forFeature([AuthorityRepository]), UserModule, PassportModule, HttpModule, IdeationModule],
    controllers: [UserOauth2Controller, PublicUserController, AccountController,IdeationController],
    providers: [AuthService, Oauth2Strategy],
    exports: [AuthService],
})
export class AuthModule {}
