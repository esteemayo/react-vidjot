import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Alert from 'components/Alert';
import Navbar from 'components/Navbar';
import AuthRoute from 'util/AuthRoute';
import Footer from 'components/Footer';
import ProtectedRoute from 'util/ProtectedRoute';
import { useGlobalContext } from 'context/ideas/IdeaContext';
import { useGlobalAuthContext } from 'context/auth/AuthContext';
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

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const { alert } = useGlobalContext();
  const { modal } = useGlobalAuthContext();

  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <div className='container'>
        {alert.show && <Alert {...alert} />}
        {modal.show && <Alert {...modal} />}
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
