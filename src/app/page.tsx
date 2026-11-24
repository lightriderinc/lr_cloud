import CtaBand from "@/components/solutions/CtaBand";
import HomeAccount from "./_components/HomeAccount";
import HomeHero from "./_components/HomeHero";
import HomeSolutions from "./_components/HomeSolutions";

export default function Home() {
  return (
    <div className="animate-fade-in-up">
      <HomeHero />

      <div className="mx-auto flex max-w-7xl flex-col gap-40 py-14">
        <HomeSolutions />
        <HomeAccount />
      </div>

      <div className="-mx-4 lg:-mx-8 -mb-6">
        <CtaBand />
      </div>
    </div>
  );
}
