<template>
    <div class="min-h-screen bg-[#e6f5f0] py-16 px-4">
        <div class="max-w-5xl mx-auto">
            <h2 class="text-4xl font-bold text-center mb-10 text-emerald-800">Share Your Ideas</h2>

            <!-- Main content container with side-by-side layout -->
            <div class="flex flex-col md:flex-row gap-8 items-stretch">
                <!-- Form section -->
                <div
                    class="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl md:flex-1">
                    <div class="p-8">
                        <p class="text-lg text-center mb-6 text-emerald-700 font-medium">
                            Help shape the future of The Oaktree Empowerment Initiative in Nigeria
                        </p>

                        <!-- Idea submission form -->
                        <form @submit.prevent="submitIdea" class="space-y-5">
                            <div style="display: none;">
                                <input type="checkbox" name="botcheck" id="botcheck" class="hidden"
                                    style="display: none;">
                            </div>

                            <!-- Personal Information Section -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <input v-model="firstName" type="text" id="firstName"
                                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                        placeholder="First Name*" required @input="updatePaperContent('name')" />
                                </div>
                                <div>
                                    <input v-model="lastName" type="text" id="lastName"
                                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                        placeholder="Last Name*" required @input="updatePaperContent('name')" />
                                </div>
                            </div>

                            <div>
                                <input v-model="email" type="email" id="email"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                    placeholder="Email Address*" required @input="updatePaperContent('email')" />
                            </div>

                            <div>
                                <input v-model="phone" type="tel" id="phone"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                    placeholder="Phone Number" @input="updatePaperContent('phone')" />
                            </div>
                            <!-- Idea Details Section -->
                            <div>
                                <input v-model="ideaSubject" type="text" id="subject"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                    placeholder="Subject*" required @input="updatePaperContent('subject')" />
                            </div>

                            <div>
                                <input v-model="location" type="text" id="location"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                    placeholder="Target Location" @input="updatePaperContent('location')" />
                            </div>

                            <div>
                                <textarea v-model="ideaDescription" id="description" rows="4"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                    placeholder="Please describe your idea in detail. What problem does it solve? Who will benefit? What resources might be needed?"
                                    required @input="updatePaperContent('description')"></textarea>
                            </div>

                            <!-- Additional Information -->
                            <div>
                                <div>
                                    <label for="involvement"
                                        class="block text-sm font-semibold text-gray-700 mb-2">Would you like to be
                                        involved in implementing this idea?</label>
                                    <div class="flex items-center space-x-4 mt-1">
                                        <label class="inline-flex items-center">
                                            <input type="radio" v-model="involvement" value="yes"
                                                class="form-radio text-emerald-600">
                                            <span class="ml-2 text-gray-700">Yes</span>
                                        </label>
                                        <label class="inline-flex items-center">
                                            <input type="radio" v-model="involvement" value="no"
                                                class="form-radio text-emerald-600">
                                            <span class="ml-2 text-gray-700">No</span>
                                        </label>
                                        <label class="inline-flex items-center">
                                            <input type="radio" v-model="involvement" value="maybe"
                                                class="form-radio text-emerald-600">
                                            <span class="ml-2 text-gray-700">Maybe</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="flex justify-center mt-8">
                                <button type="submit"
                                    class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg inline-block transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-200"
                                    :class="{ 'opacity-50 cursor-not-allowed': isAnimating }" :disabled="isAnimating">
                                    <span v-if="!isAnimating">Submit Your Idea</span>
                                    <span v-else class="flex items-center">
                                        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                            </path>
                                        </svg>
                                        Processing...
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Animation container -->
                <div class="bg-white rounded-xl shadow-lg overflow-hidden relative md:flex-1">
                    <div class="animation-container relative w-full h-full flex items-center justify-center"
                        style="min-height: 400px;">
                        <!-- Paper document - centered positioning -->
                        <div ref="paper"
                            class="absolute w-52 h-64 bg-white border-2 border-gray-300 rounded-md shadow-md z-10 transform-gpu"
                            :style="paperStyle">
                            <div class="w-full h-2 bg-emerald-600 mt-3"></div>

                            <!-- Dynamic content that shows up as user types with typing animation -->
                            <div v-for="(line, index) in paperLines" :key="index"
                                class="relative h-1.5 bg-gray-700 mx-auto mt-3 transition-all duration-300"
                                :style="{ width: line.width, maxWidth: '80%' }">
                                <div v-if="line.isActive && line.isTyping"
                                    class="cursor-animation absolute right-0 top-50 transform translate-x-full -translate-y-1/4">
                                </div>
                            </div>
                        </div>

                        <!-- Pen for writing animation - positioned closer to paper and with animation -->
                        <div ref="pen" class="absolute w-8 h-2 bg-blue-700 rounded-sm z-20 transform-gpu pen-animate"
                            :style="penStyle">
                            <!-- Pen tip -->
                            <div class="absolute -right-1 top-0 w-2 h-2 bg-blue-900 transform rotate-45"></div>
                            <!-- Pen body -->
                            <div class="absolute -left-6 -top-1 w-6 h-4 bg-blue-500 rounded-sm"></div>
                        </div>

                        <!-- Ideas Box - centered positioning -->
                        <div class="absolute bottom-24 mx-auto" style="width: 180px; height: 160px;">
                            <!-- Box back -->
                            <div
                                class="absolute bottom-0 w-full h-32 bg-gradient-to-b from-amber-600 to-amber-700 rounded-md shadow-md">
                            </div>
                            <!-- Box opening -->
                            <div class="absolute bottom-32 w-full h-6 bg-amber-800 rounded-t-md"></div>
                            <!-- Box left flap -->
                            <div ref="leftFlap" :class="flapClass"
                                class="absolute bottom-32 left-0 w-24 h-16 bg-gradient-to-r from-amber-500 to-amber-600 origin-bottom-left"
                                :style="leftFlapStyle"></div>
                            <!-- Box right flap -->
                            <div ref="rightFlap" :class="flapClass"
                                class="absolute bottom-32 right-0 w-24 h-16 bg-gradient-to-l from-amber-500 to-amber-600 origin-bottom-right"
                                :style="rightFlapStyle"></div>

                            <!-- Box Label -->
                            <div class="absolute bottom-16 w-full text-center">
                                <div
                                    class="bg-white px-3 py-1.5 rounded-md inline-block text-sm font-bold shadow-sm border border-amber-200">
                                    IDEAS BOX</div>
                            </div>

                            <!-- Decorative elements -->
                            <div class="absolute bottom-8 left-6 w-36 h-1 bg-amber-500 rounded"></div>
                            <div class="absolute bottom-11 left-10 w-28 h-1 bg-amber-500 rounded"></div>

                            <!-- Ideas count label - changed to green background -->
                            <div v-if="showIdeasCount"
                                class="absolute -top-4 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md ideas-count">
                                {{ ideasCount }}
                            </div>
                        </div>

                        <div v-if="submissionStatus"
                            class="absolute bottom-4 w-full text-center text-lg font-medium px-4 py-2 rounded-lg transition-all duration-500"
                            :class="submissionStatusClass">
                            {{ submissionStatus }}
                        </div>

                        <!-- Initial instruction text -->
                        <div v-if="!isAnimating && !animationComplete"
                            class="text-center text-gray-500 absolute bottom-4 px-8">
                            Your idea Will Be Reviewed for Implementation
                        </div>
                    </div>
                </div>
            </div>

            <!-- Additional information section -->
            <div class="mt-16 text-center">
                <h3 class="text-2xl font-semibold text-emerald-800 mb-4">Why Share Your Ideas?</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div
                        class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-200">
                        <div
                            class="bg-emerald-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-emerald-600" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <h4 class="text-lg font-semibold text-gray-800 mb-2">Inspire Change</h4>
                        <p class="text-gray-600">Your ideas can transform communities and create lasting positive
                            impact.</p>
                    </div>

                    <div
                        class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-200">
                        <div
                            class="bg-emerald-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-emerald-600" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h4 class="text-lg font-semibold text-gray-800 mb-2">Community Driven</h4>
                        <p class="text-gray-600">We believe in solutions that come directly from the communities we
                            serve.</p>
                    </div>

                    <div
                        class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-200">
                        <div
                            class="bg-emerald-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-emerald-600" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                        </div>
                        <h4 class="text-lg font-semibold text-gray-800 mb-2">Make It Happen</h4>
                        <p class="text-gray-600">We implement the most promising ideas with the help of our
                            dedicated
                            volunteers.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import gsap from 'gsap';
import { computed, onMounted, ref } from 'vue';

// Form data
const ideaSubject = ref('');
const ideaDescription = ref('');
const email = ref('');

// Web3Forms access key - replace with your actual key
const WEB3FORMS_ACCESS_KEY = '67142dc6-5c30-4ff6-b1e1-fe03f014faac';

// Animation state
const isAnimating = ref(false);
const animationComplete = ref(false);
const submissionStatus = ref('');
const submissionStatusClass = computed(() =>
    submissionStatus.value.includes('Success')
        ? 'bg-green-100 text-green-700 border border-green-200'
        : 'bg-red-100 text-red-700 border border-red-200'
);

// Paper lines state - enhanced for writing simulation
const paperLines = ref([
    { id: 'subject', isActive: false, width: '0%', isTyping: false },
    { id: 'desc1', isActive: false, width: '0%', isTyping: false },
    { id: 'desc2', isActive: false, width: '0%', isTyping: false },
    { id: 'email', isActive: false, width: '0%', isTyping: false }
]);

// Ideas count animation
const ideasCount = ref(15);
const showIdeasCount = ref(true);

// Element refs
const paper = ref(null);
const pen = ref(null);
const leftFlap = ref(null);
const rightFlap = ref(null);

// Paper positioned initially more centered (was at top-right corner)
const paperStyle = computed(() => ({
    top: isAnimating.value ? '50%' : '40%',
    left: isAnimating.value ? '50%' : '50%', // Centered horizontally
    transform: `translate(-50%, -50%) ${animationComplete.value ? 'scale(0.8) rotate(5deg)' : 'scale(0.75) rotate(-8deg)'}`,
    opacity: 1,
    transition: isAnimating.value ? 'none' : 'all 0.3s ease'
}));

// Pen positioning - improved to stay closer to paper
const penStyle = computed(() => ({
    display: isPenVisible.value ? 'block' : 'none',
    top: penPosition.value.top + '%',
    left: penPosition.value.left + '%',
    transform: `rotate(${penPosition.value.rotate}deg)`,
    opacity: isPenAnimating.value ? 1 : 0
}));

const isPenVisible = ref(false);
const isPenAnimating = ref(false);
const penPosition = ref({ top: 20, left: 50, rotate: 30 });
const activeLine = ref(null);

const leftFlapStyle = computed(() => ({
    transform: `rotate(${animationComplete.value ? 0 : -60}deg)`
}));

const rightFlapStyle = computed(() => ({
    transform: `rotate(${animationComplete.value ? 0 : 60}deg)`
}));

const flapClass = computed(() =>
    animationComplete.value ? 'transition-transform duration-1000' : ''
);

// Improved pen animation that follows cursor position on the active form field
const updatePaperContent = (field) => {
    let lineIndex = -1;
    let targetWidth = '0%';

    if (field === 'subject' && ideaSubject.value) {
        lineIndex = 0;
        targetWidth = Math.min(95, ideaSubject.value.length * 3) + '%';
    } else if (field === 'description' && ideaDescription.value) {
        const words = ideaDescription.value.split(' ');

        if (words.length > 0) {
            lineIndex = 1;
            targetWidth = Math.min(95, words.length * 5) + '%';
        }

        if (words.length > 5) {
            setTimeout(() => {
                paperLines.value[2].isActive = true;
                paperLines.value[2].width = Math.min(95, (words.length - 5) * 5) + '%';
                animatePenToLine(2);
            }, 300);
        }
    } else if (field === 'email' && email.value) {
        lineIndex = 3;
        targetWidth = Math.min(95, email.value.length * 4) + '%';
    }

    if (lineIndex >= 0) {
        // Store active line for pen animation
        activeLine.value = lineIndex;

        // Activate the line
        paperLines.value[lineIndex].isActive = true;
        paperLines.value[lineIndex].isTyping = true;

        // Animate the pen to write this line
        animatePenToLine(lineIndex);

        // Simulate typing by gradually increasing the width
        const currentWidth = parseInt(paperLines.value[lineIndex].width) || 0;
        const targetWidthNum = parseInt(targetWidth);

        if (targetWidthNum > currentWidth) {
            animateLineWidth(lineIndex, targetWidthNum);
        }
    }
};

// Position pen above the specific line - improved to be closer to paper
const animatePenToLine = (lineIndex) => {
    isPenVisible.value = true;
    isPenAnimating.value = true;

    // Calculate position based on line index (each line is lower on the paper)
    const topPositions = [25, 35, 45, 55];

    // Calculate pen position - closer to where text appears on paper
    const lineWidth = parseInt(paperLines.value[lineIndex].width) || 10;
    const leftPos = Math.min(40 + (lineWidth / 3), 75); // Pen follows progress across the line

    // Set pen position
    penPosition.value = {
        top: topPositions[lineIndex],
        left: leftPos,
        rotate: 25 + (Math.random() * 5) // Smaller rotation variance for more natural writing
    };

    // Apply scribbling animation when pen is visible
    if (pen.value) {
        pen.value.classList.add('is-writing');
    }
};

// Enhanced animation for line width increase with synchronous pen movement
const animateLineWidth = (lineIndex, targetWidth) => {
    const currentWidth = parseInt(paperLines.value[lineIndex].width) || 0;
    const steps = 10;
    const increment = (targetWidth - currentWidth) / steps;
    let step = 0;

    const animation = setInterval(() => {
        step++;
        const newWidth = currentWidth + (increment * step);
        paperLines.value[lineIndex].width = `${Math.min(newWidth, targetWidth)}%`;

        // Move pen along with text
        if (isPenAnimating.value && activeLine.value === lineIndex) {
            const leftPos = Math.min(40 + (newWidth / 3), 75);
            penPosition.value.left = leftPos;
        }

        if (step >= steps) {
            clearInterval(animation);
            paperLines.value[lineIndex].isTyping = false;

            // Don't immediately hide pen, let it linger briefly
            setTimeout(() => {
                if (activeLine.value === lineIndex) {
                    if (pen.value) {
                        pen.value.classList.remove('is-writing');
                    }
                    isPenAnimating.value = false;
                }
            }, 300);
        }
    }, 50);
};

// Form validation function
const validateForm = () => {
    if (!ideaSubject.value.trim()) {
        submissionStatus.value = "Please enter an idea subject";
        return false;
    }

    if (!ideaDescription.value.trim()) {
        submissionStatus.value = "Please describe your idea";
        return false;
    }

    if (!email.value.trim() || !email.value.includes('@')) {
        submissionStatus.value = "Please enter a valid email address";
        return false;
    }

    return true;
};

// Enhanced form submission animation with Web3Forms integration
const submitIdea = async () => {
    if (isAnimating.value) return;

    // Validate form before proceeding
    if (!validateForm()) {
        return;
    }

    isAnimating.value = true;
    submissionStatus.value = '';
    isPenVisible.value = false;

    // Create animation timeline
    const tl = gsap.timeline({
        onComplete: () => {
            // Set flaps to close
            animationComplete.value = true;

            // Add slight bounce to the box when paper falls in
            gsap.to('.animation-container', {
                y: 5,
                duration: 0.1,
                repeat: 1,
                yoyo: true
            });

            setTimeout(() => {
                // Show success message
                submissionStatus.value = "Success! Your idea has been submitted.";

                // Increment ideas count with animation
                ideasCount.value++;
                pulseIdeasCount();

                // Reset after 3 seconds
                setTimeout(() => {
                    // Reset animation state but keep paper visible
                    isAnimating.value = false;
                    animationComplete.value = false;

                    // Start a new animation to return paper to original position
                    gsap.to(paper.value, {
                        top: '40%', // Updated to match initial position
                        left: '50%', // Centered horizontally
                        rotation: -8,
                        scale: 0.85,
                        duration: 0.8,
                        ease: "power2.out"
                    });

                    // Reset form fields
                    ideaSubject.value = '';
                    ideaDescription.value = '';
                    email.value = '';

                    // Reset paper content
                    paperLines.value.forEach(line => {
                        line.isActive = false;
                        line.width = '0%';
                        line.isTyping = false;
                    });

                    // Clear status message after delay
                    setTimeout(() => {
                        submissionStatus.value = '';
                    }, 500);
                }, 3000);
            }, 500);
        }
    });

    try {
        // Prepare the form data for Web3Forms
        const formData = new FormData();

        // Add your Web3Forms access key
        formData.append('access_key', WEB3FORMS_ACCESS_KEY);

        // Add the form fields
        formData.append('subject', `New Idea: ${ideaSubject.value}`);
        formData.append('idea_subject', ideaSubject.value);
        formData.append('idea_description', ideaDescription.value);
        formData.append('from_email', email.value);

        // Send the form data to Web3Forms API
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            // Paper animation sequence - paper flies from starting position to box
            tl.to(paper.value, {
                top: '30%',
                left: '50%', // Keep centered horizontally
                rotation: 10,
                duration: 0.5,
                ease: "power1.out"
            })
                .to(paper.value, {
                    top: '40%',
                    left: '50%', // Keep centered horizontally
                    rotation: -10,
                    duration: 0.5,
                    ease: "power1.inOut"
                })
                .to(paper.value, {
                    top: '55%',
                    left: '50%', // Keep centered horizontally
                    rotation: 5,
                    scale: 0.8,
                    duration: 0.7,
                    ease: "power2.in"
                });

            // Add a slight bounce at the end of the paper's movement
            tl.to(paper.value, {
                y: '+=15',  // Increased from +=10 to +=15 for a more pronounced bounce
                duration: 0.2,
                ease: "power1.in"
            })
                .to(paper.value, {
                    y: '-=8',   // Increased from -=5 to -=8
                    duration: 0.2,
                    ease: "power1.out"
                });
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        submissionStatus.value = "Something went wrong. Please try again.";
        isAnimating.value = false;
        console.error("Error submitting idea:", error);
    }
};

// Animate the ideas count badge
const pulseIdeasCount = () => {
    gsap.to('.ideas-count', {
        scale: 1.3,
        duration: 0.3,
        repeat: 1,
        yoyo: true
    });
};

// Show a welcome animation when form fields receive focus
const showWelcomePen = () => {
    setTimeout(() => {
        isPenVisible.value = true;
        penPosition.value = {
            top: 25, // Adjusted for center positioning
            left: 50, // Centered
            rotate: 25
        };

        gsap.to(pen.value, {
            x: 10,
            y: 5,
            duration: 0.8,
            repeat: 1,
            yoyo: true,
            onComplete: () => {
                if (!isPenAnimating.value) {
                    isPenVisible.value = false;
                }
            }
        });
    }, 1000);
};

// Add hover effects to the paper
const addPaperHoverEffect = () => {
    if (paper.value) {
        paper.value.addEventListener('mouseleave', () => {
            if (!isAnimating.value) {
                gsap.to(paper.value, {
                    rotation: -5, // Change this to -8 to match your new rotation
                    y: 0,
                    duration: 0.3
                });
            }
        });
        paper.value.addEventListener('mouseleave', () => {
            if (!isAnimating.value) {
                gsap.to(paper.value, {
                    rotation: -5,
                    y: 0,
                    duration: 0.3
                });
            }
        });
    }
};

// Animated ideas count when page loads
onMounted(() => {
    // Make ideas count start at a lower number and count up for initial animation
    const targetCount = ideasCount.value;
    ideasCount.value = targetCount - 10;

    const interval = setInterval(() => {
        if (ideasCount.value < targetCount) {
            ideasCount.value++;
        } else {
            clearInterval(interval);
        }
    }, 100);

    // Add paper hover effect
    addPaperHoverEffect();

    // Show welcome pen animation
    showWelcomePen();
});
</script>

<style scoped>
.animation-container {
    perspective: 1000px;
    min-height: 350px;
    /* Increased from 300px */
}

.cursor-animation {
    width: 1.5px;
    height: 10px;
    background-color: #2563eb;
    animation: blink 0.7s infinite;
}

@keyframes blink {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }
}

/* Enhanced pen writing animation */
.pen-animate {
    transition: transform 0.2s, top 0.5s, left 0.5s;
}

.is-writing {
    animation: write 0.5s infinite ease-in-out;
}

@keyframes write {
    0% {
        transform: translateX(-2px) translateY(-1px) rotate(28deg);
    }

    25% {
        transform: translateX(0px) translateY(1px) rotate(30deg);
    }

    50% {
        transform: translateX(2px) translateY(-1px) rotate(32deg);
    }

    75% {
        transform: translateX(0px) translateY(1px) rotate(30deg);
    }

    100% {
        transform: translateX(-2px) translateY(-1px) rotate(28deg);
    }
}

.ideas-count {
    animation: pulse 2s infinite;
}

@keyframes pulse {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
    }
}

#paper {
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0, 0, 0, 0.02) 1px, transparent 1px);
    background-size: 15px 15px;
}
</style>