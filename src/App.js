import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Provider } from 'react-redux'
import store from './redux/store'

import './App.css';
import { StyledEngineProvider } from '@mui/material/styles';

import Navbar from './components/Navbar'
import NotFound from './components/NotFound'
import Home from './components/Home'
import Favorites from './components/Favorites'


function App() {

  return <>
    <Provider store={store}>
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
              <NotFound />
            </Route>
          </Switch>

        </BrowserRouter>

      </StyledEngineProvider>
    </Provider>
  </>
}

export default App;
