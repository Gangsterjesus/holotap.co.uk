export interface Organisation {
  id: string;
  name: string;
  licenceStatus: "none" | "pending" | "active";
  securityLayerEnabled: boolean;
}

