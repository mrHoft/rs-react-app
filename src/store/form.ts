import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { countries, genders } from './const';

export interface AppFormData {
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
  curData: AppFormData;
  allData: AppFormData[];
  countries: string[];
  genders: string[];
}

const defaultData: AppFormData = {
  name: '',
  email: '',
  password: '',
  accept: false,
};

const initialState: FormState = {
  curData: defaultData,
  allData: [],
  countries,
  genders,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    formUpdate: (state, action: PayloadAction<AppFormData>) => {
      state.curData = action.payload;
    },
    formAdd: (state, action: PayloadAction<AppFormData>) => {
      state.allData.push(action.payload);
    },
  },
});

export const { formUpdate, formAdd } = formSlice.actions;
