import React, { useState, FC } from 'react';
import { DatePicker } from '../../../components/DatePicker/DatePicker';

type Props = {
  onConfirm: (date: string) => void;
}

export const DateModal: FC<Props> = ({ onConfirm }) => {
  const [date, setDate] = useState<string>('')

  return (
    <div className='modal_background'>
      <div className='modal_window'>
        <span>Коли гралися?</span>
        <DatePicker onChange={val => setDate(val)} />
        <button onClick={() => onConfirm(date)}>OK</button>
      </div>
    </div>
  )
}