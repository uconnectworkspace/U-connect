import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Eye, Ban, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const ManageUniversities = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const universities = [
    { id: 1, name: "Chulalongkorn University", email: "admin@chula.ac.th", students: 856, placements: 623, rate: 72.8, status: "active" },
    { id: 2, name: "Thammasat University", email: "admin@tu.ac.th", students: 742, placements: 518, rate: 69.8, status: "active" },
    { id: 3, name: "Kasetsart University", email: "admin@ku.ac.th", students: 689, placements: 467, rate: 67.8, status: "active" },
    { id: 4, name: "Mahidol University", email: "admin@mahidol.ac.th", students: 534, placements: 389, rate: 72.8, status: "active" },
    { id: 5, name: "Suranaree University of Technology", email: "admin@sut.ac.th", students: 423, placements: 298, rate: 70.4, status: "pending" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "banned":
        return <Badge variant="destructive">Suspended</Badge>;
      case "pending":
        return <Badge variant="outline" className="text-yellow-600">Pending Approval</Badge>;
      default:
        return null;
    }
  };

  const filteredUniversities = universities.filter(university => {
    const matchesSearch = university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         university.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || university.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/admin/dashboard')} className="mb-4">
            ← Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold mb-2">Manage Universities 🏛️</h1>
          <p className="text-muted-foreground">View and manage all partner university data</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-3xl font-bold mb-1 text-green-600">21</p>
              <p className="text-sm text-muted-foreground">Approved</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-3xl font-bold mb-1 text-yellow-600">5</p>
              <p className="text-sm text-muted-foreground">Pending Approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-3xl font-bold mb-1 text-red-600">1</p>
              <p className="text-sm text-muted-foreground">Suspended</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-3xl font-bold mb-1">27</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search and Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by university name or email..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Approved</SelectItem>
                  <SelectItem value="pending">Pending Approval</SelectItem>
                  <SelectItem value="banned">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Universities Table */}
        <Card>
          <CardHeader>
            <CardTitle>University List</CardTitle>
            <CardDescription>Found {filteredUniversities.length} records</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>University Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Successful Placements</TableHead>
                  <TableHead>Success Rate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUniversities.map((university) => (
                  <TableRow key={university.id}>
                    <TableCell className="font-medium">{university.name}</TableCell>
                    <TableCell>{university.email}</TableCell>
                    <TableCell>{university.students}</TableCell>
                    <TableCell>{university.placements}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-green-600">
                        {university.rate}%
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(university.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {university.status === "active" && (
                          <Button size="sm" variant="ghost" className="text-red-600">
                            <Ban className="h-4 w-4" />
                          </Button>
                        )}
                        {university.status === "banned" && (
                          <Button size="sm" variant="ghost" className="text-green-600">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        {university.status === "pending" && (
                          <>
                            <Button size="sm" variant="ghost" className="text-green-600">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-red-600">
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManageUniversities;
