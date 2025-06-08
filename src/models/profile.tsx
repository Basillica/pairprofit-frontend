interface Testimonial {
  id: number;
  reviewer: string;
  rating: number;
  date: string;
  comment: string;
  serviceTitle: string;
}

interface OfferedService {
  id: string;
  title: string;
  category: string;
  price: string;
  link: string;
}

interface PublicUpdate {
  id: string;
  date: string;
  type: string;
  title: string;
  content: string;
  image: string | null;
}

export interface ServiceProviderModel {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  profilePicture: string;
  specialization: string;
  bio: string;
  overallRating: number;
  totalReviews: number;
  location: string;
  yearsInBusiness: string;
  businessName: string;
  businessRegistration: string;
  contactPreferences: string[];
  ratingBreakdown: {
    "5": number;
    "4": number;
    "3": number;
    "2": number;
    "1": number;
  };
  testimonials: Testimonial[];
  servicesOffered: OfferedService[];
  publicUpdates: PublicUpdate[];
}
