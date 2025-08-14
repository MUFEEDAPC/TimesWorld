import React, { useState } from "react";
import { Carousel, Container, Row, Col, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useMediaQuery } from "react-responsive";

export default function CustomSlider() {
  const [index, setIndex] = useState(0);
  const isMobile = useMediaQuery({ maxWidth: 425 });
  const isTab = useMediaQuery({ maxWidth: 768 });

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const totalSlides = 4;
  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };
  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % totalSlides);
  };

  return (
    <div>
      {isMobile ? (
        <Row className={`justify-content-center ${isMobile ? "py-3" : "py-4"}`}>
          {/* Small Frame */}
          <Col md={3}>
            <div
              className="border"
              style={{
                height: "147px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
                border: "3px solid #3f3f3f !important",
                marginBottom: "18px",
              }}
            >
              <Image
                src="https://res.cloudinary.com/dpztiygfk/image/upload/v1755072075/dummyImage_vuba6r.png"
                alt="Frame"
                rounded
                style={{
                  height: "47px",
                  width: "69px",
                  objectFit: "contain",
                }}
              />
            </div>
          </Col>
          {/* Large Slider */}
          <Col md={9}>
            <div style={{ position: "relative" }}>
              <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                indicators={false}
                controls={false}
                className="border"
              >
                {[1, 2, 3, 4].map((item) => (
                  <Carousel.Item key={item}>
                    <div
                      style={{
                        height: "195px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      <Image
                        src="https://res.cloudinary.com/dpztiygfk/image/upload/v1755072075/dummyImage_vuba6r.png"
                        alt="Slide"
                        rounded
                        style={{
                          height: "47px",
                          width: "47px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>

              {/* Custom arrows + dots */}
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                {/* Left Arrow */}
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1c1c1c"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                </button>

                <div style={{ display: "flex", gap: "6px" }}>
                  {[0, 1, 2,4].map((dotIndex) => (
                    <span
                      key={dotIndex}
                      onClick={() => setIndex(dotIndex)}
                      style={{
                        width: 11,
                        height: 11,
                        borderRadius: "50%",
                        backgroundColor: dotIndex === index ? "#000" : "#fff",
                        cursor: "pointer",
                        display: "inline-block",
                      }}
                    />
                  ))}
                </div>

                {/* Right Arrow */}
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next slide"
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1c1c1c"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </div>
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-center pt-3 pb-4">
          {/* Large Slider */}
          <Col md={9}>
            <div style={{ position: "relative" }}>
              <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                indicators={false}
                controls={false}
                className="border"
              >
                {[1, 2, 3, 4].map((item) => (
                  <Carousel.Item key={item}>
                    <div
                      style={{
                        height: isTab ? "240px" : "498px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      <Image
                        src="https://res.cloudinary.com/dpztiygfk/image/upload/v1755072075/dummyImage_vuba6r.png"
                        alt="Slide"
                        rounded
                        style={{
                          height: "120px",
                          width: "120px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>

              {/* Custom arrows + dots */}
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                {/* Left Arrow */}
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1c1c1c"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                </button>

                <div style={{ display: "flex", gap: "6px" }}>
                  {[0, 1, 2,3].map((dotIndex) => (
                    <span
                      key={dotIndex}
                      onClick={() => setIndex(dotIndex)}
                      style={{
                        width: 13,
                        height: 13,
                        borderRadius: "50%",
                        backgroundColor: dotIndex === index ? "#000" : "#fff",
                        cursor: "pointer",
                        display: "inline-block",
                      }}
                    />
                  ))}
                </div>

                {/* Right Arrow */}
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next slide"
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1c1c1c"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </div>
          </Col>

          {/* Small Frame */}
          <Col md={3}>
            <div
              className="border"
              style={{
                height: isTab ? "244px" : "500px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
                border: "3px solid #3f3f3f !important",
              }}
            >
              <Image
                src="https://res.cloudinary.com/dpztiygfk/image/upload/v1755072075/dummyImage_vuba6r.png"
                alt="Frame"
                rounded
                style={{
                  height: "120px",
                  width: "120px",
                  objectFit: "cover",
                }}
              />
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
}
