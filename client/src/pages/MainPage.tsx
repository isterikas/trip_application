import Header from "./Header";

function MainPage() {
  return (
    <>
      <h1 className="text-red-500">Welcome to TechinTravel!</h1>
      <p>
        Your journey begins with us, where we give you the best travel
        experiences tailored to your unique preferences. Whether you're looking
        for exotic beach escapes, mountain adventures, or cultural explorations,
        we help you make memories that last a lifetime.
      </p>
      <ul>
        <li>
          <h2>Why Choose Us?</h2>
          <span className="font-bold">Expert Recommendations:</span> With years
          of experience, we offer personalized travel recommendations for every
          type of traveler.
        </li>

        <li>
          <span className="font-bold">Exclusive Deals & Discounts:</span> Take
          advantage of our exclusive offers on flights, hotels, and tours to
          make your dream vacation affordable.
        </li>

        <li>
          <span className="font-bold">Seamless Booking Process:</span> From
          selecting your trip to booking flights and accommodation, we've
          designed a hassle-free travel booking system to save you time and
          energy.
        </li>

        <li>
          <span className="font-bold">24/7 Support:</span> Our friendly customer
          service team is available around the clock to assist you with any
          questions or adjustments to your plans. Let us take care of the
          logistics, and you can focus on making every moment count.
        </li>
      </ul>
    </>
  );
}

export default MainPage;
