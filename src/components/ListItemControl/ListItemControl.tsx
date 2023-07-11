import React, { FC } from 'react';

type Props = {
  type: 'remove' | 'move';
  action: () => void;
}

export const ListItemControl: FC<Props> = ({ type, action }) => {
  let image: string = '';
  if(type === 'move') {
    image = 'check.svg'
  } else if(type === 'remove') {
    image = 'trash.svg'
  }

  return (
    <button className='list_item_control' onClick={action}>
      <img src={`images/${image}`} alt='' />
    </button>
  )
}