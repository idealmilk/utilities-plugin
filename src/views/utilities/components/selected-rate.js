const SelectedRate = () => {
  return (
    <div
      className='w-80 rounded-lg border border-gray overflow-hidden'
      style={{ boxShadow: '0px 14px 15px 0px rgba(0,0,0,0.03)' }}
    >
      <div className='flex w-full items-center justify-center bg-[#FFF100] py-2'>
        <p className='font-bold'>Selected Plan</p>
      </div>
      <div className='flex flex-col items-center gap-5 py-7 text-center'>
        <p className='text-xl font-bold'>Plan Name</p>
        <div className='flex items-baseline gap-1.5'>
          <p className='text-xs font-light uppercase'>Term: </p>
          <p className='text-lg'>36 months</p>
        </div>
        <div className='flex items-baseline gap-1.5'>
          <p className='text-xs font-light uppercase'>Rate: </p>
          <p className='text-lg'>14.9¢ kWh*</p>
        </div>
      </div>
    </div>
  )
}

export default SelectedRate