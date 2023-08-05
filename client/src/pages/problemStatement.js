import axios from "axios";
import { useEffect, useState, useRef } from "react";
import "./problemStatement.css";
import { useParams, useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserID";

const ProblemStatement = () => {
  const [problem, setProblem] = useState({});
  const [file, setFile] = useState();
  const btn = useRef();
  let { problemID } = useParams();
  const navigate = useNavigate();
  const userID = useGetUserID();

  useEffect(() => {
    const fetctProblem = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/problem-statement/${problemID}`
        );
        setProblem(response.data);
        console.log("Problem statement fetched!!");
      } catch (error) {
        console.log("Error Fetching Problem statement:", error.message);
      }
    };

    fetctProblem();
  }, [problemID]);

  const onChooseFile = () => {
    btn.current.click();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userID === undefined || userID === null) {
      console.log("User Not LogedIn")
      alert("please login");
    } else {
      const formdata = new FormData();
      formdata.append("file", file);
      formdata.append("userID", userID);
      formdata.append("problemName", problem.problemName);

      if (file) {
        alert("Code Sample is Being evaluated");
        try {
          const res = await axios.post(
            `http://localhost:3001/problem-statement/${problemID}/submit`,
            formdata
          );
          console.log("file uploaded successfully!!", res);
          navigate("/submissions");
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
    }
  };

  return (
    <>
      <div className="Problem">
        <h2 className="ProblemName"> {problem?.problemName} </h2>
        <div className="ProblemStatement">
          <pre>{problem?.problemStatement}</pre>
        </div>
        <form
          className="Button"
          encType="multipart/form-data"
          onSubmit={onSubmit}
        >
          <button onClick={onChooseFile} className="chooseButton">
            Choose File
          </button>
          <input
            type="file"
            ref={btn}
            accept=".cpp"
            name="submitFile"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <button type="submit" className="submitButton">
            Submit
          </button>
          {file?.name}
        </form>
      </div>
    </>
  );
};

export { ProblemStatement };
