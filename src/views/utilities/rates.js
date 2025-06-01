import Inquiry from './components/inquiry'
import Rates from './components/rates'

const RatesView = ({ onRateSelect }) => {
  return (
    <div className="flex gap-7 px-6">
      <div className='flex-1'>
        <Rates onRateSelect={onRateSelect} />
      </div>
      <Inquiry />
    </div>
  )
}

export default RatesView