import { useEffect, useState } from 'react';
import {
  useGetPlayedlistQuery,
  useLazyGetPlayedlistQuery,
  useLoadMorePlayedListMutation,
} from '../api/apiSlice';
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
  const [getPlayedlist, results] = useLazyGetPlayedlistQuery()
  const [loadMore, { isLoading }] = useLoadMorePlayedListMutation();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [playedlist, setPlayedlist] = useState<any[]>([]);
  const [isLoadable, setIsLoadable] = useState<boolean>(false);
  const [gamesQuantity, setGamesQuantity] = useState<number>(0);

  useEffect(() => {
    if(fetchedData && fetchedData.data.list.length > 0 && playedlist.length === 0) {
      setPlayedlist(fetchedData.data.list)
      setIsLoadable(fetchedData.data.isLoadable);
      setGamesQuantity(fetchedData.data.gamesQuantity);
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
      .then((response: any) => {
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
    getPlayedlist()
  }
  
  useEffect(() => {
    if(results && results.data) {
      setPlayedlist(results.data.data.list)
      setGamesQuantity(results.data.data.gamesQuantity)
    }
  }, [results])

  return (
    <div className='playedlist_wrap'>
      {/* <PlayedListItem
        key={Math.random().toString()}
        name={'aaa'}
        imageUrl={''}
        gameUrl={''}
        id={'asadasd'}
        playedDate={1}
        onRemove={handleRemove}
      /> */}
      <div className='games_played'>
        <span>Дундер-ігор зіграно: {gamesQuantity}</span>
        { gamesQuantity === 69 && <img src='images/jerry.jpg' alt='' /> }
      </div>
      <div className='loader_wrap'>
        { isFetching && <Loader />}
      </div>
      { playedlist.length === 0 && <span className='no_list_items'>У списку поки нема ігорів :с</span>}
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