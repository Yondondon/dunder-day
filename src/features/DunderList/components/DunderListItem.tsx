import React from 'react';
import { ReactionItem } from './ReactionItem';

export const DunderListItem = () => {
  return (
    <div className='dunderlist_item_wrap'>
      <div className='dunderlist_item_img_wrap'>
        <img src='https://cdn.cloudflare.steamstatic.com/steam/apps/2000950/header.jpg' alt='' />
      </div>
      <div className='dunderlist_item_info_wrap'>
        <div className='dunderlist_item_title'>Call of Duty®: Modern Warfare®</div>
        <a href='https://store.steampowered.com/app/2000950/Call_of_Duty_Modern_Warfare/' target='_blank'>Посилання на гру</a>
        <div className='reactions_wrap'>
          <ReactionItem name={'heart'} quantity={'3'} />
          <ReactionItem name={'poop'} quantity={'2'} />
        </div>
      </div>
    </div>
  )
}