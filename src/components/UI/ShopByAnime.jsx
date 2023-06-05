import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets';
import { ALL_LINKS } from '../../constant';
import PropTypes from 'prop-types';
const ShopByAnime = () => {
  const data = [
    {
      title: 'Attack On Titan',
      image: assets.anime_cat.attack_on_titan
    },
    {
      title: 'Black Clover',
      image: assets.anime_cat.black_clover
    },
    {
      title: 'Chainsaw man',
      image: assets.anime_cat.chainsaw_man
    },
    {
      title: 'Dragon Ball Z',
      image: assets.anime_cat.dragon_ball_z
    },
    {
      title: 'Death Note',
      image: assets.anime_cat.death_note
    },
    {
      title: 'Haikyuu',
      image: assets.anime_cat.haikyuu
    },
    {
      title: 'Hunter X Hunter',
      image: assets.anime_cat.hunter_x_hunter
    },
    {
      title: "Jojo's Bizzare",
      image: assets.anime_cat.jojos_bizzare
    },
    {
      title: 'Hero Acedmia',
      image: assets.anime_cat.my_hero_academia
    },
    {
      title: 'Naruto',
      image: assets.anime_cat.naruto
    }
  ];

  const Card = ({ title, image }) => {
    return (
      <Link to={`${ALL_LINKS.Category.pageLink}?search=${title}`}>
        <div className="cursor-pointer hover:scale-110 duration-500 space-y-2 flex flex-col items-center">
          <div className="w-32 h-32">
            <img className="rounded-full bg-white" src={image} alt="anime" />
          </div>
          <h2 className="text-center text-lg font-bold text-white">{title}</h2>
        </div>
      </Link>
    );
  };

  Card.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  };

  return (
    <div className="px-20 py-20 bg-gradient-to-br from-[#FBB03B]  to-[#D4145A] flex flex-col justify-center mdrev:px-8 mdrev:py-12">
      <h1 className="text-4xl font-bold text-white mb-10 text-center">Shop By Anime</h1>
      <div className="grid grid-cols-5 gap-10 mdrev:grid-cols-2">
        {data.map((item, index) => (
          <Card key={index} title={item.title} image={item.image} />
        ))}
      </div>
    </div>
  );
};

export default ShopByAnime;
