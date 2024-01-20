import {ClassSerializerInterceptor, Controller, Get, Logger, Req, UseInterceptors} from '@nestjs/common';
import {LoggingInterceptor} from "../../client/interceptors/logging.interceptor";
import {ApiOperation, ApiResponse, ApiUseTags} from "@nestjs/swagger";
import {AuthService} from "../../service/auth.service";
import {UserDTO} from "../../service/dto/user.dto";

@Controller('api')
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiUseTags('ideation')
export class IdeationController {
  logger = new Logger('IdeationController');

  constructor(private readonly authService: AuthService) {}

@Get('/ideation')
@ApiOperation({ title: 'Get the list of ideas' })
@ApiResponse({
  status: 200,
  description: 'List all users records',
  type: UserDTO,
})
getideas(@Req() req: any): any {

  return "idea";
}

}
