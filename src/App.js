import './App.css';
import { useRoutes } from "react-router-dom";
import Home from './pages/Home';
import Createset from './pages/CreateSet';
import ShowCard from './components/ShowCard';

function App() {

  let element = useRoutes([
    { path: "/", element: <Home /> },
    { path: "show-card/:card_name", element: <ShowCard /> },
    { path: "create-set", element: <Createset /> },
  ]);

  return element;
}

export default App;
