import { useEffect, useState } from "react";
import { checkHeading, replaceHeading } from "../helper";

const Answers = ({ ans,type, index ,length}) => {
  const [heading, setHeading] = useState(false);
  const [finalAns, setFinalAns] = useState(ans);

  useEffect(() => {
    if (checkHeading(ans)) {
      setHeading(true);
      setFinalAns(replaceHeading(ans));
    }
  }, []);
  return (
    <div>
      {index === 0 && length >1 ? (
        <span className="block py-2 text-lg text-white ">{finalAns}</span>
      ) : heading || type=="q" ? (
        <span className="block py-2 text-sm text-white ">{finalAns}</span>
      ) : (
        <span className="text-xsm">{finalAns}</span>
      )}
    </div>
  );
};

export default Answers;
