"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
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
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";

import CategoryBox from "../CategoryBox";
import Container from "../Container";
import { useListings } from "@/app/providers/ListingProvider";

export const categories = [
  {
    label: "All",
    icon: TbBeach,
    description: "View All Available Destinations!",
  },
  {
    label: "Shop",
    icon: GiWindmill,
    description: "This property is has windmills!",
  },
  {
    label: "Airport",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    label: "School",
    icon: TbMountain,
    description: "This property is in the countryside!",
  },
  {
    label: "Cinema",
    icon: TbPool,
    description: "Wanna see a movie?!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island!",
  },

];

const Categories = (onCategoryClick: any) => {
  
  const params = useSearchParams();
  const {activeCategory} = useListings();
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          sm:px-16
          flex 
          flex-row 
          items-center 
          overflow-x-auto
          space-x-4
          sm:space-x-9
          justify-center
        "
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
