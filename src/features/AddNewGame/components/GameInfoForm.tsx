import React, { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAddNewGameMutation } from '../../api/apiSlice';
import { FormInput } from '../../../components/FormInput/FormInput';
import { Loader } from '../../../components/Loader/Loader';
import { ModalWindow } from '../../../components/ModalWindow/ModalWindow';

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
  appID: string;
  isLoading: boolean;
}

export const GameInfoForm: FC<Props> = (props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMsg, setModalMsg] = useState<string>('');
  const methods = useForm({ defaultValues });
  const { handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = methods;
  const [addNewGame, { isLoading, isSuccess }] = useAddNewGameMutation()
  const onSubmit: SubmitHandler<Inputs> = data => {
    const formData = {
      ...data,
      id: Math.random().toString(),
      created: Date.now(),
      appID: props.appID,
    }
    addNewGame(formData)
      .unwrap()
      .then((result) => {
        if(result.success) {
          console.log(result);
          setShowModal(true)
          setModalMsg('Гру додано в Дундерсписок!')
        } else {
          setShowModal(true)
          setModalMsg(result.msg)
        }
      })
      .catch((error) => {
        console.log('error:', error)
        setShowModal(true)
        setModalMsg('Ой, схоже сервер не відповідає.')
      })
  };

  useEffect(() => {
    if(isSubmitSuccessful) {
      reset()
    }
  }, [methods.formState, reset])

  const makeUrlfromName = (name: string, appID: string): string => {
    const specialCharsRegExp = /[^a-zA-Z0-9_]+/g; //finds all, except: letters, numbers and underscores
    const spaceRegExp = / /gi; // finds spaces
    const transformedName = name.replace(spaceRegExp, '_').replace(specialCharsRegExp, '');

    return `https://store.steampowered.com/app/${appID}/${transformedName}`
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <div className='game_info_form_wrap'>
        { (props.isLoading || isLoading) && <Loader type='form' />}
        <form className='game_info_form' onSubmit={handleSubmit(onSubmit)}>
          <div className='form_field'>
            <FormInput
              methods={methods}
              name='name'
              placeholder='Назва гри'
              isRequired={true}
              value={props.name}
            />
            {errors.name && <span className='form_error_msg'>Це поле обов'язкове</span>}
          </div>
          <div className='form_field'>
            <FormInput
              methods={methods}
              name='gameUrl'
              placeholder='Посилання на гру'
              isRequired={false}
              value={props.name.length > 0 ? makeUrlfromName(props.name, props.appID) : ''}
            />
          </div>
          <div className='form_field'>
            <FormInput
              methods={methods}
              name='imageUrl'
              placeholder='Посилання на постер гри'
              isRequired={false}
              value={props.imageUrl}
            />
          </div>
          <button type='submit'>Надіслати</button>
        </form>
      </div>
      { showModal && (
          <ModalWindow
            text={modalMsg}
            onClose={handleCloseModal}
            image={isSuccess ? 'lina_pes.png' : 'pain.png' }
          />
        )
      }
    </>
  )
}