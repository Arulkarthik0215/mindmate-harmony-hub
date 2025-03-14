
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:mindmate_harmony_hub/config/app_config.dart';
import 'package:mindmate_harmony_hub/routes/router.dart';
import 'package:mindmate_harmony_hub/providers/auth_provider.dart';
import 'package:mindmate_harmony_hub/providers/theme_provider.dart';
import 'package:mindmate_harmony_hub/providers/mood_journal_provider.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => ThemeProvider()),
        ChangeNotifierProvider(create: (_) => MoodJournalProvider()),
      ],
      child: Consumer<ThemeProvider>(
        builder: (context, themeProvider, child) {
          return MaterialApp.router(
            title: AppConfig.appName,
            debugShowCheckedModeBanner: false,
            theme: ThemeData(
              colorScheme: ColorScheme.light(
                primary: const Color(AppConfig.primaryColorValue),
                secondary: const Color(AppConfig.secondaryColorValue),
                tertiary: const Color(AppConfig.accentColorValue),
                background: const Color(AppConfig.backgroundColor),
              ),
              useMaterial3: true,
              fontFamily: 'Inter',
            ),
            darkTheme: ThemeData(
              colorScheme: ColorScheme.dark(
                primary: const Color(AppConfig.primaryColorValue),
                secondary: const Color(AppConfig.secondaryColorValue),
                tertiary: const Color(AppConfig.accentColorValue),
                background: const Color(AppConfig.darkBackgroundColor),
              ),
              useMaterial3: true,
              fontFamily: 'Inter',
            ),
            themeMode: themeProvider.themeMode,
            routerConfig: appRouter,
          );
        },
      ),
    );
  }
}
