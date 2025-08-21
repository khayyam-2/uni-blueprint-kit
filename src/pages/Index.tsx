import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { StatsCard } from "@/components/StatsCard";
import { RecentActivity } from "@/components/RecentActivity";
import { QuickActions } from "@/components/QuickActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  TrendingUp,
  Calendar,
  DollarSign
} from "lucide-react";
import universityHero from "@/assets/university-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6 space-y-6">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-lg bg-card">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${universityHero})` }}
              />
              <div className="relative bg-gradient-to-r from-primary to-accent p-8 text-primary-foreground">
                <div className="max-w-2xl">
                  <h1 className="text-4xl font-bold mb-4">
                    University Management System
                  </h1>
                  <p className="text-lg opacity-90 mb-6">
                    Streamline your academic operations with our comprehensive management platform. 
                    Monitor students, faculty, courses, and analytics all in one place.
                  </p>
                  <div className="flex gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">2,847</div>
                      <div className="text-sm opacity-75">Total Students</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">156</div>
                      <div className="text-sm opacity-75">Faculty Members</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">89</div>
                      <div className="text-sm opacity-75">Active Courses</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Students"
                value="2,847"
                change="+12% from last month"
                changeType="positive"
                icon={Users}
              />
              <StatsCard
                title="Faculty Members"
                value="156"
                change="+3 new this month"
                changeType="positive"
                icon={GraduationCap}
              />
              <StatsCard
                title="Active Courses"
                value="89"
                change="5 starting next week"
                changeType="neutral"
                icon={BookOpen}
              />
              <StatsCard
                title="Revenue"
                value="$284.7k"
                change="+8% from last month"
                changeType="positive"
                icon={DollarSign}
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <RecentActivity />
              </div>
              
              {/* Quick Actions */}
              <div>
                <QuickActions />
              </div>
            </div>

            {/* Additional Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-semibold">Upcoming Events</CardTitle>
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-primary rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Faculty Meeting</p>
                      <p className="text-xs text-muted-foreground">Today, 2:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-accent rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Student Orientation</p>
                      <p className="text-xs text-muted-foreground">Tomorrow, 10:00 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Exam Schedule Release</p>
                      <p className="text-xs text-muted-foreground">Friday, 9:00 AM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-semibold">Performance Metrics</CardTitle>
                  <TrendingUp className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Student Satisfaction</span>
                      <span className="font-medium">94%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Course Completion</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '87%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Faculty Engagement</span>
                      <span className="font-medium">91%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '91%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
