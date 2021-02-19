import React, { useState } from "react";
import ProductByCategorie from "./ProductByCategorie";
import { gql, useQuery } from "@apollo/client";

function CategoriesNav() {
  const GET_CATEGORIES = gql`
    query GetCategories {
      categories {
        id
        name
      }
    }
  `;
  const { data, loading, error } = useQuery(GET_CATEGORIES);
  const [idCategory, setIdCategory] = useState();

  if (loading) return <p>Loadiing... (To implement)</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <div className="left-sidebar">
              <h2>Category</h2>
              <div className="panel-group category-products" id="accordian">
                {data.categories &&
                  data.categories.map(category => {
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
