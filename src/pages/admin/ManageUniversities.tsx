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
    { id: 1, name: "จุฬาลงกรณ์มหาวิทยาลัย", email: "admin@chula.ac.th", students: 856, placements: 623, rate: 72.8, status: "active" },
    { id: 2, name: "มหาวิทยาลัยธรรมศาสตร์", email: "admin@tu.ac.th", students: 742, placements: 518, rate: 69.8, status: "active" },
    { id: 3, name: "มหาวิทยาลัยเกษตรศาสตร์", email: "admin@ku.ac.th", students: 689, placements: 467, rate: 67.8, status: "active" },
    { id: 4, name: "มหาวิทยาลัยมหิดล", email: "admin@mahidol.ac.th", students: 534, placements: 389, rate: 72.8, status: "active" },
    { id: 5, name: "มหาวิทยาลัยเทคโนโลยีสุรนารี", email: "admin@sut.ac.th", students: 423, placements: 298, rate: 70.4, status: "pending" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">อนุมัติแล้ว</Badge>;
      case "banned":
        return <Badge variant="destructive">ถูกระงับ</Badge>;
      case "pending":
        return <Badge variant="outline" className="text-yellow-600">รออนุมัติ</Badge>;
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
            ← กลับไปแดชบอร์ด
          </Button>
          <h1 className="text-3xl font-bold mb-2">จัดการมหาวิทยาลัย 🏛️</h1>
          <p className="text-muted-foreground">ดูและจัดการข้อมูลมหาวิทยาลัยพาร์ทเนอร์ทั้งหมด</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-3xl font-bold mb-1 text-green-600">21</p>
              <p className="text-sm text-muted-foreground">อนุมัติแล้ว</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-3xl font-bold mb-1 text-yellow-600">5</p>
              <p className="text-sm text-muted-foreground">รออนุมัติ</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-3xl font-bold mb-1 text-red-600">1</p>
              <p className="text-sm text-muted-foreground">ถูกระงับ</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-3xl font-bold mb-1">27</p>
              <p className="text-sm text-muted-foreground">รวมทั้งหมด</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>ค้นหาและกรองข้อมูล</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="ค้นหาด้วยชื่อมหาวิทยาลัยหรืออีเมล..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="กรองสถานะ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="active">อนุมัติแล้ว</SelectItem>
                  <SelectItem value="pending">รออนุมัติ</SelectItem>
                  <SelectItem value="banned">ถูกระงับ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Universities Table */}
        <Card>
          <CardHeader>
            <CardTitle>รายชื่อมหาวิทยาลัย</CardTitle>
            <CardDescription>พบ {filteredUniversities.length} รายการ</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ชื่อมหาวิทยาลัย</TableHead>
                  <TableHead>อีเมล</TableHead>
                  <TableHead>จำนวนนักศึกษา</TableHead>
                  <TableHead>จับคู่สำเร็จ</TableHead>
                  <TableHead>อัตราความสำเร็จ</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead className="text-right">การดำเนินการ</TableHead>
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
