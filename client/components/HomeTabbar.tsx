import { productType } from "@/constants";
import { Repeat } from "lucide-react";

interface Props {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

export default function HomeTabbar({ selectedTab, setSelectedTab }: Props) {
  return (
    <div className="flex items-center gap-1.5 font-medium">
      <div className="flex items-center gap-1.5">
        {productType?.map((item) => (
          <button
            key={item?.title}
            className={`border-darkColor hover:bg-darkColor cursor-pointer rounded-full border px-4 py-1.5 hover:text-white md:px-6 md:py-2 ${selectedTab === item.title ? "bg-darkColor text-white" : ""}`}
            onClick={() => setSelectedTab(item.title)}
          >
            {item?.title}
          </button>
        ))}
      </div>
      <button
        className={`border-darkColor hover:bg-darkColor cursor-pointer rounded-full border p-2 hover:text-white`}
      >
        <Repeat className="size-5" />
      </button>
    </div>
  );
}
