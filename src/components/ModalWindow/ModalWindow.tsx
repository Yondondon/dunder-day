import React, { FC } from 'react';

type Props = {
  onClose: () => void;
  text: string;
  image: 'lina_pes.png' | 'pain.png';
}

export const ModalWindow: FC<Props> = ({ onClose, text, image }) => {
  return (
    <div className='modal_background'>
      <div className='modal_window'>
        <img src={`images/${image}`} alt='' />
        <span>{text}</span>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  )
}