import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from './routes';
import { GlobalStyles } from './styles/global';

//TODO alteraçõe:
// novo modelo de rotar
// requisições com o react-query
// usar tailwind 
// usar server actions

const App = () => (
  <>
    <GlobalStyles />
    <Router />
    <ToastContainer
      position='top-center'
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='colored'
    />
  </>
);

export default App;
