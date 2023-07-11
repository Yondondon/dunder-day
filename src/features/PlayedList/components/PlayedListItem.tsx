import React, { FC } from 'react';
import { secondsToDate } from '../../../utils';

type Props = {
  name: string;
  imageUrl: string;
  gameUrl: string;
  playedDate: number;
  id: string;
}

export const PlayedListItem: FC<Props> = ({ name, imageUrl, gameUrl, playedDate, id }) => {

  return (
    <div className='playedlist_item_wrap'>
      <div className='playedlist_item_img_wrap'>
        <img src={imageUrl} alt='' />
      </div>
      <div className='playedlist_item_info_wrap'>
        <div className='playedlist_item_title'>{name}</div>
        { gameUrl && <a href={gameUrl} target='_blank'>Посилання на гру</a> }
        <div className='playedlist_item_date'>Зіграно: {secondsToDate(playedDate)}</div>
        { false && (
            <button className='remove_playedlist_item' onClick={() => {}}>
              <img src='images/trash.svg' alt='' />
            </button>
          )
        }
      </div>
    </div>
  )
}