
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
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

final GlobalKey<NavigatorState> _rootNavigatorKey = GlobalKey<NavigatorState>(debugLabel: 'root');
final GlobalKey<NavigatorState> _shellNavigatorKey = GlobalKey<NavigatorState>(debugLabel: 'shell');

final appRouter = GoRouter(
  navigatorKey: _rootNavigatorKey,
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
      navigatorKey: _shellNavigatorKey,
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
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.dashboard),
            label: 'Dashboard',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.mood),
            label: 'Mood Journal',
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
    final String location = GoRouterState.of(context).location;
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
