export const HomePage = () => {
  return (
    <main class="flex-grow container-fluid mx-auto">
      <section class="text-center py-16 bg-blue-300 text-white rounded-lg shadow-lg mb-12">
        <h1 class="text-4xl md:text-5xl font-extrabold mb-4">
          Your Skills. Our Platform. Limitless Possibilities.
        </h1>
        <p class="text-xl md:text-2xl mb-8 opacity-90">
          Connecting you with skilled professionals for every task, big or
          small.
        </p>
        <div class="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 p-3">
          <input
            type="text"
            placeholder="What service do you need?"
            class="p-3 rounded-md w-full md:w-1/2 lg:w-1/3 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button class="bg-blue-800 text-white px-6 py-3 rounded-md hover:bg-blue-900 transition duration-300 font-semibold">
            Search Services
          </button>
        </div>
      </section>

      <section class="py-12">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">
          Popular Categories
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition duration-300">
            <img
              src="https://picsum.photos/200?random=1"
              alt="Home Services Icon"
              class="mx-auto mb-4 w-20 h-20 object-contain"
            />
            <h3 class="text-xl font-semibold text-gray-700 mb-2">
              Home Services
            </h3>
            <p class="text-gray-600">Carpentry, Plumbing, Cleaning & more.</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition duration-300">
            <img
              src="https://picsum.photos/200?random=2"
              alt="Tech Services Icon"
              class="mx-auto mb-4 w-20 h-20 object-contain"
            />
            <h3 class="text-xl font-semibold text-gray-700 mb-2">
              IT & Tech Support
            </h3>
            <p class="text-gray-600">Web Design, Software, Network help.</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition duration-300">
            <img
              src="https://picsum.photos/200?random=3"
              alt="Creative Services Icon"
              class="mx-auto mb-4 w-20 h-20 object-contain"
            />
            <h3 class="text-xl font-semibold text-gray-700 mb-2">
              Creative & Design
            </h3>
            <p class="text-gray-600">Graphic Design, Writing, Photography.</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition duration-300">
            <img
              src="https://picsum.photos/200?random=4"
              alt="Tutoring Icon"
              class="mx-auto mb-4 w-20 h-20 object-contain"
            />
            <h3 class="text-xl font-semibold text-gray-700 mb-2">
              Tutoring & Education
            </h3>
            <p class="text-gray-600">Academic help, Skill development.</p>
          </div>
        </div>
      </section>

      <section class="py-12 bg-gray-100 rounded-lg shadow-md">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">
          How SkillConnect Works
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-4">
          <div class="p-6">
            <div class="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
              1
            </div>
            <h3 class="text-xl font-semibold text-gray-700 mb-2">
              Find Your Service
            </h3>
            <p class="text-gray-600">
              Browse categories or use our powerful search to find exactly what
              you need.
            </p>
          </div>
          <div class="p-6">
            <div class="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
              2
            </div>
            <h3 class="text-xl font-semibold text-gray-700 mb-2">
              Connect & Discuss
            </h3>
            <p class="text-gray-600">
              Chat directly with service providers to discuss project details
              and get quotes.
            </p>
          </div>
          <div class="p-6">
            <div class="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
              3
            </div>
            <h3 class="text-xl font-semibold text-gray-700 mb-2">
              Get it Done Securely
            </h3>
            <p class="text-gray-600">
              Hire with confidence, make secure payments, and leave reviews.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};
