import React, { useState, FC } from 'react';
import { DatePicker } from '../../../components/DatePicker/DatePicker';

type Props = {
  onConfirm: (date: string) => void;
  isLoading: boolean;
}

export const DateModal: FC<Props> = ({ onConfirm, isLoading }) => {
  const [date, setDate] = useState<string>('')

  return (
    <div className='modal_background'>
      <div className='modal_window'>
        <span>Коли гралися?</span>
        <DatePicker onChange={val => setDate(val)} />
        <button onClick={() => onConfirm(date)} disabled={isLoading}>OK</button>
      </div>
    </div>
  )
}