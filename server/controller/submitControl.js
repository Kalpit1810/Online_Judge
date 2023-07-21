import path from "path";
import { exec } from "child_process";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { testCaseModel } from "../models/testcases.js";
import {submissionModel} from "../models/Submissions.js";
import {userModel} from "../models/Users.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const submitControl = async (req, res) => {
  // execute the file && generate verdict
  console.log(req);

  try {
    const userOutput = await executecpp(
      req.file.path,
      req.file.filename.split(`.`)[0]
    );

    const verdict = await generateVerdict(
      req.file.filename.split(`.`)[0],
      req.params.problemID
    );

    const user = await userModel.findById(req.body.userID);
    
    const newSubmission = new submissionModel({
      problemName: req.body.problemName,
      userName: user.userName,
      verdict
    });

    await newSubmission.save();
    return res.json({ verdict });
  } catch (error) {
    console.log("EXECUTON FAILED!!!", error.message);
  }
};

const executecpp = async (filePath, fileName) => {
  const outputPath = path.join(__dirname, "..", "output");
  const exeFilePath = path.join(outputPath, `${fileName}.exe`);
  return new Promise((resolve, reject) => {
    exec(`g++ ${filePath} -o ${exeFilePath}`, (error, stdout, stderr) => {
      if (error) {
        console.log("Error in executing the C++ code!", error);
        reject(error);
      } else if (stderr) {
        console.log("Error in executing the C++ code!", stderr);
        reject(stderr);
      } else {
        console.log("C++ code executed successfully!!");
        resolve(stdout);
      }
    });
  });
};

function normalizeLineEndings(str) {
  return str.replace(/\r\n|\r/g, "\n");
}

const runOnInput = async (fileName, input) => {
  const outputPath = path.join(__dirname, "..", "output");
  const exeFilePath = path.join(outputPath, `${fileName}.exe`);

  return new Promise((resolve, reject) => {
    const childProcess = exec(
      `"${path.normalize(exeFilePath)}"`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          reject(error.message);
        }
        resolve(stdout);
      }
    );

    childProcess.stdin.write(input);
    childProcess.stdin.end();
  });
};

const generateVerdict = async (fileName, problemID) => {
  const query = { problemID };
  const testcases = await testCaseModel.find(query);
  let verdict = 0;

  try {
    for (const doc of testcases) {
      const userOutput = await runOnInput(fileName, doc.TCInput);

      if (normalizeLineEndings(userOutput.trimEnd()) === normalizeLineEndings(doc.TCOutput.trimEnd())) {
        verdict++;
      }
    }
  } catch (error) {
    console.log("ERROR!!!!!!!!!!", error.message);
  }

  console.log(verdict);

  return verdict === testcases.length ? "Accepted" : "Wrong Answer";
};

// const generateVerdict = async (fileName, userOutput, problemID) => {
//   const outFilePath =path.join(__dirname,"..","testcases","test_output.txt")
//   // const outFilePath = path.join(outputPath, `${fileName}.txt`);

//   return new Promise((resolve, reject) => {
//     exec(`type ${outFilePath}`, (error, stdout, stderr) => {
//       if (error) {
//         console.log("Error in generarting verdict!", error);
//         reject(error);
//       } else if (stderr) {
//         console.log("Error in generarting verdict!", stderr);
//         reject(stderr);
//       } else {
//         console.log("Verdict generated successfully!!");
//         const verdict =
//           stdout.trimEnd() === userOutput.trimEnd()
//             ? "Accepted"
//             : "Wrong Answer";
//         resolve(verdict);
//       }
//     });
//   });
// };

export default submitControl;
