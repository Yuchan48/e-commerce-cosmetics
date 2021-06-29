import "./HomeScreen.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
import { listProducts } from "../../redux/actions/ProductActions";

//sections/component
import Card from "../../section/Card/Card";
import LoadingBox from "../../component/loadingBox/LoadingBox";
import ErrorMessage from "../../component/errorMessage/ErrorMessage";

// images
import HomeImg from "../../images/home-img.jpg";
import HomeImgSecond from "../../images/home-img-second.jpg";
import RecycleImg from "../../images/recycle.jpg";
import PlanetImg from "../../images/planet.jpg";

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="homeScreen">
      <div className="home_top">
        <div className="home_top_slider_img">
          <div className="home_images_wrapper">
            <img src={HomeImg} alt="img" />
            <img src={HomeImgSecond} alt="img" />
            <img src={HomeImg} alt="img" />
          </div>
        </div>
        <div className="home_top_text">
          <h2> </h2>
          <p></p>
        </div>
      </div>

      <div className="home_bestSeller">
        <h3>Best Seller</h3>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <div className="home_slider_bestseller">
            <Slider {...settings}>
              {products.length === 0 ? (
                <LoadingBox />
              ) : (
                products.map((product) => (
                  <Card key={product._id} product={product} />
                ))
              )}
            </Slider>
          </div>
        )}
      </div>

      <div className="home_middle">
        <div className="home_middle_card">
          <img src={PlanetImg} alt="planet img" />
          <div className="home_middle_discription">
            <div className="home_middle_box_content">
              <h4>Cruelty-Free, Planet-Friendly</h4>
              <p>
                All of our products are 100% cruelty-free, free from harmful
                ingredients
              </p>
            </div>
          </div>
        </div>
        <div className="home_middle_card">
          <img src={RecycleImg} alt="recycle img" />
          <div className="home_middle_discription">
            <div className="home_middle_box_content">
              <h4>100% Recyclable</h4>
              <p>All of our packaging is 100% recyclable through TerraCycle</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
