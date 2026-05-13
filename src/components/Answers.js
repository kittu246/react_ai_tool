import { useEffect, useState } from "react";
import { checkHeading, replaceHeading } from "../helper";
import SyntaxHighlighter from "react-syntax-highlighter";

import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";

const Answers = ({ ans,type, index ,length}) => {
  const [heading, setHeading] = useState(false);
  const [finalAns, setFinalAns] = useState(ans);

  useEffect(() => {
    if (checkHeading(ans)) {
      setHeading(true);
      setFinalAns(replaceHeading(ans));
    }
  }, []);

  const renderer ={
    code({
      node,inline,className,children,...props
    }){
      const match =/language-(\w+)/.exec(className || '');
      return !inline &&match?(
        <SyntaxHighlighter {...props} children={String(children).replace(/\n$/,'') }
        language={match[1]}
        style={dark}
        PreTag="div"
        />

      
      ):(
        <code {...props} className={className}>{children}</code>
      )
    }
  }
  return (
    <div>
      {index === 0 && length >1 ? (
        <span className="block py-2 text-lg dark:text-white text-zinc-600 ">{finalAns}</span>
      ) : heading || type=="q" ? (
        <span className="block py-2 text-sm dark:text-white text-zinc-600 ">{finalAns}</span>
      ) : (
        <span className="text-xsm"><ReactMarkdown components={renderer}>{finalAns}</ReactMarkdown></span>
      )}
    </div>
  );
};

export default Answers;
