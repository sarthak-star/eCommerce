import React, { Fragment, useEffect, useState } from 'react'
import "./Productspage.css";
import { useSelector, useDispatch } from "react-redux";
import { GetProducts, ClearErrors } from "../../actions/productactions";
import Loader from "../Loader/Loader";
import Product from "../Productitem/Product";
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';



const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "Samples",
];

const Productspage = () => {



    const params = useParams();
    const dispatch = useDispatch();

    const { loading, error, products, productCount } = useSelector(
        (state) => state.products
    );
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState("");




    useEffect(() => {
        if (error) {
            toast(error);
            dispatch(ClearErrors);
        }
        dispatch(GetProducts(params.keyword, currentPage , category));
    }, [dispatch, error, currentPage , category]);

    const fetchMoreData = () => {
        // Fetch more data when the user scrolls to the bottom
        setCurrentPage(currentPage + 1);
    };



    return (
        <Fragment>
            {loading ?
                (<Loader />)
                :
                (
                    <>
                        <div className="category">
                            <ul className="categoryBox">
                                {categories.map((category) => (
                                    <li
                                        className="category-link"
                                        key={category}
                                        onClick={() => setCategory(category)}
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="products_box">
                            <InfiniteScroll
                                dataLength={products && products.length}
                                next={fetchMoreData}
                                hasMore={products?.length !== productCount}
                                loader={<Loader />}
                            >
                                <div className="Products_main_page">
                                    <div id="featuredProducts_content">
                                        {products &&
                                            products.map((product) => <Product product={product} key={product._id} />)}
                                    </div>
                                </div>
                            </InfiniteScroll>
                        </div>
                        
                    </>
                )
            }
        </Fragment>
    )
}

export default Productspage