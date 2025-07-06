import { Button } from "@/components/ui/button";
import Link from "next/link";
import "./GetStarted.css"
import React from "react";

const GetStarted = () => {
    return (
        <section className="bg-it-extra-light py-40">
            <div className="max-w-7xl mx-auto text-center px-6">
                <h2 className="text-3xl md:text-5xl font-extrabold text-secondary mb-6">Get Started Today</h2>
                <p className="text-lg text-it-secondary font-medium mb-8">
                    Join our community of readers and educators. Sign up or Register now!
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-4">
                    <Link href="/register">
                        <Button className="bg-primary cursor-pointer text-white hover:bg-it-secondary">
                            Register as an User
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button className="bg-accent cursor-pointer text-white hover:bg-it-destructive">
                            Register as an Admin
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default GetStarted;
