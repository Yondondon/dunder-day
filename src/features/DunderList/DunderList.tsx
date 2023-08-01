import { useEffect, useState } from 'react';
import { useGetDunderlistQuery, useLazyGetDunderlistQuery } from '../api/apiSlice';
import { DunderListItem } from './components/DunderListItem';
import { ModalWindow } from '../../components/ModalWindow/ModalWindow';
import { Loader } from '../../components/Loader/Loader';
import { Filter } from './components/Filter';
import { sortDunderList } from '../../utils';

type SortOptionType = {
  value: string;
  label: string;
}

const sortOptions: SortOptionType[] = [
  { value: 'date', label: 'Свіжістю' },
  { value: 'heart', label: 'Лайками' },
  { value: 'poop', label: 'Дизлайками' },
]

export const DunderList = () => {
  const {
    data: dunderlist,
    isFetching,
    isError,
    isSuccess
  } = useGetDunderlistQuery();
  const [getDunderlist, results] = useLazyGetDunderlistQuery();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMsg, setModalMsg] = useState<string>('');
  const [list, setList] = useState([]) as any[];
  const [searchVal, setSearchVal] = useState<string>('');
  const [sortFilter, setSortFilter] = useState(sortOptions[0]);

  useEffect(() => {
    if(isSuccess) {
      let sortedDunderlist: any[] = [...dunderlist.data.list]
      sortedDunderlist.sort((a: any, b: any) => {
        return b.created - a.created;
      })
      setList(sortedDunderlist)
    }
  }, [isSuccess])

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

  useEffect(() => {
    const arr = [...list];
    if(arr.length === 0) return;
    const sortedList = sortDunderList(arr, sortFilter.value);
    setList(sortedList)
  }, [sortFilter])

  useEffect(() => {
    if(results && results.data) {
      const fetchedData = [...results.data.data.list];
      const sortedList = sortDunderList(fetchedData, sortFilter.value);
      setList(sortedList)
    }
  }, [results])

  const renderList = () => {
    const filteredList = list.filter((item: any) => item.name.toLowerCase().includes(searchVal));
    return filteredList.map((item: any) => {
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
          onAction={() => getDunderlist()}
        />
      )
    })
  }

  const handleSearch = (e: any) => {
    setSearchVal(e.target.value.toLowerCase())
  }

  const handleSelect = (selectedOption: any) => {
    setSortFilter(selectedOption)
  }

  return (
    <div className='dunderlist_wrap'>
      <div className='dunderlist_search_filter_wrap'>
        <Filter
          defaultValue={sortFilter}
          onChange={handleSelect}
          options={sortOptions}
        />
        <input
          type='text'
          className='dunderlist_search'
          onChange={(e) => handleSearch(e)} value={searchVal}
          placeholder='Пошук...'
        />
      </div>
      <div className='loader_wrap'>
        { isFetching && <Loader />}
      </div>
      { list.length === 0 && <span className='no_list_items'>У списку поки нема ігорів :с</span>}
      { renderList() }
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