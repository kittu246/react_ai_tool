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
        <span className="block py-2 text-lg dark:text-white text-zinc-600 ">{finalAns}</span>
      ) : heading || type=="q" ? (
        <span className="block py-2 text-sm dark:text-white text-zinc-600 ">{finalAns}</span>
      ) : (
        <span className="text-xsm">{finalAns}</span>
      )}
    </div>
  );
};

export default Answers;
