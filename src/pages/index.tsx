import Image from "next/image";
import { Inter } from "next/font/google";
import Topbar from "@/components/Topbar/Topbar";
import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import useHasMounted from "@/hooks/useHasMounted";
import styled from "styled-components";
import leftBG from "./../../public/images/home_codeBG1.png";
import rightBG from "./../../public/images/home_codeBG2.png";

const inter = Inter({ subsets: ["latin"] });

const Container = styled.div`
  main {
    background: #ffffff;
  }
  .bg-dark-blue {
    background: #b3dfff;
  }
  .bg-light-blue {
    background: #b1d0e76e;
  }
  tr {
    background: #2490dd;
    text-align: center;
  }
  tbody {
    color: #000000;
  }
  .leftBG {
    position: absolute;
    width: 340px;
    top: 50%;
    height: 300px;
    z-index: 0;
    left: -2%;
  }

  .rightBG {
    position: absolute;
    width: 340px;
    top: 50%;
    height: 300px;
    z-index: 0;
    right: 0;
  }
  table {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 10px;
  }
  th {
    font-weight: 600;
    color: white;
    text-align: center;
  }
`;

export default function Home() {
  const [loadingProblems, setLoadingProblems] = useState(true);
  const hasMounted = useHasMounted();
  const [inputs, setInputs] = useState({
    id: "",
    title: "",
    difficulty: "",
    category: "",
    videoId: "",
    link: "",
    order: 0,
    likes: 0,
    dislikes: 0,
  });
  if (!hasMounted) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProblem = {
      ...inputs,
      order: Number(inputs.order),
    };
    await setDoc(doc(firestore, "problems", inputs.id), newProblem);
    alert("Saved to db");
  };
  return (
    <Container>
      <main className="bg-dark-layer-2 min-h-screen">
        <Topbar problemPage={false} />
        <h1 className="text-2xl text-center text-gray-700 dark:text-gray-400 font-medium uppercase mt-10 mb-5">
          &ldquo;Something inspirational here!&ldquo;
        </h1>
        <div className="relative overflow-x-auto mx-auto px-6 pb-10">
          {loadingProblems && (
            <div className="max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse">
              {[...Array(10)].map((_, idx) => (
                <LoadingSkelton key={idx} />
              ))}
            </div>
          )}
          <table className="text-sm text-left text-gray-700 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto">
            {!loadingProblems && (
              <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b">
                <tr>
                  <th scope="col" className="px-1 py-3 w-0 font-medium">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 w-0 font-medium">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 w-0 font-medium">
                    Difficulty
                  </th>
                  <th scope="col" className="px-6 py-3 w-0 font-medium">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 w-0 font-medium">
                    Solution
                  </th>
                </tr>
              </thead>
            )}
            <ProblemsTable setLoadingProblems={setLoadingProblems} />
          </table>
        </div>
        <Image className="leftBG" src={leftBG} alt="" />
        <Image className="rightBG" src={rightBG} alt="" />
        {/* tempform*/}
        {/* <form
          className="p-6 flex flex-col max-w-sm gap-3"
          onSubmit={handleSubmit}
        >
          <input
            onChange={handleInputChange}
            type="text"
            placeholder="problem id"
            name="id"
          />
          <input
            onChange={handleInputChange}
            type="text"
            placeholder="title"
            name="title"
          />
          <input
            onChange={handleInputChange}
            type="text"
            placeholder="difficulty"
            name="difficulty"
          />
          <input
            onChange={handleInputChange}
            type="text"
            placeholder="category"
            name="category"
          />
          <input
            onChange={handleInputChange}
            type="text"
            placeholder="order"
            name="order"
          />
          <input
            onChange={handleInputChange}
            type="text"
            placeholder="videoId?"
            name="videoId"
          />
          <input
            onChange={handleInputChange}
            type="text"
            placeholder="link?"
            name="link"
          />
          <button className="bg-white">Save to firestore</button>
        </form> */}
      </main>
    </Container>
  );
}

const LoadingSkelton = () => {
  return (
    <div className="flex items-center space-x-12 mt-4 px-6">
      <div className="w-6 h-6 shrink-0 rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
