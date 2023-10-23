import './App.css'
import Navbar from './components/Navbar/Navbar'
import Contacts from './components/Contacts/Contacts'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContactProvider } from './context/contactContext'

document.title = 'Contacts';

function App() {

  return (
    <div className="App">
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <ContactProvider>
        <Navbar/>
        <Contacts/>
      </ContactProvider>
    </div>
  )
}

export default App
