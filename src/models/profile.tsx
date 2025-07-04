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

export interface ArtisanModel {
    id: string;
    user_id: string;
    name: string;
    category: string;
    sub_category: string;
    profile_picture: string;
    followers: number;
    specialization: string;
    certifications: string;
    bio: string;
    overall_rating: number;
    total_reviews: number;
    location: string;
    years_in_business: number;
    business_name: string;
    business_registration: string;
    contact_preferences: string[];
    ratingBreakdown: {
        '5': number;
        '4': number;
        '3': number;
        '2': number;
        '1': number;
    };
    testimonials: Testimonial[];
    services_offered: OfferedService[];
    public_updates: PublicUpdate[];
}
