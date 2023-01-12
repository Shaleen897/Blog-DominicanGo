import { css } from "@emotion/react";
import React, { CSSProperties} from "react";
import CircleLoader from "react-spinners/CircleLoader";
import DotLoader from "react-spinners/DotLoader";

const override = css`
  display: "block",
  margin: "0 auto",
  borderColor: "red",`


const Spinner = ({loading}) => {
  return (
    <>
    <div className="flex justify-center font-bold mt-[100px] text-white ">
      {loading ? <DotLoader color="#000" loading={loading} css={override} size={250}/> : <button type="button" className="text-center text-[50px] font-bold p-5 rounded" disabled>
      Processing...
    </button>}
    

    
     
    </div>
    
    </>
  );
};

export default Spinner;
