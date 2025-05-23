<template>
  <div>
    <!-- Enhanced Hero/Header Section -->
    <div class="relative overflow-hidden">
      <!-- Background Image with Parallax Effect -->
      <div class="w-full h-64 md:h-80 lg:h-[500px] relative overflow-hidden">
        <img src="~/assets/img/toei_donate.jpg" alt="The Oaktree Empowerment Initiative"
          class="w-full h-full object-cover object-center transform scale-110 transition-transform duration-700" />

        <!-- Gradient Overlay for Better Text Visibility -->
        <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70"></div>

        <!-- Content Container -->
        <div class="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8">
          <!-- Animated Badge -->
          <div class="mb-2 md:mb-4 lg:mb-6 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full 
                      text-xs md:text-sm lg:text-base animate-pulse">
            Join 2,000+ donors making a difference
          </div>

          <!-- Heading with Enhanced Typography and Animation -->
          <h1 class="text-3xl md:text-4xl lg:text-6xl font-bold mb-2 md:mb-4 text-center">
            <span class="text-white">Make a </span>
            <span class="text-[#CEE377]">Real Impact</span>
          </h1>

          <!-- Subheading with More Compelling Copy -->
          <p
            class="text-white text-sm md:text-lg lg:text-2xl text-center max-w-2xl leading-relaxed mb-4 md:mb-6 lg:mb-8">
            Your donation doesn't just help—it transforms communities, creates opportunities, and builds lasting change.
          </p>

          <!-- CTA Button - Smaller on Mobile -->
          <a href="#donate-form" class="bg-[#CEE377] hover:bg-[#daf090] text-gray-800 font-medium px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 
                                      rounded-full transition-all duration-300 transform hover:scale-105 
                                      text-sm md:text-base flex items-center gap-2 shadow-lg">
            Donate Now
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clip-rule="evenodd" />
            </svg>
          </a>

          <!-- Impact Stats Bar -->
          <div class="hidden md:flex absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-4 
                      justify-center gap-8 lg:gap-16 text-white text-center">
            <div class="flex flex-col">
              <span class="text-2xl lg:text-3xl font-bold text-[#CEE377]">12+</span>
              <span class="text-sm">Years of Impact</span>
            </div>
            <div class="flex flex-col">
              <span class="text-2xl lg:text-3xl font-bold text-[#CEE377]">5,000+</span>
              <span class="text-sm">Lives Changed</span>
            </div>
            <div class="flex flex-col">
              <span class="text-2xl lg:text-3xl font-bold text-[#CEE377]">24</span>
              <span class="text-sm">Communities Served</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Impact Stats for Mobile Only -->
    <div class="md:hidden bg-gray-900 p-4 grid grid-cols-3 gap-2 text-white text-center">
      <div class="flex flex-col">
        <span class="text-xl font-bold text-[#CEE377]">12+</span>
        <span class="text-xs">Years</span>
      </div>
      <div class="flex flex-col">
        <span class="text-xl font-bold text-[#CEE377]">5,000+</span>
        <span class="text-xs">Lives Changed</span>
      </div>
      <div class="flex flex-col">
        <span class="text-xl font-bold text-[#CEE377]">24</span>
        <span class="text-xs">Communities</span>
      </div>
    </div>

    <!-- Main Content -->
    <div id="donate-form" class="flex items-center justify-center min-h-screen bg-[#e6f5f0] p-4 md:p-8 scroll-mt-16">
      <!-- Main Container with Image and Form -->
      <div class="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden mt-4 mb-4 md:mt-8 md:mb-8">
        <!-- Feature Image for Mobile (Visible only on mobile) -->
        <div class="block md:hidden w-full relative h-48">
          <img src="~/assets/img/toei_support.jpg" alt="Joining hands in support" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div class="text-white text-center p-4">
              <h1 class="text-2xl font-bold mb-2">Together We Can</h1>
              <p class="text-base">Make a lasting impact in our community</p>
            </div>
          </div>
        </div>

        <div class="flex flex-col md:flex-row">
          <!-- Image Section - Hidden on Mobile -->
          <div class="hidden md:block w-1/2 relative">
            <img src="~/assets/img/toei_support.jpg" alt="Joining hands in support"
              class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div class="text-white text-center p-8">
                <h1 class="text-4xl font-bold mb-4">Together We Can</h1>
                <p class="text-xl">Make a lasting impact in our community</p>
              </div>
            </div>
          </div>

          <!-- Form Section -->
          <div class="w-full md:w-1/2 p-6 md:p-8 lg:p-12">
            <div class="mb-6 md:mb-8">
              <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3">Join Us in Creating
                Hope</h2>
              <div class="space-y-2 text-gray-600">
                <p class="text-base md:text-lg">Your contribution creates ripples of positive change in
                  our
                  community. Every donation helps build a better tomorrow.</p>
                <p class="italic text-sm text-gray-500">Select a cause close to your heart.</p>
              </div>
            </div>

            <!-- Impact Cards with Enhanced Design - Adjust for mobile -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div v-for="item in impactCards" :key="item.title"
                class="text-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                :class="{ 'ring-2 ring-[#009976] bg-gray-100': formData.project === item.value }"
                @click="formData.project = item.value">
                <div class="text-2xl md:text-3xl mb-1 md:mb-2">{{ item.icon }}</div>
                <div class="font-medium text-sm md:text-base text-gray-800">{{ item.title }}</div>
              </div>
            </div>

            <!-- Donation Form -->
            <form @submit.prevent="initializePayment" class="space-y-4 md:space-y-6">
              <!-- Project Selection -->
              <div class="space-y-1">
                <label for="project" class="block text-sm font-medium text-gray-700">Select
                  Project</label>
                <select v-model="formData.project" id="project"
                  class="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009976] focus:border-[#009976] outline-none transition-colors text-sm md:text-base"
                  required>
                  <option value="">Choose a project</option>
                  <option v-for="item in impactCards" :key="item.value" :value="item.value">
                    {{ item.title }}
                  </option>
                </select>
              </div>

              <!-- Personal Information -->
              <div class="space-y-3 md:space-y-4">
                <div class="space-y-1">
                  <label for="name" class="block text-sm font-medium text-gray-700">Your Name</label>
                  <input v-model="formData.name" type="text" id="name"
                    class="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009976] focus:border-[#009976] outline-none transition-colors text-sm md:text-base"
                    placeholder="Enter your full name" required />
                </div>

                <div class="space-y-1">
                  <label for="email" class="block text-sm font-medium text-gray-700">Your
                    Email</label>
                  <input v-model="formData.email" type="email" id="email"
                    class="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009976] focus:border-[#009976] outline-none transition-colors text-sm md:text-base"
                    placeholder="Enter your email" required />
                </div>

                <div class="space-y-1">
                  <label for="phone" class="block text-sm font-medium text-gray-700">Phone
                    (Optional)</label>
                  <input v-model="formData.phone" type="tel" id="phone"
                    class="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009976] focus:border-[#009976] outline-none transition-colors text-sm md:text-base"
                    placeholder="Enter your phone number" />
                </div>
              </div>

              <!-- Currency and Amount Section -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <div class="space-y-1">
                  <label for="currency" class="block text-sm font-medium text-gray-700">Currency</label>
                  <select v-model="formData.currency" id="currency" @change="updateAmountMin"
                    class="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009976] focus:border-[#009976] outline-none transition-colors text-sm md:text-base"
                    required>
                    <option value="NGN">Naira (₦)</option>
                    <option value="USD">Dollar ($)</option>
                  </select>
                </div>

                <div class="space-y-1">
                  <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
                  <input v-model="formData.amount" type="number" id="amount" :min="minAmount"
                    class="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009976] focus:border-[#009976] outline-none transition-colors text-sm md:text-base"
                    placeholder="Enter amount" required />
                  <p v-if="formData.amount && formData.amount < minAmount" class="text-xs md:text-sm text-red-500 mt-1">
                    Minimum amount is {{ formData.currency === 'NGN' ? '₦10,000' : '$15' }}.
                  </p>
                </div>
              </div>

              <!-- Submit Button -->
              <button type="submit" :disabled="!isValid"
                class="w-full bg-[#009976] text-white py-2 md:py-3 px-4 md:px-6 rounded-xl hover:bg-[#00B28A] transition-all duration-300 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base">
                <span>Support Project</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clip-rule="evenodd" />
                </svg>
              </button>
            </form>

            <!-- Trust Indicators with Enhanced Design -->
            <div class="mt-6 pt-4 md:mt-8 md:pt-6 border-t border-gray-200">
              <div class="grid grid-cols-3 gap-2 md:gap-4 text-center">
                <div class="p-2 md:p-3">
                  <span class="text-lg md:text-xl mb-1 md:mb-2 block">🔒</span>
                  <span class="text-xs md:text-sm text-gray-600">Secure Payment</span>
                </div>
                <div class="p-2 md:p-3">
                  <span class="text-lg md:text-xl mb-1 md:mb-2 block">✨</span>
                  <span class="text-xs md:text-sm text-gray-600">Tax Deductible</span>
                </div>
                <div class="p-2 md:p-3">
                  <span class="text-lg md:text-xl mb-1 md:mb-2 block">💌</span>
                  <span class="text-xs md:text-sm text-gray-600">Receipt Provided</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

// Your existing script setup code
const formData = ref({
  project: '',
  name: '',
  email: '',
  phone: '',
  currency: 'NGN',
  amount: ''
});

const minAmount = ref(10000); // Default to NGN minimum

// Update minimum amount based on currency
const updateAmountMin = () => {
  minAmount.value = formData.value.currency === 'NGN' ? 10000 : 15;
};

// Validate form
const isValid = computed(() => {
  const numAmount = Number(formData.value.amount);
  return (
    formData.value.project &&
    formData.value.name &&
    formData.value.email &&
    numAmount >= minAmount.value
  );
});

// Impact Cards
const impactCards = [
  { title: 'Skills Acquisition', icon: '🎓', value: 'skills' },
  { title: 'Healthcare Outreach', icon: '🏥', value: 'healthcare' },
  { title: 'Community Development', icon: '🤝', value: 'community' },
];

// Initialize Paystack payment
const initializePayment = async () => {
  if (!isValid.value) return;

  try {
    // First, send the form data to Web3Forms
    const web3FormResponse = await $fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: {
        access_key: '67142dc6-5c30-4ff6-b1e1-fe03f014faac', // Replace with your actual key
        subject: `Donation from ${formData.value.name} for ${formData.value.project}`,
        from_name: 'The Oaktree Empowerment Initiative',
        name: formData.value.name,
        email: formData.value.email,
        phone: formData.value.phone || 'Not provided',
        project: getProjectTitle(formData.value.project),
        currency: formData.value.currency,
        amount: formData.value.amount,
        message: `New donation of ${formData.value.currency} ${formData.value.amount} for ${getProjectTitle(formData.value.project)} project.`,
      },
    });

    console.log('Web3Forms submission successful:', web3FormResponse);

    // Then proceed with Paystack payment
    const response = await $fetch('/api/donations/initialize', {
      method: 'POST',
      body: {
        ...formData.value,
        amount: Number(formData.value.amount) * 100, // Paystack expects kobo/cents
      },
    });

    window.location.href = response.data.authorization_url;
  } catch (err) {
    console.error('Process failed:', err);
    alert('Sorry, there was an error processing your donation. Please try again.');
  }
};

// Helper function to get the full project title
const getProjectTitle = (projectValue) => {
  const project = impactCards.find(card => card.value === projectValue);
  return project ? project.title : projectValue;
};

// Add smooth scroll for the "Donate Now" button
onMounted(() => {
  const donateButtons = document.querySelectorAll('a[href^="#"]');
  donateButtons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 16,
          behavior: 'smooth'
        });
      }
    });
  });
});

definePageMeta({
  layout: "landing",
});
</script>