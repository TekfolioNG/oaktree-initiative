declare global {
    interface Window {
      PaystackPop: {
        setup: (options: PaystackOptions) => { openIframe: () => void };
      };
    }
  }
  
  interface PaystackOptions {
    key: string;
    email: string;
    amount: number;
    currency?: string;
    ref: string;
    callback?: (response: PaystackResponse) => void;
    onClose?: () => void;
  }
  
  interface PaystackResponse {
    reference: string;
    status: 'success' | 'failed';
    transaction: string;
  }
  
  export default defineNuxtPlugin(() => {
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
          initPayment: async (options: PaystackOptions): Promise<PaystackResponse> => {
            try {
              await loadPaystackScript();
              
              return new Promise((resolve, reject) => {
                if (!window.PaystackPop) {
                  return reject(new Error('Paystack not loaded'));
                }
  
                const handler = window.PaystackPop.setup({
                  ...options,
                  callback: (response) => {
                    if (response.status === 'success') {
                      resolve(response);
                    } else {
                      reject(new Error('Payment failed'));
                    }
                  },
                  onClose: () => {
                    reject(new Error('Payment window closed'));
                  }
                });
                handler.openIframe();
              });
            } catch (error: unknown) {
              if (error instanceof Error) {
                throw new Error(`Payment initialization failed: ${error.message}`);
              }
              throw new Error('Unknown payment error occurred');
            }
          }
        }
      }
    };
  });