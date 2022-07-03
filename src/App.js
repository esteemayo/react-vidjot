import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import ProtectedRoute from 'util/ProtectedRoute';
import {
  About,
  Account,
  Error,
  EditIdea,
  Home,
  IdeaForm,
  Ideas,
  Login,
  Register,
} from 'pages';
import Navbar from 'components/Navbar';
import AuthRoute from 'util/AuthRoute';
import Footer from 'components/Footer';
import Alert from 'components/Alert';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useGlobalContext } from 'context/ideas/IdeaContext';

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
