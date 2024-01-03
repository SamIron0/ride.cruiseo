import { Trip } from "@/types";
import { X } from 'lucide-react';
import router from "next/router";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import { Button, Fieldset, useModal, Modal } from "@geist-ui/core";
interface CarpoolCardProps {
  trip: Trip
}
export function CarpoolCard({ trip }: CarpoolCardProps) {
  const router = useRouter()
  let innerBg = trip.status == "Active" ? "bg-yellow-500" : trip.status == "Confirmed" ? "bg-green-500" : "bg-blue-500"
  let outerBg = trip.status == "Active" ? "bg-yellow-100 text-yellow-800" : trip.status == "Confirmed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
  const parsedDate = new Date(trip.date);
  // Extract the relevant components
  const month = parsedDate.toLocaleString('en-US', { month: 'short' });
  const day = parsedDate.getDate();
  const hours = parsedDate.getHours() % 12 || 12; // Convert to 12-hour format
  const minutes = parsedDate.getMinutes();
  const amPm = parsedDate.getHours() < 12 ? 'AM' : 'PM';
  // Construct the formatted date
  const formattedDate = `${month} ${day}, ${hours}:${minutes} ${amPm}`;

  async function deleteTrip() {
    try {
      const url = "/api/delete-trip";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trip),
      };

      const response = await fetch(url, options);
      const data = await response.json();
      toast.success('Trip deleted!')
      router.refresh()
    } catch (err) {
      console.error(err);
    }
  }
  const [state, setState] = useState(false)
  const handler = () => setState(true)
  const closeHandler = () => {
    setState(false)
  }
  return (
    <div >
      <Modal visible={state} onClose={() => closeHandler}>
        <Modal.Title>Cancel Trip</Modal.Title>
        <Modal.Content>
          <p>Are you sure you want to cancel the trip?</p>
        </Modal.Content>
        <Modal.Action onClick={() => deleteTrip().then(() => setState(false))}>Yes, Im sure</Modal.Action>
        <Modal.Action passive onClick={() => setState(false)}>No, cancel</Modal.Action>
      </Modal>
      <Fieldset>
        <Fieldset.Title >
          <span className={`${outerBg} inline-flex self-end items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300`}>
            <span className={`${innerBg} w-2 h-2 me-1 rounded-full`}></span>
            {trip.status}
          </span>
        </Fieldset.Title>
        <Fieldset.Subtitle>
          <div className="flex-1">
            <p className="font-semibold ">Origin: <span className="font-normal">{trip.origin}</span></p>
            <p className="font-semibold ">Destination: <span className="font-normal">{trip.destination?.address}</span></p>
            <p className="font-semibold ">Date: <span className="font-normal">{formattedDate}</span></p>
          </div>
        </Fieldset.Subtitle>
        <Fieldset.Footer>
          <p className="font-semibold ">Price: <span className="font-normal">{trip.price}</span></p>
          <Button auto type="secondary" scale={1 / 3} onClick={handler} font="12px">Cancel</Button>        </Fieldset.Footer>
      </Fieldset>
    </div>
  )
}
