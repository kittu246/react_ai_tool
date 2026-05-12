import React, { useEffect, useRef, useState } from "react";
import Answers from "./components/Answers";
import QuestionAnswer from "./components/QuestionAnswer";
import RecentSearch from "./components/RecentSearch";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState([]);
  const [searchHistory, setSearchHistory] = useState(
    JSON.parse(localStorage.getItem("questionHistory")),
  );
  const [oldSearch, setOldSearch] = useState("");
  const containerScoll = useRef();
  const [loading, setLoading] = useState(false);
  const [darkMode,setDarkMode]= useState("dark");

  const handleAskQuestion = async () => {
    if (!question && !oldSearch) {
      return false;
    }

    if (question) {
      if (localStorage.getItem("questionHistory")) {
        let history = JSON.parse(localStorage.getItem("questionHistory"));
        history = [question, ...history];

        localStorage.setItem("questionHistory", JSON.stringify(history));
        setSearchHistory(history);
      } else {
        localStorage.setItem("questionHistory", JSON.stringify([question]));
        setSearchHistory([question]);
        //  console.log(localStorage.getItem("questionHistory"));
      }
    }

    let finalQues = question || oldSearch;

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: finalQues }),
      });

      const data = await res.json();

      let cleanData = data.answer.split("* ");
      cleanData = cleanData.map((item) => item.trim());
      // console.log(cleanData);
      setAnswer([
        ...answer,
        { type: "q", text: finalQues },
        { type: "a", text: cleanData },
      ]);
      setQuestion("");

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEnterPress = (e) => {
    if (e.key == "Enter") {
      handleAskQuestion();
    }
  };

 

  useEffect(() => {
    if (oldSearch) {
      handleAskQuestion();
    }
  }, [oldSearch]);

  useEffect(() => {
    if (containerScoll.current) {
      containerScoll.current.scrollTop = containerScoll.current.scrollHeight;
      console.log(containerScoll.current.scrollTop);
    }
  }, [answer]);

  useEffect(() =>{

  if(darkMode==="dark"){
    document.documentElement.classList.add("dark")



  }
  else{
    document.documentElement.classList.remove("dark")

  }

  },[darkMode])

  return (
   
    <div className="bg-zinc-900  h-screen grid grid-cols-5 overflow-hidden">

      <select onChange={(e)=>setDarkMode(e.target.value)} className="fixed bottom-0 p-2 border-none bg-transparent dark:text-zinc-200 text-zinc-600">
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
      <RecentSearch  setSearchHistory={setSearchHistory} searchHistory={searchHistory} setOldSearch={setOldSearch}/>
      <div className="col-span-4  dark:bg-zinc-900 bg-amber-50 h-screen p-7  ">
        <h1 className="text-3xl bg-clip-text text-center mb-7 text-transparent bg-gradient-to-r from-pink-700 to-violet-700">
          Hello User, Ask me Anything
        </h1>

        {loading && (
          <div className="flex gap-2 justify-center items-center text-zinc-300">
            <div className="w-3 h-3 bg-zinc-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-3 h-3 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
          </div>
        )}

        <div
          ref={containerScoll}
          className="  overflow-y-auto h-full  text-zinc-300  p-10"
        >
          <ul>
            {answer &&
              answer.map((item, index) => (
                <QuestionAnswer item={item} index={index}   />
              ))}
          </ul>
        </div>
        <div className="w-1/2  m-auto dark:text-white text-zinc-500 dark:bg-zinc-600 bg-pink-50 rounded-3xl border dark:border-zinc-500 border-zinc-300 overflow-hidden z-1 fixed bottom-[2.5%] left-[35%] ">
          <input
            type="text"
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleEnterPress}
            value={question}
            placeholder="Ask me anything"
            className=" p-4 w-[85%] h-full outline-none bg-transparent "
          />
          <button className="" onClick={handleAskQuestion}>
            Ask
          </button>
        </div>
      </div>
    </div>

  
  );
}

export default App;
