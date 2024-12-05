"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { Link } from "@nextui-org/link";
import { LogOut } from "@/src/services/authService/authApi";
import { siteConfig } from "@/src/config/site";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/src/utils/Provider/UserProvider";
import toast from "react-hot-toast";
import toastTheme from "@/src/styles/toastTheme";
import Button from "./Button";
import { privateRoute } from "@/src/constant";

const Navbar = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const pathname = usePathname();
  let navLink = [...siteConfig.navItems];

  if (user) {
    navLink = [
      ...navLink,
      {
        label: "Feed",
        href: "/news-feed",
      },
    ];
  }

  const handleLogout = async () => {
    toast.success("Logout Successfull", { ...toastTheme });
    await LogOut();
    if (privateRoute.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  const handleLink = (link: string) => {
    router.push(link);
  };

  return (
    <NextUINavbar shouldHideOnScroll className="border-b bg-orange-600">
      <NavbarBrand>
        <Link href="/" className="font-bold text-inherit text-white">
          eMart
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        {navLink.map((item, index) => (
          <NavbarItem key={`${item}-${index}`} className="hidden sm:flex gap-4">
            <Link
              className={`${
                pathname === item.href
                  ? "bg-white text-orange-950"
                  : "text-white"
              } px-2 py-1 rounded-lg`}
              href={item.href}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}

        <NavbarItem>
          {!isLoading && user ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  size="sm"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user?.email}</p>
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  onClick={() => handleLink("/profile")}
                >
                  My Profile
                </DropdownItem>
                <DropdownItem
                  key="Dashboard"
                  onClick={() => handleLink("/dashboard")}
                >
                  Dashboard
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={handleLogout}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button link="/login" className="text-orange-950 bg-white">Login</Button>
          )}
        </NavbarItem>
        <NavbarItem className="sm:hidden basis-1 pl-4">
          <NavbarMenuToggle />
        </NavbarItem>

        <NavbarMenu>
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {navLink.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  className={`${
                    pathname === item.href
                      ? "bg-orange-600 text-white"
                      : "text-orange-950"
                  } px-2 py-1 rounded-lg block text-center`}
                  href={item.href}
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </NavbarContent>
    </NextUINavbar>
  );
};

export default Navbar;
