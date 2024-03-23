"use client";
import {
  ChevronFirst,
  ChevronLast,
  CircleDollarSign,
  CircleUserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Import usePathname from next/navigation
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getUserNumber } from "../../app/lib/actions/getUserNumber";
import { useSession, signIn, signOut } from "next-auth/react";

// Define types for the context and props
export interface SidebarContextType {
  expanded: boolean;
}

export interface SidebarProps {
  children: ReactNode;
}

export interface SidebarItemProps {
  icon: ReactNode;
  href: string;
  title: string;
  alert?: boolean;
}

// Create context with the proper type
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export default function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState(false);
  const [userNumber, setUserNumber] = useState<string | null>(null);

  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    const fetchUserNumber = async () => {
      const number = await getUserNumber(); // Fetch the user number
      setUserNumber(number);
    };

    fetchUserNumber();
  }, []);

  return (
    <aside className="h-full bg-zinc-900 max-w-[230px]">
      <nav className="h-full flex flex-col bg-zinc-800 border-r border-zinc-700 shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <div
            className={`flex gap-1 items-center text-indigo-400 ml-1 text-xl font-bold overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
          >
            <CircleDollarSign size={32} />
            <h1>CoinPort</h1>
          </div>

          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-white"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t border-zinc-700 flex p-3 justify-center">
          <CircleUserRound size={32} className="text-gray-400" />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-2" : "w-0"
            }`}
          >
            <div className="flex space-x-1 leading-4 text-gray-400 text-sm divide-x-2 divide-zinc-700">
              <div className="pr-1">
                <h4 className="font-medium">{userNumber}</h4>
              </div>
              <div className="pl-1">
                <button
                  onClick={
                    session.data?.user
                      ? async () => {
                          await signOut();
                          router.push("/api/auth/signin");
                        }
                      : () => signIn()
                  }
                >
                  {session.data?.user ? "Logout" : "Login"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({
  icon,
  href,
  title,
  alert = false,
}: SidebarItemProps) {
  const context = useContext(SidebarContext);
  const pathname = usePathname(); // Get the current path

  if (!context) {
    throw new Error("SidebarItem must be used within a Sidebar component.");
  }

  const { expanded } = context;
  const isActive = pathname === href; // Determine if the current path matches href

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group
        ${
          isActive
            ? "bg-gradient-to-tr from-indigo-700 to-indigo-500 text-white"
            : "hover:bg-zinc-700 text-gray-400"
        }
      `}
    >
      <Link href={href} className="flex items-center h-[28px]">
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {title}
        </span>
      </Link>

      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-500 text-white text-sm
            invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
        >
          {title}
        </div>
      )}
    </li>
  );
}
