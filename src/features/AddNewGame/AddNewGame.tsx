import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useGetGameInfoMutation } from '../api/apiSlice';
import { GameInfoForm } from './components/GameInfoForm';

type GameInfo = {
  name: string;
  imageUrl: string;
}

export const AddNewGame = () => {
  const [appID, setAppID] = useState('');
  const [parsedGameInfo, setParsedGameInfo] = useState<GameInfo>({
    name: '',
    imageUrl: ''
  })

  const [getGameInfo, ] = useGetGameInfoMutation();

  //TODO: handle errors
  const handleClick = () => {
    if(appID.length > 0) {
      getGameInfo(appID)
        .unwrap()
        .then((result) => {
          // console.log(result[appID].data);
          const data = {
            name: result[appID].data.name,
            imageUrl: result[appID].data.header_image
          }
          setAppID('');
          setParsedGameInfo(data)
        })
        .catch((error) => {
          console.log('error:', error)
        })
    }
  }

  return (
    <div className='main_wrap'>
      <NavLink to={'/'} className={'navlink'}>На головну</NavLink>
      <div className='parse_gameinfo_block'>
        <p>Отримати інформацію про гру по ID</p>
        <input type='text' value={appID} onChange={e => setAppID(e.target.value)} />
        <button className='' onClick={handleClick}>Отримати</button>
      </div>
      <GameInfoForm name={parsedGameInfo.name} imageUrl={parsedGameInfo.imageUrl} />
    </div>
  )
}