const UserReport = () => {
    return (
      <div className="w-[609px] h-[395.53px] p-6 bg-white rounded-lg shadow flex-col justify-start items-start gap-6 inline-flex">
        {/* Header */}
        <div className="self-stretch justify-center items-center inline-flex">
          <div className="grow shrink basis-0 flex-col justify-center items-start gap-2 inline-flex">
            <div className="text-[#111928] text-3xl font-bold font-['Inter'] leading-[30px]">32.4k</div>
            <div className="text-gray-500 text-base font-bold font-['Inter'] leading-normal">Users this week</div>
          </div>
          <div className="justify-end items-center flex">
            <div className="text-[#0e9f6e] text-base font-semibold font-['Inter'] leading-normal">12%</div>
            <div className="w-3 h-3 relative" />
          </div>
        </div>
  
        {/* Placeholder Chart */}
        <div className="self-stretch h-[196.53px] relative bg-gray-200" />
  
        {/* Footer */}
        <div className="self-stretch pt-5 border-t border-gray-200 justify-between items-start inline-flex">
          <div className="justify-start items-center gap-1.5 flex">
            <div className="text-gray-500 text-sm font-bold font-['Inter'] leading-[21px]">Last 7 days</div>
            <div className="w-2.5 h-2.5 relative" />
          </div>
          <div className="w-[253.33px] self-stretch justify-end items-center gap-1.5 flex">
            <div className="text-[#1a56db] text-sm font-semibold font-['Inter'] uppercase leading-[21px]">USERS REPORT</div>
            <div className="w-2.5 h-2.5 relative" />
          </div>
        </div>
      </div>
    );
  };
  
  export default UserReport;
  