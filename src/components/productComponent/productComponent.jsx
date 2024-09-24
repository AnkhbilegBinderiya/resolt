"use client";

import * as React from "react";
import { Image } from "@nextui-org/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsArrowUpRight } from "react-icons/bs";

const ProductComponent = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          dots: false,
        },
      },
    ],
  };

  const slides = [
    {
      title: "epl",
      imgUrl: "/assets/logo/leagues/epl-modified.png",
    },
    {
      title: "laliga",
      imgUrl: "/assets/logo/leagues/laliga-modified.png",
    },
    {
      title: "NBA",
      imgUrl: "/assets/logo/leagues/nba-modified.png",
    },
    {
      title: "nfl",
      imgUrl: "/assets/logo/leagues/nfl-modified.png",
    },
    {
      title: "Serie",
      imgUrl: "/assets/logo/leagues/Serie-modified.png",
    },
    {
      title: "mlb",
      imgUrl: "/assets/logo/leagues/mlb-modified.png",
    },
    {
      title: "Bundesliga",
      imgUrl: "/assets/logo/leagues/Bundesliga-modified.png",
    },
    {
      title: "nhl",
      imgUrl: "/assets/logo/leagues/nhl-modified.png",
    },
  ];
  return (
    <div className="mx-auto my-3 w-[80vw] xl:w-[60vw] 2xl:w-[80vw]">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="p-4">
            <div className="relative mx-12">
              <Image
                src={slide.imgUrl}
                alt={slide.title}
                width={300}
                height={200}
                radius='none'
                className="w-auto h-24"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductComponent;
