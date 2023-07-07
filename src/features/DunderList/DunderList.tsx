import React from 'react';
import { useGetDunderlistQuery } from '../api/apiSlice';
import { DunderListItem } from './components/DunderListItem';

export const DunderList = () => {
  const {
    data: dunderlist
  } = useGetDunderlistQuery();

  //TODO: додати плейсхолдер, коли список пустий
  return (
    <div className='dunderlist_wrap'>
      { dunderlist && dunderlist.map((item: any) => {
        return (
          <DunderListItem
            key={Math.random()}
            name={item.name}
            imageUrl={item.imageUrl}
            gameUrl={item.gameUrl}
            reactions={item.reactions}
          />
        )
      })}
    </div>
  )
}