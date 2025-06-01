import { useEffect } from 'react'

import Form from './components/form'
import SelectedRate from './components/selected-rate'

import ArrowLeft from '../../components/icons/arrow-left'

const FormView = ({ selectedRate, onBack })=> {
  useEffect(() => {
    if (!selectedRate) {
      onBack()
    }
  }, [ selectedRate, onBack ])
  
  return (
    <div className="mx-auto flex gap-7 px-6">
      <div>
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={onBack}
        >
          <ArrowLeft />
          <p className='text-xs font-bold'>Go Back</p>
        </div>

        <div className='h-3' />
        <SelectedRate />
      </div>
      <Form />
    </div>
  )
}

export default FormView