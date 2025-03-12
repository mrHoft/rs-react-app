import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import type { TRootState } from '~/store/store';
import { Input, InputFile, Select } from '~/ui/input';

import styles from './form.module.css';

const genders = ['male', 'female'];

export function PageForm1() {
  const { form } = useSelector((state: TRootState) => state.form);
  const navigate = useNavigate();

  return (
    <form className={styles.form}>
      <h2>Uncontrolled form</h2>
      <Input name="name" type="text" placeholder="Name" defaultValue={form.name} />
      <Input name="age" type="number" placeholder="Age" defaultValue={form.age || undefined} />
      <Input name="email" type="text" placeholder="Email" defaultValue={form.email} />
      <Input name="password" type="text" placeholder="Password" />
      <Input name="passwordConfirm" type="text" placeholder="Password repeat" />
      <Select name="gender" placeholder="Gender" options={genders} defaultValue={form.gender} />
      <div>
        <input type="checkbox" name="accept" id="accept" />
        <label htmlFor="accept"> Accept Terms and Conditions agreement</label>
      </div>
      <InputFile name="picture" accept="image/*" />
      <div className={styles.form__btns}>
        <button type="submit" className="button">
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
