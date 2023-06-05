import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getTopProducts } from '../../services/APIs';
import { assets } from '../../assets';
import { ALL_LINKS } from '../../constant';
import styles from '../../styles/css/backgrounds.module.css';
const Categories = () => {
  const [topProducts, setTopProducts] = useState([]);
  useEffect(() => {
    getTopProducts()
      .then((res) => {
        setTopProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const CategoryBox = ({ image, category }) => {
    return (
      <Link to={ALL_LINKS.Category.pageLink}>
        <div className="space-y-2 text-xl">
          <div className="w-[240px] h-[240px] smrev:w-[320px] smrev:h-[320px] rounded-full bg-white hover:translate-y-[-8px] transition-all ease-in duration-200 hover:bg-white shadow-lg cursor-pointer flex justify-center items-center p-6">
            <img src={image} className="w-[60%] h-auto hover:scale-125 ease-linear duration-200 " alt="image" />
          </div>
          <div className="text-center font-semibold">{category}</div>
        </div>
      </Link>
    );
  };
  return (
    <div className={`py-16 px-4 flex flex-col gap-4 mdrev:px-4 `}>
      <div className="text-3xl text-center">Popular Picks</div>
      <div className="flex gap-8 flex-wrap justify-center">
        {topProducts.map((item, i) => {
          return <CategoryBox key={i} image={item.images[0]} category={item.category} />;
        })}
      </div>
    </div>
  );
};

export default Categories;
