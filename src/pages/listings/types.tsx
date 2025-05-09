export interface Service {
    title: string;
    provider: string;
    description: string;
    location: string;
    availability: string;
    servicesOffered: string[];
    price: string;
    isNegotiable?: boolean;
    urgency?: 'high' | 'medium' | 'low';
    coordinates: [number, number];
  }