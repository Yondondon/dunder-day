import React, { FC } from 'react';
import { secondsToDate } from '../../../utils';
import { useAppSelector } from '../../../store/hooks';
import { selectIsLogged } from '../../LoginForm/userSlice';
import { useRemovePlayedListGameMutation } from '../../api/apiSlice';
import { ListItemControl } from '../../../components/ListItemControl/ListItemControl';

type Props = {
  name: string;
  imageUrl: string;
  gameUrl: string;
  playedDate: number;
  id: string;
  onRemove: (id: string) => void;
}

export const PlayedListItem: FC<Props> = ({ name, imageUrl, gameUrl, playedDate, id, onRemove }) => {
  const isLogged = useAppSelector(selectIsLogged);
  const [removeItem, ] = useRemovePlayedListGameMutation()

  const handleRemoveItem = () => {
    removeItem(id)
      .unwrap()
      .then((response) => {
        console.log(response);
        onRemove(id)
      })
  }

  return (
    <div className='playedlist_item_wrap'>
      <div className='playedlist_item_img_wrap'>
        <img src={imageUrl.length > 0 ? imageUrl : 'images/no-image.jpg'} alt='' />
      </div>
      <div className='playedlist_item_info_wrap'>
        <div className='playedlist_item_title'>{name}</div>
        { gameUrl && <a href={gameUrl} target='_blank'>Посилання на гру</a> }
        <div className='playedlist_item_date'>Зіграно: {secondsToDate(playedDate)}</div>
        { isLogged && (
            <div className='playedlist_item_controls'>
              <ListItemControl type='remove' action={handleRemoveItem} />
            </div>
          )
        }
      </div>
    </div>
  )
}