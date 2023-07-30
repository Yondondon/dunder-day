import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useGetDunderlistQuery } from '../api/apiSlice';
import { DunderListItem } from './components/DunderListItem';
import { ModalWindow } from '../../components/ModalWindow/ModalWindow';
import { Loader } from '../../components/Loader/Loader';

type SortOptionType = {
  value: string;
  label: string;
}

const sortOptions: SortOptionType[] = [
  { value: 'date', label: 'Новизна' },
  { value: 'heart', label: 'Лайки' },
  { value: 'poop', label: 'Дизлайки' },
]

export const DunderList = () => {
  const {
    data: dunderlist,
    isFetching,
    isError,
  } = useGetDunderlistQuery();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMsg, setModalMsg] = useState<string>('');
  const [list, setList] = useState([]) as any[];
  const [searchVal, setSearchVal] = useState<string>('');
  const [sortFilter, setSortFilter] = useState(sortOptions[0]);

  let sortedDunderlist: any[] = [];

  useEffect(() => {
    if(dunderlist && dunderlist.data.list.length > 0) {
      sortedDunderlist = [...dunderlist.data.list]
      sortedDunderlist.sort((a: any, b: any) => {
        return b.created - a.created;
      })
      setList(sortedDunderlist)
    }
  }, [dunderlist])

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
    switch(sortFilter.value) {
      case 'date':
        arr.sort((a: any, b: any) => {
          return b.created - a.created;
        });
        break;
      case 'heart':
        arr.sort((a: any, b: any) => {
          return b.reactions.heart - a.reactions.heart;
        });
        break;
      case 'poop':
        arr.sort((a: any, b: any) => {
          return b.reactions.poop - a.reactions.poop;
        });
        break;
      default:
        return;
    }
    setList(arr)
  }, [sortFilter])

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
      <input
        type='text'
        onChange={(e) => handleSearch(e)} value={searchVal}
        placeholder='Пошук...'
      />
      <Select 
        defaultValue={sortFilter}
        onChange={handleSelect}
        options={sortOptions}
      />
      { isFetching && <Loader />}
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