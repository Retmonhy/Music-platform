import { HttpException } from '@nestjs/common';
export class ApiError extends HttpException {
  errorStatus: number;
  errors: any[];
  constructor(status: number, message: string, errors = []) {
    super(message, status);
    this.errorStatus = status;
    this.errors = errors;
  }
  //static - это функции которые можно использовать, не создавая экземпляр класса
  static UnauthorizedError() {
    return new ApiError(401, 'Пользователь не авторизован');
  }
  static BadRequest(message, errors?) {
    return new ApiError(400, message, errors);
  }
}
