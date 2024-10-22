import axios, { endpoints } from 'src/utils/axios';
// ----------------------------------------------------------------------

const ENDPOINT = endpoints.cart;
// ----------------------------------------------------------------------

export async function createCartBatch(payload: {
  cartId: number;
  items: { productId: number; quantity: number }[];
}) {
  const response = await axios.post(ENDPOINT.batch, payload);
  return response?.data;
}
