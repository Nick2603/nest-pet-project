import { User } from 'src/users/schema/user.schema';
import { IUserViewModel } from '../users/interface/user.interface';

export const mapUserDBTypeToViewType = (user: User): IUserViewModel => {
  return {
    id: user._id,
    login: user.login,
    email: user.email,
    createdAt: user.createdAt,
  };
};
