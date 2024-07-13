// context/SelectedMetricsContext.tsx
import React, { createContext, useState, ReactNode, useContext } from "react";

interface SelectedMetricsContextType {
  selectedMetrics: string[];
  addMetric: (metric: string) => void;
  removeMetric: (metric: string) => void;
}

const SelectedMetricsContext = createContext<
  SelectedMetricsContextType | undefined
>(undefined);

export const SelectedMetricsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);

  const addMetric = (metric: string) => {
    // Check if the metric is already in the list before adding
    setSelectedMetrics((prevMetrics) => {
      if (prevMetrics.includes(metric)) {
        return prevMetrics; // Do nothing if the metric is already present
      } else {
        return [...prevMetrics, metric]; // Add the metric if it's not present
      }
    });
  };

  const removeMetric = (metric: string) => {
    setSelectedMetrics((prevMetrics) =>
      prevMetrics.filter((m) => m !== metric)
    );
  };

  return (
    <SelectedMetricsContext.Provider
      value={{ selectedMetrics, addMetric, removeMetric }}
    >
      {children}
    </SelectedMetricsContext.Provider>
  );
};

export const useSelectedMetrics = (): SelectedMetricsContextType => {
  const context = useContext(SelectedMetricsContext);
  if (context === undefined) {
    throw new Error(
      "useSelectedMetrics must be used within a SelectedMetricsProvider"
    );
  }
  return context;
};
