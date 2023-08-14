// import logo from "../logo.svg";
import "./App.css";
import Header from "../Header/Header";

function App() {
  return (
    <div>
      <Header />
      <main>
        <section className="weather" id="weather">
          <div className="weather_info">75°F</div>
          <div>
            <img src="/images/day/sunny.svg" className="weather_image" />
          </div>
        </section>
        <section id="card-section">
          <div>card section</div>
        </section>
      </main>
    </div>
  );
}

export default App;
