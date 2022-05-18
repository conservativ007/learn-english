import './App.css';
import { useRoutes } from "react-router-dom";
import Home from './components/Home';
import Createset from './components/CreateSet';
import ShowCard from './components/ShowCard';
import Spelling from './components/games/Spelling';

function App() {

  let element = useRoutes([
    { path: "/", element: <Home /> },
    { path: "show-card/:card_name", element: <ShowCard /> },
    { path: "create-set", element: <Createset /> },
    { path: "spelling/:card_name", element: <Spelling /> },
  ]);

  return element;
}

export default App;
