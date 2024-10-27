import type { Order } from 'src/types/order';
import type { DialogProps } from '@mui/material';
import type { LabelColor } from 'src/components/label';

import { DataGrid } from '@mui/x-data-grid';
import {
  Box,
  Stack,
  Dialog,
  Button,
  Divider,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

import { fDateTime } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { Label } from 'src/components/label';

import getOrderStatus from './table/get-order-status';
import { detailColumns } from './table/detail-column';
import getPaymentStatus from './table/get-payment-status';

type Props = Omit<DialogProps, 'children'> & {
  order: Order;
};

export default function OrderModalDetails({ order, ...dialogProps }: Props) {
  if (!dialogProps.open && !order) return <></>;
  const status = getOrderStatus(order.orderStatus);
  const paymentStatus = getPaymentStatus(order?.payment?.paymentStatus);
  return (
    <Dialog
      PaperProps={{
        sx: {
          maxWidth: 'lg',
        },
      }}
      {...dialogProps}
    >
      <DialogTitle>Xem chi tiết</DialogTitle>
      <DialogContent>
        <Stack spacing={2} width={1}>
          <Typography variant="h6">Thông tin đơn hàng</Typography>

          <Block label="Tracking number" content={order.orderTrackingNumber} />
          <Block label="Tổng số lượng" content={order.totalQuantity} />
          <Block label="Tổng tiền" content={fCurrency(order.totalPrice)} />
          <Block label="Ngày lập" content={fDateTime(order.dateCreated, 'DD/MM/YYYY HH:mm:ss')} />
          <Block
            label="Ngày vận chuyển"
            content={fDateTime(order.deliveryDate, 'DD/MM/YYYY HH:mm:ss')}
          />
          <Block
            label="Trạng thái đơn"
            content={<Label color={status.color as LabelColor}>{status.label}</Label>}
          />
          <Block label="Đã trả" content={fCurrency(order.paidAmount)} />
          {order?.customerInfo && (
            <>
              <Divider />
              <Typography variant="h6">Thông tin khách hàng</Typography>
              <Block label="Họ và tên" content={order.customerInfo.fullName} />
              <Block label="Email" content={order.customerInfo.email} />
              <Block label="Số điện thoại" content={order.customerInfo.phoneNumber} />
              <Block label="Địa chỉ" content={order.customerInfo.shippingAddress} />
            </>
          )}
          <Divider />
          <Typography variant="h6">Sản phẩm thuộc đơn</Typography>
          <DataGrid
            columns={detailColumns}
            rows={order.cart.items.map((item) => ({
              ...item.product,
              totalPrice: item.product.price * item.quantity,
            }))}
            pageSizeOptions={[5, 10, 50]}
            getRowHeight={() => 'auto'}
            disableRowSelectionOnClick
            disableColumnMenu
          />

          {order.payment && (
            <>
              <Divider />
              <Typography variant="h6">Thanh toán</Typography>
              <Block
                label="Hạng mức thanh toán trước"
                content={
                  <Label color={order.prepaid ? 'warning' : 'info'}>
                    {' '}
                    {order.prepaid ? '70%' : '100%'}
                  </Label>
                }
              />
              <Block label="Phương thức thanh toán" content={order.payment.paymentMethod} />
              <Block label="Đã trả" content={fCurrency(order.payment.amount)} />
              <Block
                label="Tình trạng thanh toán"
                content={
                  <Label color={paymentStatus.color as LabelColor}>{paymentStatus.label}</Label>
                }
              />
            </>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={dialogProps.onClose as any}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
}

type BLockProps = {
  label: string;
  content: any;
};
function Block({ label, content }: BLockProps) {
  return (
    <Stack spacing={0.5} width={1}>
      <Typography variant="body2">{label}:</Typography>
      <Box>{content}</Box>
    </Stack>
  );
}
