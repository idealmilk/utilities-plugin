import useSWR from 'swr'

import RateSkeleton from '../../../components/skeletons/rate'
import { getUtilities } from '../../../data/api/utilities'

import Rate from './rate'

const fetcher = async ([ , q ]) => {
  return await getUtilities(q)
}


const Rates = ({ onRateSelect }) => {
  const zip = "44114"

  const { data: utilities, isLoading, error } = useSWR(
    zip ? [ 'api/utilities', zip ] : null,
    fetcher,
  )

  console.log("utilities: ", utilities)

  if (!zip) {
    return (
      <div className="flex h-80 w-full items-center justify-center text-center">
        <p className="text-black/50">
          No zip found in URL query, Matt will build out a form for this instance.
        </p>
      </div>
  
    )
  }

  if (error || (utilities && ('error' in utilities))) {
    return (
      <div className="flex h-80 w-full items-center justify-center text-center">
        <p className="text-black/50">
          We could not connect to the server at this time. Please try again later.
        </p>
      </div>
  
    )
  }

  if (isLoading) {
    return (
      <div className='flex flex-col gap-7'>
        {
          [ 1,2,3,4 ].map((num) => 
            <RateSkeleton key={num}/>,
          )
        }
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-7'>
      {
        utilities?.map((utility) =>
          utility.rates.map((rate, index) => (
            <Rate
              key={`${utility.id}-${index}`}
              onSelect={() => onRateSelect(rate)}
              {...rate}
            />
          )),
        )
      }
    </div>
  )
}

export default Rates