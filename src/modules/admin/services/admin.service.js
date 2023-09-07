import AppError from '../../../shared/errors/app.error.js';
import { Profile } from '../models/profile.model.js';
import { UserDto } from '../dtos/user.dto.js'

export class AdminService {
  async getProfileById(id) {
    const user = await Profile.findOne({
      where: {
        id
      }
    });

    if (!user) {
      throw new AppError('User not found!', 404);
    }

    return UserDto.factory(user);
  }
}