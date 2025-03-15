import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { formAdd, type AppFormData } from '~/store/form';
import type { TAppDispatch, TRootState } from '~/store/store';
import { Input, InputFile, Select } from '~/ui/input';
import { Message } from '~/ui/message/message';
import { readFile } from '~/utils/fileRead';
import { schema, type TField } from './schema';

import styles from './form.module.css';

export function PageForm2() {
  const { curData, countries, genders } = useSelector((state: TRootState) => state.form);
  const ref = React.useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<TAppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onHandleSubmit = async (validData: Partial<Record<TField, unknown>>) => {
    if (!ref.current) return;
    const formData: Record<string, unknown> = Object.fromEntries(new FormData(ref.current).entries());
    formData.picture = await readFile(formData.file as File).catch(error => {
      Message.show(error.message, 'error');
      return 'error';
    });
    if (formData.picture === 'error') return;

    const data: AppFormData = {
      name: validData.name ? (validData.name as string) : '',
      age: validData.age ? (validData.age as number) : undefined,
      email: validData.email as string,
      password: validData.password as string,
      gender: formData.gender ? (formData.gender as string) : undefined,
      accept: Boolean(validData.accept),
      picture: formData.picture ? (formData.picture as Base64URLString) : undefined,
      country: formData.country ? (formData.country as string) : undefined,
    };
    dispatch(formAdd(data));
    navigate('/');
  };

  const getErrorMessage = (fields: TField[]) => {
    for (const field of fields) {
      if (errors[field]) return errors[field].message as React.ReactNode;
    }
    return null;
  };

  const isFormValid = () => {
    for (const field in errors) {
      if (errors[field as TField]) return false;
    }
    return true;
  };

  return (
    <form ref={ref} className={styles.form} onSubmit={e => handleSubmit(onHandleSubmit)(e)}>
      <h2>React Hook Form</h2>
      <input
        className={styles.form__input}
        type="text"
        placeholder="Name*"
        {...register('name')}
        defaultValue={curData.name || undefined}
      />
      <div className={styles.form__msg}>{getErrorMessage(['name'])}</div>
      <input
        className={styles.form__input}
        {...register('age')}
        type="number"
        placeholder="Age"
        defaultValue={curData.age || undefined}
      />
      <div className={styles.form__msg}>{getErrorMessage(['age'])}</div>
      <input
        className={styles.form__input}
        {...register('email')}
        type="text"
        placeholder="Email*"
        defaultValue={curData.email || undefined}
      />
      <div className={styles.form__msg}>{getErrorMessage(['email'])}</div>
      <div className={styles.form__row}>
        <input
          className={styles.form__input}
          {...register('password')}
          type="text"
          placeholder="Password*"
          defaultValue={curData.password || undefined}
        />
        <input
          className={styles.form__input}
          {...register('passwordConfirm')}
          type="text"
          placeholder="Password repeat*"
          defaultValue={curData.password || undefined}
        />
      </div>
      <div className={styles.form__msg}>{getErrorMessage(['password', 'passwordConfirm'])}</div>
      <Select name="gender" placeholder="Gender" options={genders} defaultValue={curData.gender} />
      <div className={styles.form__msg} />
      <div>
        <input {...register('accept')} type="checkbox" id="accept" />
        <label htmlFor="accept"> Accept Terms and Conditions agreement*</label>
      </div>
      <div className={styles.form__msg}>{getErrorMessage(['accept'])}</div>
      <InputFile name="file" accept="image/*" />
      <div className={styles.form__msg} />
      <Input name="country" type="text" options={countries} placeholder="Country" defaultValue={curData.country} />
      <div className={styles.form__btns}>
        <button type="submit" className="button" disabled={!isFormValid()}>
          Submit
        </button>
        <button type="reset" className="button" onClick={() => reset()}>
          Reset
        </button>
        <button type="button" className="button" onClick={() => navigate('/')}>
          Back
        </button>
      </div>
    </form>
  );
}
