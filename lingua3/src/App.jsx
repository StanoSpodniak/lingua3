import { Navbar, Header, Game } from './components';
import './App.css'

function App() {

  return (
    <div>
      <div className="gradient__bg">
        <Navbar />
        <Header />
      </div>
      <div>
        <Game />
      </div>
    </div>
  )
}

export default App
