
export default defineNuxtPlugin((nuxtApp) => {
const paystackScript = document.createElement('script')
paystackScript.src = 'https://js.paystack.co/v1/inline.js'
document.head.appendChild(paystackScript)
})