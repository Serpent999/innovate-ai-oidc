import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {AuthorityRepository} from "../repository/authority.repository";
import {UserService} from "./user.service";
import {UserDTO} from "./dto/user.dto";

@Injectable()
export class IdeationService {
  logger = new Logger('IdeationService');
  constructor(
    @InjectRepository(AuthorityRepository) private authorityRepository: AuthorityRepository,
    private userService: UserService,
  ) {}

  getIdeas(): any {


    return "userDTO";
  }
}
