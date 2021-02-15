import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";

function ProductByCategorie(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [products, setProducts] = useState([
    {
      id: 1,
      img: "https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340",
      name: "Test produit 1",
      price: "20.00",
      categorie: "Categorie 1",
      dateCreated: new Date()
    },
    {
      id: 2,
      img: "https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340",
      name: "Test produit",
      price: "20.00",
      categorie: "Categorie 2",
      dateCreated: null
    }
  ]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (props.idCategory) {
      //const ourRequest = Axios.CancelToken.source();
      async function fetchProductsByIdCategorieSortedByDate() {
        console.log("Calling fetchProductsByCategorie");
        console.log("calling products by id categorie = ", props.idCategory);
        setProducts([
          {
            id: 322222,
            img: "https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340",
            name: "Test produit 3",
            price: "20.00",
            categorie: "Categorie 1"
          }
        ]);
        //setIsLoading(false);
        try {
          // const response = await Axios.post(`/profile/${username}`, { token: appState.user.token }, { cancelToken: ourRequest.token });
          // setState(draft => {
          //   draft.profileData = response.data;
          // });
          //setIsLoading(false);
        } catch (error) {}
      }
      fetchProductsByIdCategorieSortedByDate();
      //return () => ourRequest.cancel();
    } else {
      async function fetchAllProductsSortedByDate() {
        console.log("Calling fetchAllProducts");
        try {
          // const response = await Axios.post(`/profile/${username}`, { token: appState.user.token }, { cancelToken: ourRequest.token });
          // setState(draft => {
          //   draft.profileData = response.data;
          // });
        } catch (error) {}
      }
      fetchAllProductsSortedByDate();
    }
  }, [props.idCategory]);
  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <>
      <div className="col-sm-9 padding-right">
        <div className="features_items">
          <h2 className="title text-center">Items</h2>
          {currentProducts.map(product => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
        <Pagination postsPerPage={productsPerPage} totalPosts={products.length} paginate={paginate} />
      </div>
    </>
  );
}

export default ProductByCategorie;
