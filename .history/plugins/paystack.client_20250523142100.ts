export default defineNuxtPlugin((nuxtApp) => {
    // Load Paystack script with better error handling
    const loadPaystackScript = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (window.PaystackPop) return resolve();
  
        const script = document.createElement('script');
        script.src = 'https://js.paystack.co/v1/inline.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Paystack script'));
        document.head.appendChild(script);
      });
    };
  
    return {
      provide: {
        paystack: {
          initPayment: async (options: any) => {
            try {
              await loadPaystackScript();
              
              return new Promise((resolve, reject) => {
                const handler = window.PaystackPop.setup({
                  ...options,
                  callback: function(response: any) {
                    resolve(response);
                  },
                  onClose: function() {
                    reject(new Error('Payment window closed'));
                  }
                });
                handler.openIframe();
              });
            } catch (error) {
              throw new Error(`Paystack initialization failed: ${error.message}`);
            }
          }
        }
      }
    };
  });