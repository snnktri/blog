import React, { useEffect } from 'react';
import Explore from "../assets/explore.jpg";
import { useDispatch } from "react-redux";
import { setUser, setProfile } from "../feature/auth.sclice";
import { api } from "../utils/axiosInstance"

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const logHost = async() => {
      const accessToken = localStorage.getItem('token');
      //console.log(accessToken);

      if(!accessToken) return;

      try {
        const response = await api.get("/users/protected", {headers:
          {
            Authorization: `Bearer ${accessToken}`
          }
        }
        );
       // console.log(response.data.data.firstName);
        dispatch(setUser(response.data.data.firstName));
        dispatch(setProfile(response.data.data.profile));
      } catch (error) {
        console.log("Error on login host: ", error);
      }
    }

    logHost();
  }, [])
  return (
    <main className='w-full min-h-screen bg-gray-100'>
      <div className='px-4 flex flex-col md:flex-row gap-y-4 md:gap-x-4'>
        <div className='mt-4'>
          <h1 className='text-4xl text-center font-bold mb-4'>Welcome to Blog Website</h1>
          <p className='text-center text-gray-900 text-xl font-semibold'>Explore your self with blogs and find what other see thing.</p>
          <div className='flex flex-col gap-y-2 mt-4'>
            <p className='text-gray-700'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque alias quo adipisci ipsum odit quam laborum molestiae. Quae reiciendis quaerat fugiat nihil expedita cupiditate, porro et iure commodi, doloribus ea!
              Sunt totam dolorem ducimus architecto reprehenderit adipisci praesentium nostrum itaque dignissimos eligendi. Animi saepe error hic eos molestias, velit id sint. Assumenda aperiam, labore possimus blanditiis esse perspiciatis distinctio veritatis?
              Ab omnis a expedita saepe dignissimos laborum, quas cum hic illo cupiditate at neque quos repellendus tempora harum nisi aspernatur ipsa, atque minus possimus! Saepe non voluptates accusamus nobis veritatis.
              Sequi vel deleniti libero nemo, quidem accusamus rerum, ad repellendus fuga commodi inventore aliquam. Necessitatibus laborum assumenda nulla consequuntur sint eaque ullam, minus, pariatur cum dicta aspernatur autem rerum expedita!
              Eum debitis optio, eligendi eveniet placeat quaerat quibusdam esse rerum dignissimos, perspiciatis tempore nobis excepturi fuga deleniti autem veniam similique ut minima at fugit quae aperiam maiores explicabo magnam? Rerum!
            </p>
            <p className='mt-4 text-gray-800 hidden md:block'>Lorem dolor sit amet consectetur adipisicing elit. Fuga asperiores maiores consequuntur provident, vitae dolorum voluptas inventore nostrum esse voluptatum eum fugit impedit quidem cum. In sit blanditiis sint ullam.
            Rem perferendis quisquam dolore ullam quod iusto tenetur culpa sint et cumque a, alias sit, in vero. Delectus, mollitia, deserunt provident dolore voluptate, vero accusantium aspernatur cumque repellendus ipsa autem?</p>
          </div>
        </div>
        <div className='pb-4 md:my-4 md:min-w-[50%]'>
          <div>
            <img src={Explore} alt="loding" className='h-auto md:h-150 w-full object-cover rounded-2xl shadow-2xl' />
          </div>
        </div>
      </div>

    </main>
  )
}

export default Home
