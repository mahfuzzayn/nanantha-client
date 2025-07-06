import { Button } from "@/components/ui/button";
import { ITutor } from "@/types";
import { Rating } from "@smastrom/react-rating";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Tutors = ({ tutors }: { tutors: ITutor[] }) => {
    return (
        <section className="tutors-section bg-it-extra-light py-40">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl text-center md:text-5xl font-extrabold text-it-medium-dark mb-16">
                    Top Experienced Tutors
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tutors.slice(0, 8).map((tutor, index) => (
                        <div
                            key={index}
                            className="bg-white/50 rounded-md overflow-hidden"
                        >
                            <Image
                                src={tutor?.profileUrl}
                                height={500}
                                width={500}
                                className="h-[240px] w-full object-cover"
                                alt="profile photo"
                            />
                            <div className="space-y-2 p-4">
                                <h3 className="text-xl font-bold">
                                    {tutor.user.name}
                                </h3>
                                <div className="flex gap-x-2 text-[15px] font-semibold group-hover:text-white">
                                    <p className="flex gap-x-1">
                                        Average Rating:
                                        <span className="text-it-secondary">
                                            {tutor?.averageRating}
                                        </span>
                                    </p>
                                    <Rating
                                        style={{ width: 80 }}
                                        value={tutor?.averageRating}
                                        readOnly
                                    />
                                </div>
                                <p className="text-[15px] font-semibold group-hover:text-white">
                                    Hourly Rate:{" "}
                                    <span className="text-it-secondary">
                                        {tutor.hourlyRate} taka
                                    </span>
                                </p>
                                <Button className="bg-it-medium-dark hover:bg-it-destructive">
                                    <Link href={`/tutors/${tutor?._id}`}>
                                        Book Now
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Tutors;
