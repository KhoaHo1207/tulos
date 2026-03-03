import Title from "./Title";

export default function HomeBanner() {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <Title className="text-center text-3xl font-bold uppercase md:text-4xl">
        Best Clothing Collection
      </Title>
      <p className="text-lightColor/80 max-w-[480px] text-center text-sm font-medium">
        Find everything you need to look and feel your best, and shop the latest
        men&apos;s fashion and lifestyle products{" "}
      </p>
    </div>
  );
}
