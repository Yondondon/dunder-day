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
  const [modalMsg, setModalMsg] = useState<string>('');

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
      setModalMsg('Не вийшло завантажити список.')
    }
  }, [isError])

  useEffect(() => {
    const reactions = localStorage.getItem('reactions');
    if(!reactions) {
      localStorage.setItem('reactions', JSON.stringify({}))
    }
  })

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
            appID={item.appID}
            setModalText={(text: string) => setModalMsg(text)}
            setShowModal={() => {setShowModal(true)}}
          />
        )
      })}
      { showModal && (
          <ModalWindow
            onClose={() => setShowModal(false)}
            image={ isError ? 'pain.png' : 'lina_pes.png' }
            text={modalMsg}
          />
        )
      }
    </div>
  )
}