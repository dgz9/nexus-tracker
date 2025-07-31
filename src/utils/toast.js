// Simple toast wrapper that can be connected to HeroUI's toast system
const toast = {
  success: (message) => {
    console.log('[Success]', message);
    // This will be connected to HeroUI's toast system in the providers
  },
  error: (message) => {
    console.error('[Error]', message);
    // This will be connected to HeroUI's toast system in the providers
  },
  info: (message) => {
    console.info('[Info]', message);
    // This will be connected to HeroUI's toast system in the providers
  }
};

export default toast;