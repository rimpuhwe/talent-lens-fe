"use client";

import {
  Focus,
  Menu,
  X,
  ChevronRight,
  ArrowRight,
  Target,
  BrainCircuit,
  TrendingUp,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "@/components/shared/theme-toggle";

const NAV_LINKS = [
  { name: "Home", href: "/" },

  {
    name: "Solutions",
    href: "#solutions",
    dropdown: [
      {
        name: "Talent Validation",
        desc: "Scenario-based missions",
        icon: <Target size={18} />,
        href: "#solutions",
      },
      {
        name: "Intelligent Matching",
        desc: "AI-driven capability scores",
        icon: <BrainCircuit size={18} />,
        href: "#solutions",
      },
      {
        name: "Upskilling Engine",
        desc: "Personalized learning paths",
        icon: <TrendingUp size={18} />,
        href: "#solutions",
      },
      {
        name: "Enterprise Suite",
        desc: "Custom hiring workflows",
        icon: <ShieldCheck size={18} />,
        href: "#solutions",
      },
    ],
  },

  {
    name: "About",
    href: "#how-it-works",
    dropdown: [
      {
        name: "Our Mission",
        desc: "Evidence-first talent",
        icon: <Focus size={18} />,
        href: "#about",
      },
      {
        name: "How it Works",
        desc: "Process walkthrough",
        icon: <Zap size={18} />,
        href: "#how-it-works",
      },
      {
        name: "FAQ",
        desc: "Common questions",
        icon: <Users size={18} />,
        href: "#faq",
      },
    ],
  },

  { name: "Pricing", href: "#pricing" },
];

function MainNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`
        fixed
        left-1/2
        -translate-x-1/2
        z-[9999]
        w-full
        flex
        justify-center
        px-4
        md:px-6
        transition-all
        duration-700
        ease-[cubic-bezier(0.16,1,0.3,1)]
        ${scrolled ? "top-3" : "top-8"}
      `}
    >
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`
          relative
          overflow-visible
          border
          border-white/10
          // bg-black/45
          backdrop-blur-3xl
          shadow-[0_20px_80px_rgba(0,0,0,0.45)]
          transition-all
          duration-700
          ease-[cubic-bezier(0.16,1,0.3,1)]

          ${
            scrolled
              ? "max-w-7xl rounded-[2rem] py-3 px-6"
              : "max-w-6xl rounded-[2.5rem] py-5 px-6 md:px-10"
          }

          w-full
        `}
      >
        {/* Glow Layer */}
        <div className="absolute inset-0 rounded-inherit pointer-events-none" />

        <div className="relative z-50 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex-1">
            <Link
              href="/"
              className="flex items-center gap-3 group w-fit"
            >
              <div
                className="
                  p-2.5
                  rounded-2xl
                  bg-gradient-to-br
                  from-emerald-400
                  to-emerald-600
                  shadow-[0_10px_40px_rgba(16,185,129,0.4)]
                  transition-all
                  duration-500
                  group-hover:rotate-6
                  group-hover:scale-105
                "
              >
                <Focus
                  size={22}
                  className="text-white"
                  strokeWidth={2.5}
                />
              </div>

              <h1 className="text-white font-black text-2xl tracking-tight">
                Talent
                <span className="text-emerald-400">Lens</span>
              </h1>
            </Link>
          </div>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center relative">
            <ul
              className="relative flex items-center gap-1 p-1"
              onMouseLeave={() => {
                setPosition((pv) => ({
                  ...pv,
                  opacity: 0,
                }));

                setActiveDropdown(null);
              }}
            >
              {NAV_LINKS.map((link) => (
                <Tab
                  key={link.name}
                  link={link}
                  setPosition={setPosition}
                  setActiveDropdown={setActiveDropdown}
                  activeDropdown={activeDropdown}
                />
              ))}

              <Cursor position={position} />
            </ul>
          </div>

          {/* RIGHT CTA */}
          <div className="flex-1 flex items-center justify-end gap-4">
            {/* JOIN NOW */}
            <Link
              href="/login"
              className="
                hidden
                lg:flex
                items-center
                justify-center
                px-6
                py-3
                rounded-full
                border
                border-white/10
                bg-white/5
                text-white
                backdrop-blur-xl
                hover:bg-white
                hover:text-black
                transition-all
                duration-500
                font-bold
                text-xs
                uppercase
                tracking-[0.15em]
              "
            >
              Join Now
            </Link>

            {/* GET STARTED */}
            <Link
              href="/register"
              className="
                hidden
                md:flex
                items-center
                gap-2
                px-8
                py-3
                rounded-full
                bg-gradient-to-r
                from-emerald-400
                to-emerald-600
                text-white
                font-black
                text-xs
                uppercase
                tracking-[0.15em]
                shadow-[0_10px_40px_rgba(16,185,129,0.4)]
                hover:scale-[1.03]
                transition-all
                duration-500
                group
              "
            >
              Get Started

              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="
                md:hidden
                p-3
                rounded-2xl
                border
                border-white/10
                bg-white/10
                text-white
                backdrop-blur-xl
                hover:bg-white/20
                transition-all
                duration-300
              "
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              className="md:hidden overflow-hidden mt-5"
            >
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[2rem]
                  border
                  border-white/10
                  bg-black/60
                  backdrop-blur-3xl
                  shadow-[0_20px_80px_rgba(0,0,0,0.55)]
                  p-4
                "
              >
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10 pointer-events-none" />

                <div className="relative flex flex-col gap-3">
                  {NAV_LINKS.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        delay: i * 0.08,
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="
                          flex
                          items-center
                          justify-between
                          p-5
                          rounded-2xl
                          border
                          border-white/5
                          bg-white/5
                          text-white
                          hover:bg-white/10
                          hover:border-white/20
                          transition-all
                          duration-300
                          group
                        "
                      >
                        <span className="font-bold text-lg">
                          {link.name}
                        </span>

                        <ChevronRight
                          size={20}
                          className="
                            text-emerald-400
                            transition-transform
                            duration-300
                            group-hover:translate-x-1
                          "
                        />
                      </Link>
                    </motion.div>
                  ))}

                  {/* MOBILE CTA */}
                  <div className="grid grid-cols-1 gap-4 mt-6">
                    <Link
                      href="/register"
                      onClick={() => setIsOpen(false)}
                      className="
                        flex
                        items-center
                        justify-center
                        py-5
                        rounded-2xl
                        bg-gradient-to-r
                        from-emerald-400
                        to-emerald-600
                        text-white
                        font-black
                        text-sm
                        uppercase
                        tracking-[0.2em]
                        shadow-[0_10px_40px_rgba(16,185,129,0.35)]
                      "
                    >
                      Get Started
                    </Link>

                    <div className="flex gap-4">
                      <Link
                        href="/login"
                        onClick={() => setIsOpen(false)}
                        className="
                          flex-1
                          flex
                          items-center
                          justify-center
                          py-5
                          rounded-2xl
                          border
                          border-white/10
                          bg-white/5
                          text-white
                          font-bold
                          text-sm
                          uppercase
                          tracking-[0.2em]
                          hover:bg-white
                          hover:text-black
                          transition-all
                        "
                      >
                        Join Now
                      </Link>

                      <div
                        className="
                          flex
                          items-center
                          justify-center
                          p-4
                          rounded-2xl
                          border
                          border-white/10
                          bg-white/5
                        "
                      >
                        <ModeToggle />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}

const Tab = ({
  link,
  setPosition,
  setActiveDropdown,
  activeDropdown,
}: {
  link: any;
  setPosition: any;
  setActiveDropdown: any;
  activeDropdown: string | null;
}) => {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });

        if (link.dropdown) {
          setActiveDropdown(link.name);
        } else {
          setActiveDropdown(null);
        }
      }}
      className="
        relative
        z-10
        cursor-pointer
        px-5
        py-2.5
        text-sm
        font-semibold
        uppercase
        tracking-wide
        text-white
        mix-blend-difference
      "
    >
      <Link href={link.href}>{link.name}</Link>

      <AnimatePresence>
        {activeDropdown === link.name && link.dropdown && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 10,
              scale: 0.96,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              absolute
              top-full
              left-1/2
              -translate-x-1/2
              pt-5
              w-80
            "
          >
            <div
              className="
                relative
                overflow-hidden
                rounded-[2rem]
                border
                border-white/10
                bg-black/80
                backdrop-blur-3xl
                shadow-[0_25px_80px_rgba(0,0,0,0.55)]
                p-4
              "
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10 pointer-events-none" />

              <div className="relative space-y-2">
                {link.dropdown.map((item: any) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="
                      flex
                      items-center
                      gap-4
                      p-4
                      rounded-2xl
                      hover:bg-white/5
                      transition-all
                      duration-300
                      group/item
                    "
                  >
                    <div
                      className="
                        w-11
                        h-11
                        rounded-2xl
                        bg-emerald-500/10
                        text-emerald-400
                        flex
                        items-center
                        justify-center
                        transition-all
                        duration-300
                        group-hover/item:bg-emerald-400
                        group-hover/item:text-black
                      "
                    >
                      {item.icon}
                    </div>

                    <div>
                      <div className="text-white font-bold text-sm">
                        {item.name}
                      </div>

                      <div className="text-white/40 text-xs uppercase tracking-wider mt-1">
                        {item.desc}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

const Cursor = ({ position }: { position: any }) => {
  return (
    <motion.li
      animate={position}
      transition={{
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="
        absolute
        z-0
        h-10
        rounded-full
        bg-white
      "
    />
  );
};

export default MainNavigation;
