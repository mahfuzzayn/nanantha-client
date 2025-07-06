import { ISubject } from "@/types";
import React from "react";

const Subjects = ({ subjects }: { subjects: ISubject[] }) => {
    return (
        <section className="key-features-section py-40">
            <div className="max-w-7xl mx-auto text-center px-6">
                <h2 className="text-3xl md:text-5xl font-extrabold text-it-medium-dark mb-16">
                    What We Teach?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {subjects.slice(0, 8).map((subject, index) => (
                        <div
                            key={index}
                            className="bg-it-accent hover:bg-it-medium-primary transition-all group rounded-md py-4"
                        >
                            <h3 className="group-hover:text-white text-lg font-bold">
                                {subject.name}
                            </h3>
                            <div className="mt-2">
                                <p className="text-[15px] font-semibold group-hover:text-white">
                                    Category <span className="text-it-secondary">{subject.gradeLevel}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Subjects;
