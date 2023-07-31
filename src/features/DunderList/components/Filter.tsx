import { FC } from 'react';
import Select from 'react-select';

type Props = {
  defaultValue: {
    value: string;
    label: string;
  };
  onChange: (option: any) => void;
  options: Array<{
    value: string;
    label: string;
  }>;
}

export const Filter: FC<Props> = ({ defaultValue, onChange, options }) => {

  const customStyles = {
    singleValue: (defaultStyles: any) => ({ ...defaultStyles, color: '#dedee3' }),

    control: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      backgroundColor: 'transparent',
      borderWidth: '0 0 1px 0',
      borderColor: state.isFocused ? '#be2a2a' : '#dedee3',
      borderStyle: 'solid',
      borderRadius: '0px',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#be2a2a',
        cursor: 'pointer'
      }
    }),
    
    option: (defaultStyles: any, state: any) => ({ 
      ...defaultStyles,
      color: state.isSelected ? '#212529' : '#dedee3',
      backgroundColor: state.isSelected ? '#be2a2a' : '#26262c',
      '&:hover': {
        backgroundColor: '#be2a2a',
        cursor: 'pointer'
      }
    }),

    menuList: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      padding: 0,
    }),
  };

  return (
    <div className='dunderlist_filter'>
      <p>Сортувати за:</p>
      <Select 
        defaultValue={defaultValue}
        onChange={onChange}
        options={options}
        isSearchable={false}
        styles={customStyles}
      />
    </div>
  )
}