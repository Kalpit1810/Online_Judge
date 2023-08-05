import { useEffect, useState } from "react";
import axios from "axios";
import "./submissions.css";

const Submissions = () => {
  const [submissionList, setProblemList] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get("http://localhost:3001/submissions/");
        setProblemList(response.data);
        console.log("Submission List Fetched Successfully!!");
      } catch (error) {
        console.log("Error Catching List", error.message);
      }
    };
    fetchList();
  }, []);

  return (
    <>
      <div className="submissionList">
        <div className="submissionlistContainer">
          <div className="listHeading">
            <h4>User Name</h4>
            <h4>Problem Name</h4>
            <h4>Verdict</h4>
          </div>
          <ul>
            {submissionList?.map((r) => (
              <li key={r._id} className="listsubmissions" >
                <div> {r.userName}</div>
                <div >  {r.problemName} </div>
                <div >  {r.verdict} </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export { Submissions };
