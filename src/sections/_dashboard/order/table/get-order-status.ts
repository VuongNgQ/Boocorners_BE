export default function getOrderStatus(status: string) {
  switch (status) {
    case 'PROCESSING':
      return {
        color: 'warning',
        label: 'Đang xử lý',
      };
    case 'IN_PROGRESS':
      return {
        color: 'info',
        label: 'Đang tiến hành',
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
