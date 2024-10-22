import type { ICustomerCheckout } from 'src/types/order';

import axios, { endpoints } from 'src/utils/axios';
// ----------------------------------------------------------------------

const ENDPOINT = endpoints.customer;
// ----------------------------------------------------------------------

export async function createCustomerInfo(payload: ICustomerCheckout) {
  const response = await axios.post(ENDPOINT.create, {
    ...payload,
    sendMailFlag: true,
  });
  return response?.data;
}
