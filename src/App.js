import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Cards from './Cards';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Cards />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
