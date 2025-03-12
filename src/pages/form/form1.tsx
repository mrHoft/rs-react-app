import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { boolean, number, string, type Schema } from 'yup';
import { formAdd, type FormData } from '~/store/form';
import type { TAppDispatch, TRootState } from '~/store/store';
import { Input, InputFile, Select } from '~/ui/input';
import { Message } from '~/ui/message/message';
import { readFile } from '~/utils/fileRead';

import styles from './form.module.css';

type TField = 'name' | 'age' | 'email' | 'password' | 'accept';
const schema: Record<TField, Schema> = {
  name: string()
    .matches(/^[A-ZА-Я]/, 'first letter must be uppercased ')
    .required(),
  age: number().positive().integer().nullable(),
  email: string().email().required(),
  password: string()
    .matches(/\d/, 'should contain at least one number')
    .matches(/[A-ZА-Я]/, 'should contain at least one uppercased letter')
    .matches(/[a-zа-я]/, 'should contain at least one lowercased letter')
    .matches(/[~!@#$%^&*\-_+=]/, 'should contain at least one special character'),
  accept: boolean().isTrue('must be accepted'),
};

export function PageForm1() {
  const [valid, setValid] = useState(false);
  const [validation, setValidation] = useState<Record<TField, string | null>>({
    name: null,
    age: null,
    email: null,
    password: null,
    accept: null,
  });
  const { data: form, countries, genders } = useSelector((state: TRootState) => state.form);
  const navigate = useNavigate();
  const dispatch = useDispatch<TAppDispatch>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData: Record<string, unknown> = Object.fromEntries(new FormData(event.currentTarget).entries());
    formData.accept = formData.accept ? true : false;
    formData.age = !formData.age ? undefined : formData.age;
    let passed = true;
    if (formData.password !== formData.passwordConfirm) {
      setValidation(prev => ({ ...prev, password: 'passwords should match' }));
      passed = false;
    }
    Object.keys(schema).forEach(key => {
      const field = key as TField;
      schema[field].validate(formData[field]).catch(error => {
        setValidation(prev => ({ ...prev, [field]: error.message }));
        passed = false;
      });
    });
    formData.picture = await readFile(formData.file as File).catch(error => {
      passed = false;
      Message.show(error.message, 'error');
      return '';
    });
    if (passed) {
      const data: FormData = {
        name: formData.name as string,
        age: formData.age ? (formData.age as number) : undefined,
        email: formData.email as string,
        password: formData.password as string,
        gender: formData.gender ? (formData.gender as string) : undefined,
        accept: Boolean(formData.accept),
        picture: formData.picture ? (formData.picture as Base64URLString) : undefined,
        country: formData.country ? (formData.country as string) : undefined,
      };
      dispatch(formAdd(data));
      navigate('/');
    }
  };

  const handleChange = (field: TField) => (value: string | boolean) => {
    const val = field === 'age' && !value ? undefined : value;
    schema[field]
      .validate(val)
      .then(() => {
        setValidation(prev => ({ ...prev, [field]: null }));
      })
      .catch(error => {
        setValidation(prev => ({ ...prev, [field]: error.message }));
      });
  };

  const handlePasswordRepeat = () => {
    setValidation(prev => ({ ...prev, password: null }));
  };

  useEffect(() => {
    setValid(Object.values(validation).every(value => !value));
  }, [validation]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Uncontrolled form</h2>
      <Input name="name" type="text" placeholder="Name*" defaultValue={form.name} onBlur={handleChange('name')} />
      <div className={styles.form__msg}>{validation.name}</div>
      <Input
        name="age"
        type="number"
        placeholder="Age"
        defaultValue={form.age || undefined}
        onBlur={handleChange('age')}
      />
      <div className={styles.form__msg}>{validation.age}</div>
      <Input name="email" type="text" placeholder="Email*" defaultValue={form.email} onBlur={handleChange('email')} />
      <div className={styles.form__msg}>{validation.email}</div>
      <div className={styles.form__row}>
        <Input
          name="password"
          type="text"
          placeholder="Password*"
          defaultValue={form.password}
          onBlur={handleChange('password')}
        />
        <Input
          name="passwordConfirm"
          type="text"
          placeholder="Password repeat*"
          defaultValue={form.password}
          onChange={handlePasswordRepeat}
        />
      </div>
      <div className={styles.form__msg}>{validation.password}</div>
      <Select name="gender" placeholder="Gender" options={genders} defaultValue={form.gender} />
      <div className={styles.form__msg} />
      <div>
        <input type="checkbox" name="accept" id="accept" onChange={e => handleChange('accept')(e.target.checked)} />
        <label htmlFor="accept"> Accept Terms and Conditions agreement*</label>
      </div>
      <div className={styles.form__msg}>{validation.accept}</div>
      <InputFile name="file" accept="image/*" />
      <div className={styles.form__msg} />
      <Input name="country" type="text" options={countries} placeholder="Country" defaultValue={form.country} />
      <div className={styles.form__btns}>
        <button type="submit" className="button" disabled={!valid}>
          Submit
        </button>
        <button type="reset" className="button">
          Reset
        </button>
        <button type="button" className="button" onClick={() => navigate('/')}>
          Back
        </button>
      </div>
    </form>
  );
}
