interface Customer {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  shippingAddress: string;
  sendMailFlag: boolean;
}

interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface Pageable {
  offset: number;
  sort: Sort;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
}

interface CustomerLists {
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
}

interface CustomerResponse {
  code: number;
  message: string;
  lists: CustomerLists;
}
