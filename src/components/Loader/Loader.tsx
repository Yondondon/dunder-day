import React, { FC } from 'react';

type Props = {
  type?: 'default' | 'form';
}

export const Loader: FC<Props> = ({ type = 'default' }) => {
  if (type === 'form') {
    return (
      <div className='form_loading'>
        <img src='images/lina_pes.png' alt='' />
      </div>
    )
  }

  return (
    <div className='loader'>
      <img src='images/lina_pes.png' alt='' />
      <span>Завантаження...</span>
    </div>
  )
}