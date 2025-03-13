import { boolean, number, object, ref, string, type Schema } from 'yup';

export type TField = 'name' | 'age' | 'email' | 'password' | 'passwordConfirm' | 'accept';

export const fields: Record<TField, Schema> = {
  name: string()
    .matches(/^[A-ZА-Я]/, 'first letter must be uppercased ')
    .required(),
  age: number()
    .transform(val => (Number.isFinite(val) ? val : null))
    .positive()
    .integer()
    .nullable(),
  email: string().email().required(),
  password: string()
    .matches(/\d/, 'should contain at least one number')
    .matches(/[A-ZА-Я]/, 'should contain at least one uppercased letter')
    .matches(/[a-zа-я]/, 'should contain at least one lowercased letter')
    .matches(/[~!@#$%^&*\-_+=]/, 'should contain at least one special character'),
  passwordConfirm: string()
    .required('please confirm your password')
    .oneOf([ref('password')], 'passwords should match'),
  accept: boolean().isTrue('must be accepted'),
};

export const schema = object().shape(fields);
