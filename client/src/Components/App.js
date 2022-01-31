import HeaderFile from "./HeaderFile";
import Content from "./Content";
import { Route, Switch } from "react-router-dom";
import Leaderboard from "./Leaderboard";
import NavBar from "./NavBar";

function App() {
  return (
    <div className="body">
      <HeaderFile />
      <NavBar />
      <Switch>
        <Route path="/leaderboard">
          <Leaderboard />
        </Route>
        <Route path="/">
          <Content />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
