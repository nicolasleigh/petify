import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCategory } from "../../store/reducers/categoryReducer";
import { getProduct, messageClear, productImageUpdate, updateProduct } from "../../store/reducers/productReducer";

export default function EditProduct() {
  const { productId } = useParams();

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { product, loader, successMessage, errorMessage } = useSelector((state) => state.product);
  // console.log(product);

  useEffect(() => {
    dispatch(
      getCategory({
        searchValue: "",
        page: "",
        perPage: "",
      })
    );
  }, []);

  useEffect(() => {
    dispatch(getProduct(productId));
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  const [state, setState] = useState({
    name: "",
    description: "",
    discount: "",
    price: "",
    brand: "",
    stock: "",
  });

  const [cateShow, setCateShow] = useState(false);
  const [category, setCategory] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const categorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      const srcValue = allCategory.filter((c) => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1);
      setAllCategory(srcValue);
    } else {
      setAllCategory(categories);
    }
  };

  const changeImage = (img, files) => {
    if (files.length > 0) {
      dispatch(
        productImageUpdate({
          oldImage: img,
          newImage: files[0],
          productId,
        })
      );
    }
  };

  useEffect(() => {
    setState({
      name: product.name,
      description: product.description,
      discount: product.discount,
      price: product.price,
      brand: product.brand,
      stock: product.stock,
    });
    setCategory(product.category);
    setImageShow(product.images);
  }, [product]);

  useEffect(() => {
    if (categories.length > 0) {
      setAllCategory(categories);
    }
  }, [categories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {
      name: state.name,
      description: state.description,
      discount: state.discount,
      price: state.price,
      brand: state.brand,
      stock: state.stock,
      productId: productId,
      category: category,
    };
    dispatch(updateProduct(obj));
  };

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className='w-full p-4  rounded-md'>
        <div className='flex justify-between items-center pb-4'>
          <h1 className=' text-xl font-semibold'>Edit Product</h1>
          {/* <Link to='/seller/dashboard/products' className=' underline hover:no-underline text-sm rounded-sm '>
            All Product
          </Link> */}
          <Button variant='link' onClick={() => navigate(-1)} className='p-0 underline hover:no-underline'>
            &larr; Go back
          </Button>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            {/* first row */}
            <div className='flex flex-col mb-3 md:flex-row gap-4 w-full '>
              <div className='flex flex-col w-full gap-1'>
                <Label htmlFor='name'>Product Name</Label>
                <Input
                  value={state.name}
                  onChange={handleChange}
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Product Name'
                />
              </div>

              <div className='flex flex-col w-full gap-1'>
                <Label htmlFor='brand'>Product Brand</Label>
                <Input
                  value={state.brand}
                  onChange={handleChange}
                  type='text'
                  name='brand'
                  id='brand'
                  placeholder='Brand Name'
                />
              </div>
            </div>

            {/* second row */}
            <div className='flex flex-col mb-3 md:flex-row gap-4 w-full '>
              <div className='flex flex-col w-full gap-1 relative'>
                <Label htmlFor='category'>Category</Label>
                <Select value={category || ""} onValueChange={setCategory}>
                  <SelectTrigger className='capitalize'>
                    <SelectValue placeholder='Select Category' />
                  </SelectTrigger>
                  <SelectContent className='flex gap-2'>
                    {allCategory.length &&
                      allCategory.map((c, i) => (
                        <SelectItem key={i} value={c.name} className='capitalize'>
                          {c.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className='flex flex-col w-full gap-1'>
                <Label htmlFor='stock'>Product Stock</Label>
                <Input
                  value={state.stock}
                  onChange={handleChange}
                  type='number'
                  name='stock'
                  id='stock'
                  placeholder='Stock'
                  min={0}
                />
              </div>
            </div>

            {/* third row */}
            <div className='flex flex-col mb-3 md:flex-row gap-4 w-full '>
              <div className='flex flex-col w-full gap-1'>
                <Label htmlFor='price'>Price</Label>
                <Input
                  value={state.price}
                  onChange={handleChange}
                  type='number'
                  name='price'
                  id='price'
                  placeholder='price'
                  min={0}
                />
              </div>

              <div className='flex flex-col w-full gap-1'>
                <Label htmlFor='discount'>Discount</Label>
                <Input
                  value={state.discount}
                  onChange={handleChange}
                  type='number'
                  name='discount'
                  id='discount'
                  placeholder='Discount by %'
                  min={0}
                />
              </div>
            </div>

            {/* fourth row */}
            <div className='flex flex-col w-full gap-1 mb-5'>
              <Label htmlFor='description' className=''>
                Description
              </Label>
              <Textarea
                value={state.description}
                onChange={handleChange}
                name='description'
                id='description'
                placeholder='Description'
                rows={5}
              />
            </div>

            <div className='grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full text-[#d0d2d6] mb-4'>
              {imageShow &&
                imageShow.length &&
                imageShow.map((image, i) => (
                  <div key={i} className='h-[180px] relative'>
                    <label htmlFor={i}>
                      <img src={image} alt='image' className='w-full h-full rounded-sm' />
                    </label>
                    <input onChange={(e) => changeImage(image, e.target.files)} type='file' id={i} className='hidden' />
                  </div>
                ))}
            </div>

            <div className='flex'>
              <Button disabled={loader} className='w-full sm:w-64 flex items-center justify-center px-7 py-2 mb-3'>
                {loader ? <Loader className='animate-spin' /> : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
