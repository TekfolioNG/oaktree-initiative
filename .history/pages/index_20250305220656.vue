<script setup lang="ts">
definePageMeta({
  layout: "landing"
});

useSeoMeta({
  title: 'The OakTree Empowerment Initiative',
  ogTitle: 'The OakTree Empowerment Initiative',
  titleTemplate: 'The OakTree Empowerment Initiative',
  description: 'Rebuilding Lives & Communities',
  ogDescription: 'Rebuilding Lives & Communities',

  twitterCard: 'summary_large_image',
  twitterTitle: 'The OakTree Empowerment Initiative',
  twitterDescription: 'Rebuilding Lives & Communities',

  ogImage: {
    url: 'https://petabiz-telco.com/Petabiz-Telco.png',
    width: 1200,
    height: 630,
    alt: 'The OakTree Empowerment Initiative - Rebuilding Lives & Communities'
  },
  twitterImage: 'https://petabiz-telco.com/Petabiz-Telco.png'
})
</script>

<template>
  <LandingContainer>
    <LandingHero></LandingHero>
    <LandingFeatures></LandingFeatures>
    <LandingOurFocus></LandingOurFocus>
    <LandingSupport></LandingSupport>
    <LazyLandingReach></LazyLandingReach>
    <LandingCta></LandingCta>
    <LandingCookiesPopup></LandingCookiesPopup>
  </LandingContainer>
</template>
