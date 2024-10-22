import axios, { endpoints } from 'src/utils/axios';
// ----------------------------------------------------------------------

const ENDPOINT = endpoints.order;
// ----------------------------------------------------------------------

export async function createOrder(payload: {
  cartId: number;
  customerInfoId: number;
  description: string;
  returnUrl: string;
  cancelUrl: string;
  prepaid: boolean;
}) {
  const response = await axios.post(ENDPOINT.create, payload);
  return response?.data;
}
