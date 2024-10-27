export default function getPaymentStatus(status: any) {
  switch (status) {
    case 'PENDING':
      return {
        color: 'warning',
        label: 'Đang xử lý',
      };

    case 'COMPLETED':
      return {
        color: 'success',
        label: 'Thành công',
      };
    case 'CANCELLED':
      return {
        color: 'error',
        label: 'Đã hủy',
      };

    default:
      return {
        color: 'default',
        label: 'Unknow',
      };
  }
}
