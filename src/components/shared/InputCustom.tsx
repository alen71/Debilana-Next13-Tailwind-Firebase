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
      className="border-[1px] border-gray focus:border-black focus:dark:border-white text-gray focus:text-black focus:dark:text-white focus:placeholder:dark:text-white focus:placeholder:text-black outline-none bg-transparent rounded-[4px] py-[6px] px-[14px]"
    />
  )
}

export default InputCustom
