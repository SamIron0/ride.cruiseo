"use client"
import { Trip } from "@/types";

export default function AdminNotificationTemplate(tripDetails: Trip) {

    return (
        <div>
            <p>Origin: {tripDetails.origin}</p>
            <p>Destination: {tripDetails.destination?.address}</p>
            <p>Date: {tripDetails.date}</p>
        </div>
    )

}
