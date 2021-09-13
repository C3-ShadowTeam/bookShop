import React ,{useState,createContext}from 'react';
import { Route ,Switch} from 'react-router-dom';
import Navigaion from "./components/navigation/index"
import Login from './components/auth/login/index';
import { Register } from './components/auth/signUp';
import { AllBook } from './components/book/Book';
import { Search } from './components/search/Search';
import { ShoppingCart } from './components/ShoppingCart/ShoppingCart';
import { Logout } from './components/logout/Logout';
export const userContext = createContext();



const App = () => {
	const [token,setToken]=useState()
const state={token,setToken}
	return (<div>
		
<userContext.Provider value={state}>
<Navigaion/>

<Switch>
	
<Route path="/login" component={Login}/>
<Route path = "/signUp" component = {Register}/>
<Route path = '/home' component = {AllBook} />
<Route path = '/search' component = {Search} />
<Route path = '/cart' component = {ShoppingCart} />
<Route path = '/logout' component = {Logout} />

</Switch>

</userContext.Provider>
	</div>)
};

export default App;
