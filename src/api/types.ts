export interface CustomerType {
  createdDate: string;
  email: string;
  id: number;
  name: string;
  phoneNumber: string;
  status: CustomerStatus;
}

export interface OpportunityType {
  id: number;
  name: string;
  customerId: number;
  status: OpportunityStatus;
}

export enum CustomerStatus {
  active = "active",
  nonActive = "non-active",
  lead = "lead",
}

export enum OpportunityStatus {
  new = "New",
  closedWon = "Closed Won",
  closedLost = "Closed Lost",
}

export enum SortedType {
  none = "none",
  ascName = "Name A-Z",
  descName = "Name Z-A",
  ascDate = "Newest",
  descDate = "Oldest",
}

export interface PostCustomerType {
  createdDate: string;
  email: string;
  name: string;
  phoneNumber: string;
  status: CustomerStatus;
}

export interface PostOpportunityType {
  name: string;
  customerId: string;
  status: OpportunityStatus;
}
