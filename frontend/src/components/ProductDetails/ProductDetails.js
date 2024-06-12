import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductDetails.css";
import { ClearErrors, GetProductsDetails, newReview } from "../../actions/productactions";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactStars from 'react-rating-stars-component';
import Loader from "../Loader/Loader";
import ReviewCard from "./Reviewcard";
import { addItemsToCart } from "../../actions/cartactions";
import { useAlert } from 'react-alert'
import { NEW_REVIEW_RESET } from "../../constants/productconstant";
import { FaShoppingCart } from "react-icons/fa";



const ProductDetails = () => {
    const params = useParams();
    const alert = useAlert();

    const dispatch = useDispatch();

    const { product, loading, error } = useSelector(
        (state) => state.productdetails
    );

    const { success, error: reviewError } = useSelector(
        (state) => state.newReview
    );




    useEffect(() => {

        if (error) {
            alert.show(error);
        }

        if (reviewError) {
            alert.error(reviewError);
        }

        if (success) {
            alert.success("Review Submitted Successfully");
            dispatch({ type: NEW_REVIEW_RESET });
        }


        dispatch(GetProductsDetails(params.id));


    }, [dispatch, params.id, error]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,


    };

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activecolor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: Number(product?.rating),
        isHalf: true

    }
    const increaseQuantity = () => {
        if (product.Stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    }
    const addToCartHandler = () => {
        dispatch(addItemsToCart(params.id, quantity));
        alert.show("Item Added To Cart");
    };

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", params.id);

        dispatch(newReview(myForm));

        setOpen(false);
    };

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="productpage">
                    <div className="productpage_top">
                        <div className="productpage_left">
                            <Slider {...settings}>
                                <div>
                                    <h3>1</h3>
                                </div>
                                <div>
                                    <h3>2</h3>
                                </div>
                                <div>
                                    <h3>3</h3>
                                </div>

                            </Slider>
                        </div>
                        <div className="productpage_right">
                            {product &&
                                <>
                                    <h4>Product #{product._id}</h4>
                                    <h1>{product.name}</h1>
                                    <p>{product.description}</p>
                                    <p id="price" >₹{product.price}</p>
                                    <div className="ratings" >
                                        <ReactStars {...options} />{ }
                                        <span>({product.numofReviews} Reviews)</span>
                                    </div>
                                    <div className="quantity">
                                        <button onClick={decreaseQuantity} >-</button>
                                        <input type="Number" value={quantity} />
                                        <button onClick={increaseQuantity} >+</button>
                                        <button disabled={product.Stock < 1 ? true : false}
                                            onClick={addToCartHandler}>Add To Cart</button>
                                        <Link to='/cart' ><FaShoppingCart /></Link>
                                    </div>

                                    <p>
                                        <b className={product.Stock < 1 ? "redcolor" : "greencolor"} >
                                            {product.Stock < 1 ? "Out of Stock" : "In Stock"}

                                        </b>
                                    </p>

                                    <button onClick={submitReviewToggle} className="Submitreview" >Submit Review</button>
                                </>
                            }
                        </div>
                    </div>
                    <div className="productpage_bottom">
                        <h2>REVIEWS</h2>

                        {product?.Reviews && product?.Reviews[0] ? (
                            <div className="reviews">
                                {product?.Reviews &&
                                    product?.Reviews.map((review) => (
                                        <ReviewCard key={review._id} review={review} />
                                    ))}
                            </div>
                        ) : (
                            <p className="noReviews">No Reviews Yet</p>
                        )}


                    </div>
                </div>
            )}
        </>
    );
};

export default ProductDetails;
