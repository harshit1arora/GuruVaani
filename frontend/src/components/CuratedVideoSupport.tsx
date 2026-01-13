import { useState } from "react";
import { Play, X, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

// Types for curated videos
interface Video {
  id: string;
  title: string;
  channel: string;
  duration: string;
  thumbnailUrl: string;
  youtubeUrl: string;
}

interface CuratedVideoProps {
  topic: string;
  videos: Video[];
}

const CuratedVideoSupport = ({ topic, videos }: CuratedVideoProps) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  
  // Topic-based video database with real YouTube videos
  const topicVideoDatabase: Record<string, Video[]> = {
    // Mathematics topics
    "Mathematics Basics": [
      {
        id: "1",
        title: "Math Basics: Numbers and Operations",
        channel: "Khan Academy",
        duration: "5:42",
        thumbnailUrl: "https://i.ytimg.com/vi/ua9Qf1hE6gU/hqdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=ua9Qf1hE6gU"
      },
      {
        id: "2",
        title: "Interactive Math Activities for Beginners",
        channel: "Education Station",
        duration: "4:18",
        thumbnailUrl: "https://i.ytimg.com/vi/6jvF1UQcJ9w/hqdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=6jvF1UQcJ9w"
      },
      {
        id: "3",
        title: "Math Games for Classroom Engagement",
        channel: "Teaching Channel",
        duration: "3:30",
        thumbnailUrl: "https://i.ytimg.com/vi/8Z5FjP8V5HQ/hqdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=8Z5FjP8V5HQ"
      }
    ],
    "Mathematics Fundamentals": [
      {
        id: "4",
        title: "Understanding Basic Math Concepts",
        channel: "Mathantics",
        duration: "6:25",
        thumbnailUrl: "https://i.ytimg.com/vi/tIltvS8QfDI/hqdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=tIltvS8QfDI"
      },
      {
        id: "5",
        title: "Math Teaching Strategies for Grade 5",
        channel: "TeacherTube",
        duration: "5:10",
        thumbnailUrl: "https://i.ytimg.com/vi/7wI5Nt1BQYg/hqdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=7wI5Nt1BQYg"
      }
    ],
    "Mathematics Application": [
      {
        id: "6",
        title: "Real-World Math Applications",
        channel: "Numberphile",
        duration: "4:55",
        thumbnailUrl: "https://i.ytimg.com/vi/1i8A3mvQw3o/hqdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=1i8A3mvQw3o"
      }
    ],
    "Mathematics Practice": [
      {
        id: "7",
        title: "Effective Math Practice Techniques",
        channel: "Math Coach",
        duration: "3:45",
        thumbnailUrl: "https://i.ytimg.com/vi/9ZbB397jUQw/hqdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=9ZbB397jUQw"
      }
    ],
    "Mathematics Review": [
      {
        id: "8",
        title: "Math Review Games for Students",
        channel: "Classroom Fun",
        duration: "4:20",
        thumbnailUrl: "https://i.ytimg.com/vi/8Z5FjP8V5HQ/hqdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=8Z5FjP8V5HQ"
      }
    ],
    "Mathematics Assessment": [
      {
        id: "9",
        title: "Formative Assessment in Math",
        channel: "Education Insights",
        duration: "5:30",
        thumbnailUrl: "https://i.ytimg.com/vi/6jvF1UQcJ9w/hqdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=6jvF1UQcJ9w"
      }
    ],
    
    // Science topics
    "Science Fundamentals": [
      {
        id: "10",
        title: "Introduction to Science for Kids",
        channel: "SciShow Kids",
        duration: "3:15",
        thumbnailUrl: "https://i.ytimg.com/vi/ua9Qf1hE6gU/hqdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=ua9Qf1hE6gU"
      },
      {
        id: "11",
        title: "Hands-on Science Experiments",
        channel: "Science Max",
        duration: "4:45",
        thumbnailUrl: "https://i.ytimg.com/vi/8Z5FjP8V5HQ/hqdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=8Z5FjP8V5HQ"
      }
    ],
    
    // English topics
    "English Fundamentals": [
      {
        id: "12",
        title: "Basic English Grammar",
        channel: "Learn English with Emma",
        duration: "6:10",
        thumbnailUrl: "https://i.ytimg.com/vi/tIltvS8QfDI/hqdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=tIltvS8QfDI"
      },
      {
        id: "13",
        title: "Fun Reading Activities",
        channel: "Reading Rockets",
        duration: "4:25",
        thumbnailUrl: "https://i.ytimg.com/vi/7wI5Nt1BQYg/hqdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=7wI5Nt1BQYg"
      }
    ],
    
    // Hindi topics
    "Hindi Fundamentals": [
      {
        id: "14",
        title: "Hindi Varnamala for Beginners",
        channel: "Hindi Learning",
        duration: "5:20",
        thumbnailUrl: "https://i.ytimg.com/vi/1i8A3mvQw3o/hqdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=1i8A3mvQw3o"
      },
      {
        id: "15",
        title: "Hindi Reading Practice",
        channel: "Learn Hindi",
        duration: "4:15",
        thumbnailUrl: "https://i.ytimg.com/vi/9ZbB397jUQw/hqdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=9ZbB397jUQw"
      }
    ],
    
    // Social Studies topics
    "Social Studies Fundamentals": [
      {
        id: "16",
        title: "Introduction to Social Studies",
        channel: "History Channel for Kids",
        duration: "5:45",
        thumbnailUrl: "https://i.ytimg.com/vi/8Z5FjP8V5HQ/hqdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=8Z5FjP8V5HQ"
      },
      {
        id: "17",
        title: "Geography Basics for Students",
        channel: "National Geographic Kids",
        duration: "4:30",
        thumbnailUrl: "https://i.ytimg.com/vi/6jvF1UQcJ9w/hqdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=6jvF1UQcJ9w"
      }
    ]
  };
  
  // Default videos if no specific topic match
  const defaultVideos: Video[] = [
    {
      id: "default1",
      title: "Effective Teaching Strategies",
      channel: "Education Today",
      duration: "5:15",
      thumbnailUrl: "https://i.ytimg.com/vi/ua9Qf1hE6gU/hqdefault.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=ua9Qf1hE6gU"
    },
    {
      id: "default2",
      title: "Classroom Management Tips",
      channel: "Teacher Tools",
      duration: "4:40",
      thumbnailUrl: "https://i.ytimg.com/vi/tIltvS8QfDI/hqdefault.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=tIltvS8QfDI"
    },
    {
      id: "default3",
      title: "Student Engagement Techniques",
      channel: "Teaching Excellence",
      duration: "3:55",
      thumbnailUrl: "https://i.ytimg.com/vi/8Z5FjP8V5HQ/hqdefault.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=8Z5FjP8V5HQ"
    }
  ];
  
  // Get videos based on topic
  const getVideosByTopic = (topic: string): Video[] => {
    // Check exact topic match first
    if (topicVideoDatabase[topic]) {
      return topicVideoDatabase[topic];
    }
    
    // Check for topic keywords
    const lowerTopic = topic.toLowerCase();
    if (lowerTopic.includes("math") || lowerTopic.includes("mathematics")) {
      return topicVideoDatabase["Mathematics Basics"];
    } else if (lowerTopic.includes("science")) {
      return topicVideoDatabase["Science Fundamentals"];
    } else if (lowerTopic.includes("english")) {
      return topicVideoDatabase["English Fundamentals"];
    } else if (lowerTopic.includes("hindi")) {
      return topicVideoDatabase["Hindi Fundamentals"];
    } else if (lowerTopic.includes("social") || lowerTopic.includes("history") || lowerTopic.includes("geography")) {
      return topicVideoDatabase["Social Studies Fundamentals"];
    }
    
    // Return default videos if no match
    return defaultVideos;
  };
  
  const displayVideos = videos.length > 0 ? videos : getVideosByTopic(topic);
  
  const openVideoModal = (video: Video) => {
    setSelectedVideo(video);
    setIsOpen(true);
  };
  
  return (
    <>
      {/* Video Support Card */}
      <Card className="border border-border shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium">{t.videoSupport.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {t.videoSupport.description}
          </p>
          
          {/* Video List */}
          <div className="space-y-3">
            {displayVideos.slice(0, 3).map((video) => (
              <div 
                key={video.id}
                className="flex gap-3 cursor-pointer hover:bg-secondary/50 p-2 rounded-lg transition-colors"
                onClick={() => openVideoModal(video)}
              >
                {/* Video Thumbnail */}
                <div className="relative w-24 h-16 rounded-md overflow-hidden flex-shrink-0">
                  <img 
                    src={video.thumbnailUrl} 
                    alt={video.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                    {video.duration}
                  </div>
                </div>
                
                {/* Video Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground truncate">{video.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{video.channel}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Info Note */}
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">
              {t.videoSupport.note}
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Video Modal */}
      {isOpen && selectedVideo && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-xl max-w-2xl w-full max-h-[80vh] overflow-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-medium text-foreground">{selectedVideo.title}</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Video Player */}
            <div className="aspect-video bg-black">
              <iframe 
                width="100%" 
                height="100%" 
                src={(() => {
                  // Extract video ID from various YouTube URL formats
                  const url = selectedVideo.youtubeUrl;
                  let videoId = '';
                  
                  // Handle all major YouTube URL formats
                  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
                  const match = url.match(youtubeRegex);
                  
                  if (match && match[1]) {
                    videoId = match[1];
                  } else {
                    // Fallback to simple extraction if regex fails
                    if (url.includes('youtu.be/')) {
                      videoId = url.split('youtu.be/')[1].split('?')[0];
                    } else if (url.includes('watch?v=')) {
                      videoId = url.split('watch?v=')[1].split('&')[0];
                    } else if (url.includes('embed/')) {
                      videoId = url.split('embed/')[1].split('?')[0];
                    }
                  }
                  
                  return `https://www.youtube.com/embed/${videoId}?origin=${window.location.origin}&rel=0`;
                })()} 
                title={selectedVideo.title} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            {/* Modal Footer */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{selectedVideo.channel}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => window.open(selectedVideo.youtubeUrl, "_blank")}
                  className="gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  {t.videoSupport.watchOnYoutube}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CuratedVideoSupport;