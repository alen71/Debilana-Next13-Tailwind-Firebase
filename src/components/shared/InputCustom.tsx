import React from 'react'

type Props = {
  type: string
  name: string
  placeholder: string
  required?: boolean
  onChange?: any
  value?: string
  errorMessage?: string
}

const InputCustom = ({
  type,
  name,
  placeholder,
  required,
  value,
  onChange
}: Props) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      value={value}
      className="border-2 border-gray-text-hover placeholder:text-gray-text-hover focus:placeholder:text-black focus:border-black focus:dark:border-yellow focus:placeholder:dark:text-yellow outline-none bg-transparent rounded-[4px] py-[6px] px-[14px]"
    />
  )
}

export default InputCustom
