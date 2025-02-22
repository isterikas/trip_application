function AboutUsPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="container mx-auto px-4 py-8 flex-grow">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p>
              TechinTravel began with a simple belief: travel is more than just
              visiting new places—it’s about experiencing life, forging
              connections, and discovering the beauty in every corner of the
              world. Founded by a group of passionate travelers and dedicated
              professionals, our mission is to create unforgettable journeys
              that inspire and transform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p>
              At TechinTravel, every journey is as unique as the traveler
              embarking on it. We work closely with local guides, handpick
              accommodations, and craft custom itineraries tailored to your
              interests and passions. Our goal is to help you create lasting
              memories and discover the world in a way that resonates with your
              heart and soul.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Personalization:</strong> Every travel experience is
                tailored to your dreams, interests, and needs.
              </li>
              <li>
                <strong>Integrity:</strong> Trust and transparency are the
                foundation of our business. We partner only with reliable and
                ethical local service providers.
              </li>
              <li>
                <strong>Passion:</strong> Our team consists of avid travelers
                and experts who share a profound love for exploration and
                cultural exchange.
              </li>
              <li>
                <strong>Sustainability:</strong> We are committed to responsible
                travel that respects local cultures and preserves the natural
                beauty of each destination.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Why Choose TechinTravel?
            </h2>
            <p>
              We believe the best journeys are the ones that change you. With
              our deep local insights, meticulous planning, and personal touch,
              TechinTravel is here to transform your travel dreams into reality.
              Let us guide you on an adventure that not only takes you to new
              places but also enriches your life.
            </p>
          </section>

          <section>
            <p className="text-lg">
              Thank you for taking the time to learn about TechinTravel. Your
              next adventure awaits! Reach out to us with any questions or to
              start planning your unforgettable journey.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}

export default AboutUsPage;
