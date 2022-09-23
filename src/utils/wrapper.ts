import { APIRoute, Params } from "astro";

export type HandlerInput<T> = {
  request: Request;
  params: Params;
  body: T;
};

export type Handler<T> = (input: HandlerInput<T>) => any;

class HttpError extends Error {
  declare statusCode: number;

  constructor(statusCode: number, message?: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class InvalidRequestError extends HttpError {
  constructor(message: string) {
    super(400, message);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string) {
    super(403, message);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(404, message);
  }
}

const wrapper: (handler: Handler<any>) => APIRoute =
  (handler) =>
  async ({ request, params }) => {
    let body: object = {};
    try {
      body = await request.json();
    } catch (err) {
      console.error("Body is not a valid JSON");
    }
    try {
      const result = await handler({
        request,
        params,
        body,
      });
      if (!result)
        return new Response(JSON.stringify({ success: true }), { status: 200 })
      return new Response(JSON.stringify(result), { status: 200 });
    } catch (err) {
      if (err instanceof HttpError)
        return new Response(JSON.stringify({ error: err.message }), {
          status: err.statusCode,
        });
      console.error(err);
      return new Response(
        JSON.stringify({ error: "Something unexpected happened." }),
        { status: 500 }
      );
    }
  };

export default wrapper;
