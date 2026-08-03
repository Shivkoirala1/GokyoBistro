import Layout from "../components/Layout.jsx";

export default function About() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <p className="font-body text-xs tracking-[0.2em] text-gold uppercase mb-2">
          Our Story
        </p>
        <h1 className="font-display text-4xl text-brand mb-6">About Gokyo Bistro</h1>

        <p className="font-body text-gray-700 leading-relaxed mb-4">
          Gokyo Bistro is a fine-dining restaurant nestled in the heart of
          Jhamsikhel, Lalitpur — a neighborhood known for its lively food
          culture and warm hospitality. We offer both indoor and outdoor
          seating, so whether you're after a quiet candlelit dinner or an
          open-air evening with friends, there's a table for you.
        </p>

        <p className="font-body text-gray-700 leading-relaxed mb-4">
          Our menu blends Himalayan flavors with global techniques — from
          slow-cooked mountain lamb to truffle mushroom pasta — prepared
          fresh, every day, by a kitchen that takes as much pride in a
          simple salad as it does in the signature dishes.
        </p>

        <p className="font-body text-gray-700 leading-relaxed mb-8">
          Members of Gokyo Bistro enjoy priority reservations, loyalty
          points on every order, and early access to seasonal menus and
          special evenings. Becoming a member takes less than a minute.
        </p>

       
        
      </div>
    </Layout>
  );
}