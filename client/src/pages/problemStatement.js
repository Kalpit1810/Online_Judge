import { NavBar } from "../components/navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import "./problemStatement.css";
import { useParams } from "react-router-dom";

const ProblemStatement = () => {
  const [problem, setProblem] = useState({});
  let { problemID } = useParams();

  useEffect(() => {
    const fetctProblem = async () => {
      try {
        console.log();
        const response = await axios.get( `http://localhost:3001/problem-statement/${problemID}`);
        setProblem(response.data);
        console.log("Problem statement fetched!!");
      } catch (error) {
        console.log("Error Fetching Problem statement:", error.message);
      }
    };

    fetctProblem();
  }, [problemID]);

  return (
    <>
      <NavBar />
      <div className="Problem">
        <h2 className="ProblemName"> {problem?.problemName} </h2>
        <div className="ProblemStatement">{problem?.problemStatement}</div>
      </div>
    </>
  );
};

export { ProblemStatement };
