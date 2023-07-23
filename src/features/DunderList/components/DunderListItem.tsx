import React, { FC, useEffect, useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { selectIsLogged } from '../../LoginForm/userSlice';
import { ReactionItem } from './ReactionItem';
import { useMoveToPlayedListMutation, useRemoveDunderListGameMutation } from '../../api/apiSlice';
import { ListItemControl } from '../../../components/ListItemControl/ListItemControl';
import { DateModal } from './DateModal';

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
  const [move, { isLoading } ] = useMoveToPlayedListMutation();
  const [isDisabledReactions, setIsDisabledReactions] = useState<boolean>(false);
  const [isShowDateModal, setIsShowDateModal] = useState<boolean>(false);

  const handleRemoveItem = () => {
    removeItem(id)
      .unwrap()
      .then((response) => {
        console.log(response);
        const reactions = JSON.parse(localStorage.getItem('reactions') as any);
        if(reactions && reactions[name]) {
          delete reactions[name]
          localStorage.setItem('reactions', JSON.stringify(reactions))
        }
      })
      .catch((error) => {
        console.log('error:', error)
        setModalText('Ой, схоже сервер не відповідає.')
        setShowModal()
      })
  }

  const handleShowDateModal = () => {
    setIsShowDateModal(true)
  }

  const handleMoveItem = (date: string) => {
    const currentDate = new Date()
    const hours = new Date(date).setHours(currentDate.getHours());
    const minutes = new Date(hours).setMinutes(currentDate.getMinutes());
    const seconds = new Date(minutes).setSeconds(currentDate.getSeconds());

    move({ id, playedDate: seconds, name })
      .unwrap()
      .then((response) => {
        if(response.success) {
          console.log(response);
          const reactions = JSON.parse(localStorage.getItem('reactions') as any);
          if(reactions && reactions[name]) {
            delete reactions[name]
            localStorage.setItem('reactions', JSON.stringify(reactions))
          }
        } else {
          console.log(response);
          setModalText(response.msg)
          setShowModal()
          setIsShowDateModal(false)
        }
      })
      .catch((error) => {
        console.log('error:', error)
        setModalText('Ой, схоже сервер не відповідає.')
        setShowModal()
        setIsShowDateModal(false)
      })
  }

  useEffect(() => {
    const reactions = JSON.parse(localStorage.getItem('reactions') as any);
    if(reactions && reactions[name]) {
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
            gameName={name}
          />
          <ReactionItem
            name={'poop'}
            quantity={reactions.poop}
            isDisabled={isDisabledReactions}
            setIsDisabled={setIsDisabledReactions}
            gameName={name}
          />
        </div>
        { isLogged && (
            <div className='dunderlist_item_controls'>
              <ListItemControl type='remove' action={handleRemoveItem} />
              <ListItemControl type='move' action={handleShowDateModal} />
            </div>
          )
        }
      </div>
      { isShowDateModal && <DateModal isLoading={isLoading} onConfirm={handleMoveItem} /> }
    </div>
  )
}