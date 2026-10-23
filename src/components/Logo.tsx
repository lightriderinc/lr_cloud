import Image from "next/image";

/**
 * Light Rider Cloud lockup — the company mark, the "LIGHT RIDER" wordmark and
 * the red "CLOUD" product word. Rendered at width 230 (= 239 viewBox units),
 * the same scale the entropy platform's header matches its own lockup to.
 * A white variant for dark backgrounds is at /lightrider-cloud-logo-white.svg.
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/lightrider-cloud-logo-black.svg"
      alt="Light Rider Cloud"
      width={230}
      height={32}
      priority
      className={className}
    />
  );
}
