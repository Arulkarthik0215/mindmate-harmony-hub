
import 'package:flutter/material.dart';

class ProfessionalSupportScreen extends StatelessWidget {
  const ProfessionalSupportScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return Scaffold(
      appBar: AppBar(
        title: const Text('Professional Support'),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Center(
            child: Column(
              children: [
                Icon(
                  Icons.people_outline,
                  size: 80,
                  color: theme.colorScheme.primary.withOpacity(0.5),
                ),
                const SizedBox(height: 16),
                Text(
                  'Connect with Mental Health Professionals',
                  style: theme.textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 8),
                const Padding(
                  padding: EdgeInsets.symmetric(horizontal: 24),
                  child: Text(
                    'Schedule sessions with licensed therapists, counselors, and psychiatrists.',
                    textAlign: TextAlign.center,
                  ),
                ),
                const SizedBox(height: 32),
              ],
            ),
          ),
          
          // Therapist cards
          _buildProfessionalCard(
            context,
            name: 'Dr. Sarah Johnson',
            specialty: 'Clinical Psychologist',
            rating: 4.9,
            experience: '10+ years',
            image: Icons.person,
          ),
          
          _buildProfessionalCard(
            context,
            name: 'Dr. Michael Chen',
            specialty: 'Psychiatrist',
            rating: 4.8,
            experience: '15+ years',
            image: Icons.person,
          ),
          
          _buildProfessionalCard(
            context,
            name: 'Emma Williams',
            specialty: 'Licensed Therapist',
            rating: 4.7,
            experience: '8+ years',
            image: Icons.person,
          ),
          
          _buildProfessionalCard(
            context,
            name: 'Dr. James Miller',
            specialty: 'Cognitive Behavioral Therapist',
            rating: 4.9,
            experience: '12+ years',
            image: Icons.person,
          ),
          
          const SizedBox(height: 24),
          
          OutlinedButton.icon(
            onPressed: () {
              // Browse more professionals
            },
            icon: const Icon(Icons.search),
            label: const Text('Browse More Professionals'),
          ),
        ],
      ),
    );
  }

  Widget _buildProfessionalCard(
    BuildContext context, {
    required String name,
    required String specialty,
    required double rating,
    required String experience,
    required IconData image,
  }) {
    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          children: [
            CircleAvatar(
              radius: 30,
              backgroundColor: Theme.of(context).colorScheme.primary.withOpacity(0.1),
              child: Icon(
                image,
                color: Theme.of(context).colorScheme.primary,
                size: 30,
              ),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    name,
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Text(
                    specialty,
                    style: Theme.of(context).textTheme.bodyMedium,
                  ),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      Icon(
                        Icons.star,
                        size: 16,
                        color: Colors.amber,
                      ),
                      const SizedBox(width: 4),
                      Text(
                        rating.toString(),
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                      const SizedBox(width: 12),
                      Icon(
                        Icons.access_time,
                        size: 16,
                        color: Colors.grey,
                      ),
                      const SizedBox(width: 4),
                      Text(
                        experience,
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                    ],
                  ),
                ],
              ),
            ),
            ElevatedButton(
              onPressed: () {
                // Book appointment functionality
              },
              child: const Text('Book'),
            ),
          ],
        ),
      ),
    );
  }
}
