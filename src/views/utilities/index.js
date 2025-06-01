import { useCallback, useState } from 'react'

import FormView from './form'
import RatesView from './rates'

const UtilitiesView = () => {
  const [ step, setStep ] = useState(1)
  const [ selectedRate, setSelectedRate ] = useState()

  const handleRateSelect = useCallback((rate) => {
    setSelectedRate(rate)
    setStep(2)
  }, [ ])

  const handleFormBack = useCallback(() => {
    setSelectedRate(undefined)
    setStep(1)
  }, [ ])

  if(step === 2 && selectedRate) {
    return <FormView selectedRate={selectedRate} onBack={handleFormBack} />
  }

  return (
    <RatesView  onRateSelect={handleRateSelect} />
  )
}

export default UtilitiesView