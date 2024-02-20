import React from "react";

const DownloadButton = ({buttonName, download}) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `/${download}`;
    link.download = download;
    link.click();
  };
  return (
    <button onClick={handleDownload} className="btn m-3 font-bold btn-lg shadow-lg bg-white border-none hover:bg-green-500 hover:text-white">
      {buttonName}
    </button>
  );
};

export default DownloadButton;
