import HttpException from "./HttpException";

class BadRequestException extends HttpException {
  constructor() {
    super(400, `Request body is not correct`);
  }
}

export default BadRequestException;