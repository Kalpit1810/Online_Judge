   import './App.css';
   import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
   import {Auth} from "./pages/auth";
   import {ProblemList} from "./pages/problemList";
   import {ProblemStatement} from "./pages/problemStatement";
   import {Submissions} from "./pages/submissions";

  function App() {

    return (
      <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<Auth />} />
            <Route path='/problem-list' element={<ProblemList />} />
            <Route path='/problem-statement/:problemID' element={<ProblemStatement />} />
            <Route path='/submissions' element={<Submissions />} />
          </Routes>
        </Router>
      </div>
    );
  }

  export default App;
