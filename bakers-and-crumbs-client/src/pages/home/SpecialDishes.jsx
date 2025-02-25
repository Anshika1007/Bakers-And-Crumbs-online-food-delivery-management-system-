import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from '../../components/Cards';
import {} from "react-icons/fa6"
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const simpleNextArrow = (props) => {
    const {className, style, onClick} = props;
    return(
        <div 
        className={className} 
        style={{...style, display:"block",background:"pink"}}
        onClick={onClick}
        >NEXT</div>
    );
};

const simplePrevArrow = (props) => {
    const {className, style, onClick} = props;
    return(
        <div 
        className={className} 
        style={{...style, display:"block",background:"blue"}}
        onClick={onClick}
        >BACK</div>
    );
}

const SpecialDishes = () => {
    const [recipes, setRecipes] = useState([]);
    const slider = React.useRef(null)

    useEffect(() => {
        fetch("/menu.json")
        .then(res => res.json())
        .then(data => {
            const specials = data.filter((item) => item.category === "popular")
            //console.log(specials)
            setRecipes(specials)
        });
    }, []);
    //settings
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ],

        nextArrow: <simpleNextArrow/>,
        prevArrow: <simplePrevArrow/>
      };
  return (
    <div className='section-container my-20 relative'>
      <div className='text-left'>
            <p className='subtitle'>Special Items</p>
            <h2 className='title md:w-[520px]'>Standout desserts from our menu</h2>
        </div>

{/*arrow button*/}
      <div className="md:absolute right-3 top-8 mb-10 md:mr-24">
            <button onClick={() => slider?.current?.slickPrev()} className="btn p-2 rounded-full ml-5 bg-pink border-pink">
              <FaAngleLeft className="w-8 h-8 p-1 text-white"/>
            </button>
            <button onClick={() => slider?.current?.slickNext()} className="btn p-2 rounded-full ml-5 bg-pink border-pink">
              <FaAngleRight className="h-8 w-8 p-1 text-white"/>
            </button>
        </div>

        <Slider ref={slider} {...settings} className="overflow-hidden mt-10 space-x-5">
        {
            recipes.map((item,i)=>(
                <Cards key={i} item={item}/>
            ))
        }
      </Slider>
    </div>
  )
}

export default SpecialDishes
