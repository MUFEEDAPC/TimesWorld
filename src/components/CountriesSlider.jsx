import React, { useState, useEffect, useRef } from "react";
import { Button, Spinner, Alert, Card, Row, Col } from "react-bootstrap";
import CustomeSlider from "./CustomeSlider";
// import Footer from "./Footer";

const CountriesSlider = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayedCountries, setDisplayedCountries] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const itemsPerPage = 6;
  const loadMoreRef = useRef(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    // Update displayed countries when countries data changes
    if (countries.length > 0) {
      const initialCountries = countries.slice(0, itemsPerPage);
      setDisplayedCountries(initialCountries);
      setHasMore(countries.length > itemsPerPage);
    }
  }, [countries]);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://restcountries.com/v2/all?fields=name,region,flag"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch countries");
      }

      const data = await response.json();
      setCountries(data);
      setError(null);
    } catch (err) {
      setError("Failed to load countries. Please try again later.");
      console.error("Error fetching countries:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreCountries = () => {
    const currentCount = displayedCountries.length;
    const nextBatch = countries.slice(
      currentCount,
      currentCount + itemsPerPage
    );

    if (nextBatch.length > 0) {
      setDisplayedCountries((prev) => [...prev, ...nextBatch]);

      // Check if there are more countries to load
      setHasMore(currentCount + nextBatch.length < countries.length);

      // Scroll down to show new content after a short delay
      setTimeout(() => {
        if (loadMoreRef.current) {
          loadMoreRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
  };

  const renderCountryCard = (country) => (
    <Col key={country.name} xs={12} sm={6} md={6} className="mb-4">
      <Card className="country-card p-3">
        <div className="d-flex align-items-center gap-3">
          <div className="country-thumb">
            <img src={country.flag} alt={`Flag of ${country.name}`} />
          </div>
          <div className="flex-grow-1">
            <h4 className="country-title mb-1">{country.name}</h4>
            <div className="text-muted">{country.region}</div>
          </div>
        </div>
      </Card>
    </Col>
  );

  if (loading) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading countries...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="text-center">
        <Alert.Heading>Error</Alert.Heading>
        <p>{error}</p>
        <Button variant="outline-danger" onClick={fetchCountries}>
          Try Again
        </Button>
      </Alert>
    );
  }

  if (countries.length === 0) {
    return (
      <Alert variant="info" className="text-center">
        No countries found.
      </Alert>
    );
  }

  return (
    <div className="countries-slider">
      <CustomeSlider />
      {/* Countries Grid */}
      <Row className="mb-2">{displayedCountries.map(renderCountryCard)}</Row>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center" ref={loadMoreRef}>
          <Button
            variant="success"
            onClick={loadMoreCountries}
            className="load-more-btn"
            size="lg"
          >
            Load More
          </Button>
        </div>
      )}

      {/* Show completion message when all countries are loaded */}
      {!hasMore && displayedCountries.length > 0 && (
        <div className="text-center mt-4">
          <Alert variant="success" className="d-inline-block">
            🎉 All {countries.length} countries have been loaded!
          </Alert>
        </div>
      )}

      {/* <Footer/> */}
    </div>
  );
};

export default CountriesSlider;
