"use client";

import CategoryBox from "../CategoryBox";
import Container from "../Container";
import { useListings } from "@/app/providers/ListingProvider";
import { usePathname, useSearchParams } from "next/navigation";
import { BsSnow } from "react-icons/bs";
import { FaSkiing } from "react-icons/fa";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { MdFlight, MdOutlineVilla } from "react-icons/md";
import {
  TbBeach,
  TbCar,
  TbMountain,
  TbMovie,
  TbPool,
  TbSchool,
  TbShoppingCart,
} from "react-icons/tb";

export const categories = [
  {
    label: "All",
    icon: TbCar,
    description: "View All Available Destinations!",
  },
  {
    label: "Shop",
    icon: TbShoppingCart,
    description: "This property is has windmills!",
  },
  {
    label: "Airport",
    icon: MdFlight,
    description: "This property is modern!",
  },
  {
    label: "School",
    icon: TbSchool,
    description: "This property is in the countryside!",
  },
  {
    label: "Cinema",
    icon: TbMovie,
    description: "Wanna see a movie?!",
  },
];

const Categories = (onCategoryClick: any) => {
  const params = useSearchParams();
  const { activeCategory } = useListings();
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
        pt-4 flex px-10 sm:px-24 md:px-44 lg:px-64 xl:px-80 flex-row items-center justify-between overflow-x-auto"
      >
        {categories.map((item, index) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={activeCategory === item.label}
            onCategoryClick={onCategoryClick}
            // Apply margin-right except for the last item
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
