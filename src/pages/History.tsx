import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Download, Filter, Search } from "lucide-react";

// Extended mock data
const mockHistory = [
  {
    id: 1,
    timestamp: "2024-01-20 14:30",
    imageName: "eye_sample_001.jpg",
    grade: 2,
    confidence: 0.87,
    patientId: "P001",
    thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop"
  },
  {
    id: 2,
    timestamp: "2024-01-20 10:15",
    imageName: "eye_sample_002.jpg", 
    grade: 1,
    confidence: 0.92,
    patientId: "P002",
    thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop"
  },
  {
    id: 3,
    timestamp: "2024-01-19 16:45",
    imageName: "eye_sample_003.jpg",
    grade: 0,
    confidence: 0.95,
    patientId: "P003",
    thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop"
  },
  {
    id: 4,
    timestamp: "2024-01-19 09:20",
    imageName: "eye_sample_004.jpg",
    grade: 3,
    confidence: 0.89,
    patientId: "P004",
    thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop"
  },
  {
    id: 5,
    timestamp: "2024-01-18 15:30",
    imageName: "eye_sample_005.jpg",
    grade: 1,
    confidence: 0.94,
    patientId: "P005",
    thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop"
  }
];

const getGradeInfo = (grade: number) => {
  const gradeMap = {
    0: { label: "Normal", color: "bg-grade-0" },
    1: { label: "Mild", color: "bg-grade-1" },
    2: { label: "Moderate", color: "bg-grade-2" },
    3: { label: "Severe", color: "bg-grade-3" }
  };
  return gradeMap[grade as keyof typeof gradeMap] || gradeMap[0];
};

const History = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");

  const filteredHistory = mockHistory.filter(item => {
    const matchesSearch = item.imageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.patientId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = gradeFilter === "all" || item.grade.toString() === gradeFilter;
    return matchesSearch && matchesGrade;
  }).sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    } else if (sortBy === "oldest") {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    } else if (sortBy === "grade") {
      return b.grade - a.grade;
    }
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analysis History</h1>
        <p className="text-muted-foreground">View and manage all your gland dysfunction analyses</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by filename or patient ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Grade Filter</label>
              <Select value={gradeFilter} onValueChange={setGradeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All grades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="0">Grade 0 (Normal)</SelectItem>
                  <SelectItem value="1">Grade 1 (Mild)</SelectItem>
                  <SelectItem value="2">Grade 2 (Moderate)</SelectItem>
                  <SelectItem value="3">Grade 3 (Severe)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="grade">Grade (High to Low)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle>Results ({filteredHistory.length})</CardTitle>
          <CardDescription>
            {filteredHistory.length} of {mockHistory.length} analyses shown
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredHistory.map((item) => {
              const gradeInfo = getGradeInfo(item.grade);
              return (
                <div key={item.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.thumbnail}
                      alt="Eye analysis thumbnail"
                      className="w-16 h-16 rounded-lg object-cover border"
                    />
                    <div className="space-y-1">
                      <h4 className="font-medium">{item.imageName}</h4>
                      <p className="text-sm text-muted-foreground">Patient: {item.patientId}</p>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{item.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <Badge 
                        className={`${gradeInfo.color} text-white border-0 mb-1`}
                      >
                        Grade {item.grade} - {gradeInfo.label}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {(item.confidence * 100).toFixed(0)}% confidence
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {filteredHistory.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No analyses found matching your filters.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default History;