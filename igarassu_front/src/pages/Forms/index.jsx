// src/pages/Forms.jsx
import { useEffect } from 'react'
import { HandleGetFormType } from '../manager'
import Header from '../components/Header'
import Form   from '../components/Form'

export default function Forms() {
  useEffect(() => {
    console.log('Componente mounted!')
    return () => console.log('Componente unmounted!')
  }, [])

  const formType = HandleGetFormType()
  return (
    <div>
      <Header type="off" />
      <Form type={formType} />
    </div>
  )
}
