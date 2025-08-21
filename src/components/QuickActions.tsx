import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  UserPlus, 
  BookPlus, 
  Calendar,
  FileText,
  Download,
  Mail
} from "lucide-react";

const quickActions = [
  {
    icon: UserPlus,
    label: "Add Student",
    description: "Register new student",
    color: "bg-primary"
  },
  {
    icon: BookPlus,
    label: "Create Course",
    description: "Add new course",
    color: "bg-accent"
  },
  {
    icon: Calendar,
    label: "Schedule Class",
    description: "Add to timetable",
    color: "bg-blue-500"
  },
  {
    icon: FileText,
    label: "Generate Report",
    description: "Create analytics report",
    color: "bg-purple-500"
  },
  {
    icon: Download,
    label: "Export Data",
    description: "Download student data",
    color: "bg-orange-500"
  },
  {
    icon: Mail,
    label: "Send Notice",
    description: "Broadcast announcement",
    color: "bg-green-500"
  }
];

export function QuickActions() {
  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              className="h-auto p-4 flex-col items-start gap-2 transition-smooth hover:shadow-card hover:scale-105"
            >
              <div className={`flex h-8 w-8 items-center justify-center rounded-md ${action.color}`}>
                <action.icon className="h-4 w-4 text-white" />
              </div>
              <div className="text-left">
                <p className="font-medium text-sm">{action.label}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}