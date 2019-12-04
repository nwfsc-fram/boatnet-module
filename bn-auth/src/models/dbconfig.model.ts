// NOTE: Boatnet apps are configured to automatically proxy Auth API requests
// so this will usually only be specified in production builds

export interface DBConfig {
    apiUrl?: string;  // Boatnet Auth API
    // Example apiUrl: 'https://localhost:9000'
}