import { Link, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import { Range } from "react-range";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Products from "../components/products/Products";
import { BsFillGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import ShopProducts from "../components/products/ShopProducts";
import Pagination from "../components/products/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { price_range_product, query_products } from "../store/reducers/homeReducer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SearchProducts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const searchValue = searchParams.get("value");

  const [filter, setFilter] = useState(true);
  const [rating, setRating] = useState("");
  const [styles, setStyles] = useState("grid");
  const [pageNumber, setPageNumber] = useState(1);
  const [sortPrice, setSortPrice] = useState("");

  const { products, categories, priceRange, latestProduct, totalProduct, perPage } = useSelector((state) => state.home);
  const [state, setState] = useState({ values: [priceRange.low, priceRange.high] });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(price_range_product());
  }, []);

  useEffect(() => {
    setState({
      values: [priceRange.low, priceRange.high],
    });
  }, [priceRange]);

  useEffect(() => {
    dispatch(
      query_products({
        low: state.values[0] || "",
        high: state.values[1] || "",
        category,
        rating,
        sortPrice,
        pageNumber,
        searchValue,
      })
    );
  }, [state.values[0], state.values[1], category, rating, sortPrice, pageNumber, searchValue]);

  const resetRating = () => {
    setRating("");
    dispatch(
      query_products({
        low: state.values[0],
        high: state.values[1],
        category,
        rating: "",
        sortPrice,
        pageNumber,
      })
    );
  };

  return (
    <div>
      <Header />
      <section className="bg-[url('/images/banner/shop.webp')] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left">
        <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
          <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
            <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
              <h2 className='text-3xl font-bold'>Category Page</h2>
              <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                <Link to='/'>Home</Link>
                <span className='pt-1'>
                  <IoIosArrowForward />
                </span>
                <span>Category</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='py-16'>
        <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
          <div className={`md:block hidden ${!filter ? "mb-6" : "mb-0"}`}>
            <button
              onClick={() => setFilter(!filter)}
              className='text-center w-full py-2 px-3 rounded-sm bg-[#059473] text-white'
            >
              Filter Product
            </button>
          </div>
          <div className='w-full flex flex-wrap'>
            <div
              className={`w-3/12 md-lg:w-4/12 md:w-full pr-8 ${
                filter ? "md:h-0 md:overflow-hidden md:mb-6" : "md:h-auto md:overflow-auto md:mb-0"
              }`}
            >
              <div className='py-2 flex flex-col gap-5'>
                <h2 className='text-3xl font-bold mb-3 text-slate-600'>Price Range</h2>
                <Range
                  step={5}
                  min={priceRange.low}
                  max={priceRange.high}
                  values={state.values}
                  onChange={(values) => setState({ values })}
                  renderTrack={({ props, children }) => (
                    <div {...props} className='w-full h-[6px] bg-slate-200 rounded-full cursor-pointer'>
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div {...props} className='w-[15px] h-[15px] bg-[#059473] rounded-full'></div>
                  )}
                />
                <div>
                  <span className='text-slate-800 font-bold text-lg'>
                    {Math.floor(state.values[0])} - {Math.floor(state.values[1])}
                  </span>
                </div>
              </div>

              <div className='py-3 flex flex-col gap-4'>
                <h2 className='text-3xl font-bold mb-3 text-slate-600'>Rating</h2>
                <div className='flex flex-col gap-3'>
                  <div
                    onClick={() => setRating(5)}
                    className='text-[#059473] flex justify-start items-start gap-2 text-xl cursor-pointer'
                  >
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                  </div>
                  <div
                    onClick={() => setRating(4)}
                    className='text-[#059473] flex justify-start items-start gap-2 text-xl cursor-pointer'
                  >
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiOutlineStar />
                    </span>
                  </div>
                  <div
                    onClick={() => setRating(3)}
                    className='text-[#059473] flex justify-start items-start gap-2 text-xl cursor-pointer'
                  >
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiOutlineStar />
                    </span>
                    <span>
                      <AiOutlineStar />
                    </span>
                  </div>
                  <div
                    onClick={() => setRating(2)}
                    className='text-[#059473] flex justify-start items-start gap-2 text-xl cursor-pointer'
                  >
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiOutlineStar />
                    </span>
                    <span>
                      <AiOutlineStar />
                    </span>
                    <span>
                      <AiOutlineStar />
                    </span>
                  </div>
                  <div
                    onClick={() => setRating(1)}
                    className='text-[#059473] flex justify-start items-start gap-2 text-xl cursor-pointer'
                  >
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiOutlineStar />
                    </span>
                    <span>
                      <AiOutlineStar />
                    </span>
                    <span>
                      <AiOutlineStar />
                    </span>
                    <span>
                      <AiOutlineStar />
                    </span>
                  </div>
                  <div
                    onClick={resetRating}
                    className='text-[#059473] flex justify-start items-start gap-2 text-xl cursor-pointer'
                  >
                    <span>
                      <AiOutlineStar />
                    </span>
                    <span>
                      <AiOutlineStar />
                    </span>
                    <span>
                      <AiOutlineStar />
                    </span>
                    <span>
                      <AiOutlineStar />
                    </span>
                    <span>
                      <AiOutlineStar />
                    </span>
                  </div>
                </div>
              </div>

              <div className='py-5 flex flex-col gap-4 md:hidden'>
                <Products title='Latest Product' products={latestProduct} />
              </div>
            </div>

            <div className='w-9/12 md-lg:w-8/12 md:w-full'>
              <div className='pl-8 md:pl-0'>
                <div className='py-4 bg-white mb-10 px-3 rounded-md flex justify-between items-start border'>
                  <h2 className='text-lg font-medium text-slate-600'>{totalProduct} Products</h2>
                  <div className='flex justify-center items-center gap-3'>
                    <Select onValueChange={(value) => setSortPrice(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder='Sort By Price' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='low-to-high'>Low to High Price</SelectItem>
                        <SelectItem value='high-to-low'>High to Low Price</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className='flex justify-center items-start gap-4 md-lg:hidden'>
                      <div
                        onClick={() => setStyles("grid")}
                        className={`p-2 ${
                          styles === "grid" && "bg-slate-300"
                        } text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm`}
                      >
                        <BsFillGridFill />
                      </div>
                      <div
                        onClick={() => setStyles("list")}
                        className={`p-2 ${
                          styles === "list" && "bg-slate-300"
                        } text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm`}
                      >
                        <FaThList />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='pb-8'>
                  <ShopProducts products={products} styles={styles} />
                </div>

                <div>
                  {totalProduct > perPage && (
                    <Pagination
                      pageNumber={pageNumber}
                      setPageNumber={setPageNumber}
                      totalItem={totalProduct}
                      perPage={perPage}
                      showItem={Math.floor(totalProduct / perPage)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
