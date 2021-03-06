import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { Provider } from 'react-redux'
import store from './redux/store'

import './App.css';
import { StyledEngineProvider } from '@mui/material/styles';

import Navbar from './components/Navbar'
import Home from './components/Home'
import Favorites from './components/Favorites'


function App() {

  return <>
    <Provider store={store}>
      {/* for the way I style the button for example */}
      <StyledEngineProvider injectFirst>

        <BrowserRouter>
          <Navbar />

          <Switch>
            <Route exact path="/favorites">
              <Favorites />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/">
              <Redirect to="/" />
            </Route>
          </Switch>

        </BrowserRouter>

      </StyledEngineProvider>
    </Provider>
  </>
}

export default App;
