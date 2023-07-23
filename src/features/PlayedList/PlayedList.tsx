import React, { useEffect, useState } from 'react';
import { useGetPlayedlistQuery, useLoadMorePlayedListMutation } from '../api/apiSlice';
import { PlayedListItem } from './components/PlayedListItem';
import { Loader } from '../../components/Loader/Loader';
import { ModalWindow } from '../../components/ModalWindow/ModalWindow';
import { LoadMoreBtn } from './components/LoadMoreBtn';

export const PlayedList = () => {
  const {
    data: fetchedData,
    isFetching,
    isError,
  } = useGetPlayedlistQuery();
  const [loadMore, { isLoading }] = useLoadMorePlayedListMutation();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [playedlist, setPlayedlist] = useState<any[]>([]);
  const [isLoadable, setIsLoadable] = useState<boolean>(false);

  //TODO: некритична проблема - якщо видалити усі елементи, 
  //то підвантажується нові з останнім видаленим(тобто він в списку є, а в базі його вже нема)
  useEffect(() => {
    if(fetchedData && fetchedData.data.list.length > 0 && playedlist.length === 0) {
      setPlayedlist(fetchedData.data.list)
      setIsLoadable(fetchedData.data.isLoadable);
    }
  })

  useEffect(() => {
    if(isError) {
      setShowModal(true);
    }
  }, [isError])

  const handleLoadMore = () => {
    const lastItemId: string = playedlist[playedlist.length - 1].id;
    loadMore(lastItemId)
      .unwrap()
      .then((response) => {
        if(response.success) {
          console.log(response);
          const temp = playedlist.concat(response.data.list);
          setPlayedlist(temp);
          if(!response.data.isLoadable) {
            setIsLoadable(false);
          }
        }
      })
      .catch((error) => {
        console.log('error: ' + error)
      })
  }

  const handleRemove = (id: string) => {
    const filtredList = playedlist.filter(item => item.id !== id)
    setPlayedlist(filtredList)
  }

  return (
    <div className='playedlist_wrap'>
      { isFetching && <Loader />}
      { playedlist && playedlist.map((item: any) => {
        return (
          <PlayedListItem
            key={Math.random().toString()}
            name={item.name}
            imageUrl={item.imageUrl}
            gameUrl={item.gameUrl}
            id={item.id}
            playedDate={item.playedDate}
            onRemove={handleRemove}
          />
        )
      })}
      { isLoadable && !isFetching && (
          <div className='playedlist_loadmore_btn_wrap'>
            <LoadMoreBtn onClick={handleLoadMore} isLoading={isLoading} />
          </div>
        )
      }
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