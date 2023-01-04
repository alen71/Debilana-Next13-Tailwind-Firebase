import React from 'react'

type Props = {
  name: string
  placeholder: string
  rows: number
  required?: boolean
  onChange?: any
  value?: string
  errorMessage?: string
}

const TextareaCustom = ({
  name,
  placeholder,
  rows,
  required,
  onChange,
  value,
  errorMessage
}: Props) => {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      required={required}
      rows={rows}
      value={value}
      className="w-full bg-transparent border-[1px] border-gray placeholder:text-gray focus:placeholder:text-black focus:border-black focus:dark:border-white focus:placeholder:dark:text-white outline-none rounded-[4px] py-[6px] px-[14px]"
      onChange={onChange}
    />
  )
}

export default TextareaCustom
