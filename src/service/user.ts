import { Inject, Provide } from '@midwayjs/decorator';
import { Repository } from 'typeorm';
import { User } from '../entity/user';
import { InjectEntityModel } from '@midwayjs/orm';
import {
  CreateUserDto,
  DeleteUserDto,
  InfoUserDto,
  PageUserDto,
  UpdateUserDto,
} from '../dto/user';
import { isEmpty } from 'lodash';
import { Utils } from '../common/utils';
import { CreateTokenDto } from '../dto/token';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  @Inject()
  utils: Utils;

  async getUserByName(username: string): Promise<User> {
    try {
      return await this.userModel.findOne({ username: username });
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async create(params: CreateUserDto): Promise<boolean> {
    const exists = await this.userModel.findOne({ username: params.username });
    if (!isEmpty(exists)) {
      return false;
    }
    let user = new User();
    user.username = params.username;
    user.password = this.utils.md5(params.password);
    user.nickname = params.nickname;
    user.gender = params.gender;
    await this.userModel.save(user);
    return true;
  }

  async update(params: UpdateUserDto): Promise<void> {
    await this.userModel.update(params.id, { ...params });
  }

  async search(params: PageUserDto): Promise<User[]> {
    return await this.userModel.find({
      skip: params.page,
      take: params.limit,
    });
  }

  async delete(params: DeleteUserDto): Promise<void> {
    await this.userModel.delete(params.id);
  }

  async info(params: InfoUserDto): Promise<User> {
    return await this.userModel.findOne({ id: params.id });
  }

  async createToken(params: CreateTokenDto): Promise<string> {
    let user = await this.userModel.findOne({ username: params.username });
    if (isEmpty(user)) {
      return null;
    }
    if (!user.enabled) {
      return null;
    }
    if (user.locked) {
      return null;
    }
    console.log(user);
    return this.utils.jwtSign({
      username: params.username,
      password: params.password,
    });
  }
}
