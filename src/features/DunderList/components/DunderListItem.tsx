import React, { FC } from 'react';
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
}

//TODO: додати плейсхолдер, якщо нема зображення
export const DunderListItem: FC<Props> = ({ name, gameUrl, imageUrl, reactions, id}) => {
  const isLogged = useAppSelector(selectIsLogged);
  const [removeItem, ] = useRemoveDunderListGameMutation();
  const [move, ] = useMoveToPlayedListMutation()

  const handleRemoveItem = () => {
    removeItem(id)
      .unwrap()
      .then((response) => {
        console.log(response);
      })
  }

  const handleMoveItem = () => {
    const date: number = Date.now();
    move({ id, playedDate: date})
      .unwrap()
      .then((response) => {
        console.log(response);
      })
  }

  return (
    <div className='dunderlist_item_wrap'>
      <div className='dunderlist_item_img_wrap'>
        <img src={imageUrl} alt='' />
      </div>
      <div className='dunderlist_item_info_wrap'>
        <div className='dunderlist_item_title'>{name}</div>
        { gameUrl && <a href={gameUrl} target='_blank' rel="noreferrer">Посилання на гру</a> }
        <div className='reactions_wrap'>
          <ReactionItem name={'heart'} quantity={reactions.heart} />
          <ReactionItem name={'poop'} quantity={reactions.poop} />
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