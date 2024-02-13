import { Navbar, Header, Game } from './containers';
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
