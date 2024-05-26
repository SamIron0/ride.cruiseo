"use client";

import { CruiseoContext } from "@/context/context";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useContext } from "react";
import { IconType } from "react-icons";
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
  const { activeCategory, setActiveCategory } = useContext(CruiseoContext);

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
        border-zinc-400
        hover:text-zinc-200
        transition
        cursor-pointer
        ${selected ? "border-b-zinc-200" : "border-transparent"}
        ${selected ? "text-zinc-200" : "text-zinc-500"}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
