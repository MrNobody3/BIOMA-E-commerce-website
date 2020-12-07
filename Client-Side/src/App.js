import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CategoriesNav from "./components/CategoriesNav";
import ProductByCategorie from "./components/ProductByCategorie";

function App() {
  const produit = {
    img: "https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340",
    name: "Test produit",
    price: "20.00",
    categorie: "Categorie 1"
  };
  return (
    <BrowserRouter>
      <CategoriesNav />
    </BrowserRouter>
  );
}

export default App;
