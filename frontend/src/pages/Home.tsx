import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/Banner";
import Category from "../components/Category";
import Footer from "../components/Footer";
import Header from "../components/Header";
import FeatureProducts from "../components/products/FeatureProducts";
import Products from "../components/products/Products";
import { useEffect } from "react";
import { get_category, get_products } from "../store/reducers/homeReducer";

export default function Home() {
  const dispatch = useDispatch();
  const { products, latestProduct, topRatedProduct, discountProduct } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(get_products());
  }, []);
  // console.log(discountProduct);

  return (
    <div className='w-full'>
      <Header />
      <Banner />
      <Category />
      <div className='py-[45px]'>
        <FeatureProducts products={products} />
      </div>

      <div className='py-10'>
        <div className='w-[85%] flex flex-wrap mx-auto'>
          <div className='grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7'>
            <div className='overflow-hidden'>
              <Products title='Latest Product' products={latestProduct} />
            </div>
            <div className='overflow-hidden'>
              <Products title='Top Rated Product' products={topRatedProduct} />
            </div>
            <div className='overflow-hidden'>
              <Products title='Discount Product' products={discountProduct} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
