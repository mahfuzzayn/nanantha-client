"use client";

import { useEffect, useRef, useState } from "react";
import { MenuIcon, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import logo from "@/assets/images/logo_2.png";
import Image from "next/image";
import { logout } from "@/services/auth";
import "./Navbar.css";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, setIsLoading, setUser, cart } = useUser();
    const router = useRouter();
    const navbarRef = useRef<HTMLElement | null>(null);

    const handleLogOut = async () => {
        await logout();
        setUser(null);
        setIsMenuOpen(false);
        setIsLoading(true);

        router.push("/");
        router.refresh();
    };

    const navLinks = [
        {
            href: "/",
            label: "Home",
        },
        {
            href: "/products",
            label: "Products",
        },
        {
            href: "/about-us",
            label: "About Us",
        },
        {
            href: "/faq",
            label: "FAQ",
        },
        {
            href: "/blogs",
            label: "Blogs",
        },
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 50) {
                navbarRef.current?.classList.add("scrolled");
            } else {
                navbarRef.current?.classList.remove("scrolled");
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section
            ref={navbarRef}
            className="navbar-section bg-muted py-4 fixed top-0 w-full z-[100]"
        >
            <header className="container max-w-[1280px] mx-auto flex justify-between items-center px-6 relative select-none">
                <Link href="/" className="flex items-center gap-x-1">
                    <Image
                        src={logo}
                        height={50}
                        width={50}
                        alt="Nanantha Logo"
                    />
                    <h2 className="text-3xl text-accent font-extrabold">
                        Nanantha
                    </h2>
                </Link>
                {/* PC Nav */}
                <nav>
                    <ul className="hidden lg:flex items-center gap-x-5 font-medium">
                        {navLinks.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.href}
                                className="hover:text-accent transition-all duration-300"
                            >
                                {link.label}
                            </Link>
                        ))}
                        {user?.email ? (
                            <>
                                <li className="transition-all duration-300 group relative">
                                    <Link
                                        href={`/${user?.role}/dashboard`}
                                        className="hover:text-accent transition-all duration-300"
                                    >
                                        Dashboard
                                    </Link>
                                    {user?.role === "admin" ? (
                                        <ul className="mega-menu bg-muted rounded-[8px] absolute -left-[18px] h-0 invisible opacity-70 pointer-events-none group-hover:opacity-100 group-hover:h-[180px] group-hover:visible group-hover:pointer-events-auto overflow-hidden transition-all duration-300 ease-in-out">
                                            <li>
                                                <Link
                                                    href={`/${user.role}/dashboard`}
                                                    className="block hover:text-accent transition-all duration-300 pt-4 px-6 pb-1 w-full"
                                                >
                                                    Overview
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={`/${user.role}/dashboard/orders`}
                                                    className="block hover:text-accent transition-all duration-300 py-1 px-6 w-full"
                                                >
                                                    Orders
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={`/${user.role}/dashboard/products`}
                                                    className="block hover:text-accent transition-all duration-300 py-1 px-6 w-full"
                                                >
                                                    Products
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={`/${user.role}/dashboard/reviews`}
                                                    className="block hover:text-accent transition-all duration-300 py-1 px-6 w-full"
                                                >
                                                    Reviews
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={`/${user.role}/dashboard/profile`}
                                                    className="block hover:text-accent transition-all duration-300 py-1 px-6 pb-4 w-full"
                                                >
                                                    Profile
                                                </Link>
                                            </li>
                                        </ul>
                                    ) : (
                                        <ul className="mega-menu bg-muted rounded-[8px] absolute -left-[18px] h-0 invisible opacity-70 pointer-events-none group-hover:opacity-100 group-hover:h-[150px] group-hover:visible group-hover:pointer-events-auto overflow-hidden transition-all duration-300 ease-in-out">
                                            <li>
                                                <Link
                                                    href={`/${user.role}/dashboard`}
                                                    className="block hover:text-accent transition-all duration-300 pt-4 px-6 pb-1 w-full"
                                                >
                                                    Overview
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={`/${user.role}/dashboard/orders`}
                                                    className="block hover:text-accent transition-all duration-300 py-1 px-6 w-full"
                                                >
                                                    Orders
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={`/${user.role}/dashboard/reviews`}
                                                    className="block hover:text-accent transition-all duration-300 py-1 px-6 w-full"
                                                >
                                                    Reviews
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={`/${user.role}/dashboard/profile`}
                                                    className="block hover:text-accent transition-all duration-300 py-1 px-6 pb-4 w-full"
                                                >
                                                    Profile
                                                </Link>
                                            </li>
                                        </ul>
                                    )}
                                </li>
                                <li>
                                    <Link
                                        href="/cart"
                                        className="relative block transition-all duration-300 w-full p-2 hover:bg-accent hover:text-white border-[2px] border-primary rounded-full"
                                    >
                                        <ShoppingCart />
                                        {(cart?.items?.length as number) >
                                            0 && (
                                            <p className="absolute bg-primary py-0.5 px-1.5 rounded-full -bottom-2 -right-2 text-xs text-white">
                                                {cart?.items?.length}
                                            </p>
                                        )}
                                    </Link>
                                </li>
                                <button
                                    onClick={handleLogOut}
                                    className="hover:text-accent cursor-pointer transition-all duration-300"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                className="hover:text-accent transition-all duration-300"
                            >
                                Login
                            </Link>
                        )}
                    </ul>
                </nav>
                {/* Mobile Nav */}
                <nav className="absolute z-20 top-[56px] left-0 w-full">
                    <ul
                        className={`lg:hidden flex flex-col font-semibold bg-accent w-full overflow-hidden ${
                            isMenuOpen && user
                                ? `${
                                      user.role === "admin"
                                          ? "h-[535px]"
                                          : "h-[495px]"
                                  } pointer-events-auto`
                                : isMenuOpen
                                ? "h-[240px] pointer-events-auto"
                                : "h-0 pointer-events-none"
                        } transition-all`}
                    >
                        {navLinks.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="px-6 py-2 hover:bg-destructive hover:text-white transition-all"
                            >
                                {link.label}
                            </Link>
                        ))}
                        {user?.email ? (
                            <>
                                <li
                                    className="hover:bg-destructive transition-all group"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Link
                                        href={`/${user?.role}/dashboard`}
                                        className="block px-6 py-2 hover:text-white"
                                    >
                                        Dashboard
                                    </Link>
                                    {user?.role === "admin" ? (
                                        <ul className="mega-menu rounded-[8px] ml-6 mb-2">
                                            <li>
                                                <Link
                                                    href={`/${user.role}/dashboard`}
                                                    className="block hover:bg-primary hover:text-white transition-all duration-300 py-2 px-4 w-full"
                                                >
                                                    Overview
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={`/${user.role}/dashboard/orders`}
                                                    className="block hover:bg-primary hover:text-white transition-all duration-300 py-2 px-4 w-full"
                                                >
                                                    Orders
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={`/${user.role}/dashboard/products`}
                                                    className="block hover:bg-primary hover:text-white transition-all duration-300 py-2 px-4 w-full"
                                                >
                                                    Products
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={`/${user.role}/dashboard/reviews`}
                                                    className="block hover:bg-primary hover:text-white transition-all duration-300 py-2 px-4 w-full"
                                                >
                                                    Reviews
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={`/${user.role}/dashboard/profile`}
                                                    className="block hover:bg-primary hover:text-white transition-all duration-300 py-2 px-4 w-full"
                                                >
                                                    Profile
                                                </Link>
                                            </li>
                                        </ul>
                                    ) : (
                                        <ul className="mega-menu rounded-[8px] mt-2 ml-6 mb-2">
                                            <li>
                                                <Link
                                                    href={`/${user.role}/dashboard`}
                                                    className="block hover:bg-primary hover:text-white transition-all duration-300 py-2 px-4 w-full"
                                                >
                                                    Overview
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={`/${user.role}/dashboard/bookings`}
                                                    className="block hover:bg-primary hover:text-white transition-all duration-300 py-2 px-4 w-full"
                                                >
                                                    Orders
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={`/${user.role}/dashboard/reviews`}
                                                    className="block hover:bg-primary hover:text-white transition-all duration-300 py-2 px-4 w-full"
                                                >
                                                    Reviews
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={`/${user.role}/dashboard/profile`}
                                                    className="block hover:bg-primary hover:text-white transition-all duration-300 py-2 px-4 w-full"
                                                >
                                                    Profile
                                                </Link>
                                            </li>
                                        </ul>
                                    )}
                                </li>
                                <li>
                                    <Link
                                        href="/cart"
                                        className="px-6 py-2 block hover:bg-destructive hover:text-white transition-all duration-300"
                                    >
                                        Cart
                                    </Link>
                                </li>
                                <Link
                                    href="/"
                                    onClick={() => {
                                        handleLogOut();
                                        setIsMenuOpen(false);
                                    }}
                                    className="px-6 py-2 hover:bg-destructive hover:text-white transition-all duration-300"
                                >
                                    Logout
                                </Link>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="px-6 py-2 hover:bg-destructive hover:text-white transition-all"
                            >
                                Login
                            </Link>
                        )}
                    </ul>
                </nav>
                <div className="flex lg:hidden gap-x-5 items-center p-2">
                    <div className="lg:hidden hamburger cursor-pointer">
                        {!isMenuOpen ? (
                            <MenuIcon
                                color="black"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            />
                        ) : (
                            <X
                                color="black"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            />
                        )}
                    </div>
                </div>
            </header>
        </section>
    );
};

export default Navbar;
