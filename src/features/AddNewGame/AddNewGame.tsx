import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useGetGameInfoMutation } from '../api/apiSlice';
import { GameInfoForm } from './components/GameInfoForm';
import { ModalWindow } from '../../components/ModalWindow/ModalWindow';

type GameInfo = {
  name: string;
  imageUrl: string;
}

export const AddNewGame = () => {
  const [appID, setAppID] = useState('');
  const [usedAppID, setUsedAppID] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showModal, setShowModal] = useState<boolean>(false)
  const [parsedGameInfo, setParsedGameInfo] = useState<GameInfo>({
    name: '',
    imageUrl: ''
  })
  const [getGameInfo, { isLoading }] = useGetGameInfoMutation();
  const onlyNumbersRegex = /^[0-9]+$/;

  const handleClick = () => {
    setErrorMsg('')
    if(appID.length === 0) {
      setErrorMsg('Введи ID, дундик.')
    }

    if(appID.length > 0 && !onlyNumbersRegex.test(appID)) {
      setErrorMsg('ID може містити лише цифри.')
      return;
    }
    
    if(appID.length > 0) {
      getGameInfo(appID)
        .unwrap()
        .then((response: any) => {
          if(response.success) {
            const data = {
              name: response.data[appID].data.name,
              imageUrl: response.data[appID].data.header_image
            }
            setParsedGameInfo(data)
            setUsedAppID(appID)
            setAppID('')
          } else {
            setErrorMsg('Гри з таким ID не існує, або проблеми у Стіма. Спробуй пізніше.')
            setShowModal(true)
          }
        })
        .catch((error: any) => {
          setShowModal(true)
          setErrorMsg('Ой, щось непрацює.')
          console.log('error:', error)
        })
    }
  }

  const handleInputChange = (e: any) => {
    setAppID(e.target.value)
    setErrorMsg('')
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <NavLink to={'/'} className={'navlink'}>На головну</NavLink>
      <div className='parse_gameinfo_block'>
        <p>Отримати інформацію про гру по Steam ID</p>
        <div className='parse_gameinfo_input_block'>
          <input type='text' value={appID} onChange={e => handleInputChange(e)} />
          <button className='parse_gameinfo_btn' onClick={handleClick}>Отримати</button>
        </div>
      </div>
      <p>Або ввести дані руцями</p>
      <GameInfoForm
        name={parsedGameInfo.name}
        imageUrl={parsedGameInfo.imageUrl}
        appID={usedAppID}
        isLoading={isLoading}
      />
      { showModal && (
          <ModalWindow
            text={errorMsg}
            onClose={handleCloseModal}
            image='pain.png'
          />
        )
      }
    </>
  )
}