import './App.css';
import logo from './assets/logo.png'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import Table from './table/project.jsx';
import Card from './card/card.jsx';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
        <nav className='header'>
          <span><Link to='/'><img src={logo} alt='logo'></img></Link></span>
          <span><Link className='cardsLink' to='/games'>Cards</Link></span>
        </nav>
          
      </header>
      <main className='main'>
        <Routes>
          <Route path='/games' element={<Card></Card>}>
          </Route>
          
          <Route path='/' element={<Table></Table>}>
          </Route>
        </Routes>
      </main>
    </div>
    </BrowserRouter>
  );
}

export default App;
