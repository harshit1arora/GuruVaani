import { cn } from "@/lib/utils";
import { Play, ChevronRight, ExternalLink } from "lucide-react";
import { Video as ApiVideo } from "@/lib/api";

interface ResourceClusterProps {
  title: string;
  description: string;
  videos: ApiVideo[];
  icon: React.ReactNode;
  colorClass: string;
}

const ResourceCluster = ({ title, description, videos, icon, colorClass }: ResourceClusterProps) => {
  const openVideo = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="bg-card rounded-xl p-4 shadow-sm border border-border transition-all duration-300 hover:shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <div className={cn("p-2.5 rounded-xl shadow-inner", colorClass)}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-foreground leading-tight">{title}</h3>
          <p className="text-[11px] text-muted-foreground line-clamp-1">{description}</p>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
      </div>
      
      <div className="space-y-2.5">
        {videos.length > 0 ? (
          videos.slice(0, 3).map((video, idx) => {
            const videoId = video.url.split('v=')[1];
            const thumbnailUrl = videoId 
              ? `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`
              : null;

            return (
              <button
                key={idx}
                onClick={() => openVideo(video.url)}
                className="w-full flex items-center gap-3 p-2 rounded-xl bg-muted/30 hover:bg-muted/60 transition-all duration-200 group text-left border border-transparent hover:border-border/50"
              >
                <div className="relative w-20 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                  {thumbnailUrl ? (
                    <img 
                      src={thumbnailUrl} 
                      alt={video.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <Play className="w-4 h-4 text-muted-foreground" />
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center scale-90 group-hover:scale-100 transition-transform">
                      <Play className="w-3 h-3 text-black fill-black ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-1 right-1 bg-black/70 text-[10px] text-white px-1 rounded font-medium">
                    {video.duration}
                  </div>
                </div>
                <div className="flex-1 min-w-0 pr-1">
                  <p className="text-xs font-semibold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                    {video.title}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
                    {video.channel}
                    <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                </div>
              </button>
            );
          })
        ) : (
          <div className="py-4 text-center">
            <p className="text-xs text-muted-foreground italic">No practice resources found.</p>
          </div>
        )}
      </div>
      
      {videos.length > 3 && (
        <button 
          onClick={() => openVideo(`https://www.youtube.com/results?search_query=${encodeURIComponent(title + " " + description)}`)}
          className="w-full text-[10px] text-primary font-bold mt-3 text-center uppercase tracking-wider hover:underline"
        >
          View all {videos.length} videos on YouTube
        </button>
      )}
    </div>
  );
};

export default ResourceCluster;
