import "./App.css";
import Counter from "./Counter";
import OfferButton from "./OfferButton";
import CountdownTimer from "./CountdownTimer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CountdownTimer />
        <Counter />
        <OfferButton />
      </header>
    </div>
  );
}

export default App;
