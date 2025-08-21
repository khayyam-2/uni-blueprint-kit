import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookPlus, Search, Filter, Users, Clock, Calendar, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockCourses = [
  {
    id: "CS101",
    title: "Introduction to Computer Science",
    department: "Computer Science",
    instructor: "Dr. Alice Thompson",
    credits: 3,
    capacity: 120,
    enrolled: 95,
    schedule: "MWF 9:00-10:00",
    semester: "Fall 2024",
    status: "Active",
    description: "Fundamental concepts of computer science and programming."
  },
  {
    id: "BUS201", 
    title: "Business Analytics",
    department: "Business Administration",
    instructor: "Prof. Robert Smith",
    credits: 3,
    capacity: 80,
    enrolled: 72,
    schedule: "TTh 2:00-3:30",
    semester: "Fall 2024",
    status: "Active",
    description: "Data analysis techniques for business decision making."
  },
  {
    id: "PSY301",
    title: "Cognitive Psychology",
    department: "Psychology",
    instructor: "Dr. Maria Garcia",
    credits: 4,
    capacity: 50,
    enrolled: 48,
    schedule: "MWF 11:00-12:00",
    semester: "Fall 2024", 
    status: "Full",
    description: "Study of mental processes including perception, memory, and thinking."
  },
  {
    id: "ENG401",
    title: "Advanced Thermodynamics",
    department: "Engineering",
    instructor: "Prof. David Lee",
    credits: 4,
    capacity: 30,
    enrolled: 0,
    schedule: "TTh 10:00-12:00",
    semester: "Fall 2024",
    status: "Cancelled",
    description: "Advanced concepts in thermodynamics and heat transfer."
  }
];

export default function Courses() {
  const [courses, setCourses] = useState(mockCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const [newCourse, setNewCourse] = useState({
    title: "",
    department: "",
    instructor: "",
    credits: "",
    capacity: "",
    schedule: "",
    description: "",
  });

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCourse = () => {
    if (!newCourse.title || !newCourse.department || !newCourse.instructor || !newCourse.credits) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const course = {
      id: `NEW${String(courses.length + 1).padStart(3, '0')}`,
      ...newCourse,
      credits: parseInt(newCourse.credits),
      capacity: parseInt(newCourse.capacity) || 50,
      enrolled: 0,
      semester: "Fall 2024",
      status: "Active"
    };

    setCourses([...courses, course]);
    setNewCourse({ title: "", department: "", instructor: "", credits: "", capacity: "", schedule: "", description: "" });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Course added successfully"
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-accent/10 text-accent">Active</Badge>;
      case "Full":
        return <Badge className="bg-yellow-100 text-yellow-800">Full</Badge>;
      case "Cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getEnrollmentPercentage = (enrolled: number, capacity: number) => {
    return Math.round((enrolled / capacity) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6 space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Courses</h1>
                <p className="text-muted-foreground">Manage course catalog and enrollment</p>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gradient-primary">
                    <BookPlus className="mr-2 h-4 w-4" />
                    Add Course
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Course</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Course Title</Label>
                      <Input
                        id="title"
                        value={newCourse.title}
                        onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                        placeholder="Introduction to Computer Science"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select value={newCourse.department} onValueChange={(value) => setNewCourse({...newCourse, department: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Computer Science">Computer Science</SelectItem>
                          <SelectItem value="Business Administration">Business Administration</SelectItem>
                          <SelectItem value="Psychology">Psychology</SelectItem>
                          <SelectItem value="Engineering">Engineering</SelectItem>
                          <SelectItem value="Mathematics">Mathematics</SelectItem>
                          <SelectItem value="Physics">Physics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instructor">Instructor</Label>
                      <Input
                        id="instructor"
                        value={newCourse.instructor}
                        onChange={(e) => setNewCourse({...newCourse, instructor: e.target.value})}
                        placeholder="Dr. John Smith"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="credits">Credits</Label>
                        <Input
                          id="credits"
                          type="number"
                          value={newCourse.credits}
                          onChange={(e) => setNewCourse({...newCourse, credits: e.target.value})}
                          placeholder="3"
                          min="1"
                          max="6"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="capacity">Capacity</Label>
                        <Input
                          id="capacity"
                          type="number"
                          value={newCourse.capacity}
                          onChange={(e) => setNewCourse({...newCourse, capacity: e.target.value})}
                          placeholder="50"
                          min="1"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="schedule">Schedule</Label>
                      <Input
                        id="schedule"
                        value={newCourse.schedule}
                        onChange={(e) => setNewCourse({...newCourse, schedule: e.target.value})}
                        placeholder="MWF 9:00-10:00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newCourse.description}
                        onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                        placeholder="Course description and objectives..."
                        rows={3}
                      />
                    </div>
                    <Button onClick={handleAddCourse} className="w-full">
                      Add Course
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">{courses.length}</div>
                  <p className="text-sm text-muted-foreground">Total Courses</p>
                </CardContent>
              </Card>
              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">{courses.filter(c => c.status === "Active").length}</div>
                  <p className="text-sm text-muted-foreground">Active Courses</p>
                </CardContent>
              </Card>
              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">{courses.reduce((acc, c) => acc + c.enrolled, 0)}</div>
                  <p className="text-sm text-muted-foreground">Total Enrolled</p>
                </CardContent>
              </Card>
              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">
                    {Math.round(courses.reduce((acc, c) => acc + c.enrolled, 0) / courses.reduce((acc, c) => acc + c.capacity, 0) * 100)}%
                  </div>
                  <p className="text-sm text-muted-foreground">Avg Capacity</p>
                </CardContent>
              </Card>
            </div>

            {/* Courses Table */}
            <Card className="card-hover">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Course Catalog</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-80"
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>Instructor</TableHead>
                      <TableHead>Credits</TableHead>
                      <TableHead>Enrollment</TableHead>
                      <TableHead>Schedule</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCourses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{course.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {course.id} • {course.department}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{course.instructor}</TableCell>
                        <TableCell className="font-medium">{course.credits}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm font-medium">
                              {course.enrolled}/{course.capacity}
                            </div>
                            <div className="w-full bg-muted rounded-full h-1.5">
                              <div 
                                className="bg-primary h-1.5 rounded-full" 
                                style={{ width: `${getEnrollmentPercentage(course.enrolled, course.capacity)}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Clock className="h-3 w-3" />
                            {course.schedule}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(course.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Users className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}