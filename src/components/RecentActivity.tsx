import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const recentActivities = [
  {
    id: 1,
    type: "enrollment",
    user: "Sarah Johnson",
    avatar: "/placeholder-avatar.jpg",
    action: "enrolled in Advanced Mathematics",
    time: "2 hours ago",
    status: "success"
  },
  {
    id: 2,
    type: "grade",
    user: "Prof. Michael Chen",
    avatar: "/placeholder-avatar.jpg",
    action: "submitted grades for Physics 101",
    time: "4 hours ago",
    status: "info"
  },
  {
    id: 3,
    type: "attendance",
    user: "Emma Davis",
    avatar: "/placeholder-avatar.jpg",
    action: "marked present for Chemistry Lab",
    time: "6 hours ago",
    status: "success"
  },
  {
    id: 4,
    type: "fee",
    user: "James Wilson",
    avatar: "/placeholder-avatar.jpg",
    action: "paid semester fees",
    time: "1 day ago",
    status: "success"
  },
  {
    id: 5,
    type: "alert",
    user: "System",
    avatar: "/placeholder-avatar.jpg",
    action: "Low attendance alert for Computer Science",
    time: "2 days ago",
    status: "warning"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "success": return "bg-accent/10 text-accent";
    case "warning": return "bg-yellow-100 text-yellow-800";
    case "info": return "bg-primary/10 text-primary";
    default: return "bg-muted text-muted-foreground";
  }
};

export function RecentActivity() {
  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={activity.avatar} alt={activity.user} />
              <AvatarFallback className="text-xs">
                {activity.user.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">{activity.user}</p>
                <Badge 
                  variant="secondary" 
                  className={getStatusColor(activity.status)}
                >
                  {activity.type}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{activity.action}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}