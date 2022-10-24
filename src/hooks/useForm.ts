import { ChangeEvent, useState } from 'react';
import { TLoginForm, TResetPasswordForm, TUser } from '../services/types/data';

export const useForm = (inputValues: TResetPasswordForm | TUser | TLoginForm) => {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
};
