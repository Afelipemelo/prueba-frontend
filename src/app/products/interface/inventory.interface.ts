export interface InventoryResponse {
  data: Data;
}

export interface Data {
  type:       string;
  id:         number;
  attributes: Attributes;
}

export interface Attributes {
  stock:       number;
  stockChange: null;
}
