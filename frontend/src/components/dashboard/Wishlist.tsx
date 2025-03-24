import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Rating from "../Rating";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { get_wishlist_products, messageClear, remove_wishlist } from "../../store/reducers/cartReducer";
import toast from "react-hot-toast";

export default function Wishlist() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { successMessage, wishlist } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(get_wishlist_products(userInfo.id));
  }, [userInfo]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage]);

  // console.log(wishlist);

  return (
    <>
      {wishlist.length !== 0 ? (
        <div className='w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6'>
          {wishlist.map((p, i) => (
            <div
              key={i}
              className='border group transition-all duration-500 hover:shadow-md hover:-mt-3 hover:mb-3 rounded-sm bg-white'
            >
              <div className='relative overflow-hidden'>
                {p.discount !== 0 && (
                  <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-[#059473] font-semibold text-xs left-2 top-2'>
                    {p.discount}%
                  </div>
                )}

                <img src={p.image} alt='products' className='sm:w-full w-full h-[240px] rounded-sm' />
                <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                  <li
                    onClick={() => dispatch(remove_wishlist(p._id))}
                    className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'
                  >
                    <FaRegHeart />
                  </li>
                  <Link
                    to={`/product/details/${p.slug}`}
                    className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'
                  >
                    <FaEye />
                  </Link>
                  <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                    <RiShoppingCartLine />
                  </li>
                </ul>
              </div>

              <div className='py-3 text-slate-600 px-2'>
                <h2 className='font-bold capitalize '>{p.name}</h2>
                <div className='flex justify-start items-center gap-3'>
                  <span className='text-md font-semibold text-[#059473]'>{p.price}¥</span>
                  <div className='flex'>
                    <Rating ratings={p.rating} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-center text-2xl text-muted-foreground mt-10'>Your wishlist is empty</p>
      )}
    </>
  );
}
