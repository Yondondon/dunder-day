import React, { useEffect, useState } from 'react';
import { useGetPlayedlistQuery } from '../api/apiSlice';
import { PlayedListItem } from './components/PlayedListItem';
import { Loader } from '../../components/Loader/Loader';
import { ModalWindow } from '../../components/ModalWindow/ModalWindow';

export const PlayedList = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const {
    data: playedlist,
    isFetching,
    isError,
  } = useGetPlayedlistQuery();

  let sortedPlayedlist: any[] = [];

  if(playedlist && playedlist.length > 0) {
    sortedPlayedlist = [...playedlist]
    sortedPlayedlist.sort((a: any, b: any) => {
      return b.playedDate - a.playedDate;
    })
  }

  useEffect(() => {
    if(isError) {
      setShowModal(true)
    }
  }, [isError])

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
      { showModal && (
          <ModalWindow
            onClose={() => setShowModal(false)}
            image='pain.png'
            text='Не вийшло завантажити список.'
          />
        )
      }
    </div>
  )
}