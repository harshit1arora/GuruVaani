import { useState, useEffect } from 'react';

// Types for system insights
interface InsightData {
  feature: string;
  action: string;
  timestamp: number;
  metadata?: Record<string, string>;
}

interface AggregatedInsights {
  featureUsage: Record<string, number>;
  actionDistribution: Record<string, Record<string, number>>;
  totalInteractions: number;
  lastUpdated: number;
}

const STORAGE_KEY = 'shiksha-mitra-system-insights';
const BATCH_SIZE = 50;
const UPLOAD_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Hook for collecting anonymized, aggregated system insights
 * - Supports CRPs, BRPs, and DIETs without replacing or policing teachers
 * - Aggregated, anonymized insights only
 * - No individual teacher tracking
 * - Helps institutions identify real training needs
 * - Builds trust while strengthening the system
 */
export const useSystemInsights = () => {
  const [insights, setInsights] = useState<InsightData[]>([]);
  const [aggregatedInsights, setAggregatedInsights] = useState<AggregatedInsights>({
    featureUsage: {},
    actionDistribution: {},
    totalInteractions: 0,
    lastUpdated: Date.now()
  });

  // Load insights from local storage on initial render
  useEffect(() => {
    const loadInsights = () => {
      try {
        const storedInsights = localStorage.getItem(STORAGE_KEY);
        if (storedInsights) {
          const parsed = JSON.parse(storedInsights);
          if (parsed.raw) {
            setInsights(parsed.raw);
          }
          if (parsed.aggregated) {
            setAggregatedInsights(parsed.aggregated);
          }
        }
      } catch (error) {
        console.error('Error loading system insights:', error);
        // Reset insights if there's an error
        setInsights([]);
      }
    };

    loadInsights();
  }, []);

  // Save insights to local storage whenever they change
  useEffect(() => {
    const saveInsights = () => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          raw: insights,
          aggregated: aggregatedInsights
        }));
      } catch (error) {
        console.error('Error saving system insights:', error);
      }
    };

    saveInsights();
  }, [insights, aggregatedInsights]);

  // Aggregate insights periodically
  useEffect(() => {
    const aggregateInsights = () => {
      if (insights.length === 0) return;

      const newAggregated: AggregatedInsights = {
        featureUsage: { ...aggregatedInsights.featureUsage },
        actionDistribution: JSON.parse(JSON.stringify(aggregatedInsights.actionDistribution)),
        totalInteractions: aggregatedInsights.totalInteractions,
        lastUpdated: Date.now()
      };

      // Aggregate new insights
      insights.forEach(insight => {
        // Update feature usage count
        newAggregated.featureUsage[insight.feature] = 
          (newAggregated.featureUsage[insight.feature] || 0) + 1;

        // Update action distribution
        if (!newAggregated.actionDistribution[insight.feature]) {
          newAggregated.actionDistribution[insight.feature] = {};
        }
        newAggregated.actionDistribution[insight.feature][insight.action] = 
          (newAggregated.actionDistribution[insight.feature][insight.action] || 0) + 1;

        // Update total interactions
        newAggregated.totalInteractions += 1;
      });

      setAggregatedInsights(newAggregated);
      // Clear raw insights after aggregation
      setInsights([]);
    };

    // Aggregate when we have enough insights or after a delay
    const timer = setTimeout(aggregateInsights, 5 * 60 * 1000); // Every 5 minutes
    
    return () => clearTimeout(timer);
  }, [insights, aggregatedInsights]);

  // Simulate upload of aggregated insights to server
  useEffect(() => {
    const uploadInsights = async () => {
      // Only upload if we have aggregated insights
      if (aggregatedInsights.totalInteractions === 0) return;

      try {
        // In a real app, this would be an API call to upload aggregated insights
        // For now, we'll just log it
        console.log('Uploading aggregated insights (simulated):', {
          ...aggregatedInsights,
          // Ensure no personal data is included
          timestamp: Date.now(),
          deviceType: 'mobile', // Only general device info, no unique identifiers
          appVersion: '1.0.0'
        });

        // Reset total interactions after successful upload
        setAggregatedInsights(prev => ({
          ...prev,
          totalInteractions: 0
        }));
      } catch (error) {
        console.error('Error uploading system insights:', error);
        // Keep insights for next upload attempt
      }
    };

    // Upload periodically
    const uploadTimer = setTimeout(uploadInsights, UPLOAD_INTERVAL);
    
    return () => clearTimeout(uploadTimer);
  }, [aggregatedInsights]);

  /**
   * Log an insight without any personal identifying information
   * @param feature The feature being used (e.g., 'planner', 'peer-wisdom', 'daily-reflection')
   * @param action The action being performed (e.g., 'generate-plan', 'post-question', 'submit-reflection')
   * @param metadata Additional anonymized metadata (no personal data!)
   */
  const logInsight = (feature: string, action: string, metadata?: Record<string, string>) => {
    const newInsight: InsightData = {
      feature,
      action,
      timestamp: Date.now(),
      metadata: metadata ? {
        // Ensure no personal data is included
        ...metadata,
        // Remove any potentially identifying fields
        userId: undefined,
        teacherId: undefined,
        studentId: undefined
      } : undefined
    };

    setInsights(prev => [...prev, newInsight]);

    // If we have too many raw insights, aggregate immediately
    if (insights.length >= BATCH_SIZE - 1) {
      // This will trigger the aggregation useEffect
      setInsights(prev => [...prev, newInsight]);
    }
  };

  /**
   * Get aggregated insights for a specific feature
   * @param feature The feature to get insights for
   */
  const getFeatureInsights = (feature: string) => {
    return {
      usageCount: aggregatedInsights.featureUsage[feature] || 0,
      actions: aggregatedInsights.actionDistribution[feature] || {},
      lastUpdated: aggregatedInsights.lastUpdated
    };
  };

  /**
   * Get overall system insights
   */
  const getOverallInsights = () => {
    return aggregatedInsights;
  };

  return {
    logInsight,
    getFeatureInsights,
    getOverallInsights,
    aggregatedInsights
  };
};
