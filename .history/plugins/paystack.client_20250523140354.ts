export default defineNuxtPlugin(() => {
    return {
      provide: {
        paystack: {
          loadScript: () => {
            return new Promise((resolve, reject) => {
              if (typeof window.PaystackPop !== 'undefined') {
                return resolve(true);
              }
  
              const script = document.createElement('script');
              script.src = 'https://js.paystack.co/v1/inline.js';
              script.onload = () => resolve(true);
              script.onerror = () => reject(new Error('Failed to load Paystack script'));
              document.head.appendChild(script);
            });
          },
          initializePayment: async (options: any) => {
            await (window as any).$paystack?.loadScript();
            const handler = (window as any).PaystackPop.setup({
              ...options,
              callback: function(response: any) {
                window.location.href = `${useRuntimeConfig().public.siteUrl}/donation/success?reference=${response.reference}`;
              }
            });
            handler.openIframe();
          }
        }
      }
    }
  });