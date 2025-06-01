const Rate = ({ onSelect }) => {
  return (
    <div className="rounded-lg border border-solid border-gray"
      style={{ boxShadow: '0px 14px 15px 0px rgba(0,0,0,0.03)' }}
    >
      <div className="flex">
        {/* Left section with padding */}
        <div className="flex flex-1 items-center justify-between px-10 py-3">
          <p className="text-xl">Plan Name</p>
          <div className="flex gap-8">
            <div className="flex items-baseline gap-1">
              <p className="text-xs">Term:</p>
              <p className="text-lg">36 months</p>
            </div>
            <div className="flex items-baseline gap-1">
              <p className="text-xs">Rate:</p>
              <p className="text-lg">14.9¢ kWh*</p>
            </div>
          </div>
        </div>

        <div className="flex items-stretch">
          <button
            className="rounded-r-lg bg-[#FFF100] px-5 font-bold"
            onClick={onSelect}
          >
            Select Plan
          </button>
        </div>
      </div>
    </div>
  )
}

export default Rate