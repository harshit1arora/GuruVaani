import { useState, useEffect } from "react";
import { ArrowLeft, Users, Layers, Lightbulb, Sparkles, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ResourceCluster from "@/components/ResourceCluster";
import BottomNav from "@/components/BottomNav";
import { useLanguage } from "@/contexts/LanguageContext";
import { getClusterVideos, Video as ApiVideo } from "@/lib/api";

const Resources = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [clusterVideos, setClusterVideos] = useState<Record<string, ApiVideo[]>>({});
  const [isLoading, setIsLoading] = useState(true);

  const clusterConfigs = [
    {
      id: "classroomManagement",
      title: t.resources.clusters.classroomManagement,
      description: t.resources.clusters.classroomManagementDesc,
      icon: <Users className="w-5 h-5 text-coaching-now-accent" />,
      colorClass: "bg-coaching-now",
    },
    {
      id: "mixedLevel",
      title: t.resources.clusters.mixedLevel,
      description: t.resources.clusters.mixedLevelDesc,
      icon: <Layers className="w-5 h-5 text-coaching-activity-accent" />,
      colorClass: "bg-coaching-activity",
    },
    {
      id: "conceptClarity",
      title: t.resources.clusters.conceptClarity,
      description: t.resources.clusters.conceptClarityDesc,
      icon: <Lightbulb className="w-5 h-5 text-coaching-explain-accent" />,
      colorClass: "bg-coaching-explain",
    },
    {
      id: "studentEngagement",
      title: t.resources.clusters.studentEngagement,
      description: t.resources.clusters.studentEngagementDesc,
      icon: <Sparkles className="w-5 h-5 text-coaching-interaction-accent" />,
      colorClass: "bg-coaching-interaction",
    },
  ];

  useEffect(() => {
    const fetchAllClusterVideos = async () => {
      setIsLoading(true);
      const results: Record<string, ApiVideo[]> = {};
      
      try {
        await Promise.all(
          clusterConfigs.map(async (cluster) => {
            try {
              const response = await getClusterVideos(cluster.title, cluster.description);
              results[cluster.id] = response.videos;
            } catch (error) {
              console.error(`Error fetching videos for cluster ${cluster.id}:`, error);
              results[cluster.id] = [];
            }
          })
        );
        setClusterVideos(results);
      } catch (error) {
        console.error("Error fetching cluster videos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllClusterVideos();
  }, [t]);

  return (
    <div className="app-container pb-24">
      {/* Header */}
      <header className="px-5 pt-6 pb-4 flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="ml-2">
          <h1 className="text-lg font-semibold text-foreground">
            {t.resources.title}
          </h1>
          <p className="text-xs text-muted-foreground">
            {t.resources.subtitle}
          </p>
        </div>
      </header>

      {/* Clusters */}
      <section className="px-5 space-y-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin mb-2" />
            <p>Fetching pedagogical resources...</p>
          </div>
        ) : (
          clusterConfigs.map((cluster, index) => (
            <div key={cluster.id} className={`fade-in-up-delay-${index + 1}`}>
              <ResourceCluster
                title={cluster.title}
                description={cluster.description}
                videos={clusterVideos[cluster.id] || []}
                icon={cluster.icon}
                colorClass={cluster.colorClass}
              />
            </div>
          ))
        )}
      </section>

      <BottomNav />
    </div>
  );
};

export default Resources;
