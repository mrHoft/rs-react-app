import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { formAdd, type AppFormData } from '~/store/form';
import type { TAppDispatch, TRootState } from '~/store/store';
import { Input, InputFile, Select } from '~/ui/input';
import { Message } from '~/ui/message/message';
import { readFile } from '~/utils/fileRead';
import { fields, type TField } from './schema';

import styles from './form.module.css';

const exclude = ['passwordConfirm'];

export function PageForm1() {
  const [valid, setValid] = useState(true);
  const [validation, setValidation] = useState<Record<TField, string | null>>({
    name: null,
    age: null,
    email: null,
    password: null,
    passwordConfirm: null,
    accept: null,
  });
  const { curData, countries, genders } = useSelector((state: TRootState) => state.form);
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
    Object.keys(fields).forEach(key => {
      if (exclude.includes(key)) return;
      const field = key as TField;
      fields[field].validate(formData[field]).catch(error => {
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
      const data: AppFormData = {
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
    fields[field]
      .validate(value)
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
      <Input name="name" type="text" placeholder="Name*" defaultValue={curData.name} onBlur={handleChange('name')} />
      <div className={styles.form__msg}>{validation.name}</div>
      <Input
        name="age"
        type="number"
        placeholder="Age"
        defaultValue={curData.age || undefined}
        onBlur={handleChange('age')}
      />
      <div className={styles.form__msg}>{validation.age}</div>
      <Input
        name="email"
        type="email"
        placeholder="Email*"
        defaultValue={curData.email}
        onBlur={handleChange('email')}
      />
      <div className={styles.form__msg}>{validation.email}</div>
      <div className={styles.form__row}>
        <Input
          name="password"
          type="text"
          placeholder="Password*"
          defaultValue={curData.password}
          onBlur={handleChange('password')}
        />
        <Input
          name="passwordConfirm"
          type="text"
          placeholder="Password repeat*"
          defaultValue={curData.password}
          onChange={handlePasswordRepeat}
        />
      </div>
      <div className={styles.form__msg}>{validation.password}</div>
      <Select name="gender" placeholder="Gender" options={genders} defaultValue={curData.gender} />
      <div className={styles.form__msg} />
      <div>
        <input type="checkbox" name="accept" id="accept" onChange={e => handleChange('accept')(e.target.checked)} />
        <label htmlFor="accept"> Accept Terms and Conditions agreement*</label>
      </div>
      <div className={styles.form__msg}>{validation.accept}</div>
      <InputFile name="file" accept="image/*" />
      <div className={styles.form__msg} />
      <Input name="country" type="text" options={countries} placeholder="Country" defaultValue={curData.country} />
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
