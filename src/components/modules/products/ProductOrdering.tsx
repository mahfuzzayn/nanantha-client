/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";
import { createBooking } from "@/services/Booking";
import { IProduct } from "@/types";
import { IBooking } from "@/types/booking";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

const ProductOrdering = ({ product }: { product: IProduct }) => {
    const { user } = useUser();
    const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
    const [selectedMonths, setSelectedMonths] = useState<number>(0);
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [booking, setBooking] = useState<IBooking>();

    const totalWeeklySelectedHours = selectedTimeSlots.reduce((acc, slot) => {
        const availability = product?.availability.find((a) => a?._id === slot);
        return acc + (availability?.totalHours || 0);
    }, 0);
    const totalSelectedHours = parseFloat(
        (totalWeeklySelectedHours * 4 * selectedMonths).toFixed(2)
    );

    const handleChangeSelectedTimeSlots = (slot: string) => {
        setSelectedTimeSlots((prev) => {
            const isSelected = prev.includes(slot);
            const updatedTimeSlots = isSelected
                ? prev.filter((s) => s !== slot)
                : [...prev, slot];
            return updatedTimeSlots;
        });
    };

    const handleRequestTutor = async () => {
        if (
            selectedTimeSlots.length >= 0 ||
            selectedMonths > 0 ||
            date !== undefined
        ) {
            const bookingData = {
                tutor: product?._id,
                date: date?.toISOString() || new Date().toISOString(),
                months: selectedMonths,
                timeSlots: selectedTimeSlots,
            };
            const toastId = toast.loading("Requesting tutor for a Booking...");

            try {
                const res = await createBooking(bookingData);

                if (res.success) {
                    setBooking(res.data);
                    setSelectedTimeSlots([]);
                    setSelectedMonths(0);
                    setDate(undefined);

                    toast.success("Requested tutor successfully", {
                        id: toastId,
                    });
                } else {
                    toast.warning("Request didn't made up", {
                        id: toastId,
                    });
                }
            } catch (error: any) {
                toast.error("Failed to request tutor for a booking.", {
                    id: toastId,
                });
                return Error(error);
            }
        }
    };

    return (
        <>
            <div className="space-y-2">
                <h2 className="text-2xl text-it-medium-dark font-bold">
                    Booking Calendar
                </h2>
                <div className="flex flex-col lg:flex-row gap-6 md:gap-8 !mt-4">
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium">
                            Select Days of a Week
                        </h4>
                        <div className="flex flex-wrap gap-4">
                            {product?.availability?.map((a) => (
                                <div
                                    key={a?._id}
                                    className={`text-white px-2 py-1 rounded-sm cursor-pointer select-none ${
                                        selectedTimeSlots?.find(
                                            (s) => s === a?._id
                                        )
                                            ? "bg-it-light-dark"
                                            : "bg-gray-500"
                                    }`}
                                    onClick={() =>
                                        handleChangeSelectedTimeSlots(a?._id)
                                    }
                                >
                                    {a?.day}
                                </div>
                            ))}
                        </div>
                        {totalSelectedHours > 0 ? (
                            <h2 className="text-lg text-white !mt-5 max-w-[280px] bg-it-light-dark rounded-md p-3">
                                Total{" "}
                                <span className="font-semibold">
                                    {totalWeeklySelectedHours} (Weekly Hours) x{" "}
                                    {selectedMonths} (Months) ={" "}
                                    {totalSelectedHours} hours
                                </span>
                            </h2>
                        ) : (
                            <h2 className="text-lg text-white !mt-5 max-w-[280px] italic bg-yellow-600 rounded-md p-3">
                                Select{" "}
                                <span className="font-semibold">Days</span>,{" "}
                                <span className="font-semibold">
                                    Start Date
                                </span>{" "}
                                & Choose{" "}
                                <span className="font-semibold">Months</span> to
                                see total hours.
                            </h2>
                        )}
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-sm font-medium">Enter Months</h4>
                        <Input
                            type="number"
                            min="1"
                            className="bg-white max-w-[280px]"
                            value={selectedMonths || ""}
                            onChange={(e) =>
                                setSelectedMonths(Number(e.target.value))
                            }
                        />
                    </div>
                </div>
            </div>
            <div className="space-y-1 mt-4">
                <h4 className="text-md font-bold">Start Date</h4>
                <h4 className="text-sm">
                    Select the start date of your learning journey
                </h4>
                <div className="flex !mt-4">
                    <Calendar
                        mode="single"
                        fromDate={new Date()}
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border bg-it-light-primary"
                    />
                </div>
            </div>
            <div className="mt-5 space-y-8">
                {booking && (
                    <p className="text-it-secondary max-w-xl">
                        <span className="font-bold">Important:</span> Request to
                        tutor{" "}
                        <span className="font-semibold">
                            {product?.user?.name}
                        </span>{" "}
                        for a booking was successful, wait for the tutor's
                        response. Feel free to check your booking status on{" "}
                        <Link
                            href={`/${user?.role}/dashboard/bookings/${booking?._id}`}
                            className="font-semibold underline"
                        >
                            Dashboard
                        </Link>
                    </p>
                )}
                <Button
                    className="font-bold bg-it-medium-dark hover:bg-it-destructive"
                    disabled={
                        selectedTimeSlots.length <= 0 ||
                        selectedMonths === 0 ||
                        date === undefined
                    }
                    onClick={handleRequestTutor}
                >
                    Request Tutor
                </Button>
            </div>
        </>
    );
};

export default ProductOrdering;
