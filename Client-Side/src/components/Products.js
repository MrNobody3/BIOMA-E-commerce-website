import React, { useState } from "react";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import { gql, useQuery } from "@apollo/client";
import PreLoader from "./PreLoader";

export const PRODUCT_TILE_DATA = gql`
  fragment ProductTile on Product {
    __typename
    id
    name
    price
    category {
      name
    }
    images
    numberInStock
    createdDate
  }
`;
export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts($pageNumber: Int, $pageSize: Int) {
    products(pageNumber: $pageNumber, pageSize: $pageSize) {
      totalProducts
      products {
        ...ProductTile
      }
    }
  }
  ${PRODUCT_TILE_DATA}
`;

function Products(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const { data, loading, error } = useQuery(GET_ALL_PRODUCTS, {
    variables: { pageNumber: currentPage, pageSize: 9 }
  });

  if (loading)
    return (
      <>
        <PreLoader />
      </>
    );
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <>
      <div className="col-sm-9 padding-right">
        <div className="features_items">
          <h2 className="title text-center">Items</h2>
          {data.products &&
            data.products.products.map(product => {
              return <ProductCard key={product.id} product={product} />;
            })}
        </div>
        <div className="centerPagination">
          <Pagination postsPerPage={productsPerPage} totalPosts={data.products.totalProducts} paginate={paginate} currentNumber={currentPage} />
        </div>
      </div>
    </>
  );
}

export default Products;
