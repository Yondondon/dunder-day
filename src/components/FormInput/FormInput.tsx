import React, { FC } from 'react';

type FormInputType = {
  placeholder?: string;
  type?: string;
  register: any;
  name: string;
  isRequired: boolean;
}

export const FormInput: FC<FormInputType> = ({ register, name, isRequired, type, placeholder }) => {
  return (
    <input 
      {...register(name, { required: isRequired })}
      type={ type || 'text' }
      placeholder={placeholder}
    />
  )
}