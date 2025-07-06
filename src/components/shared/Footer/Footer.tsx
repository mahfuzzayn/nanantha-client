import Link from "next/link";
import logo from "@/assets/images/logo_2.png";
import React from "react";
import Image from "next/image";
import payWithMolliImg from "@/assets/images/pay-with-mollie.png";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer-section bg-gradient-to-tr from-it-primary to-it-secondary px-10 py-10">
            <div className="max-w-[1280px] text-white mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-evenly gap-10 mb-12">
                    <div className="flex">
                        <Link
                            href="/"
                            className="flex flex-col items-center gap-x-2"
                        >
                            <Image
                                src={logo}
                                height={500}
                                width={500}
                                className="w-full max-w-[100px]"
                                alt="Instructly Logo"
                            />
                            <h2 className="text-2xl text-accent font-extrabold">
                                Nanantha
                            </h2>
                        </Link>
                    </div>
                    <div>
                        <h2 className="text-left font-bold">Quick Links</h2>
                        <ul className="flex flex-col gap-2 items-start mt-2">
                            <li>
                                <Link
                                    href="/"
                                    className="hover:text-accent font-medium transition-all"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/products"
                                    className="hover:text-accent font-medium transition-all"
                                >
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about-us"
                                    className="hover:text-accent font-medium transition-all"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/faq"
                                    className="hover:text-accent font-medium transition-all"
                                >
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blogs"
                                    className="hover:text-accent font-medium transition-all"
                                >
                                    Blogs
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-left font-bold">Authentication</h2>
                        <ul className="flex flex-col gap-2 items-start mt-2">
                            <li>
                                <Link
                                    href="/login"
                                    className="hover:text-accent font-medium transition-all"
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/register"
                                    className="hover:text-accent font-medium transition-all"
                                >
                                    Register
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <Image
                            src={payWithMolliImg}
                            height={240}
                            width={740}
                            className="w-full max-w-[300px] md:max-w-[350px]"
                            alt="Pay with Mollie Image"
                        />
                    </div>
                </div>
                <div className="text-center">
                    <p>
                        <span>
                            Copyright © 2025 Nanantha All Rights Reserved.
                            Powered by{" "}
                        </span>
                        <Link
                            href="https://mzayn.vercel.app/"
                            className="font-semibold hover:text-accent transition-colors"
                            target="_blank"
                        >
                            Mahfuz Zayn{" "}
                        </Link>
                        <span className="text-red-500">❤</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
