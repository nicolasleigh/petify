import { Loader } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { messageClear, seller_register } from "../../store/reducers/authReducer";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loader, successMessage, errorMessage } = useSelector((state) => state.auth);
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    toast("Sorry, registration is not open yet", {
      icon: "👋",
      style: {
        borderRadius: "5px",
        background: "#333",
        color: "#fff",
      },
    });

    // dispatch(seller_register(state));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      navigate("/");
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  return (
    <div className='min-w-full min-h-screen  flex justify-center items-center'>
      <div className='w-[350px]  p-2'>
        <div className='border p-4 rounded-md'>
          <h2 className='text-xl mb-3 font-bold '>Welcome</h2>
          <p className='text-sm mb-3 font-medium'>Please register your account</p>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col w-full gap-1 mb-3 text-sm'>
              <label htmlFor='name'>Name</label>
              <input
                value={state.name}
                onChange={handleChange}
                type='text'
                name='name'
                placeholder='Name'
                id='name'
                required
                className='px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md'
              />
            </div>
            <div className='flex flex-col w-full gap-1 mb-3 text-sm'>
              <label htmlFor='email'>Email</label>
              <input
                value={state.email}
                onChange={handleChange}
                type='email'
                name='email'
                placeholder='Email'
                id='email'
                required
                className='px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md'
              />
            </div>
            <div className='flex flex-col w-full gap-1 mb-3 text-sm'>
              <label htmlFor='password'>Password</label>
              <input
                value={state.password}
                onChange={handleChange}
                type='password'
                name='password'
                placeholder='Password'
                id='password'
                required
                className='px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md'
              />
            </div>

            <button
              disabled={loader}
              className='bg-secondary hover:bg-secondary/70 flex items-center justify-center  w-full border rounded-md px-7 py-2 mb-3'
            >
              {loader ? <Loader className='animate-spin' /> : "Sign Up"}
            </button>

            <div className='flex items-center mb-3 gap-3 justify-center text-sm'>
              <p>
                Already Have an Account?
                <Link className='font-bold ml-3 underline hover:no-underline underline-offset-4 ' to='/login'>
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
