import { BrowserRouter, Routes, Route } from "react-router-dom";
import SelectView from "./views/select-view";
import QuizView from "./views/quiz-view";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SelectView />} />
          <Route path="/quiz" element ={<QuizView/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
