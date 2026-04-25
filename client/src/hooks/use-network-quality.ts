type NetworkQuality = "slow" | "medium" | "fast";

interface NetworkInfo {
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
  downlink?: number;
  saveData?: boolean;
}

export function getNetworkQuality(): NetworkQuality {
  const nav = navigator as Navigator & { connection?: NetworkInfo };
  const conn = nav.connection;

  if (!conn) return "medium";

  if (conn.saveData) return "slow";

  if (conn.effectiveType === "slow-2g" || conn.effectiveType === "2g") return "slow";
  if (conn.effectiveType === "3g") return "medium";
  if (conn.effectiveType === "4g") {
    if (conn.downlink && conn.downlink >= 5) return "fast";
    return "medium";
  }

  if (conn.downlink) {
    if (conn.downlink < 1) return "slow";
    if (conn.downlink < 5) return "medium";
    return "fast";
  }

  return "medium";
}

export function getPreloadStrategy(quality: NetworkQuality): "none" | "metadata" | "auto" {
  if (quality === "slow") return "none";
  if (quality === "medium") return "metadata";
  return "auto";
}

export function getQualityLabel(quality: NetworkQuality): string {
  if (quality === "slow") return "Экономия трафика";
  if (quality === "medium") return "Стандартное качество";
  return "Высокое качество";
}
