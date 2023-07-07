import React, { FC, useEffect, useState } from 'react';

type FormInputType = {
  placeholder?: string;
  type?: string;
  name: string;
  isRequired: boolean;
  value: string;
  methods: any;
}

export const FormInput: FC<FormInputType> = ({ methods, name, isRequired, type, placeholder, value }) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value)
  }, [value])

  useEffect(() => {
    if(inputValue.length > 0) {
      methods.setValue(name, inputValue, { shouldValidate: isRequired })
    }
  }, [inputValue])

  return (
    <input 
      {...methods.register(name, { required: isRequired })}
      type={ type || 'text' }
      placeholder={placeholder}
      onChange={(e) => setInputValue(e.target.value)}
    />
  )
}