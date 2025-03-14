
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class ResourcesScreen extends StatelessWidget {
  const ResourcesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return Scaffold(
      appBar: AppBar(
        title: const Text('Resources'),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Text(
            'Mental Health Resources',
            style: theme.textTheme.headlineSmall?.copyWith(
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 8),
          const Text(
            'Access helpful articles, worksheets, and tools to support your mental wellness journey.',
          ),
          const SizedBox(height: 24),
          
          // Categories
          _buildCategorySection(
            context,
            title: 'E-Books & Guides',
            icon: Icons.book_outlined,
            color: theme.colorScheme.primary,
            resources: [
              ResourceItem(
                title: 'Anxiety Workbook',
                description: 'Practical exercises to manage anxiety',
                type: 'PDF',
                url: 'resources/anxiety-workbook.pdf',
              ),
              ResourceItem(
                title: 'Feeling Good',
                description: 'Guide to overcoming depression',
                type: 'PDF',
                url: 'resources/feeling-good.pdf',
              ),
              ResourceItem(
                title: 'Mind Over Mood',
                description: 'Cognitive behavioral therapy exercises',
                type: 'PDF',
                url: 'resources/mind-over-mood.pdf',
              ),
            ],
          ),
          
          _buildCategorySection(
            context,
            title: 'Meditation & Mindfulness',
            icon: Icons.self_improvement,
            color: theme.colorScheme.secondary,
            resources: [
              ResourceItem(
                title: 'Beginner\'s Guide to Meditation',
                description: 'Simple techniques to start meditating',
                type: 'Audio',
                url: 'https://example.com/meditation-guide',
              ),
              ResourceItem(
                title: 'Mindful Breathing Exercise',
                description: '5-minute guided breathing session',
                type: 'Audio',
                url: 'https://example.com/breathing',
              ),
              ResourceItem(
                title: 'Body Scan Meditation',
                description: 'Progressive relaxation technique',
                type: 'Audio',
                url: 'https://example.com/body-scan',
              ),
            ],
          ),
          
          _buildCategorySection(
            context,
            title: 'Crisis Resources',
            icon: Icons.emergency_outlined,
            color: theme.colorScheme.error,
            resources: [
              ResourceItem(
                title: 'National Suicide Prevention Lifeline',
                description: '24/7 support for those in distress',
                type: 'Hotline',
                url: 'tel:988',
              ),
              ResourceItem(
                title: 'Crisis Text Line',
                description: 'Text HOME to 741741 for crisis support',
                type: 'Text',
                url: 'sms:741741&body=HOME',
              ),
              ResourceItem(
                title: 'Find Local Resources',
                description: 'Mental health services near you',
                type: 'Web',
                url: 'https://findtreatment.samhsa.gov/',
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildCategorySection(
    BuildContext context, {
    required String title,
    required IconData icon,
    required Color color,
    required List<ResourceItem> resources,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Icon(icon, color: color),
            const SizedBox(width: 8),
            Text(
              title,
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
        const SizedBox(height: 12),
        ...resources.map((resource) => _buildResourceCard(context, resource)),
        const SizedBox(height: 24),
      ],
    );
  }

  Widget _buildResourceCard(BuildContext context, ResourceItem resource) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
      ),
      child: ListTile(
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        title: Text(
          resource.title,
          style: const TextStyle(fontWeight: FontWeight.bold),
        ),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 4),
            Text(resource.description),
            const SizedBox(height: 4),
            Chip(
              label: Text(resource.type),
              materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
              padding: EdgeInsets.zero,
              labelPadding: const EdgeInsets.symmetric(horizontal: 8),
              backgroundColor: Theme.of(context).colorScheme.secondary.withOpacity(0.1),
            ),
          ],
        ),
        trailing: IconButton(
          icon: const Icon(Icons.open_in_new),
          onPressed: () async {
            final url = Uri.parse(resource.url);
            if (await canLaunchUrl(url)) {
              await launchUrl(url);
            } else {
              if (context.mounted) {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text('Could not open ${resource.title}')),
                );
              }
            }
          },
        ),
      ),
    );
  }
}

class ResourceItem {
  final String title;
  final String description;
  final String type;
  final String url;

  const ResourceItem({
    required this.title,
    required this.description,
    required this.type,
    required this.url,
  });
}
