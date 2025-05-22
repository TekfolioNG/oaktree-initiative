<template>
    <section class="impact-section">
        <div class="header-background"></div>
        <div class="impact-background">
            <div class="container">
                <div class="content-wrapper">
                    <h2 class="impact-title">Transforming Tomorrow</h2>
                    <p class="impact-subtitle">Creating pathways for <span class="highlight">SUSTAINABLE CHANGE AND
                            COMMUNITY REVIVAL</span></p>

                    <div class="impact-card">
                        <div class="card-content">
                            <p class="impact-fact">
                                <strong>It's a fact:</strong> "When we empower one individual with skills and
                                opportunity, we strengthen entire communities against the cycle of poverty and
                                hopelessness."
                            </p>

                            <div class="divider"></div>

                            <p class="impact-description">
                                The Oaktree Empowerment Initiative creates sustainable change through skills
                                development, rehabilitation support, and community infrastructure projects. Our work
                                bridges gaps and transforms lives across Nigeria.
                            </p>

                            <h3 class="impact-subheading">Breaking barriers to progress and prosperity</h3>

                            <div class="impact-text-wrapper">
                                <div class="image-accent">
                                    <img src="@/assets/img/toei-our-impact.png" alt="Our impact in communities"
                                        class="impact-accent-image">
                                </div>

                                <p class="impact-text">
                                    Individuals facing challenges typically lack proper skills, healthcare, and support
                                    systems. They're also more likely to be exposed to economic instability and limited
                                    opportunities. All of this can impair personal development, negatively impacting
                                    long-term physical and mental well-being.
                                </p>

                                <p class="impact-text">
                                    TOEI contributors invest in the lives of individuals, helping them acquire the
                                    education, skills and confidence they need to build self-sustaining futures. The
                                    force of our combined efforts starts a powerful multiplier effect that empowers
                                    people to change their own lives and futures, transforming their families and
                                    communities too.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="programs-section">
        <div class="container">
            <!-- Top section with gray background -->
            <div class="approach-container">
                <div class="approach-grid">
                    <div class="approach-text">
                        <h2 class="approach-title"><strong>The right solutions at the right place.</strong></h2>
                    </div>
                    <div class="approach-description">
                        <p class="approach-paragraph">
                            <strong>We don't believe in taking a one-size-fits-all approach to rebuilding
                                lives.</strong>
                            What works for a former inmate in Lagos is far different than what a rural community in
                            Kaduna needs.
                            It's an approach we call <em>contextual empowerment</em>, which means our programs adapt and
                            change with individuals' circumstances and community needs, matched with the most urgent
                            challenges and available resources in their regions.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Outcomes section with white background -->
            <div class="outcomes-section">
                <h2 class="outcomes-title"><strong>Our programs focus on four key outcomes</strong></h2>

                <div class="outcomes-grid">
                    <div class="outcome-card">
                        <div class="outcome-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                            </svg>
                        </div>
                        <h3 class="outcome-name">SKILLS TRAINING</h3>
                    </div>

                    <div class="outcome-card">
                        <div class="outcome-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                        </div>
                        <h3 class="outcome-name">EMPOWERMENT</h3>
                    </div>

                    <div class="outcome-card">
                        <div class="outcome-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                            </svg>
                        </div>
                        <h3 class="outcome-name">HEALTHCARE</h3>
                    </div>

                    <div class="outcome-card">
                        <div class="outcome-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                            </svg>
                        </div>
                        <h3 class="outcome-name">INFRASTRUCTURE</h3>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <LandingSkillsTraining id="skills-training" />
    <LandingEmpowerment id="empowerment" />
    <LandingHealthcare id="healthcare" />
    <LandingInfrastructure id="infrastructure" />
    <LandingTestimonial id="testimonial" />
</template>

<style scoped>
.impact-section {
    padding: 8rem 2rem 4rem;
    /* Added more top padding to avoid navbar overlap */
    position: relative;
}

.impact-background {
    background-color: #f8faf7;
    padding: 1rem;
    border-radius: 12px;
}

.container {
    max-width: 1000px;
    margin: 0 auto;
}

.content-wrapper {
    position: relative;
}

.impact-title {
    font-size: 2.5rem;
    color: #333;
    text-align: center;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.impact-subtitle {
    text-align: center;
    color: #666;
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
}

.highlight {
    color: #901F61;
    font-weight: 500;
}

.impact-card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07);
    padding: 2rem;
    position: relative;
}

.card-content {
    max-width: 850px;
    margin: 0 auto;
}

.divider {
    height: 2px;
    background-color: #CEE377;
    margin: 1.5rem 0;
    width: 100%;
}

.impact-fact {
    font-size: 1.25rem;
    text-align: center;
    color: #333;
    margin: 1rem 0;
    font-style: italic;
}

.impact-fact strong {
    color: #065f46;
    /* emerald-700 */
    font-style: normal;
}

.impact-description {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    color: #4b5563;
}

.impact-subheading {
    font-size: 1.5rem;
    color: #065f46;
    /* emerald-700 */
    margin-bottom: 1.25rem;
    font-weight: 600;
}

.impact-text-wrapper {
    position: relative;
}

.image-accent {
    float: right;
    width: 40%;
    margin: 0 0 1.5rem 1.5rem;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    shape-outside: margin-box;
}

.impact-accent-image {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.3s ease;
}

.image-accent:hover .impact-accent-image {
    transform: scale(1.02);
}

.impact-text {
    font-size: 1.05rem;
    line-height: 1.7;
    color: #4b5563;
    margin-bottom: 1.5rem;
}

@media (max-width: 992px) {
    .impact-section {
        padding: 7rem 1.5rem 3rem;
    }

    .image-accent {
        width: 50%;
        margin: 0 0 1rem 1rem;
    }
}

@media (max-width: 768px) {
    .impact-section {
        padding: 6rem 1.25rem 2.5rem;
    }

    .impact-card {
        padding: 1.5rem;
    }

    .impact-title {
        font-size: 2rem;
    }

    .impact-subheading {
        font-size: 1.3rem;
    }

    .image-accent {
        float: none;
        width: 100%;
        max-width: 450px;
        margin: 0 auto 2rem;
        display: block;
    }
}

@media (max-width: 480px) {
    .impact-section {
        padding: 5rem 1rem 2rem;
    }

    .impact-card {
        padding: 1.25rem;
    }

    .impact-title {
        font-size: 1.75rem;
    }

    .impact-subtitle {
        font-size: 1rem;
    }

    .impact-fact {
        font-size: 1.1rem;
    }

    .impact-text {
        font-size: 1rem;
    }
}

.programs-section {
    padding: 0;
    background-color: white;
}

.container {
    max-width: 100%;
    margin: 0 auto;
}

/* New approach container with gray background */
.approach-container {
    background-color: #f8f8f8;
    padding: 4rem 0;
}

.approach-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 3rem;
    margin: 0 auto;
    align-items: start;
    max-width: 60%;
    /* Content takes up 3/5th of the width */
}

.approach-title {
    font-size: 2.2rem;
    /* Slightly reduced from 2.5rem */
    line-height: 1.2;
    color: #065f46;
    /* emerald-700 */
    font-weight: 700;
    /* Made bold */
    margin: 0;
}

.approach-paragraph {
    font-size: 1.125rem;
    line-height: 1.7;
    color: #333;
    margin: 0;
}

.approach-paragraph strong {
    font-weight: 600;
}

.approach-paragraph em {
    color: #901F61;
    font-style: normal;
    font-weight: 500;
}

.outcomes-section {
    text-align: center;
    padding: 4rem 0;
    margin: 0 auto;
    max-width: 60%;
    /* Content takes up 3/5th of the width */
}

.outcomes-title {
    font-size: 1.8rem;
    /* Slightly reduced from 2rem */
    color: #333;
    margin-bottom: 3rem;
    font-weight: 700;
    /* Made bold */
}

.outcomes-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    justify-content: center;
}

.outcome-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem;
    transition: transform 0.3s ease;
}

.outcome-card:hover {
    transform: translateY(-5px);
}

.outcome-icon {
    background-color: #f0f9f4;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    color: #065f46;
    /* emerald-700 */
    transition: background-color 0.3s ease, color 0.3s ease;
}

.outcome-card:hover .outcome-icon {
    background-color: #CEE377;
    color: #054033;
}

.outcome-name {
    font-size: 1rem;
    font-weight: 600;
    color: #333;
    margin-top: 0.5rem;
}

@media (max-width: 1400px) {

    .approach-grid,
    .outcomes-section {
        max-width: 70%;
    }
}

@media (max-width: 1200px) {

    .approach-grid,
    .outcomes-section {
        max-width: 80%;
    }
}

@media (max-width: 992px) {
    .approach-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
        max-width: 85%;
    }

    .outcomes-section {
        max-width: 85%;
    }

    .outcomes-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
    }
}

@media (max-width: 768px) {
    .approach-container {
        padding: 3rem 1.5rem;
    }

    .approach-grid,
    .outcomes-section {
        max-width: 90%;
    }

    .approach-title {
        font-size: 2rem;
        text-align: center;
    }

    .approach-paragraph {
        font-size: 1rem;
    }

    .outcomes-title {
        font-size: 1.75rem;
    }

    .outcomes-section {
        padding: 3rem 1.5rem;
    }
}

@media (max-width: 480px) {
    .approach-container {
        padding: 2rem 1rem;
    }

    .outcomes-section {
        padding: 2rem 1rem;
    }

    .approach-grid,
    .outcomes-section {
        max-width: 95%;
    }

    .outcomes-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    .approach-title {
        font-size: 1.75rem;
    }

    .outcomes-title {
        font-size: 1.5rem;
        margin-bottom: 2rem;
    }
}

.header-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 120px;
    /* Increased from 80px */
    background-color: rgba(0, 0, 0, 0.8);
    z-index: -1;
}

@media (max-width: 992px) {
    .header-background {
        height: 105px;
        /* Increased from 70px */
    }
}

@media (max-width: 768px) {
    .header-background {
        height: 95px;
        /* Increased from 60px */
    }
}

@media (max-width: 480px) {
    .header-background {
        height: 85px;
        /* Increased from 50px */
    }
}
</style>

<script setup lang="ts">
definePageMeta({
    layout: "landing"
});

useSeoMeta({
    title: 'Our Vision | The OakTree Empowerment Initiative',
    ogTitle: 'Our Vision | The OakTree Empowerment Initiative',
    titleTemplate: 'Our Vision | The OakTree Empowerment Initiative',
    description: 'Rebuilding Lives & Communities',
    ogDescription: 'Rebuilding Lives & Communities',

    twitterCard: 'summary_large_image',
    twitterTitle: 'Our Vision | The OakTree Empowerment Initiative',
    twitterDescription: 'Our Vision | The OakTree Empowerment Initiative',

    ogImage: {
        url: 'https://oaktreeinitiative.org/toei-empowerment.jpg',
        width: 1200,
        height: 630,
        alt: 'The OakTree Empowerment Initiative - Rebuilding Lives & Communities'
    },
    twitterImage: 'https://oaktreeinitiative.org/toei-empowerment.jpg'
});
</script>