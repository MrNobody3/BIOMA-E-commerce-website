import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import CategoriesNav from "./components/CategoriesNav";
import Header from "./components/Header";
import { CookiesProvider, Cookies } from "react-cookie";
import { useImmerReducer } from "use-immer";
import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import ProductDetail from "./components/ProductDetail";
import NotFound from "./components/NotFound";
import AdminHome from "./components/admin/AdminHome";
import Store from "./components/Store";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import { cache } from "./cache";
import { API_BASE_URL } from "./constants/constants";

function App() {
  const initialValue = {
    shoppingCartCount: 0,
    cartSubtotale: 0
  };
  function ourReducer(draft, action) {
    switch (action.type) {
      case "incrementShoppingCartCount":
        draft.shoppingCartCount++;
        return;
      case "decrementShoppingCartCount":
        draft.shoppingCartCount--;
        return;
      case "cartSubtotale":
        draft.cartSubtotale = action.value;
        console.log("Dispatching cart sub totale with value: ", action.value);
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialValue);

  const client = new ApolloClient({
    cache,
    uri: API_BASE_URL
  });

  useEffect(() => {
    var cookiesFromBrowser = new Cookies();
    if (cookiesFromBrowser.get("shoppingCart") && cookiesFromBrowser.get("shoppingCart").length) {
      for (let i = 0; i < cookiesFromBrowser.get("shoppingCart").length; i++) {
        dispatch({ type: "incrementShoppingCartCount" });
      }
    }
  }, []);
  return (
    <ApolloProvider client={client}>
      <CookiesProvider>
        <StateContext.Provider value={state}>
          <DispatchContext.Provider value={dispatch}>
            <BrowserRouter>
              <Switch>
                <Route
                  path="/"
                  render={({ match: { url } }) => (
                    <>
                      <Store />
                    </>
                  )}
                />
                <Route path="/admin">
                  <AdminHome />
                </Route>
              </Switch>
              {/* <Header />
            <Switch>
              <Route path="/" exact>
                <CategoriesNav />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>
              <Route path="/checkout">
                <Checkout />
              </Route>
              <Route path="/productDetail/:idProduct">
                <ProductDetail />
              </Route>
              <Route component={NotFound}></Route>
            </Switch> */}
            </BrowserRouter>
          </DispatchContext.Provider>
        </StateContext.Provider>
      </CookiesProvider>
    </ApolloProvider>
  );
}

export default App;
