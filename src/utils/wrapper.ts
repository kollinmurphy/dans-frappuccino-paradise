import { Account } from "@data/types/account";
import { APIRoute, Params } from "astro";
import { verifyToken } from "./auth";

export type HandlerInput<T> = {
  params: Params;
  body: T;
};

export type Handler<T> = (input: HandlerInput<T>) => any;

export type AuthorizedHandlerInput<T> = {
  params: Params;
  body: T;
  user: Omit<Account, "password">;
};

export type AuthorizedHandler<T> = (input: AuthorizedHandlerInput<T>) => any;

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

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Allow-Headers": "*",
};

const wrapper: (handler: Handler<any>) => APIRoute =
  (handler) =>
  async ({ request, params }) => {
    let body: object = {};
    try {
      body = await request.json();
    } catch (err) {}
    try {
      const result = await handler({
        params,
        body,
      });
      if (!result)
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers,
        });
      return new Response(JSON.stringify(result), { status: 200, headers });
    } catch (err) {
      if (err instanceof HttpError)
        return new Response(JSON.stringify({ error: err.message }), {
          status: err.statusCode,
          headers,
        });
      console.error(err);
      return new Response(
        JSON.stringify({ error: "Something unexpected happened." }),
        { status: 500, headers }
      );
    }
  };

export const authorizedWrapper: (handler: AuthorizedHandler<any>) => APIRoute =
  (handler) =>
  async ({ request, params }) => {
    let body: object = {};
    try {
      body = await request.json();
    } catch (err) {}
    const auth = request.headers.get("authorization")?.split(" ");
    try {
      const user = auth?.length || 0 > 1 ? verifyToken(auth[1]) : null;
      if (!user) throw new ForbiddenError("You must be signed in");
      const result = await handler({
        params,
        body,
        user,
      });
      if (!result)
        return new Response(JSON.stringify({ success: true }), { status: 200, headers });
      return new Response(JSON.stringify(result), {
        status: 200,
        headers,
      });
    } catch (err) {
      if (err instanceof HttpError)
        return new Response(JSON.stringify({ error: err.message }), {
          status: err.statusCode,
          headers,
        });
      console.error(err);
      return new Response(
        JSON.stringify({ error: "Something unexpected happened." }),
        {
          status: 500,
          headers,
        }
      );
    }
  };

export const employeeWrapper: (handler: AuthorizedHandler<any>) => APIRoute =
  (handler) =>
  async ({ request, params }) => {
    let body: object = {};
    try {
      body = await request.json();
    } catch (err) {}
    const auth = request.headers.get("authorization")?.split(" ");
    try {
      const user = auth?.length || 0 > 1 ? verifyToken(auth[1]) : null;
      if (!user) throw new ForbiddenError("You must be signed in");
      if (user.role === "user")
        throw new ForbiddenError(
          "You must be an employee or manager to access this resource"
        );
      const result = await handler({
        params,
        body,
        user,
      });
      if (!result)
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers,
        });
      return new Response(JSON.stringify(result), { status: 200, headers });
    } catch (err) {
      if (err instanceof HttpError)
        return new Response(JSON.stringify({ error: err.message }), {
          status: err.statusCode,
          headers,
        });
      console.error(err);
      return new Response(
        JSON.stringify({ error: "Something unexpected happened." }),
        { status: 500, headers }
      );
    }
  };

export const adminWrapper: (handler: AuthorizedHandler<any>) => APIRoute =
  (handler) =>
  async ({ request, params }) => {
    let body: object = {};
    try {
      body = await request.json();
    } catch (err) {}
    const auth = request.headers.get("authorization")?.split(" ");
    try {
      const user = auth?.length || 0 > 1 ? verifyToken(auth[1]) : null;
      if (!user) throw new ForbiddenError("You must be signed in");
      if (user.role !== "manager")
        throw new ForbiddenError(
          "You must be an admin to access this resource"
        );
      const result = await handler({
        params,
        body,
        user,
      });
      if (!result)
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers,
        });
      return new Response(JSON.stringify(result), { status: 200, headers });
    } catch (err) {
      if (err instanceof HttpError)
        return new Response(JSON.stringify({ error: err.message }), {
          status: err.statusCode,
          headers,
        });
      console.error(err);
      return new Response(
        JSON.stringify({ error: "Something unexpected happened." }),
        { status: 500, headers }
      );
    }
  };

export default wrapper;
