import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

import { useGlobalContext } from './context/GlobalState';
import ProtectedRoute from './util/ProtectedRoute';
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';
import Footer from './components/Footer';
import IdeaForm from './pages/IdeaForm';
import Register from './pages/Register';
import EditIdea from './pages/EditIdea';
import Alert from './components/Alert';
import Account from './pages/Account';
import Login from './pages/Login';
import About from './pages/About';
import Error from './pages/Error';
import Ideas from './pages/Ideas';
import Home from './pages/Home';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

axios.defaults.baseURL = 'http://localhost:7070/api/v1';

function App() {
  const { alert } = useGlobalContext();

  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <div className='container'>
        {alert.show && <Alert {...alert} />}
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/about' component={About} />
          <AuthRoute path='/auth/login' component={Login} />
          <ProtectedRoute path='/account' component={Account} />
          <ProtectedRoute exact path='/ideas' component={Ideas} />
          <AuthRoute path='/users/register' component={Register} />
          <ProtectedRoute path='/ideas/add' component={IdeaForm} />
          <ProtectedRoute path='/ideas/update/:id' component={EditIdea} />
          <Route path='*' component={Error} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
