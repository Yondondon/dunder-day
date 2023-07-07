import React, { FC } from 'react';
import { ReactionItem } from './ReactionItem';

type Props = {
  name: string;
  gameUrl: string;
  imageUrl: string;
  reactions: { heart: number; poop: number; };
}

//TODO: додати плейсхолдер, якщо нема зображення
export const DunderListItem: FC<Props> = ({ name, gameUrl, imageUrl, reactions}) => {
  return (
    <div className='dunderlist_item_wrap'>
      <div className='dunderlist_item_img_wrap'>
        <img src={imageUrl} alt='' />
      </div>
      <div className='dunderlist_item_info_wrap'>
        <div className='dunderlist_item_title'>{name}</div>
        { gameUrl && <a href={gameUrl} target='_blank'>Посилання на гру</a> }
        <div className='reactions_wrap'>
          <ReactionItem name={'heart'} quantity={reactions.heart} />
          <ReactionItem name={'poop'} quantity={reactions.poop} />
        </div>
      </div>
    </div>
  )
}