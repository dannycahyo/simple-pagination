import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import "./App.css";

export default function App() {
  const [products, setProducts] = useState([]);

  const [pageSize, setpageSize] = useState(5);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.round(products.length / pageSize);

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
  };

  const handleChangePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  };

  const getPaginatedData = () => {
    const startIndex = currentPage * pageSize - pageSize;
    const endIndex = startIndex + pageSize;
    return products.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    return new Array(Math.ceil(products.length / pageSize))
      .fill()
      .map((_, idx) => idx + 1);
  };

  useEffect(() => {
    const getProducts = async () => {
      const responseData = await fetch(`https://fakestoreapi.com/products`);
      const dataProduct = await responseData.json();
      setProducts(dataProduct);
    };
    getProducts();
  }, [setProducts]);

  const pageOptions = [5, 10, 15, 20];

  return (
    <div className="App">
      <h1>Frontend Exercise</h1>
      <h2>Simple Pagination Page With React</h2>
      <h1>Lis Of Products</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "20px 120px",
        }}
      >
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Description</th>
              <th>Category</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {getPaginatedData().map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>{product.rating.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ marginRight: 20 }}>
          <label>Menampilkan:</label>
          <select
            value={pageSize}
            onChange={(event) => {
              setpageSize(event.target.value);
              setCurrentPage(1);
            }}
          >
            {pageOptions.map((page) => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>
        </div>

        <Pagination
          onChangePage={handleChangePage}
          paginationGroup={getPaginationGroup}
          onNextPage={goToNextPage}
          onPreviousPage={goToPreviousPage}
          currentPage={currentPage}
          pages={totalPage}
          pageSize={pageSize}
          totalProduct={products.length}
        />
      </div>
    </div>
  );
}
