"use client";
import { RevealCard } from "@/components/RevealCard";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { CircleDollarSign } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import dashboard from "../assets/dashboard.png"; // Ensure this path is correct
import { signIn } from "next-auth/react";

const LandingPage = () => {
  const features = [
    {
      title: "Secure Transactions",
      description: "Your data and transactions are always protected.",
    },
    {
      title: "Instant Transfers",
      description: "Send and receive money instantly, anytime, anywhere.",
    },
    {
      title: "User-Friendly Interface",
      description: "Navigate effortlessly with our intuitive design.",
    },
    {
      title: "Bank-Level Security",
      description:
        "Trust us with your finances, backed by advanced security measures.",
    },
    {
      title: "Exclusive Offers",
      description: "Get rewards for using CoinPort.",
    },
    {
      title: "Mobile Accessibility",
      description: "Access your wallet on the go with our mobile app.",
    },
  ];
  return (
    <div className="text-gray-300 min-h-screen p-6 bg-zinc-950">
      <header className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-1">
          <CircleDollarSign size={35} />
          <h1 className="text-3xl font-bold">CoinPort</h1>
        </div>
        <button
          className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 font-semibold rounded-full 
          shadow-lg transition duration-300"
          onClick={() => signIn("Credentials",{callbackUrl: "/dashboard"})}
        >
          Get Started
        </button>
      </header>
      <hr className="border-gray-800" />

      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-gray-300">
                Experience the Future of Digital Wallets
                <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                  with CoinPort!
                </span>
              </h1>
            </>
          }
        >
          <Image
            src={dashboard} // Use the imported image here
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>

      <section className="mb-16">
        <h3 className="text-2xl font-bold text-center mb-8">Features</h3>
        <div className="max-w-5xl mx-auto px-8">
          <HoverEffect items={features} />
        </div>
      </section>

      <section className="mb-16">
        <h3 className="text-2xl font-bold text-center mb-8">
          Why Choose CoinPort?
        </h3>
        <div className="py-12 flex flex-col lg:flex-row items-center justify-center w-full gap-4 mx-auto px-8">
          <RevealCard
            title="Fast and Secure Transfers"
            icon={<CircleDollarSign size={30} />}
          >
            <CanvasRevealEffect
              animationSpeed={5.1}
              containerClassName="bg-emerald-900"
            />
          </RevealCard>
          <RevealCard
            title="Effortless Money Management"
            icon={<CircleDollarSign size={30} />}
          >
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName="bg-black"
              colors={[
                [236, 72, 153],
                [232, 121, 249],
              ]}
              dotSize={2}
            />
            {/* Radial gradient for the cute fade */}
            <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
          </RevealCard>
          <RevealCard
            title="Your Wallet, Your Way"
            icon={<CircleDollarSign size={30} />}
          >
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName="bg-sky-600"
              colors={[[125, 211, 252]]}
            />
          </RevealCard>
        </div>
      </section>

      <section className="bg-gradient-to-r from-gray-800 to-gray-900 py-16 rounded-lg">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-300 mb-6">
            Join CoinPort Today!
          </h2>
          <p className="text-lg text-gray-400 text-balance mb-8">
            Experience the ultimate digital wallet for fast, secure, and easy
            transactions.
          </p>
          <Link
            href={"/dashboard"}
            className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 font-semibold rounded-full shadow-lg transition duration-300"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
