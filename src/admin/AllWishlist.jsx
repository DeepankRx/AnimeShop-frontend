import React from 'react';
// import { getAllWishlist } from '../services/APIs';
const AllWishlist = () => {
  // alert('AllWishlist')
  // const [wishlist, setWishlist] = useState([]);
  // useEffect(() => {
  //   getAllWishlist()
  //     .then((res) => {
  //       setWishlist(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }, []);

  return (
    <div className="flex flex-col  bg-white w-[100%] rounded-2xl p-4 smrev:p-2 smrev:py-4">
      <div className="overflow-y-auto "></div>
    </div>
  );
};

export default AllWishlist;
