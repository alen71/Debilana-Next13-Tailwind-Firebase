import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import Navbar from '../components/layout/navbar/Navbar'
import InputCustom from '../components/shared/InputCustom'
import TextareaCustom from '../components/shared/TextareaCustom'

const BeAdmin = () => {
  const [isFormCorrect, setIsFormCorrect] = useState(false)

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      fbAcc: '',
      answer: ''
    },

    validationSchema: Yup.object({
      firstName: Yup.string()

        .min(3, 'Mora biti 3 slova ili više')

        .required('Obavezno'),

      lastName: Yup.string()

        .min(3, 'Mora biti 3 slova ili više')

        .required('Obavezno'),

      fbAcc: Yup.string()
        .matches(
          /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
          'URL nije validan'
        )
        .required('Obavezno')
    }),

    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    }
  })

  useEffect(() => {
    if (
      Object.keys(formik.errors).length === 0 &&
      formik.values.firstName.length > 0 &&
      formik.values.lastName.length > 0 &&
      formik.values.fbAcc.length > 0 &&
      formik.values.answer.length > 0
    )
      setIsFormCorrect(!isFormCorrect)
  }, [formik.errors])

  const typing = isFormCorrect
    ? 'bg-gray-text-hover-dark dark:bg-black'
    : 'bg-gray-text-hover pointer-events-none'

  return (
    <div className="h-screen pt-[71px] pb-6 overflow-y-auto">
      <Navbar hideSearch hideSortTable />

      <div className="mx-6 md:mx-auto md:max-w-xl 2xl:max-w-[700px]">
        <p className="text-center text-xl sm:text-3xl mt-6 pb-2 sm:pb-4">
          Pravila za ADMINA su:
        </p>
        <p className="text-center font-bold uppercase text-3xl sm:text-5xl mb-6">
          10 božijih zapovesti
        </p>
        <h2 className="font-bold text-lg sm:text-2xl mb-6 capitalize pl-6">
          Postani admin
        </h2>
        <form
          onSubmit={formik.handleSubmit}
          className="flex gap-5 flex-col rounded-md text-sm sm:text-base bg-main-gray dark:bg-gray-dark px-6 pt-8 pb-14 mb-6"
        >
          <InputCustom
            type="text"
            name="firstName"
            placeholder="* Vaše Ime:"
            required
            onChange={formik.handleChange}
            value={formik.values.firstName}
            errorMessage={formik.errors.firstName}
          />
          <InputCustom
            type="text"
            name="lastName"
            placeholder="* Vaše Prezime:"
            required
            onChange={formik.handleChange}
            value={formik.values.lastName}
            errorMessage={formik.errors.lastName}
          />
          <InputCustom
            type="url"
            name="fbAcc"
            placeholder="* Link vašeg Facebook profila:"
            required
            onChange={formik.handleChange}
            value={formik.values.fbAcc}
            errorMessage={formik.errors.fbAcc}
          />
          <div>
            <p className="pb-3 dark:text-primary-dark">
              Neko pitanje iz biblije? Ili više pitanja koja ce se random
              prikazivati.
            </p>
            <TextareaCustom
              name="answer"
              placeholder="* Napiši odgovor:"
              rows={8}
              required
              onChange={formik.handleChange}
              value={formik.values.answer}
              errorMessage={formik.errors.answer}
            />
          </div>
          <button
            className={`${typing} px-8 py-1 w-fit ml-auto rounded-full text-white `}
          >
            Pošalji zahtjev
          </button>
        </form>
      </div>
    </div>
  )
}

export default BeAdmin
