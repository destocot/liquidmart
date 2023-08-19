import React, { useState, useEffect } from "react";
import axios from "axios";
import QuestionsAndAnswers from "./components/QuestionsAndAnswers/QuestionsAndAnswers";
import Overview from "./components/Overview";
import ReviewsRatings from "./components/Reviews-Ratings";
import { List } from "./components/Related/List";
import initial from "./PlaceHolderData.js";
import Navbar from "./components/Navbar/Navbar";
import Confetti from 'react-confetti';

function App() {
  /*
  ===== STATES AND STATE CHANGERS =====
  */
  // states passed to multiple components
  const [product, setProduct] = useState(initial.product);
  const [reviewsMeta, setReviewsMeta] = useState(initial.reviewsMeta);
  const [confetti, setConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  const updProduct = async (id) => {
    const newProduct = await axios.get(`/products/${id}`);
    return newProduct;
  };

  const updReviewsMeta = async () => {
    // const newReviewsMeta = await axios.get(`/reviews/meta/${product.id}
    const newReviewsMeta = await axios.get(`/reviews/meta/${product.id}`);
    return newReviewsMeta;
  };

  /*
  ====== FUNCTIONALITY =====
  */

  // update reviewsMeta every time product changes
  useEffect(() => {
    updReviewsMeta()
      .then((reviewsMetaUpd) => setReviewsMeta(reviewsMetaUpd.data))
      .catch((err) => console.error(err));
  }, [product]);

  // does what the name implies
  const handleWindowResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  };

  // set confetti to only run for one second
  useEffect(() => {
    window.onresize = () => handleWindowResize();
    confetti &&
      setTimeout(() => {
        setConfetti(false)
      }, 10000)
  }, [confetti]);

  /*
  TODOS:
  - onSearchProduct fn that updates product
  */

  // TESTING TESTING
  useEffect(() => {
    console.log({
      "reviews meta data": reviewsMeta,
      "current product": product,
    });
  }, [reviewsMeta]);

  // changed order of components
  if (reviewsMeta) {
    return (
      <div id="the-main-app-container">
        {confetti ? <Confetti width={windowSize.width} height={windowSize.height} /> : null}
        <Navbar />
        <Overview
          product={product}
          reviewsMeta={reviewsMeta}
          setConfetti={setConfetti}
        />
        <List
          currentProduct={product}
          updateCurrentProduct={updProduct}
          setCurrentProduct={setProduct}
        />
        <QuestionsAndAnswers
          currProductId={product.id}
          currProductName={product.name}
        />
        <ReviewsRatings
          id="ratingsReviewsContainerId"
          reviewsMeta={reviewsMeta}
          currProductId={product.id}
          currProductName={product.name}
          initial={initial}
        />
      </div>
    );
  }
}

export default App;
