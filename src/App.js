import React from "react";
import Exchange from "./сomponents/Exchange";
import Weather from "./сomponents/Weather";
import LocalNews from "./сomponents/LocalNews";
import { BrowserRouter, Route, Link } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <nav>
            <ul className="menu">
              <li>
                <Link to="/">Weather</Link>
              </li>
              <li>
                <Link to="/exchange">Exchange</Link>
              </li>
              <li>
                <Link to="/news">LocalNews</Link>
              </li>
            </ul>
            <div className="hamburgerMenu">
              <input type="checkbox" />
              <span></span>
              <span></span>
              <span></span>
              <ul className="hamburgerMenu__menu">
                <li>
                  <Link to="/">Weather</Link>
                </li>
                <li>
                  <Link to="/exchange">Exchange</Link>
                </li>
                <li>
                  <Link to="/news">LocalNews</Link>
                </li>
              </ul>
            </div>
          </nav>

          <Route exact path="/" component={Weather} />
          <Route path="/exchange" component={Exchange} />
          <Route path="/news" component={LocalNews} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
