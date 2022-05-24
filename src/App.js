import './App.css';
import { useRoutes } from "react-router-dom";
import Home from './components/Home';
import Createset from './components/CreateSet';
import ShowCard from './components/ShowCard';
import Spelling from './components/games/Spelling';
import Listening from './components/games/Listening';
import Test from './components/games/Test';
import ShowResults from './components/games/ShowResults';

function App() {

  let element = useRoutes([
    { path: "/", element: <Home /> },
    { path: "show-card/:card_name", element: <ShowCard /> },
    { path: "create-set", element: <Createset /> },
    { path: "spelling/:card_name", element: <Spelling /> },
    { path: "listening/:card_name", element: <Listening /> },
    { path: "test/:card_name", element: <Test /> },
    { path: "/show-results", element: <ShowResults /> },
  ]);

  return element;
}

export default App;
