import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Clock, TrendingUp, Activity } from "lucide-react";

// Mock data for demonstration
const mockPredictions = [
  {
    id: 1,
    timestamp: "2024-01-20 14:30",
    imageName: "eye_sample_001.jpg",
    grade: 2,
    confidence: 0.87,
    thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop"
  },
  {
    id: 2,
    timestamp: "2024-01-20 10:15",
    imageName: "eye_sample_002.jpg", 
    grade: 1,
    confidence: 0.92,
    thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop"
  },
  {
    id: 3,
    timestamp: "2024-01-19 16:45",
    imageName: "eye_sample_003.jpg",
    grade: 0,
    confidence: 0.95,
    thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop"
  }
];

const getGradeInfo = (grade: number) => {
  const gradeMap = {
    0: { label: "Normal", color: "bg-grade-0", desc: "No dysfunction" },
    1: { label: "Mild", color: "bg-grade-1", desc: "Mild gland dropout" },
    2: { label: "Moderate", color: "bg-grade-2", desc: "Moderate dysfunction" },
    3: { label: "Severe", color: "bg-grade-3", desc: "Severe gland dropout" }
  };
  return gradeMap[grade as keyof typeof gradeMap] || gradeMap[0];
};

const Dashboard = () => {
  const totalPredictions = mockPredictions.length;
  const avgGrade = mockPredictions.reduce((sum, p) => sum + p.grade, 0) / totalPredictions;
  const avgConfidence = mockPredictions.reduce((sum, p) => sum + p.confidence, 0) / totalPredictions;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your gland dysfunction analysis</p>
        </div>
        <Button className="flex items-center space-x-2">
          <TrendingUp className="h-4 w-4" />
          <span>Generate Report</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <Eye className="h-4 w-4 text-primary" />
              <span>Total Analyses</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPredictions}</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <Activity className="h-4 w-4 text-primary" />
              <span>Average Grade</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgGrade.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Based on recent analyses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span>Avg Confidence</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(avgConfidence * 100).toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">Model prediction confidence</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Recent Predictions</span>
          </CardTitle>
          <CardDescription>
            Latest gland dysfunction analyses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockPredictions.map((prediction) => {
              const gradeInfo = getGradeInfo(prediction.grade);
              return (
                <div key={prediction.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <img
                      src={prediction.thumbnail}
                      alt="Eye image thumbnail"
                      className="w-16 h-16 rounded-lg object-cover border"
                    />
                    <div>
                      <h4 className="font-medium">{prediction.imageName}</h4>
                      <p className="text-sm text-muted-foreground">{prediction.timestamp}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge 
                          className={`${gradeInfo.color} text-white border-0`}
                        >
                          Grade {prediction.grade} - {gradeInfo.label}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {(prediction.confidence * 100).toFixed(0)}% confidence
                        </span>
                      </div>
                    </div>
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
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;