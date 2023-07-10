import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { NavLink, useNavigate  } from 'react-router-dom';
import { useLoginMutation } from '../api/apiSlice';
import { login } from './userSlice';
import { useAppDispatch } from '../../store/hooks';
import { FormInput } from '../../components/FormInput/FormInput';
import { ModalWindow } from '../../components/ModalWindow/ModalWindow';
import { Loader } from '../../components/Loader/Loader';

type Inputs = {
  login: string;
  password: string;
};

const defaultValues = {
  login: '',
  password: ''
}

export const LoginForm = () => {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [loginQuery, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const methods = useForm({ defaultValues });
  const { handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = methods;
  const onSubmit: SubmitHandler<Inputs> = data => {
    loginQuery(data)
      .unwrap()
      .then((result) => {
        if(result.status === 'success') {
          const userToken = result.data;
          document.cookie = `userToken=${userToken}; path=/`;
          dispatch(login(userToken))
          navigate('/')
        } else {
          setErrorMsg(result.msg)
          setShowModal(true)
        }
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
      <NavLink to={'/'} className={'navlink'}>На головну</NavLink>
      <div className='login_form_title'>Залогінитися</div>
      <div className='login_form_wrap'>
      { isLoading && <Loader type='form' />}
        <form onSubmit={handleSubmit(onSubmit)} className='login_form'>
          <div className='form_field'>
            <FormInput
              methods={methods}
              name='login'
              placeholder='Логін'
              isRequired={true}
              value=''
            />
            {errors.login && <span className='form_error_msg'>Це поле обов'язкове</span>}
          </div>
          <div className='form_field'>
            <FormInput
              methods={methods}
              name='password'
              type='password'
              placeholder='Пароль'
              isRequired={true}
              value=''
            />
            {errors.password && <span className='form_error_msg'>Це поле обов'язкове</span>}
          </div>
          <button type='submit'>Надіслати</button>
        </form>
      </div>
      { showModal && <ModalWindow onClose={() => setShowModal(false)} image='pain.png' text={errorMsg} /> }
    </>
  )
}