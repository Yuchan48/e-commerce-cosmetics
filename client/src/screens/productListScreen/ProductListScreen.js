import "./ProductListScreen.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

//component/section
import LoadingBox from "../../component/loadingBox/LoadingBox";
import ErrorMessage from "../../component/errorMessage/ErrorMessage";
import {
  deleteProduct,
  listAllProducts,
} from "../../redux/actions/ProductActions";
import { PRODUCT_DELETE_RESET } from "../../redux/constants/productConstant";

function ProductListScreen() {
  const history = useHistory();

  const productListAll = useSelector((state) => state.productListAll);
  const { loading, products, error } = productListAll;
  const dispatch = useDispatch();

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = productDelete;

  useEffect(() => {
    if (deleteSuccess) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listAllProducts());
  }, [dispatch, deleteSuccess]);

  const deleteHandler = (product) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteProduct(product._id));
    }
  };

  return (
    <div className="productlist_screen_container">
      <div className="productlist_Bottom">
        <div className="productlist_title">
          <h3>All Products</h3>
          <button onClick={() => history.push("/createproduct")}>
            Create Product
          </button>
        </div>
        {deleteLoading && (
          <div className="productlist_loading_div">
            <LoadingBox />
          </div>
        )}

        {deleteError && (
          <div className="productlist_error_message">
            <ErrorMessage>{deleteError}</ErrorMessage>
          </div>
        )}
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <table className="productlist_table">
            <thead>
              <tr>
                <th>NAME</th>
                <th>PRICE</th>
                <th>STOCK</th>
                <th>CATEGORY</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.price}$</td>
                  <td>{product.countInStock}</td>
                  <td>{product.category}</td>
                  <td>
                    <div className="productlist_table_button">
                      <button
                        onClick={() =>
                          history.push(`/product/${product._id}/edit`)
                        }
                      >
                        Edit
                      </button>
                      <button onClick={() => deleteHandler(product)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ProductListScreen;
