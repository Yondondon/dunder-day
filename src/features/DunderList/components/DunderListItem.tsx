import React, { FC, useEffect, useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { selectIsLogged } from '../../LoginForm/userSlice';
import { ReactionItem } from './ReactionItem';
import { useMoveToPlayedListMutation, useRemoveDunderListGameMutation } from '../../api/apiSlice';
import { ListItemControl } from '../../../components/ListItemControl/ListItemControl';

type Props = {
  name: string;
  gameUrl: string;
  imageUrl: string;
  reactions: { heart: number; poop: number; };
  id: string;
  appID: string;
  setModalText: (text: string) => void;
  setShowModal: () => void;
}

export const DunderListItem: FC<Props> = ({ name, gameUrl, imageUrl, reactions, id, appID, setModalText, setShowModal }) => {
  const isLogged = useAppSelector(selectIsLogged);
  const [removeItem, ] = useRemoveDunderListGameMutation();
  const [move, ] = useMoveToPlayedListMutation()
  const [isDisabledReactions, setIsDisabledReactions] = useState<boolean>(false)

  const handleRemoveItem = () => {
    removeItem(id)
      .unwrap()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log('error:', error)
        setModalText('Ой, схоже сервер не відповідає.')
        setShowModal()
      })

    const reactions = JSON.parse(localStorage.getItem('reactions') as any);
    if(reactions && reactions[appID]) {
      delete reactions[appID]
      localStorage.setItem('reactions', JSON.stringify(reactions))
    }
  }

  const handleMoveItem = () => {
    const date: number = Date.now();
    move({ id, playedDate: date, appID })
      .unwrap()
      .then((response) => {
        if(!response.status) {
          console.log(response);
          setModalText(response.msg)
          setShowModal()
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log('error:', error)
        setModalText('Ой, схоже сервер не відповідає.')
        setShowModal()
      })

    const reactions = JSON.parse(localStorage.getItem('reactions') as any);
    if(reactions && reactions[appID]) {
      delete reactions[appID]
      localStorage.setItem('reactions', JSON.stringify(reactions))
    }
  }

  useEffect(() => {
    const reactions = JSON.parse(localStorage.getItem('reactions') as any);
    if(reactions && reactions[appID]) {
      setIsDisabledReactions(true)
    }
  })

  return (
    <div className='dunderlist_item_wrap'>
      <div className='dunderlist_item_img_wrap'>
        <img src={imageUrl.length > 0 ? imageUrl : 'images/no-image.jpg'} alt='' />
      </div>
      <div className='dunderlist_item_info_wrap'>
        <div className='dunderlist_item_title'>{name}</div>
        { gameUrl && <a href={gameUrl} target='_blank' rel="noreferrer">Посилання на гру</a> }
        <div className='reactions_wrap'>
          <ReactionItem
            name={'heart'}
            quantity={reactions.heart}
            isDisabled={isDisabledReactions}
            setIsDisabled={setIsDisabledReactions}
            appID={appID}
          />
          <ReactionItem
            name={'poop'}
            quantity={reactions.poop}
            isDisabled={isDisabledReactions}
            setIsDisabled={setIsDisabledReactions}
            appID={appID}
          />
        </div>
        { isLogged && (
            <div className='dunderlist_item_controls'>
              <ListItemControl type='remove' action={handleRemoveItem} />
              <ListItemControl type='move' action={handleMoveItem} />
            </div>
          )
        }
      </div>
    </div>
  )
}