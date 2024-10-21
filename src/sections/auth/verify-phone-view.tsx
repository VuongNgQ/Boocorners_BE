import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import Link from '@mui/material/Link';
import { Alert } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

import { verifyPhone } from 'src/auth/context/jwt';

// ----------------------------------------------------------------------

export type VerifyPhoneSchemaType = zod.infer<typeof VerifyPhoneSchema>;

export const VerifyPhoneSchema = zod.object({
  phone: zod.string(),
  code: zod.string().min(1, { message: 'Code is required!' }),
});

// ----------------------------------------------------------------------

export function VerifyPhoneView() {
  const [searchParams] = useSearchParams();
  const phoneNumber = searchParams.get('phone');
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState<any>();

  const defaultValues = {
    phone: phoneNumber || '0123456789',
    code: '1234',
  };

  const methods = useForm<VerifyPhoneSchemaType>({
    resolver: zodResolver(VerifyPhoneSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await verifyPhone({
        code: data.code,
        phoneNumber: data.phone,
      });

      if (response && response.code === 200) {
        toast.success('Verify phone successful');
        router.push(paths.auth.jwt.signIn);
      } else {
        setErrorMsg('Invalid verification code or phone number.');
      }

      // await checkUserSession?.();
    } catch (error) {
      console.error(error);
      setErrorMsg(error instanceof Error ? error.message : error);
    }
  });

  const renderHead = (
    <Stack spacing={1.5} sx={{ mb: 5 }}>
      <Typography variant="h5">Get started absolutely free</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Already have an account?
        </Typography>

        <Link component={RouterLink} href={paths.auth.jwt.signIn} variant="subtitle2">
          Sign in
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={3}>
      <Field.Text
        name="phone"
        label="Phone Number"
        InputLabelProps={{ shrink: true }}
        defaultValue={phoneNumber}
        sx={{ display: 'none' }}
      />
      <Field.Text name="code" label="Code" InputLabelProps={{ shrink: true }} />

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Create account..."
      >
        Verify
      </LoadingButton>
    </Stack>
  );

  return (
    <>
      {renderHead}

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg?.message || 'Invalid verification code or phone number.'}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>
    </>
  );
}
