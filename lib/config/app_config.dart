
class AppConfig {
  // API endpoints
  static const String baseUrl = 'https://api.mindmate-hub.example.com';
  static const String loginEndpoint = '/auth/login';
  static const String registerEndpoint = '/auth/register';
  static const String moodJournalEndpoint = '/mood-journal';
  static const String chatEndpoint = '/chat';
  static const String resourcesEndpoint = '/resources';
  
  // Feature flags
  static const bool enableFacialAnalysis = true;
  static const bool enableVoiceAnalysis = true;
  static const bool enableProfessionalSupport = true;
  
  // App settings
  static const String appName = 'MindMate Harmony Hub';
  static const String appVersion = '1.0.0';
  
  // Theme colors
  static const int primaryColorValue = 0xFF6366F1;  // Indigo
  static const int secondaryColorValue = 0xFF8B5CF6; // Purple
  static const int accentColorValue = 0xFFF59E0B;   // Amber
  static const int backgroundColor = 0xFFF3F4F6;    // Light gray
  static const int darkBackgroundColor = 0xFF1F2937; // Dark gray
}
