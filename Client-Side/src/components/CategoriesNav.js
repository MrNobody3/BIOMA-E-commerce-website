import React, { useEffect, useState } from "react";
import { Link, BrowserRouter, Switch, Route } from "react-router-dom";
import ProductByCategorie from "./ProductByCategorie";

function CategoriesNav() {
  const [isLoading, setIsLoading] = useState(true);
  const [idCategory, setIdCategory] = useState();
  const [categories, setCategories] = useState([
    { id: 1, name: "Categorie1" },
    { id: 2, name: "Categorie2" }
  ]);
  useEffect(() => {
    //Async Operation
    async function fetchCategories() {
      // Calling the api endpoint getAllCategories();
      //const response = await Axios.get(`profile/${username}/followers`);
      //setCategories(response.data);
      setIsLoading(false);
    }
    fetchCategories();
  }, []);

  //if (isLoading) return <LoadingDotsIcon />;

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <div className="left-sidebar">
              <h2>Category</h2>
              <div className="panel-group category-products" id="accordian">
                {categories.map(category => {
                  return (
                    <div key={category.id} className="panel panel-default">
                      <div className="panel-heading">
                        <h4 className="panel-title">
                          {/* <Link data-for="category" data-tip="My Profile" to={`/productByCategory/${category.id}`}>
                            {category.name}
                          </Link> */}
                          <a data-toggle="collapse" data-parent="#accordian" onClick={() => setIdCategory(category.id)}>
                            {/* <span class="badge pull-right">
                              <i class="fa fa-plus"></i>
                            </span> */}
                            {category.name}
                          </a>
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <ProductByCategorie idCategory={idCategory} />
          {/* <Switch>
            <Route path="/productByCategory/:idCategory">
              <ProductByCategorie />
            </Route>
          </Switch> */}
        </div>
      </div>
    </>
  );
}

export default CategoriesNav;
