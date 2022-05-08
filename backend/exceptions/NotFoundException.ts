import HttpException from "./HttpException";

class NotFoundException extends HttpException {
  constructor(id?: string) {
    const identifier: string = id ? id : "";
    super(404, `Post with id ${identifier} not found`);
  }
}

export default NotFoundException;