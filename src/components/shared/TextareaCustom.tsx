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
      className="w-full bg-transparent border-2 border-gray-text-hover placeholder:text-gray-text-hover focus:placeholder:text-black focus:border-black focus:dark:border-yellow focus:placeholder:dark:text-yellow outline-none rounded-[4px] py-[6px] px-[14px]"
      onChange={onChange}
    />
  )
}

export default TextareaCustom
