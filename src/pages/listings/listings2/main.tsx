import { createSignal, For } from "solid-js";
import css_class from "./style.module.css";
import { ListingPayload } from "../../../models/listing";
import { ServiceRequestDetails } from "../../../components";

const mockListings: ListingPayload[] = [
  {
    id: "req1",
    customerName: "Customer A",
    requestTitle: "Car broke down on A9 near Nuremberg",
    serviceCategory: "Automotive & Mechanics",
    requestDescription:
      "My old VW Golf broke down on the side of the A9, northbound, around kilometer 150. Engine seized. Need a tow to a mechanic or roadside assistance ASAP.",
    locationStreet: "A9 Northbound, km 150",
    locationCity: "Nuremberg",
    locationPostalCode: "90402",
    locationCountry: "Germany",
    specificLocationDetails:
      "On the emergency lane, white VW Golf, hazard lights on. Vehicle is a 2008 VW Golf, automatic. Need someone licensed for towing.",
    desiredTimeline: "IMMEDIATE",
    specificDateTime: "",
    estimatedBudget: 3434,
    additionalNotes: "",
    contactMethod: "Platform Chat",
    postedDate: new Date("2025-06-07T08:00:00Z"),
    attachments: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1582234320959-1959b83b3803?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "broken_car_1.jpg",
      },
    ],
    urgency: "high",
    title: "Towing & Roadside Assistance",
    provider: "Nuremberg Auto Help",
    description:
      "24/7 towing and roadside assistance across Nuremberg. Fast response times.",
    location: "Serving: Nuremberg",
    availability: "Availability: 24/7",
    servicesOffered: ["Towing", "tire change", "jump start"],
    price: "€150 (initial call-out)",
    isNegotiable: true,
    coordinates: [49.452, 11.077], // Nuremberg
  },
  {
    id: "req2",
    customerName: "Customer B",
    requestTitle: "Garden Landscaping Project",
    serviceCategory: "Home & Garden",
    requestDescription:
      "Looking for a landscaper to redesign my backyard. Interested in a new patio, some flower beds, and possibly a small water feature.",
    locationStreet: "Hauptstraße 10",
    locationCity: "Fürth",
    locationPostalCode: "90762",
    locationCountry: "Germany",
    specificLocationDetails: "Residential house, access from the side gate.",
    desiredTimeline: "FLEXIBLE",
    specificDateTime: "",
    estimatedBudget: 5000,
    additionalNotes: "Prefer someone who can provide design mock-ups.",
    contactMethod: "Phone",
    postedDate: new Date("2025-06-06T14:30:00Z"),
    attachments: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1518018260718-d784a9e53099?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "backyard_sketch.png",
      },
    ],
    urgency: "medium",
    title: "Expert Landscaping",
    provider: "GreenThumb Landscaping",
    description:
      "Creative and experienced landscaping services for beautiful outdoor spaces. From design to installation, we bring your garden dreams to life.",
    location: "Serving: Nuremberg and surrounding areas",
    availability: "Availability: Mon-Fri, 9 AM - 5 PM",
    servicesOffered: ["Garden design", "patio installation", "planting"],
    price: "Quote based on project",
    isNegotiable: true,
    coordinates: [49.479, 10.992], // Fürth
  },
  {
    id: "req3",
    customerName: "Customer C",
    requestTitle: "Translation of Legal Documents (German to English)",
    serviceCategory: "Professional Services",
    requestDescription:
      "Need a certified translation of several legal documents (marriage certificate, birth certificate) from German to English for immigration purposes.",
    locationStreet: "Unter den Linden 6",
    locationCity: "Berlin",
    locationPostalCode: "10117",
    locationCountry: "Germany",
    specificLocationDetails: "Documents can be picked up or sent digitally.",
    desiredTimeline: "SPECIFIC_DATE",
    specificDateTime: "2025-06-20T10:00:00Z",
    estimatedBudget: 300,
    additionalNotes: "Require a sworn translator.",
    contactMethod: "Email",
    postedDate: new Date("2025-06-05T10:00:00Z"),
    attachments: [],
    urgency: "high",
    title: "Certified Translation Services",
    provider: "Global Language Solutions",
    description:
      "Accurate and reliable certified translations for legal, medical, and technical documents. All major languages supported.",
    location: "Serving: Germany (remote services available)",
    availability: "Availability: Online, Mon-Fri",
    servicesOffered: [
      "Document translation",
      "certified translation",
      "localization",
    ],
    price: "€0.15/word",
    isNegotiable: false,
    coordinates: [52.517, 13.388], // Berlin
  },
  {
    id: "req4",
    customerName: "Customer D",
    requestTitle: "Computer Repair - Laptop won't turn on",
    serviceCategory: "Electronics & IT",
    requestDescription:
      "My laptop (Dell XPS 15) suddenly stopped turning on. No lights, no fan spin. Suspect power issue or motherboard problem. Need diagnostics and repair.",
    locationStreet: "Mönckebergstraße 7",
    locationCity: "Hamburg",
    locationPostalCode: "20095",
    locationCountry: "Germany",
    specificLocationDetails:
      "Can drop off at a repair shop or prefer on-site service if possible.",
    desiredTimeline: "IMMEDIATE",
    specificDateTime: "",
    estimatedBudget: 344,
    additionalNotes: "Important data on the drive, hope it can be recovered.",
    contactMethod: "Platform Chat",
    postedDate: new Date("2025-06-07T11:45:00Z"),
    attachments: [],
    urgency: "high",
    title: "Laptop and PC Repair",
    provider: "Hamburg Tech Solutions",
    description:
      "Fast and affordable computer repair services for all brands and models. Diagnostics, virus removal, hardware repair, and data recovery.",
    location: "Serving: Hamburg",
    availability: "Availability: Mon-Sat, 9 AM - 6 PM",
    servicesOffered: [
      "Laptop repair",
      "data recovery",
      "software installation",
    ],
    price: "€60/hour (diagnostics fee may apply)",
    isNegotiable: true,
    coordinates: [53.55, 9.992], // Hamburg
  },
  {
    id: "req5",
    customerName: "Customer E",
    requestTitle: "House Cleaning - One-time Deep Clean",
    serviceCategory: "Cleaning & Maintenance",
    requestDescription:
      "Looking for a one-time deep cleaning service for a 3-bedroom apartment before moving in. Focus on kitchen, bathrooms, and floors.",
    locationStreet: "Marienplatz 1",
    locationCity: "Munich",
    locationPostalCode: "80331",
    locationCountry: "Germany",
    specificLocationDetails:
      "Empty apartment, no furniture yet. Access via key collection.",
    desiredTimeline: "SPECIFIC_DATE",
    specificDateTime: "2025-06-15T09:00:00Z",
    estimatedBudget: 200,
    additionalNotes: "Eco-friendly cleaning products preferred.",
    contactMethod: "Phone",
    postedDate: new Date("2025-06-04T16:00:00Z"),
    attachments: [],
    urgency: "medium",
    title: "Professional Cleaning Services",
    provider: "Sparkling Homes",
    description:
      "Reliable and thorough cleaning services for homes and offices. Regular cleaning, deep cleaning, and move-in/move-out cleaning.",
    location: "Serving: Munich, Augsburg",
    availability: "Availability: Mon-Fri, 8 AM - 5 PM",
    servicesOffered: ["Deep cleaning", "regular cleaning", "office cleaning"],
    price: "€35/hour",
    isNegotiable: false,
    coordinates: [48.137, 11.575], // Munich
  },
  {
    id: "req6",
    customerName: "Customer F",
    requestTitle: "Interior Painting - Living Room",
    serviceCategory: "Home Improvement",
    requestDescription:
      "Need the living room of my apartment painted. It's about 25 sq meters. White walls, ceiling, and trim. Paint can be provided or purchased by painter.",
    locationStreet: "Zeil 112",
    locationCity: "Frankfurt am Main",
    locationPostalCode: "60313",
    locationCountry: "Germany",
    specificLocationDetails:
      "Apartment on the 3rd floor, no elevator. Furniture will be moved.",
    desiredTimeline: "FLEXIBLE",
    specificDateTime: "",
    estimatedBudget: 600,
    additionalNotes: "Looking for a clean and efficient job.",
    contactMethod: "Platform Chat",
    postedDate: new Date("2025-06-03T09:00:00Z"),
    attachments: [],
    urgency: "low",
    title: "Professional Painting Services",
    provider: "Frankfurt Painters",
    description:
      "High-quality interior and exterior painting for homes and businesses. Experienced and reliable.",
    location: "Serving: Frankfurt am Main and surrounding areas",
    availability: "Availability: Mon-Sat",
    servicesOffered: [
      "Interior painting",
      "exterior painting",
      "wallpaper removal",
    ],
    price: "Quote per project",
    isNegotiable: true,
    coordinates: [50.111, 8.681], // Frankfurt
  },
  {
    id: "req7",
    customerName: "Customer G",
    requestTitle: "Dog Walking Service",
    serviceCategory: "Pet Services",
    requestDescription:
      "Need a dog walker for my golden retriever, Max, twice a day (morning and evening) while I'm on vacation for a week.",
    locationStreet: "Rathausplatz 1",
    locationCity: "Cologne",
    locationPostalCode: "50667",
    locationCountry: "Germany",
    specificLocationDetails:
      "Max is friendly but strong on the leash. Experienced dog handler preferred.",
    desiredTimeline: "SPECIFIC_DATE",
    specificDateTime: "2025-07-01T08:00:00Z", // Vacation starts July 1st
    estimatedBudget: 150,
    additionalNotes: "Must have references and insurance.",
    contactMethod: "Email",
    postedDate: new Date("2025-06-01T11:00:00Z"),
    attachments: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1594247547514-98ae61ff2b6d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "golden_retriever.jpg",
      },
    ],
    urgency: "medium",
    title: "Reliable Dog Walking",
    provider: "Cologne Pet Care",
    description:
      "Experienced and passionate dog walkers. Individual and group walks available. Fully insured.",
    location: "Serving: Cologne city center",
    availability: "Availability: 7 days a week",
    servicesOffered: ["Dog walking", "pet sitting", "feeding"],
    price: "€20/walk",
    isNegotiable: true,
    coordinates: [50.938, 6.957], // Cologne
  },
  {
    id: "req8",
    customerName: "Customer H",
    requestTitle: "Furniture Assembly - IKEA Pax Wardrobe",
    serviceCategory: "Assembly & Installation",
    requestDescription:
      "Need help assembling a large IKEA Pax wardrobe system. It's two units, 150cm each. All parts are unpacked and ready.",
    locationStreet: "Königsallee 1",
    locationCity: "Düsseldorf",
    locationPostalCode: "40212",
    locationCountry: "Germany",
    specificLocationDetails: "Apartment on the 4th floor, elevator available.",
    desiredTimeline: "FLEXIBLE",
    specificDateTime: "",
    estimatedBudget: 100,
    additionalNotes: "Must have own tools.",
    contactMethod: "Platform Chat",
    postedDate: new Date("2025-06-02T13:00:00Z"),
    attachments: [],
    urgency: "low",
    title: "Furniture Assembly Expert",
    provider: "Quick Assembly Services",
    description:
      "Professional and quick assembly of all types of flat-pack furniture. IKEA specialist.",
    location: "Serving: Düsseldorf and nearby",
    availability: "Availability: Evenings and weekends",
    servicesOffered: [
      "IKEA assembly",
      "furniture repair",
      "shelf installation",
    ],
    price: "€40/hour",
    isNegotiable: true,
    coordinates: [51.225, 6.776], // Düsseldorf
  },
  {
    id: "req9",
    customerName: "Customer I",
    requestTitle: "Tutoring - High School Math (Algebra)",
    serviceCategory: "Education & Learning",
    requestDescription:
      "My son needs help with High School Algebra. He's struggling with equations and functions. Looking for 1-on-1 online tutoring.",
    locationStreet: "Online",
    locationCity: "Leipzig", // Even for online, a location helps define service area
    locationPostalCode: "04109",
    locationCountry: "Germany",
    specificLocationDetails:
      "Prefer a tutor with experience teaching teenagers.",
    desiredTimeline: "FLEXIBLE",
    specificDateTime: "",
    estimatedBudget: 25, // per hour
    additionalNotes: "Availability for two sessions per week.",
    contactMethod: "Email",
    postedDate: new Date("2025-06-01T09:30:00Z"),
    attachments: [],
    urgency: "medium",
    title: "Math Tutoring",
    provider: "Leipzig Tutoring Hub",
    description:
      "Experienced math tutors for all levels, from primary school to university. Online and in-person.",
    location: "Serving: Online / Leipzig",
    availability: "Availability: Flexible",
    servicesOffered: [
      "Algebra tutoring",
      "geometry tutoring",
      "calculus tutoring",
    ],
    price: "€30/hour",
    isNegotiable: true,
    coordinates: [51.34, 12.374], // Leipzig
  },
  {
    id: "req10",
    customerName: "Customer J",
    requestTitle: "Photography - Family Portrait Session",
    serviceCategory: "Arts & Entertainment",
    requestDescription:
      "Looking for a photographer for a family portrait session in a park. We have two adults and two young children.",
    locationStreet: "Englischer Garten",
    locationCity: "Munich",
    locationPostalCode: "80538",
    locationCountry: "Germany",
    specificLocationDetails:
      "Prefer a natural, candid style. Flexible on exact location within the park.",
    desiredTimeline: "SPECIFIC_DATE",
    specificDateTime: "2025-07-10T15:00:00Z",
    estimatedBudget: 300,
    additionalNotes: "Looking for digital copies and options for prints.",
    contactMethod: "Phone",
    postedDate: new Date("2025-05-30T17:00:00Z"),
    attachments: [],
    urgency: "low",
    title: "Family Photographer",
    provider: "Moments Captured Photography",
    description:
      "Capturing beautiful family memories with a natural and artistic approach. Outdoor and studio sessions.",
    location: "Serving: Munich and Bavaria",
    availability: "Availability: Weekends",
    servicesOffered: [
      "Family portraits",
      "event photography",
      "newborn photography",
    ],
    price: "Starting from €250",
    isNegotiable: true,
    coordinates: [48.148, 11.583], // Munich (another spot in Englischer Garten)
  },
];

export const ServiceListingsB = () => {
  const [serviceListings] = createSignal<ListingPayload[]>(mockListings);
  const [currentListing, setCurrentListing] = createSignal<ListingPayload>();
  const [viewListing, setViewListing] = createSignal(false);

  const openListing = (listingID: string) => {
    console.log(listingID, "---------------");
    setCurrentListing(serviceListings().find((el) => el.id === listingID));
    setViewListing(true);
  };

  return (
    <div class="flex flex-wrap">
      <ServiceRequestDetails
        isOpen={viewListing}
        listing={currentListing()!}
        closeModel={setViewListing}
      />
      <For each={serviceListings()}>
        {(service) => (
          <div class="col-12 listing-item" style={"width: 100%"}>
            <div class={css_class.listing_card}>
              <div class={css_class.listing_header}>
                <h3 class={css_class.listing_title}>{service.title}</h3>
                <p class={css_class.listing_provider}>
                  Provided by: {service.provider}
                </p>
              </div>
              <div class={css_class.listing_body}>
                <p class={css_class.listing_description}>
                  {service.description}
                </p>
                <div class={css_class.listing_details}>
                  <div class={css_class.detail_item}>
                    <i
                      class={`fas fa-map-marker-alt ${css_class.detail_icon}`}
                    ></i>
                    <span class={css_class.detail_text}>
                      {service.location}
                    </span>
                  </div>
                  <div class={css_class.detail_item}>
                    <i class={`fas fa-clock ${css_class.detail_icon}`}></i>
                    <span class={css_class.detail_text}>
                      {service.availability}
                    </span>
                  </div>
                  <div class={css_class.detail_item}>
                    <i class={`fas fa-tools ${css_class.detail_icon}`}></i>
                    <span class={css_class.detail_text}>
                      Services: {service.servicesOffered.join(", ")}
                    </span>
                  </div>
                </div>
              </div>
              <div class={css_class.listing_footer}>
                <span class={css_class.listing_price}>{service.price}</span>
                {service.isNegotiable && (
                  <span class={css_class.negotiable}>Negotiable</span>
                )}
                {service.urgency && (
                  <span
                    class={`${css_class.urgency_badge} ${
                      service.urgency === "high" && css_class.urgency_high
                    } ${
                      service.urgency === "medium" && css_class.urgency_medium
                    } ${service.urgency === "low" && css_class.urgency_low}`}
                  >
                    {service.urgency.charAt(0).toUpperCase() +
                      service.urgency.slice(1)}{" "}
                    Urgency
                  </span>
                )}
                <button
                  class={css_class.contact_button}
                  onClick={() => openListing(service.id)}
                >
                  Contact Provider
                </button>
              </div>
            </div>
          </div>
        )}
      </For>
    </div>
  );
};
