import { useState, useEffect } from "react";
import { Play, X, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { getVideoSuggestions, Video as ApiVideo } from "@/lib/api";

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
  grade: string;
  subject: string;
  topic: string;
  videos?: Video[];
  disclaimer?: string;
}

const CuratedVideoSupport = ({ grade, subject, topic, videos, disclaimer: propsDisclaimer }: CuratedVideoProps) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [fetchedVideos, setFetchedVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiDisclaimer, setApiDisclaimer] = useState("");
  
  // Real implementation using YouTube API via backend
  const fetchVideos = async (g: string, s: string, t: string) => {
    if (!g || !s || !t) return;
    
    setIsLoading(true);
    try {
      const response = await getVideoSuggestions(g, s, t);
      
      const mappedVideos = response.videos.map((v, index) => {
        // Extract video ID from URL for thumbnail
        const videoId = v.url.split('v=')[1];
        return {
          id: videoId || index.toString(),
          title: v.title,
          channel: v.channel,
          duration: v.duration,
          thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
          youtubeUrl: v.url
        };
      });
      
      setFetchedVideos(mappedVideos);
      setApiDisclaimer(response.disclaimer);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setFetchedVideos([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch videos when topic changes
  useEffect(() => {
    if (topic && grade && subject) {
      fetchVideos(grade, subject, topic);
    }
  }, [topic, grade, subject]);
  
  const displayVideos = (videos && videos.length > 0) ? videos : fetchedVideos;
  const displayDisclaimer = propsDisclaimer || apiDisclaimer;
  
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
            {isLoading ? (
              // Loading state
              <div className="flex gap-3 p-2">
                <div className="w-24 h-16 rounded-md bg-muted animate-pulse flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 bg-muted animate-pulse rounded"></div>
                  <div className="h-3 w-1/2 bg-muted animate-pulse rounded"></div>
                </div>
              </div>
            ) : displayVideos.length > 0 ? (
              // Video list
              displayVideos.slice(0, 3).map((video) => (
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
              ))
            ) : (
              // No videos found
              <div className="text-center py-4 text-sm text-muted-foreground">
                {t.videoSupport.noVideosFound || "No videos found for this topic"}
              </div>
            )}
          </div>
          
          {/* Info Note */}
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">
              {displayDisclaimer || t.videoSupport.note}
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
                  const youtubeRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
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