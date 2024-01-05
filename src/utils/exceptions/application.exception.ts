import HttpException from "./http.exception";

class EventNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Event with id ${id} not found`);
  }
}

class UserNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `User with id ${id} not found`);
  }
}

export { EventNotFoundException, UserNotFoundException };
