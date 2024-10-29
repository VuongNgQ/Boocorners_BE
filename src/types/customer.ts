export type Customer = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  shippingAddress: string;
  sendMailFlag: boolean;
};

export type Sort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

export type Pageable = {
  offset: number;
  sort: Sort;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
};

export type CustomerLists = {
  totalElements: number;
  totalPages: number;
  size: number;
  content: Customer[];
  number: number;
  sort: Sort;
  pageable: Pageable;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};

export type CustomerResponse = {
  code: number;
  message: string;
  lists: CustomerLists;
};
