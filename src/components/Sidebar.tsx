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

const sidebarItems = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: Users, label: "Students" },
  { icon: UserCheck, label: "Faculty" },
  { icon: BookOpen, label: "Courses" },
  { icon: Calendar, label: "Schedule" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Settings, label: "Settings" },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
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
          {sidebarItems.map((item) => (
            <Button
              key={item.label}
              variant={item.active ? "default" : "ghost"}
              className={cn(
                "w-full justify-start transition-smooth",
                item.active 
                  ? "bg-primary text-primary-foreground shadow-elegant" 
                  : "hover:bg-muted"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          ))}
        </div>
      </nav>
    </div>
  );
}