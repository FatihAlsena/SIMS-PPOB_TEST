import PromoCard from "../components/Fragments/PromoCard";
import Navbar from "../components/Fragments/Navbar";
import ServiceButton from "../components/Fragments/ServiceButton";
import ProfileCard from "../components/Fragments/ProfileCard";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex justify-center min-h-full">
        <main className="p-8 w-[1600px]">
          {/* PROFILE CARD */}
          <ProfileCard />
          {/* SERVICE BUTTON */}
          <ServiceButton />
        </main>
      </div>
      <div className="p-8">
        <h2 className="text-xl font-bold mb-7">Temukan promo menarik</h2>
        {/* PROMO CARD */}
        <PromoCard />
      </div>
    </div>
  );
};

export default HomePage;
