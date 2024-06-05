import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div>
        <div className="w-16 h-16 border-4 border-dashed rounded-full glass ash-mesh animate-spin dark:border-violet-400"></div>
      </div>
    </div>
  );
};

export default Loading;
