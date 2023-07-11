import React, { useEffect, useState } from 'react';
import { useGetDunderlistQuery } from '../api/apiSlice';
import { DunderListItem } from './components/DunderListItem';
import { ModalWindow } from '../../components/ModalWindow/ModalWindow';
import { Loader } from '../../components/Loader/Loader';

export const DunderList = () => {
  const {
    data: dunderlist,
    isFetching,
    isError,
  } = useGetDunderlistQuery();
  const [showModal, setShowModal] = useState<boolean>(false);

  let sortedDunderlist: any[] = [];

  if(dunderlist && dunderlist.length > 0) {
    sortedDunderlist = [...dunderlist]
    sortedDunderlist.sort((a: any, b: any) => {
      return b.created - a.created;
    })
  }

  
  useEffect(() => {
    if(isError) {
      setShowModal(true)
    }
  }, [isError])
  

  return (
    <div className='dunderlist_wrap'>
      { isFetching && <Loader />}
      { sortedDunderlist && sortedDunderlist.map((item: any) => {
        return (
          <DunderListItem
            key={Math.random().toString()}
            name={item.name}
            imageUrl={item.imageUrl}
            gameUrl={item.gameUrl}
            reactions={item.reactions}
            id={item.id}
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