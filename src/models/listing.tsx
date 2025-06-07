export type UrgencyType =
  | "IMMEDIATE"
  | "24h"
  | "FEW_DAYS"
  | "NEXT_WEEK"
  | "FLEXIBLE"
  | "SPECIFIC_DATE";

export type ListingPayload = {
  id: string;
  title: string;
  location: string;
  description: string;
  price: string;
  coordinates: [number, number]; //
  provider: string;
  availability: string;
  servicesOffered: string[];
  isNegotiable: boolean;
  urgency: string;
  customerName: string;
  requestTitle: string;
  serviceCategory: string;
  requestDescription: string;
  locationStreet: string;
  locationCity: string;
  locationPostalCode: string;
  locationCountry: string;
  specificLocationDetails: string;
  desiredTimeline: UrgencyType;
  specificDateTime: string;
  estimatedBudget: number;
  additionalNotes: string;
  contactMethod: string;
  postedDate: Date;
  attachments: {
    type: string;
    url: string;
    name: string;
  }[];
};
