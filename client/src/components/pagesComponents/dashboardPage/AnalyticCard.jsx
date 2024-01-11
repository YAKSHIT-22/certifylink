import React from "react";

const AnalyticCard = ({ heading, data = [], type = "" }) => {
  console.log(data)
  return (
    <div className="w-full flex items-start relative h-full justify-center bg-[#181818] border border-[#222222] rounded-md text-white p-4">
      <div className="flex w-full items-center justify-center gap-2 flex-col px-2">
        <div className="flex items-center justify-start text-lg w-full">
          {heading}
        </div>
        <div className="flex items-center gap-4 text-sm justify-center flex-col w-full">
          {data?.length > 0 ? data.slice(0, 3)?.map((item, index) => {
            return type === "template" ?
              <div key={index} className="flex items-center h-full gap-4 justify-between w-full">
                <div>{index + 1}. {item.templateName}</div>
                <div>01</div>
              </div>
              :
              <div key={index} className="flex items-center h-full gap-4 justify-between w-full">
                <div>{index + 1}. {item.organizationName}</div>
                <div>01</div>
              </div>
          }) : <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center"> No Data found
          </div>}
        </div>
      </div>
    </div>
  );
};

export default AnalyticCard;
