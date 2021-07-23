export interface IUser {
  id: number;
  name: string;
  last_name: string;
  maternal_name: string;
  phone: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: IUser;
    }
  }
}
