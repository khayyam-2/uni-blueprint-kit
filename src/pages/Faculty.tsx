import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { UserPlus, Search, Filter, Mail, Phone, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockFaculty = [
  {
    id: "FAC001",
    name: "Dr. Alice Thompson",
    email: "alice.thompson@university.edu",
    department: "Computer Science",
    position: "Professor",
    phone: "+1 (555) 123-4567",
    courses: ["Data Structures", "Algorithms"],
    experience: "15 years",
    status: "Active"
  },
  {
    id: "FAC002",
    name: "Prof. Robert Smith",
    email: "robert.smith@university.edu", 
    department: "Business Administration",
    position: "Associate Professor",
    phone: "+1 (555) 234-5678",
    courses: ["Marketing", "Finance"],
    experience: "10 years",
    status: "Active"
  },
  {
    id: "FAC003",
    name: "Dr. Maria Garcia",
    email: "maria.garcia@university.edu",
    department: "Psychology", 
    position: "Assistant Professor",
    phone: "+1 (555) 345-6789",
    courses: ["Cognitive Psychology", "Research Methods"],
    experience: "7 years", 
    status: "Active"
  },
  {
    id: "FAC004",
    name: "Prof. David Lee",
    email: "david.lee@university.edu",
    department: "Engineering",
    position: "Professor",
    phone: "+1 (555) 456-7890", 
    courses: ["Mechanical Engineering", "Thermodynamics"],
    experience: "20 years",
    status: "On Leave"
  }
];

export default function Faculty() {
  const [faculty, setFaculty] = useState(mockFaculty);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const [newFaculty, setNewFaculty] = useState({
    name: "",
    email: "",
    department: "",
    position: "",
    phone: "",
  });

  const filteredFaculty = faculty.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddFaculty = () => {
    if (!newFaculty.name || !newFaculty.email || !newFaculty.department || !newFaculty.position) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const member = {
      id: `FAC${String(faculty.length + 1).padStart(3, '0')}`,
      ...newFaculty,
      courses: [],
      experience: "0 years",
      status: "Active"
    };

    setFaculty([...faculty, member]);
    setNewFaculty({ name: "", email: "", department: "", position: "", phone: "" });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success", 
      description: "Faculty member added successfully"
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-accent/10 text-accent">Active</Badge>;
      case "On Leave":
        return <Badge className="bg-yellow-100 text-yellow-800">On Leave</Badge>;
      default:
        return <Badge variant="secondary">Inactive</Badge>;
    }
  };

  const getPositionBadge = (position: string) => {
    switch (position) {
      case "Professor":
        return <Badge className="bg-primary/10 text-primary">Professor</Badge>;
      case "Associate Professor":
        return <Badge className="bg-blue-100 text-blue-800">Associate Prof.</Badge>;
      case "Assistant Professor":
        return <Badge className="bg-purple-100 text-purple-800">Assistant Prof.</Badge>;
      default:
        return <Badge variant="outline">{position}</Badge>;
    }
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
                <h1 className="text-3xl font-bold">Faculty</h1>
                <p className="text-muted-foreground">Manage faculty members and academic staff</p>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gradient-primary">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Faculty
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Faculty Member</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={newFaculty.name}
                        onChange={(e) => setNewFaculty({...newFaculty, name: e.target.value})}
                        placeholder="Dr. John Smith"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newFaculty.email}
                        onChange={(e) => setNewFaculty({...newFaculty, email: e.target.value})}
                        placeholder="faculty@university.edu"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select value={newFaculty.department} onValueChange={(value) => setNewFaculty({...newFaculty, department: value})}>
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
                      <Label htmlFor="position">Position</Label>
                      <Select value={newFaculty.position} onValueChange={(value) => setNewFaculty({...newFaculty, position: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Professor">Professor</SelectItem>
                          <SelectItem value="Associate Professor">Associate Professor</SelectItem>
                          <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                          <SelectItem value="Lecturer">Lecturer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={newFaculty.phone}
                        onChange={(e) => setNewFaculty({...newFaculty, phone: e.target.value})}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <Button onClick={handleAddFaculty} className="w-full">
                      Add Faculty Member
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">{faculty.length}</div>
                  <p className="text-sm text-muted-foreground">Total Faculty</p>
                </CardContent>
              </Card>
              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">6</div>
                  <p className="text-sm text-muted-foreground">Departments</p>
                </CardContent>
              </Card>
              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">12.5</div>
                  <p className="text-sm text-muted-foreground">Avg Experience</p>
                </CardContent>
              </Card>
              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">95%</div>
                  <p className="text-sm text-muted-foreground">Active Rate</p>
                </CardContent>
              </Card>
            </div>

            {/* Faculty Table */}
            <Card className="card-hover">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Faculty Members</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search faculty..."
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
                      <TableHead>Faculty Member</TableHead>
                      <TableHead>ID</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFaculty.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder-avatar.jpg" />
                              <AvatarFallback>
                                {member.name.split(' ').slice(-2).map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{member.name}</div>
                              <div className="text-sm text-muted-foreground flex items-center gap-2">
                                <Mail className="h-3 w-3" />
                                {member.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono">{member.id}</TableCell>
                        <TableCell>{member.department}</TableCell>
                        <TableCell>{getPositionBadge(member.position)}</TableCell>
                        <TableCell>{member.experience}</TableCell>
                        <TableCell>{getStatusBadge(member.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Phone className="h-4 w-4" />
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