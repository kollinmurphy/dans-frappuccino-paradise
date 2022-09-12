export async function get({ request, params }) {
  const { id } = params;
  const product = {
    id: parseInt(id, 10),
    name: 'stuff',
  };

  console.log(request.headers)

  return new Response(JSON.stringify(product), {
    status: 200
  });
}
