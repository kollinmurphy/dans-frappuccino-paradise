import { APIContext, APIRoute } from "astro";

export const get: APIRoute = ({ request, params }) => {
  const { id } = params as { id: string };

  const product = {
    id: parseInt(id, 10),
    name: 'stuff',
  };

  console.log(request.headers)

  return new Response(JSON.stringify(product), {
    status: 200
  });
}
