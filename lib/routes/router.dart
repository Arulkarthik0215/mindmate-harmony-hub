
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:mindmate_harmony_hub/providers/auth_provider.dart';
import 'package:mindmate_harmony_hub/screens/auth/login_screen.dart';
import 'package:mindmate_harmony_hub/screens/auth/register_screen.dart';
import 'package:mindmate_harmony_hub/screens/dashboard_screen.dart';
import 'package:mindmate_harmony_hub/screens/mood_journal_screen.dart';
import 'package:mindmate_harmony_hub/screens/chat_support_screen.dart';
import 'package:mindmate_harmony_hub/screens/professional_support_screen.dart';
import 'package:mindmate_harmony_hub/screens/resources_screen.dart';
import 'package:mindmate_harmony_hub/screens/facial_analysis_screen.dart';
import 'package:mindmate_harmony_hub/screens/voice_analysis_screen.dart';
import 'package:mindmate_harmony_hub/screens/splash_screen.dart';

final GoRouter appRouter = GoRouter(
  initialLocation: '/',
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => const SplashScreen(),
    ),
    GoRoute(
      path: '/login',
      builder: (context, state) => const LoginScreen(),
    ),
    GoRoute(
      path: '/register',
      builder: (context, state) => const RegisterScreen(),
    ),
    ShellRoute(
      builder: (context, state, child) {
        return ScaffoldWithNavBar(child: child);
      },
      routes: [
        GoRoute(
          path: '/dashboard',
          builder: (context, state) => const DashboardScreen(),
        ),
        GoRoute(
          path: '/mood-journal',
          builder: (context, state) => const MoodJournalScreen(),
        ),
        GoRoute(
          path: '/chat-support',
          builder: (context, state) => const ChatSupportScreen(),
        ),
        GoRoute(
          path: '/professional-support',
          builder: (context, state) => const ProfessionalSupportScreen(),
        ),
        GoRoute(
          path: '/resources',
          builder: (context, state) => const ResourcesScreen(),
        ),
        GoRoute(
          path: '/facial-analysis',
          builder: (context, state) => const FacialAnalysisScreen(),
        ),
        GoRoute(
          path: '/voice-analysis',
          builder: (context, state) => const VoiceAnalysisScreen(),
        ),
      ],
    ),
  ],
  redirect: (context, state) {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    final isLoggedIn = authProvider.isLoggedIn;

    final isGoingToLogin = state.path == '/login' || state.path == '/register';
    final isOnSplash = state.path == '/';

    // Allow access to splash screen
    if (isOnSplash) {
      return null;
    }

    // If not logged in and not going to login page, redirect to login
    if (!isLoggedIn && !isGoingToLogin) {
      return '/login';
    }

    // If logged in and going to login page, redirect to dashboard
    if (isLoggedIn && isGoingToLogin) {
      return '/dashboard';
    }

    // No redirection needed
    return null;
  },
);

class ScaffoldWithNavBar extends StatelessWidget {
  final Widget child;

  const ScaffoldWithNavBar({
    super.key,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: child,
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        currentIndex: _calculateSelectedIndex(context),
        onTap: (int idx) => _onItemTapped(idx, context),
        selectedItemColor: Theme.of(context).colorScheme.primary,
        unselectedItemColor: Colors.grey,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.dashboard),
            label: 'Dashboard',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.mood),
            label: 'Mood',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.chat),
            label: 'Chat',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.people),
            label: 'Support',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.library_books),
            label: 'Resources',
          ),
        ],
      ),
    );
  }

  int _calculateSelectedIndex(BuildContext context) {
    final GoRouter route = GoRouter.of(context);
    final String location = route.location;
    
    if (location.startsWith('/dashboard')) {
      return 0;
    }
    if (location.startsWith('/mood-journal')) {
      return 1;
    }
    if (location.startsWith('/chat-support')) {
      return 2;
    }
    if (location.startsWith('/professional-support')) {
      return 3;
    }
    if (location.startsWith('/resources')) {
      return 4;
    }
    return 0;
  }

  void _onItemTapped(int index, BuildContext context) {
    switch (index) {
      case 0:
        GoRouter.of(context).go('/dashboard');
        break;
      case 1:
        GoRouter.of(context).go('/mood-journal');
        break;
      case 2:
        GoRouter.of(context).go('/chat-support');
        break;
      case 3:
        GoRouter.of(context).go('/professional-support');
        break;
      case 4:
        GoRouter.of(context).go('/resources');
        break;
    }
  }
}
