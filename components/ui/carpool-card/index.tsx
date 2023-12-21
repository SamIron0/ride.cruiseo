import { Trip } from "@/types";
import { X } from 'lucide-react';
import router from "next/router";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { Button, Fieldset, useModal, Modal } from "@geist-ui/core";
interface CarpoolCardProps {
  trip: Trip
}
export function CarpoolCard({ trip }: CarpoolCardProps) {
  const router = useRouter()
  let innerBg = trip.status == "Pending" ? "bg-yellow-500" : trip.status == "Confirmed" ? "bg-green-500" : "bg-blue-500"
  let outerBg = trip.status == "Pending" ? "bg-yellow-100 text-yellow-800" : trip.status == "Confirmed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
  const parsedDate = new Date(trip.date);
  // Extract the relevant components
  const month = parsedDate.toLocaleString('en-US', { month: 'short' });
  const day = parsedDate.getDate();
  const hours = parsedDate.getHours() % 12 || 12; // Convert to 12-hour format
  const minutes = parsedDate.getMinutes();
  const amPm = parsedDate.getHours() < 12 ? 'AM' : 'PM';
  const [warningActive, setWarningActive] = useState(false)
  // Construct the formatted date
  const formattedDate = `${month} ${day}, ${hours}:${minutes} ${amPm}`;
  function handleXClick() {
    trip.status == "Pening" ?
      deleteTrip
      : activateWarning()
  }
  function activateWarning() {
    // pop up screen  asking user if they want  to  continue cancelling trip
    setWarningActive(!warningActive)
  }
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
      //console.log(data);
      toast.success('Trip deleted!')
      router.refresh()
    } catch (err) {
      console.error(err);
    }
  }
  const { visible, setVisible, bindings } = useModal()

  return (
    <div className=" ">
      <Modal {...bindings}>
        <Modal.Title>Modal</Modal.Title>
        <Modal.Subtitle>This is a modal</Modal.Subtitle>
        <Modal.Content>
          <p>Some content contained within the modal.</p>
        </Modal.Content>
        <Modal.Action onClick={() => deleteTrip().then(activateWarning)}>Yes, Im sure</Modal.Action>
        <Modal.Action passive onClick={() => setVisible(false)}>No, cancel</Modal.Action>
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
            <p className="font-semibold ">Destination: <span className="font-normal">{trip.destination}</span></p>
            <p className="font-semibold ">Date: <span className="font-normal">{formattedDate}</span></p>
          </div>
        </Fieldset.Subtitle>
        <Fieldset.Footer>
          <p className="font-semibold ">Price: <span className="font-normal">{trip.price}</span></p>
          <Button auto type="secondary" scale={1 / 3} onClick={() => handleXClick()} font="12px">Cancel</Button>        </Fieldset.Footer>
      </Fieldset>
    </div>
  )
}
