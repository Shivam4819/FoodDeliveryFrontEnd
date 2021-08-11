import logo from './logo.svg';
import './App.css';
import axios from "axios";
import Switch from "react-bootstrap/Switch";
import HeaderComponent from "./Component/HeaderComponent";
import {HashRouter,Route} from "react-router-dom";
import FooterComponent from "./Component/FooterComponent";
import HomeScreen from "./Component/HomeScreen";
import "./Bootstrap.css"
import RestaurantMenu from "./Component/RestaurantMenu";
import CartComponent from "./Component/CartComponent";
import FinalOrderTable from "./Component/FinalOrderTable";
function App() {
  return (
    <div className="App">
      <HashRouter>
        <HeaderComponent/>
        <Switch>
          <Route exact path="/" component={HomeScreen}/>
          <Route exact path="/menu" component={RestaurantMenu}/>
          <Route exact path="/cart" component={CartComponent}/>
          <Route exact path="/order" component={FinalOrderTable}/>

        </Switch>
        <FooterComponent/>
      </HashRouter>
    </div>
  );
}

export default App;
