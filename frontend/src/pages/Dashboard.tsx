import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Calendar as CalendarIcon, BarChart3, Award, Clock, CheckCircle, AlertCircle, BookOpen, Users, MessageSquare, Lightbulb } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import BottomNav from "@/components/BottomNav";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/components/Logo";

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [date, setDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState("overview");
  
  // Class and subject selection state
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  
  // Notifications state
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New resource available", message: "Check out the latest classroom management techniques", time: "2 hours ago", type: "info", isRead: false },
    { id: 2, title: "Deadline reminder", message: "Your lesson plan is due in 3 days", time: "1 day ago", type: "warning", isRead: false },
    { id: 3, title: "Coach feedback received", message: "Your reflection has been reviewed by your coach", time: "2 days ago", type: "success", isRead: false },
    { id: 4, title: "Peer comment", message: "Someone commented on your reflection", time: "3 days ago", type: "info", isRead: false },
  ]);
  
  // Mark all notifications as read
  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, isRead: true })));
  };
  
  // Class categories and their subjects mapping
  const classCategories = {
    "primary": {
      name: "Primary Classes (1-5)",
      classes: [
        { id: "1", name: "Class 1", subjects: ["maths", "hindi", "science", "evs", "english"] },
        { id: "2", name: "Class 2", subjects: ["maths", "hindi", "science", "evs", "english"] },
        { id: "3", name: "Class 3", subjects: ["maths", "hindi", "science", "evs", "english"] },
        { id: "4", name: "Class 4", subjects: ["maths", "hindi", "science", "evs", "english"] },
        { id: "5", name: "Class 5", subjects: ["maths", "hindi", "science", "evs", "english"] }
      ]
    },
    "secondary": {
      name: "Secondary Classes (6-10)",
      classes: [
        { id: "6", name: "Class 6", subjects: ["maths", "hindi", "science", "social", "english"] },
        { id: "7", name: "Class 7", subjects: ["maths", "hindi", "science", "social", "english"] },
        { id: "8", name: "Class 8", subjects: ["maths", "hindi", "science", "social", "english"] },
        { id: "9", name: "Class 9", subjects: ["maths", "hindi", "science", "social", "english"] },
        { id: "10", name: "Class 10", subjects: ["maths", "hindi", "science", "social", "english"] }
      ]
    },
    "seniorSecondary": {
      name: "Senior Secondary (11-12)",
      classes: [
        { id: "11", name: "Class 11", subjects: ["maths", "physics", "chemistry", "biology", "english", "computer_science", "economics", "history", "geography"] },
        { id: "12", name: "Class 12", subjects: ["maths", "physics", "chemistry", "biology", "english", "computer_science", "economics", "history", "geography"] }
      ]
    }
  };
  
  // Get available classes based on selected category
  const availableClasses = selectedCategory ? classCategories[selectedCategory as keyof typeof classCategories].classes : [];
  
  // Get available subjects based on selected class
  const availableSubjects = selectedClass ? 
    availableClasses.find(cls => cls.id === selectedClass)?.subjects || [] : [];
  
  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedClass("");
    setSelectedSubject("");
  };
  
  // Handle class change
  const handleClassChange = (className: string) => {
    setSelectedClass(className);
    setSelectedSubject("");
  };
  
  // Mock data for demonstration
  const upcomingTasks = [
    { id: 1, title: "Complete lesson plan for next week", dueDate: "2026-01-15", type: "planner", priority: "high" },
    { id: 2, title: "Submit monthly reflection", dueDate: "2026-01-18", type: "reflection", priority: "medium" },
    { id: 3, title: "Attend coaching session", dueDate: "2026-01-20", type: "coaching", priority: "high" },
    { id: 4, title: "Review peer feedback", dueDate: "2026-01-22", type: "peer", priority: "medium" },
  ];

  const certificationProgress = [
    { name: "Classroom Management", progress: 75, badges: 3 },
    { name: "Effective Teaching Strategies", progress: 50, badges: 2 },
    { name: "Student Engagement", progress: 90, badges: 4 },
    { name: "Assessment & Feedback", progress: 30, badges: 1 },
  ];

  const reflectionThemes = [
    { theme: "Classroom Engagement", count: 12, sentiment: "positive" },
    { theme: "Student Progress", count: 8, sentiment: "neutral" },
    { theme: "Teaching Strategies", count: 15, sentiment: "positive" },
    { theme: "Time Management", count: 6, sentiment: "negative" },
  ];

  return (
    <div className="app-container pb-24 bg-gradient-to-b from-background to-background/95">
      {/* Header with Gradient */}
      <header className="px-5 pt-12 pb-8 bg-gradient-to-r from-primary to-primary/80 rounded-b-3xl shadow-lg animate-gradient">
        {/* Logo and App Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Logo size="md" backgroundColor="bg-white/15" textColor="text-white" className="backdrop-blur-md shadow-lg border border-white/20 animate-float" />
            <div>
              <h1 className="text-2xl font-bold text-white">
                GuruVani
              </h1>
              <p className="text-white/90 text-sm">Teaching Coach</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-white/15 text-white hover:bg-white/25 transition-all duration-300 relative"
              onClick={() => { /* Notification panel functionality to be added */ }}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
            <ThemeToggle />
          </div>
        </div>
        
        {/* Welcome Message */}
        <div className="text-white space-y-2">
          <h2 className="text-xl font-semibold">
            Welcome back, Sunita!
          </h2>
          <p className="text-white/80 text-sm">
            Your personalized support space for teaching development
          </p>
        </div>
      </header>

      {/* Class & Subject Selection */}
      <section className="px-5 -mt-4 mb-6">
        <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 border-border">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="text-base font-semibold text-foreground">Select Class & Subject</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Category Selection */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Education Level</label>
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="rounded-xl h-12">
                    <SelectValue placeholder="Choose level" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(classCategories).map(([key, category]) => (
                      <SelectItem key={key} value={key}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Class Selection */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Class</label>
                <Select value={selectedClass} onValueChange={handleClassChange} disabled={!selectedCategory}>
                  <SelectTrigger className="rounded-xl h-12">
                    <SelectValue placeholder="Choose class" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableClasses.map(cls => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Subject Selection */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Subject</label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject} disabled={!selectedClass}>
                  <SelectTrigger className="rounded-xl h-12">
                    <SelectValue placeholder="Choose subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSubjects.map(subject => (
                      <SelectItem key={subject} value={subject}>
                        {subject.charAt(0).toUpperCase() + subject.slice(1).replace('_', ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Proceed Button */}
            <Button 
              className="w-full rounded-xl h-12 bg-primary hover:bg-primary/90 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg mt-4"
              disabled={!selectedSubject}
              onClick={() => navigate("/classroom-help")}
            >
              Proceed
            </Button>
          </CardContent>
        </Card>
      </section>
      
      {/* Quick Actions Section */}
      <section className="px-5 -mt-4 mb-6 animate-fade-in-up-delay-3">
        <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="h-6 w-1 bg-primary rounded-full"></span>
          Quick Actions
        </h2>
        
        {/* Action Cards */}
        <div className="grid grid-cols-2 gap-3">
          {/* Peer Wisdom */}
          <button
            onClick={() => navigate("/peer-wisdom")}
            className="bg-card rounded-xl shadow-lg p-4 border border-border hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 flex flex-col items-center gap-3 hover:border-primary/50 animate-scale-hover"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">{t.nav.peerWisdom}</span>
          </button>
          
          {/* Daily Reflection */}
          <button
            onClick={() => navigate("/daily-reflection")}
            className="bg-card rounded-xl shadow-lg p-4 border border-border hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 flex flex-col items-center gap-3 hover:border-primary/50 animate-scale-hover"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">{t.nav.dailyReflection}</span>
          </button>
          
          {/* Parent Bridge */}
          <button
            onClick={() => navigate("/parent-bridge")}
            className="bg-card rounded-xl shadow-lg p-4 border border-border hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 flex flex-col items-center gap-3 hover:border-primary/50 animate-scale-hover"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">Parent Bridge</span>
          </button>
          
          {/* Activity Generator */}
          <button
            onClick={() => navigate("/activity-generator")}
            className="bg-card rounded-xl shadow-lg p-4 border border-border hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 flex flex-col items-center gap-3 hover:border-primary/50 animate-scale-hover"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">Activity Generator</span>
          </button>
        </div>
      </section>
      
      {/* Main Content */}
      <main className="px-5 -mt-4">
        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-6 bg-card shadow-lg rounded-xl p-1 border border-border">
            <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="tasks" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">Tasks</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Removed Stats Cards */}

            {/* Upcoming Tasks */}
            <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Upcoming Tasks</CardTitle>
                  <Button variant="ghost" size="sm" className="text-primary" onClick={() => setActiveTab('tasks')}>
                    View All
                  </Button>
                </div>
                <CardDescription>Stay on top of your professional development tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  <div className="space-y-3">
                    {upcomingTasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${task.priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>
                            <Clock className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">{task.title}</div>
                            <div className="text-xs text-muted-foreground">Due: {task.dueDate}</div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">{task.type}</Badge>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
                  <Button variant="ghost" size="sm" className="text-primary" onClick={handleMarkAllRead}>
                    Mark All Read
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                        <div className="flex items-start gap-3">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${notification.type === 'success' ? 'bg-green-100 text-green-600' : notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'}`}>
                            {notification.type === 'success' ? <CheckCircle className="h-4 w-4" /> : notification.type === 'warning' ? <AlertCircle className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{notification.title}</div>
                            <div className="text-xs text-muted-foreground mt-1">{notification.message}</div>
                            <div className="text-xs text-muted-foreground mt-1">{notification.time}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks">
            <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Task Management Center</CardTitle>
                <CardDescription>Manage your professional development tasks and deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Calendar */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Calendar</h3>
                    <Card className="border-border">
                      <CardContent className="p-4">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="rounded-md"
                        />
                      </CardContent>
                    </Card>
                  </div>

                  {/* To-Do List */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-muted-foreground">To-Do List</h3>
                      <Button variant="ghost" size="sm" className="text-primary">+ Add Task</Button>
                    </div>
                    <Card className="border-border">
                      <CardContent className="p-0">
                        <ScrollArea className="h-[300px]">
                          <div className="space-y-1">
                            {upcomingTasks.map((task) => (
                              <div key={task.id} className="flex items-center justify-between p-3 border-b border-border/50 hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-3">
                                  <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" />
                                  <div>
                                    <div className="font-medium text-sm">{task.title}</div>
                                    <div className="text-xs text-muted-foreground">Due: {task.dueDate}</div>
                                  </div>
                                </div>
                                <Badge variant="secondary" className="text-xs">{task.type}</Badge>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reflections Tab */}
          <TabsContent value="reflections">
            <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Reflection Analysis</CardTitle>
                <CardDescription>Insights from your past reflections</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Theme Analysis */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Common Themes</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {reflectionThemes.map((item, index) => (
                      <Card key={index} className="border-border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-medium text-sm">{item.theme}</div>
                            <Badge variant={item.sentiment === 'positive' ? 'default' : item.sentiment === 'negative' ? 'destructive' : 'secondary'} className="text-xs">
                              {item.sentiment}
                            </Badge>
                          </div>
                          <Progress value={item.count / 15 * 100} className="h-2" />
                          <div className="text-xs text-muted-foreground mt-1">{item.count} reflections</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Word Cloud Placeholder */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Key Terms</h3>
                  <Card className="border-border">
                    <CardContent className="p-6">
                      <div className="flex flex-wrap justify-center gap-3 text-center">
                        <span className="text-2xl font-bold text-primary">engagement</span>
                        <span className="text-xl text-primary/80">students</span>
                        <span className="text-lg text-primary/70">strategies</span>
                        <span className="text-xl text-primary/90">learning</span>
                        <span className="text-base text-primary/60">progress</span>
                        <span className="text-lg text-primary/80">classroom</span>
                        <span className="text-2xl font-bold text-primary/95">teaching</span>
                        <span className="text-base text-primary/70">feedback</span>
                        <span className="text-xl text-primary/85">activities</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sentiment Trend */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Sentiment Trend</h3>
                  <Card className="border-border">
                    <CardContent className="p-6">
                      <div className="h-[200px] flex items-end justify-around gap-2">
                        {[65, 75, 60, 80, 70, 90].map((value, index) => (
                          <div key={index} className="flex flex-col items-center gap-2">
                            <div className="w-12 bg-primary/80 rounded-t-lg transition-all duration-300 hover:bg-primary" style={{ height: `${value}%` }}></div>
                            <span className="text-xs text-muted-foreground">W{index + 1}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Certifications Tab */}
          <TabsContent value="certifications">
            <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Certification Progress</CardTitle>
                <CardDescription>Track your progress towards earning certifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {certificationProgress.map((cert, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Award className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">{cert.name}</div>
                            <div className="text-xs text-muted-foreground">{cert.badges} badges earned</div>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-primary">{cert.progress}%</span>
                      </div>
                      <Progress value={cert.progress} className="h-3 rounded-full" />
                    </div>
                  ))}

                  {/* Badges Display */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Your Badges</h3>
                    <div className="flex flex-wrap gap-3">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((badge) => (
                        <div key={badge} className="flex flex-col items-center gap-1">
                          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shadow-sm">
                            <Award className="h-8 w-8 text-primary" />
                          </div>
                          <span className="text-xs text-muted-foreground">Badge {badge}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  );
};

export default Dashboard;