import { createSignal, Switch, Match } from 'solid-js';
import css_module from './style.module.css'
import { FilterBar } from '../../components/utils';
import { ServiceListingA } from './listings1';
import { ServiceListingsB } from './listings2';
import { ServiceListingsC } from './listings3';
import { Service } from './types';


const serviceListings: Service[] = [
  {
    title: 'Plumbing Services',
    provider: 'John Smith',
    description:
      'Experienced plumber offering a wide range of services including repairs, installations, and maintenance. Fast and reliable service with upfront pricing.',
    location: 'Serving: Erfurt, Thuringia',
    availability: 'Availability: 24/7 Emergency Service',
    servicesOffered: ['Pipe repair', 'drain cleaning', 'installations'],
    price: '€50/hour',
    isNegotiable: true,
    coordinates: [50.979, 11.033],
  },
  {
    title: 'Carpentry Services',
    provider: 'Acme Carpentry',
    description:
      'Professional carpentry services for residential and commercial projects. Custom furniture, installations, and repairs. High-quality workmanship and attention to detail.',
    location: 'Serving: Weimar, Jena, Erfurt',
    availability: 'Availability: Monday - Saturday',
    servicesOffered: ['Custom cabinets', 'framing', 'trim work'],
    price: '€60/hour',
    isNegotiable: true,
    coordinates: [50.983, 11.327],
  },
  {
    title: 'Electrical Services',
    provider: 'Volt Electric',
    description:
      'Certified electricians offering a full range of electrical services. Installations, repairs, and maintenance for residential and commercial properties.',
    location: 'Serving: Statewide Thuringia',
    availability: 'Availability: 24/7 Emergency Service',
    servicesOffered: ['Wiring', 'lighting', 'panel upgrades'],
    price: '€75/hour',
    isNegotiable: true,
    urgency: 'high',
    coordinates: [51.083, 11.183],
  },
  {
    title: 'Electrical Nürnberg',
    provider: 'Volt Electric',
    description:
      'Certified electricians offering a full range of electrical services. Installations, repairs, and maintenance for residential and commercial properties.',
    location: 'Serving: Statewide Thuringia',
    availability: 'Availability: 24/7 Emergency Service',
    servicesOffered: ['Wiring', 'lighting', 'panel upgrades'],
    price: '€75/hour',
    isNegotiable: true,
    urgency: 'high',
    coordinates: [41.40338, 2.17403],
  },
  {
    title: 'Plumbing Services',
    provider: 'John Smith',
    description:
      'Experienced plumber offering a wide range of services including repairs, installations, and maintenance. Fast and reliable service with upfront pricing.',
    location: 'Serving: Erfurt, Thuringia',
    availability: 'Availability: 24/7 Emergency Service',
    servicesOffered: ['Pipe repair', 'drain cleaning', 'installations'],
    price: '€50/hour',
    isNegotiable: true,
    coordinates: [46.40338, 7.17403],
  },
  {
    title: 'Carpentry Services',
    provider: 'Acme Carpentry',
    description:
      'Professional carpentry services for residential and commercial projects. Custom furniture, installations, and repairs. High-quality workmanship and attention to detail.',
    location: 'Serving: Weimar, Jena, Erfurt',
    availability: 'Availability: Monday - Saturday',
    servicesOffered: ['Custom cabinets', 'framing', 'trim work'],
    price: '€60/hour',
    isNegotiable: true,
    coordinates: [46.40338, 7.17403],
  },
  {
    title: 'Electrical Services',
    provider: 'Volt Electric',
    description:
      'Certified electricians offering a full range of electrical services. Installations, repairs, and maintenance for residential and commercial properties.',
    location: 'Serving: Statewide Thuringia',
    availability: 'Availability: 24/7 Emergency Service',
    servicesOffered: ['Wiring', 'lighting', 'panel upgrades'],
    price: '€75/hour',
    isNegotiable: true,
    urgency: 'high',
    coordinates: [46.40338, 7.17403],
  },
  {
    title: 'Electrical Services',
    provider: 'Volt Electric',
    description:
      'Certified electricians offering a full range of electrical services. Installations, repairs, and maintenance for residential and commercial properties.',
    location: 'Serving: Statewide Thuringia',
    availability: 'Availability: 24/7 Emergency Service',
    servicesOffered: ['Wiring', 'lighting', 'panel upgrades'],
    price: '€75/hour',
    isNegotiable: true,
    urgency: 'low',
    coordinates: [46.40338, 7.17403],
  },
  {
    title: 'Electrical Services',
    provider: 'Volt Electric',
    description:
      'Certified electricians offering a full range of electrical services. Installations, repairs, and maintenance for residential and commercial properties.',
    location: 'Serving: Statewide Thuringia',
    availability: 'Availability: 24/7 Emergency Service',
    servicesOffered: ['Wiring', 'lighting', 'panel upgrades'],
    price: '€75/hour',
    isNegotiable: true,
    urgency: 'medium',
    coordinates: [46.40338, 7.17403],
  },
];


interface FilterOption {
  value: string;
  label: string;
}

export const ServiceListings = () => {
  const [ListingType, setListingType] = createSignal<string>("Type1")
  const [_, setFilters] = createSignal({
    category: '',
    subCategory: '',
    location: '',
    price: '',
  });

  const handleApplyFilters = (newFilters: {
    category: string;
    subCategory: string;
    location: string;
    price: string;
  }) => {
    console.log('Applying filters in App:', newFilters);
    setFilters(newFilters);
    // Perform your actual filtering logic here based on the 'newFilters'
  };

  const categories: FilterOption[] = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'home-garden', label: 'Home & Garden' },
  ];

  const subCategories: FilterOption[] = [
    { value: 'laptops', label: 'Laptops' },
    { value: 'phones', label: 'Phones' },
    { value: 'shirts', label: 'Shirts' },
    { value: 'pants', label: 'Pants' },
    { value: 'sofas', label: 'Sofas' },
    { value: 'tables', label: 'Tables' },
  ];

  const locations: FilterOption[] = [
    { value: 'usa', label: 'USA' },
    { value: 'canada', label: 'Canada' },
    { value: 'uk', label: 'UK' },
  ];

  const prices: FilterOption[] = [
    { value: '0-50', label: '$0 - $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100+', label: '$100+' },
  ];

  const handleListingTypeToggle  = (type: string) => {
      setListingType(type)
  }

  return (
    // <div class="container-fluid">
    //   <div class="flex justify-between items-center">
    //     <div>
    //       <h2 class={css_module.section_title}>Available Services</h2>
    //     </div>
    //     <div class="space-x-2">
    //       <button class={`${css_module.top_section_right_button} px-4 py-2 rounded focus:outline-none`} onClick={() => handleListingTypeToggle("Type1")}>Card View</button>
    //       <button class={`${css_module.top_section_right_button} px-4 py-2 rounded focus:outline-none`} onClick={() => handleListingTypeToggle("Type2")}>List View</button>
    //       <button class={`${css_module.top_section_right_button} px-4 py-2 rounded focus:outline-none`} onClick={() => handleListingTypeToggle("Type3")}>Map View</button>
    //     </div>
    //   </div>

    //   <FilterBar
    //       categories={categories}
    //       subCategories={subCategories}
    //       locations={locations}
    //       prices={prices}
    //       onApplyFilters={handleApplyFilters}
    //     />

    //   <Switch fallback={<p>Loading is between 5 and 10</p>}>
    //     <Match when={ListingType() === "Type1"} >
    //       <ServiceListingA listings={serviceListings}/>
    //     </Match>
    //     <Match when={ListingType() === "Type2"}>
    //       <ServiceListingsB listings={serviceListings} />
    //     </Match>
    //     <Match when={ListingType() === "Type3"}>
    //       <ServiceListingsC listings={serviceListings} />
    //     </Match>
    //   </Switch>
    // </div>

    <div class="container mx-auto px-4">
      <div class="flex flex-nowrap justify-between items-center">
        {/* <div>
          <h2 class={css_module.section_title}>Available Services</h2>
        </div> */}
        <div class="space-x-2 flex-shrink-0"> {/* Added flex-shrink-0 */}
          <button class={`${css_module.top_section_right_button} px-4 py-2 rounded focus:outline-none`} onClick={() => handleListingTypeToggle("Type1")}>Card View</button>
          <button class={`${css_module.top_section_right_button} px-4 py-2 rounded focus:outline-none`} onClick={() => handleListingTypeToggle("Type2")}>List View</button>
          <button class={`${css_module.top_section_right_button} px-4 py-2 rounded focus:outline-none`} onClick={() => handleListingTypeToggle("Type3")}>Map View</button>
        </div>
      </div>

      <FilterBar
        categories={categories}
        subCategories={subCategories}
        locations={locations}
        prices={prices}
        onApplyFilters={handleApplyFilters}
      />

      <Switch fallback={<p>Loading is between 5 and 10</p>}>
          <Match when={ListingType() === "Type1"} >
            <ServiceListingA listings={serviceListings}/>
          </Match>
          <Match when={ListingType() === "Type2"}>
            <ServiceListingsB listings={serviceListings} />
          </Match>
          <Match when={ListingType() === "Type3"}>
            <ServiceListingsC listings={serviceListings} />
          </Match>
      </Switch>
    </div>
  );
}

export default ServiceListings;