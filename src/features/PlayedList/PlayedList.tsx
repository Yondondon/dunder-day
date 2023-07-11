import React from 'react';
import { useGetPlayedlistQuery } from '../api/apiSlice';
import { PlayedListItem } from './components/PlayedListItem';
import { Loader } from '../../components/Loader/Loader';

export const PlayedList = () => {
  const {
    data: playedlist,
    isFetching,
    isError,
  } = useGetPlayedlistQuery();

  let sortedPlayedlist: any[] = [];

  if(playedlist && playedlist.length > 0) {
    sortedPlayedlist = [...playedlist]
    sortedPlayedlist.sort((a: any, b: any) => {
      return b.created - a.created;
    })
  }

  return (
    <div className='playedlist_wrap'>
      { isFetching && <Loader />}
      { sortedPlayedlist && sortedPlayedlist.map((item: any) => {
        return (
          <PlayedListItem
            key={Math.random().toString()}
            name={item.name}
            imageUrl={item.imageUrl}
            gameUrl={item.gameUrl}
            id={item.id}
            playedDate={item.playedDate}
          />
        )
      })}
    </div>
  )
}