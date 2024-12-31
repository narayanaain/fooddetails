import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function Imageslider() {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/food-items');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched food items:', data); // Debug log
        setFoodItems(data);
      } catch (error) {
        console.error('Error fetching food items:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  if (foodItems.length === 0) {
    return <div className="text-center py-4">No food items found</div>;
  }

  return (
    <>
      <h2 className="pt-12 pl-3 text-xl font-bold">HEALTHY BENEFITS</h2>
      <div className="h-60 w-[1300px] pt-12 pl-9">
        <div className="h-60 m-auto">
          <Slider {...settings}>
            {foodItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg h-80 align-middle space-y-9 shadow-xl border-2 border-black/50">
                <div>
                  <img
                    className="size-52 object-contain block m-auto"
                    src={item.image}
                    alt={item.title}
                  />
                </div>
                <div className="p-2">
                  <p className="bg-[#cfe6cf] rounded-lg p-1">{item.title}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
