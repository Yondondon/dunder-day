import React, { useEffect } from 'react';
import { useLoginMutation } from '../api/apiSlice';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate  } from 'react-router-dom';
import { FormInput } from '../../components/FormInput/FormInput';

type Inputs = {
  login: string;
  password: string;
};

const defaultValues = {
  login: '',
  password: ''
}

export const LoginForm = () => {
  const [login, ] = useLoginMutation();
  const navigate = useNavigate();
  const methods = useForm({ defaultValues });
  const { handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = methods;
  const onSubmit: SubmitHandler<Inputs> = data => {
    login(data)
      .unwrap()
      .then((result) => {
        document.cookie = `userToken=${result.data}; path=/`;
        navigate('/')
      })
      .catch((error) => {
        console.log('error:', error)
      })
  };

  useEffect(() => {
    if(isSubmitSuccessful) {
      reset()
    }
  }, [methods.formState, reset])

  return (
    <>
      <div>Залогінитися</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          methods={methods}
          name='login'
          placeholder='Логін'
          isRequired={true}
          value=''
        />
        {errors.login && <span>Це поле обов'язкове</span>}
        <FormInput
          methods={methods}
          name='password'
          type='password'
          placeholder='Пароль'
          isRequired={true}
          value=''
        />
        {errors.password && <span>Це поле обов'язкове</span>}
        
        <button type='submit'>Надіслати</button>
      </form>
    </>
  )
}