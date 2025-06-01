const Form = () => {
  return (
    <div className='flex w-[462px] flex-col gap-7 rounded-lg border border-gray bg-grayLight p-6 pt-10 text-center'>
      <p className='text-[25px] font-semibold'>Get Started with Your Plan: </p>
            
      <button
        className='flex h-12 w-full items-center justify-center rounded-full bg-black'
      >
        <span className='font-medium uppercase text-white'>Get Started</span>
      </button>
    </div>

  )
}

export default Form
