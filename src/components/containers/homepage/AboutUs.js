import { FiArrowRight } from "react-icons/fi";

export const AboutUs = () => {
    return (
    <div className="home-banner-container">
        {/* <div className="home-bannerImage-container">
            <img src={BannerBackground} alt="" />
        </div> */}
        <div className="home-text-section">
            <h1 className="primary-heading">
                El mejor marketplace en  Freakyworld
            </h1>
            <p className="primary-text">
                consigue las mejores cartas a mejor precio.
            </p>
            <a href="/register" style={{textDecoration:"none"}}>
            <button className="secondary-button">
                Únete <FiArrowRight />
            </button>
            </a>
        </div>
        <div className="home-image-section">
        {/* <img src={} alt="" /> */}
        </div>
    </div>
    )
}