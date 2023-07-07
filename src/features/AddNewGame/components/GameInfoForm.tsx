import React, { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAddNewGameMutation } from '../../api/apiSlice';
import { FormInput } from '../../../components/FormInput/FormInput';

type Inputs = {
  name: string;
  gameUrl?: string;
  imageUrl?: string;
};

const defaultValues = {
  name: '',
  gameUrl: '',
  imageUrl: '',
}

type Props = {
  name: string;
  imageUrl: string;
}

//TODO: styles, errors
export const GameInfoForm: FC<Props> = (props) => {
  const navigate = useNavigate();
  const methods = useForm({ defaultValues });
  const { handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = methods;
  const [addNewGame, ] = useAddNewGameMutation()
  const onSubmit: SubmitHandler<Inputs> = data => {
    addNewGame(data)
      .unwrap()
      .then((result) => {
        // console.log(result);
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          methods={methods}
          name='name'
          placeholder='Назва гри'
          isRequired={true}
          value={props.name}
        />
        {errors.name && <span>Це поле обов'язкове</span>}

        <FormInput
          methods={methods}
          name='gameUrl'
          placeholder='Посилання на гру'
          isRequired={false}
          value={''}
        />
        
        <FormInput
          methods={methods}
          name='imageUrl'
          placeholder='Посилання на постер гри'
          isRequired={false}
          value={props.imageUrl}
        />
        <button type='submit'>Надіслати</button>
      </form>
    </div>
  )
}