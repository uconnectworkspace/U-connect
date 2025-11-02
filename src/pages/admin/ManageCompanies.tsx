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

const ManageCompanies = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const companies = [
    { id: 1, name: "บริษัท เทคโนโลยี A", email: "contact@tech-a.com", industry: "เทคโนโลยี", jobs: 45, hires: 38, status: "active" },
    { id: 2, name: "บริษัท การเงิน B", email: "hr@finance-b.com", industry: "การเงิน", jobs: 32, hires: 28, status: "active" },
    { id: 3, name: "บริษัท Consulting C", email: "info@consult-c.com", industry: "ที่ปรึกษา", jobs: 28, hires: 24, status: "active" },
    { id: 4, name: "บริษัท Startup D", email: "join@startup-d.com", industry: "สตาร์ทอัพ", jobs: 12, hires: 8, status: "pending" },
    { id: 5, name: "บริษัท Scam Inc.", email: "fake@scam.com", industry: "ไม่ระบุ", jobs: 2, hires: 0, status: "banned" },
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

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || company.status === filterStatus;
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
          <h1 className="text-3xl font-bold mb-2">จัดการบริษัท 🏢</h1>
          <p className="text-muted-foreground">ดูและจัดการข้อมูลบริษัทพาร์ทเนอร์ทั้งหมด</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-3xl font-bold mb-1 text-green-600">142</p>
              <p className="text-sm text-muted-foreground">อนุมัติแล้ว</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-3xl font-bold mb-1 text-yellow-600">18</p>
              <p className="text-sm text-muted-foreground">รออนุมัติ</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-3xl font-bold mb-1 text-red-600">6</p>
              <p className="text-sm text-muted-foreground">ถูกระงับ</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-3xl font-bold mb-1">166</p>
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
                  placeholder="ค้นหาด้วยชื่อบริษัท, อีเมล, หรือประเภทธุรกิจ..."
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

        {/* Companies Table */}
        <Card>
          <CardHeader>
            <CardTitle>รายชื่อบริษัท</CardTitle>
            <CardDescription>พบ {filteredCompanies.length} รายการ</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ชื่อบริษัท</TableHead>
                  <TableHead>อีเมล</TableHead>
                  <TableHead>ประเภทธุรกิจ</TableHead>
                  <TableHead>ตำแหน่งงาน</TableHead>
                  <TableHead>การจ้างงาน</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead className="text-right">การดำเนินการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCompanies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell className="font-medium">{company.name}</TableCell>
                    <TableCell>{company.email}</TableCell>
                    <TableCell>{company.industry}</TableCell>
                    <TableCell>{company.jobs}</TableCell>
                    <TableCell>{company.hires}</TableCell>
                    <TableCell>{getStatusBadge(company.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {company.status === "active" && (
                          <Button size="sm" variant="ghost" className="text-red-600">
                            <Ban className="h-4 w-4" />
                          </Button>
                        )}
                        {company.status === "banned" && (
                          <Button size="sm" variant="ghost" className="text-green-600">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        {company.status === "pending" && (
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

export default ManageCompanies;
