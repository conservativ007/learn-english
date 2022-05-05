import './App.css';
import { useRoutes } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Createset from './pages/CreateSet';

function App() {

  let element = useRoutes([
    { path: "/", element: <Home /> },
    { path: "about", element: <About /> },
    { path: "create-set", element: <Createset /> },
  ]);

  return element;
}

export default App;
