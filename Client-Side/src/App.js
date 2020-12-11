import "./App.css";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import CategoriesNav from "./components/CategoriesNav";
import Header from "./components/Header";
import { CookiesProvider, Cookies } from "react-cookie";
import { useImmerReducer } from "use-immer";
import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";

function App() {
  const initialValue = {
    shoppingCartCount: 0,
    flashMessages: []
  };
  function ourReducer(draft, action) {
    switch (action.type) {
      case "incrementShoppingCartCount":
        draft.shoppingCartCount++;
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialValue);

  useEffect(() => {
    var cookiesFromBrowser = new Cookies();
    if (cookiesFromBrowser.get("shoppingCart") && cookiesFromBrowser.get("shoppingCart").length) {
      for (let i = 0; i < cookiesFromBrowser.get("shoppingCart").length; i++) {
        dispatch({ type: "incrementShoppingCartCount" });
      }
    }
  }, []);
  return (
    <CookiesProvider>
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <BrowserRouter>
            <Header />
            <CategoriesNav />
          </BrowserRouter>
        </DispatchContext.Provider>
      </StateContext.Provider>
    </CookiesProvider>
  );
}

export default App;
