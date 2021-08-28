import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers';
import { QueryFailedError } from 'typeorm';

/**
 * Catches all uncaught errors from the backend and returns an error message in JSON form.
 * QueryFailedError errors are likely due to a failing UNIQUE or FOREIGN KEY constraints.
 * They are converted to Bad Request Errors.
 * Other uncaught errors are considered Internal Server Errors.
 */
@Middleware({ type: 'after' })
export class ErrorHander implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: any, next: (error: any) => any): void {
    if (error instanceof QueryFailedError) {
      response.status(400);
      response.json({
        httpCode: 400,
        name: 'BadRequestError',
        message: error.message,
      });
    } else {
      response.status(error.httpCode || 500);
      response.json(error);
    }
  }
}
