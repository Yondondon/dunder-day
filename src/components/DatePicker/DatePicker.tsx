import React, { useRef, FC, useState, useEffect } from 'react';

type Props = {
  onChange: (value: any) => void;
}

const secondsToDate = (seconds: number): string => {
  const date = new Date(seconds);
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}

export const DatePicker: FC<Props> = ({ onChange }) => {
  const dateInputRef = useRef(null);
  const [dateVal, setDateVal] = useState<string>(secondsToDate(Date.now()));

  useEffect(() => {
    onChange(dateVal)
  })

  const handleChange = (e: any) => {
    const seconds: number = new Date(e.target.value).getTime();
    setDateVal(secondsToDate(seconds));
    onChange(dateVal)
  }

  return (
    <input
      type='date'
      onChange={e => handleChange(e)}
      ref={dateInputRef}
      value={dateVal}
    />
  );
};