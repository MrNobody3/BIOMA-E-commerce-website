import React, { useState } from "react";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import { gql, useQuery } from "@apollo/client";
import { PRODUCT_TILE_DATA } from "./Products";
import PreLoader from "./PreLoader";

export const GET_PRODUCT_BYCATEGORY = gql`
  query GetProductByIdCategorie($categoryId: ID!, $pageNumber: Int, $pageSize: Int) {
    productsByCategoryID(id: $categoryId, pageNumber: $pageNumber, pageSize: $pageSize) {
      totalProducts
      products {
        ...ProductTile
      }
    }
  }
  ${PRODUCT_TILE_DATA}
`;

function ProductByCategorie(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);

  const { data, loading, error } = useQuery(GET_PRODUCT_BYCATEGORY, {
    variables: { categoryId: props.idCategory, pageNumber: 1, pageSize: 9 }
  });

  if (loading)
    return (
      <>
        <PreLoader />
      </>
    );
  if (error) return <p>ERROR {error}</p>;
  if (!data) return <p>Not found</p>;

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <>
      <div className="col-sm-9 padding-right">
        <div className="features_items">
          <h2 className="title text-center">Items</h2>
          {data.productsByCategoryID.products && data.productsByCategoryID.products.length == 0 && <div>No items Found for this Category</div>}
          {data.productsByCategoryID &&
            data.productsByCategoryID.products.map(product => {
              return <ProductCard key={product.id} product={product} />;
            })}
        </div>
        <div className="centerPagination">
          <Pagination postsPerPage={productsPerPage} totalPosts={data.productsByCategoryID.totalProducts} currentNumber={currentPage} paginate={paginate} />
        </div>
      </div>
    </>
  );
}

export default ProductByCategorie;
