import axios, { endpoints } from 'src/utils/axios';

import { setSession } from './utils';

// ----------------------------------------------------------------------

export type SignInParams = {
  phoneNumber: string;
  password: string;
};

export type SignUpParams = {
  email: string;
  password: string;
  phoneNumber: string;
};

export type VerifyParams = {
  code: string;
  phoneNumber: string;
};

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ phoneNumber, password }: SignInParams) => {
  const params = { phoneNumber, password };

  const res = await axios.post(endpoints.auth.signIn, params);

  const { token } = res.data;

  setSession(token);

  delete res.data.token;
  delete res.data.type;
  localStorage.setItem('user', JSON.stringify(res.data));

  return res.data;
};

/** **************************************
 * Sign up
 *************************************** */
export const signUp = async ({ email, password, phoneNumber }: SignUpParams) => {
  const params = {
    email,
    password,
    phoneNumber,
  };

  const res = await axios.post(endpoints.auth.signUp, params);

  return res.data;
};

/** **************************************
 * Verify phone
 *************************************** */
export const verifyPhone = async ({ code, phoneNumber }: VerifyParams) => {
  const res = await axios.post(`${endpoints.auth.verify}/${phoneNumber}/${code}`);

  // if (res.data.code !== 200) {
  //   throw new Error(res.data.message);
  // }

  return res.data;
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async (): Promise<void> => {
  try {
    localStorage.removeItem('user');
    await setSession(null);
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};
