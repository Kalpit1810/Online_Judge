import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./problemList.css";

export const ProblemList = () => {
  const [problemList, setProblemList] = useState([]);
  const navigate = useNavigate();

  const showStatement = (ID) => {
    navigate(`/problem-statement/${ID}`);    
  };

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get("http://localhost:3001/problem-list/");
        setProblemList(response.data);
        console.log("List Fetched Successfully!!");
      } catch (error) {
        console.log("Error Catching List", error.message);
      }
    };
    fetchList();
  }, []);

  return (
    <>
      <div className="problemList">
        <h2>Happy Coding :)</h2>
        <div className="listContainer">
          <div className="listHeading">
            <h4>Problem Name</h4>
            <h4>Difficulty</h4>
          </div>
          <ul>
            {problemList.map((r) => (
              <li key={r._id} className="listProblem" onClick={() => showStatement(r._id)} >
                <div className="listProblemName">{r.problemName}</div>
                <div className="listProblemDifficulty">  {r.problemDifficulty} </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
