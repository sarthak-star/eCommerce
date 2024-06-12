import React, { useEffect } from 'react';
import "./Homepage.css";
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { GetProducts } from '../../actions/productactions';
import Loader from "../Loader/Loader";
import Product from '../Productitem/Product';
import { toast } from 'react-toastify';



const Homepage = () => {


  const dispatch = useDispatch();
  const { loading, error, products, productCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {

    if (error) {
      toast(error);
    }

    dispatch(GetProducts());
  }, [dispatch, error]);

  return (
    <>

      {
        loading ? (
          <Loader />
        ) :
          (
            <>
              <div className="Homepage">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}

                >
                  <div className="Homepage_Headings">
                    <h1>Opulence Avenue</h1>
                    <h3>Where Affordability Meets Grandeur</h3>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.8 }}

                >
                  <div className="Homepage_scroll_btn">
                    <a href="#featuredProducts">
                      <button>
                        Shop Now
                      </button>
                    </a>
                  </div>

                </motion.div>

              </div>
              <div id='featuredProducts' className="featuredProducts">
                <h2 id='featuredProducts_head' >Signature Styles</h2>

                <div id='featuredProducts_content'>
                  {products && products.map((product) => <Product product={product} key={product._id} />)}
                </div>
              </div>
            </>
          )
      }


    </>
  )
}

export default Homepage