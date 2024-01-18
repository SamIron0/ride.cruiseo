"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import { useActiveCategory } from "@/app/providers/GridProvider";
interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onCategoryClick: any;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const { activeCategory, setActiveCategory } = useActiveCategory();

  const handleCategoryClick = () => {
    setActiveCategory(label);
  };
  const router = useRouter();
  const params = useSearchParams();
  return (
    <div
      onClick={handleCategoryClick}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? "border-b-neutral-800" : "border-transparent"}
        ${selected ? "text-neutral-800" : "text-neutral-500"}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
