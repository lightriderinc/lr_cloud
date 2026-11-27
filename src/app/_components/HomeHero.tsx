import GetStartedActions from "@/components/solutions/GetStartedActions";
import HeroCipherField from "@/components/solutions/HeroCipherField";
import PageHero from "@/components/solutions/PageHero";
import LRLinkButton from "@/components/ui/LRLinkButton";

export default function HomeHero() {
  return (
    <PageHero centered backdrop={<HeroCipherField />}>
      <h1 className="hero-large max-w-4xl font-semibold leading-tight text-gray-800">
        Put quantum <span className="text-brand-gradient">to work.</span>
      </h1>
      <p className="max-w-2xl text-lg text-gray-600">
        Light Rider Cloud is home to Light Rider&apos;s quantum computing,
        randomness and security solutions, all under one account.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <GetStartedActions />
        <LRLinkButton href="#solutions" variant="secondary-outline">
          Explore solutions
        </LRLinkButton>
      </div>
    </PageHero>
  );
}
