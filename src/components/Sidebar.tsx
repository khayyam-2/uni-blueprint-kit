import { cn } from "@/lib/utils";
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Calendar,
  BarChart3,
  Settings,
  Home,
  UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, Link } from "react-router-dom";

const sidebarItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Users, label: "Students", path: "/students" },
  { icon: UserCheck, label: "Faculty", path: "/faculty" },
  { icon: BookOpen, label: "Courses", path: "/courses" },
  { icon: Calendar, label: "Schedule", path: "/schedule" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();

  return (
    <div className={cn("flex h-full w-64 flex-col bg-card border-r", className)}>
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-foreground">UniManage</h2>
            <p className="text-sm text-muted-foreground">Admin Portal</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-4 pb-6">
        <div className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.label}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start transition-smooth",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-elegant" 
                    : "hover:bg-muted"
                )}
                asChild
              >
                <Link to={item.path}>
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}