"use client";

import dynamic from "next/dynamic";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import { UserDetails } from "@/types";

const Map = dynamic(() => import("../Map"), {
  ssr: false,
});

interface ListingInfoProps {
  user?: UserDetails | null;
  description: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({ user, description }) => {

  //const coordinates = getByValue(locationValue)?.latlng

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        >
          <div>Hosted by {user?.full_name}</div>
          <Avatar src={user?.avatar_url} />
        </div>
        <div
          className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        ></div>
      </div>
      <hr />

      <hr />
      <div
        className="
      text-lg font-light text-neutral-500"
      >
        {description}
      </div>
      <hr />
      {/*<Map center={coordinates} />*/}
    </div>
  );
};

export default ListingInfo;
