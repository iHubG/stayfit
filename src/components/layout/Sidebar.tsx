import {
  Dumbbell,
  LayoutDashboard,
  MessageCircle,
  List,
  User,
  LogOut,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../libs/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { signOut } from "firebase/auth";

const links = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "AI Chat", icon: MessageCircle, path: "/chat" },
  { label: "Workouts", icon: List, path: "/workouts" },
  { label: "Profile", icon: User, path: "/profile" },
];

export function AppSidebar() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await auth.signOut();
    await signOut(auth);
    localStorage.removeItem("loginTimestamp");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center justify-center gap-2 mt-5">
          <Dumbbell color="#4f46e5" className="w-6 h-6" />
          <span className="group-data-[collapsible=icon]:hidden text-xl font-bold text-gray-800">
            StayFit
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map(({ label, icon: Icon, path }) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === path}
                  >
                    <a
                      href={path}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(path);
                      }}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
