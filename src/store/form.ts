import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { countryList } from './const';

export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  passwordConfirm: string;
  gender: string;
  accept: boolean;
  picture: Base64URLString;
  country: string;
}

interface FormState {
  form: FormData;
  countryList: string[];
}

const initialState: FormState = {
  form: {
    name: '',
    age: 0,
    email: '',
    password: '',
    passwordConfirm: '',
    gender: 'male',
    accept: false,
    picture: '',
    country: '',
  },
  countryList,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    formUpdate: (state, action: PayloadAction<FormData>) => {
      state.form = action.payload;
    },
  },
});

export const { formUpdate } = formSlice.actions;
