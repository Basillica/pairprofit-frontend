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
  price: number;
  latitude: number;
  longitude: number;
  is_negotiable: boolean;
  urgency: string;
  customer_name: string;
  request_title: string;
  category: string;
  sub_category: string;
  request_description: string;
  location_street: string;
  location_city: string;
  location_postal_code: string;
  location_country: string;
  specific_location_details: string;
  desired_timeline: UrgencyType;
  specific_date_time: string;
  estimated_budget: number;
  additional_notes: string;
  contact_method: string;
  postedDate: Date;
  creator_id: string;
  created_at?: string;
  updated_at?: string;
  scope: string;
  attachments: {
    type: string;
    url: string;
    name: string;
  }[];
};
