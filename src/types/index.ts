export type UserRole = "customer" | "admin";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  company?: string;
  createdAt: string;
}

export interface ApiKey {
  id: string;
  name: string;
  prefix: string; // e.g. "nx_live_58c9..."
  maskedKey: string;
  fullSecret?: string; // only shown once on generation
  permissions: ("read" | "write" | "admin" | "models:chat" | "models:embeddings" | "models:audio")[];
  createdAt: string;
  lastUsedAt: string | null;
  status: "active" | "revoked" | "expired";
  rateLimitRpm: number;
  totalRequests: number;
}

export interface AiModel {
  id: string;
  name: string;
  provider: "OpenAI" | "Anthropic" | "Google" | "Meta" | "Mistral" | "Cohere";
  type: "LLM" | "Multimodal" | "Vision" | "Embedding" | "Reasoning";
  contextWindow: string;
  inputPricing: string; // e.g. "$2.50 / 1M tokens"
  outputPricing: string; // e.g. "$10.00 / 1M tokens"
  latencyMs: number;
  status: "operational" | "degraded" | "maintenance";
  description: string;
  supportedEndpoints: string[];
}

export interface TokenUsageData {
  allocatedTokens: number;
  consumedTokens: number;
  remainingTokens: number;
  usagePercentage: number;
  inputTokens: number;
  outputTokens: number;
  costEstimate: number;
  resetDate: string;
}

export interface DailyUsagePoint {
  date: string;
  requests: number;
  tokens: number;
  cost: number;
}

export interface ModelUsagePoint {
  model: string;
  tokens: number;
  percentage: number;
  cost: number;
}

export interface CloudStorageResource {
  id: string;
  name: string;
  bucketType: "Standard" | "Nearline" | "Encrypted Vault";
  region: string;
  totalCapacityBytes: number;
  usedBytes: number;
  objectsCount: number;
  status: "active" | "archived";
  createdAt: string;
}

export interface CustomerAccount {
  id: string;
  name: string;
  company: string;
  email: string;
  plan: "Starter" | "Growth" | "Enterprise";
  status: "active" | "suspended" | "pending";
  allocatedTokens: number;
  consumedTokens: number;
  activeApiKeysCount: number;
  storageUsageBytes: number;
  monthlySpend: number;
  joinedDate: string;
  lastActive: string;
}

export interface AuditLogItem {
  id: string;
  action: string;
  actor: string;
  target: string;
  timestamp: string;
  type: "security" | "billing" | "keys" | "quota" | "account";
  details: string;
  ipAddress: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  amount: number;
  status: "paid" | "open" | "void";
  plan: string;
  downloadUrl: string;
}
