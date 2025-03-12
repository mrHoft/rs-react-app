import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { countries, genders } from './const';

export interface FormData {
  name: string;
  age?: number;
  email: string;
  password: string;
  gender?: string;
  accept: boolean;
  picture?: Base64URLString;
  country?: string;
}

interface FormState {
  data: FormData;
  newData: FormData;
  countries: string[];
  genders: string[];
}

const defaultData: FormData = {
  name: '',
  email: '',
  password: '',
  accept: false,
};

const initialState: FormState = {
  data: defaultData,
  newData: defaultData,
  countries,
  genders,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    formUpdate: (state, action: PayloadAction<FormData>) => {
      state.data = action.payload;
    },
    formAdd: (state, action: PayloadAction<FormData>) => {
      state.newData = action.payload;
    },
  },
});

export const { formUpdate, formAdd } = formSlice.actions;
