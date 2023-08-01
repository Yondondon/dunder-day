import { FC, useState } from 'react'
import { useGetPlayedGameByNameMutation } from '../../api/apiSlice';
import { PlayedListItem } from './PlayedListItem';
import { ModalWindow } from '../../../components/ModalWindow/ModalWindow';

type Props = {
  onRemoveItem: () => void;
}

export const SearchGame: FC<Props> = ({ onRemoveItem }) => {
  const [searchVal, setSearchVal] = useState<string>('');
  const [search, { isLoading }] = useGetPlayedGameByNameMutation();
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>('');

  const handleSearch = () => {
    if(searchVal.length > 0) {
      search(searchVal)
        .unwrap()
        .then((response) => {
          if(response.success) {
            setSearchResult(response.data.list)
          } else {
            setModalText(response.msg);
            setShowModal(true);
          }
        })
    } else {
      setModalText('Введи хоча б один символ для пошуку.');
      setShowModal(true);
    }
  }

  const handleClearSearchResult = () => {
    setSearchResult([]);
    setSearchVal('');
  }

  const handleRemoveItem = (id: string) => {
    const filtredArr = searchResult.filter((item: any) => item.id !== id);
    setSearchResult(filtredArr);
    onRemoveItem()
  }

  return (
    <div className='search_game_wrap'>
      <h3>Пошук гри за назвою</h3>
      <div className='search_field_wrap'>
        <input
          type='text'
          onChange={(e) => setSearchVal(e.target.value)}
          value={searchVal}
          placeholder='Пошук...'
        />
        <button
          className={`animated_loading_btn ${isLoading ? 'loading' : ''}`}
          onClick={handleSearch}
        >
          { isLoading && <img src='images/lina_pes.png' alt='' /> }
          <span className='btn_text'>Шукати</span>
        </button>
      </div>
      { searchResult.length > 0 && searchResult.map((item: any) => {
          return (
            <PlayedListItem
              key={Math.random().toString()}
              name={item.name}
              imageUrl={item.imageUrl}
              gameUrl={item.gameUrl}
              id={item.id}
              playedDate={item.playedDate}
              onRemove={handleRemoveItem}
            />
          )
      })}
      { searchResult.length > 0 && (
          <button
            className='clear_search_result'
            onClick={handleClearSearchResult}
          >
            Очистити
          </button>
      )}
      { showModal && (
          <ModalWindow
            onClose={() => setShowModal(false)}
            image='pain.png'
            text={modalText}
          />
        )
      }
    </div>
  )
}