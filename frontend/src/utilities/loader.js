// import Loader from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// export const LoaderContainer = () => {
//   return <Loader type="ThreeDots" color="#00BFFF" height={20} width={100} />;
// };

import { Rings } from "react-loader-spinner";

export const LoaderContainer = () => (
  <div className="flex justify-center items-center ">
    <Rings color="#00BFFF" height={80} width={80} />
  </div>
);
