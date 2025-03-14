
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:mindmate_harmony_hub/providers/mood_journal_provider.dart';
import 'package:mindmate_harmony_hub/models/mood_entry.dart';
import 'package:intl/intl.dart';
import 'dart:math';

class MoodJournalScreen extends StatefulWidget {
  const MoodJournalScreen({super.key});

  @override
  State<MoodJournalScreen> createState() => _MoodJournalScreenState();
}

class _MoodJournalScreenState extends State<MoodJournalScreen> {
  final _formKey = GlobalKey<FormState>();
  MoodType _selectedMood = MoodType.neutral;
  final _noteController = TextEditingController();
  final List<String> _selectedActivities = [];
  int _energyLevel = 5;
  int _sleepHours = 7;
  bool _isAddingEntry = false;

  final List<String> _availableActivities = [
    'Exercise', 'Reading', 'Meditation', 'Socializing', 'Work', 'Study',
    'Hobbies', 'Entertainment', 'Family Time', 'Outdoor Activity',
    'Rest', 'Shopping', 'Cooking', 'Cleaning', 'Travel'
  ];

  @override
  void dispose() {
    _noteController.dispose();
    super.dispose();
  }

  void _toggleActivity(String activity) {
    setState(() {
      if (_selectedActivities.contains(activity)) {
        _selectedActivities.remove(activity);
      } else {
        _selectedActivities.add(activity);
      }
    });
  }

  void _resetForm() {
    setState(() {
      _selectedMood = MoodType.neutral;
      _noteController.clear();
      _selectedActivities.clear();
      _energyLevel = 5;
      _sleepHours = 7;
      _isAddingEntry = false;
    });
  }

  Future<void> _addEntry() async {
    if (_formKey.currentState!.validate()) {
      final moodProvider = Provider.of<MoodJournalProvider>(context, listen: false);
      
      // Generate a random ID for demo purposes
      final String id = 'entry_${DateTime.now().millisecondsSinceEpoch}_${Random().nextInt(1000)}';
      
      final newEntry = MoodEntry(
        id: id,
        mood: _selectedMood,
        note: _noteController.text.trim(),
        date: DateTime.now(),
        activities: _selectedActivities.toList(),
        energyLevel: _energyLevel,
        sleepHours: _sleepHours,
      );
      
      await moodProvider.addEntry(newEntry);
      
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Mood entry added successfully!')),
        );
        _resetForm();
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final moodProvider = Provider.of<MoodJournalProvider>(context);
    final theme = Theme.of(context);
    
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mood Journal'),
      ),
      body: _isAddingEntry 
          ? _buildAddEntryForm(theme) 
          : _buildJournalList(moodProvider, theme),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          setState(() {
            _isAddingEntry = !_isAddingEntry;
            if (!_isAddingEntry) {
              _resetForm();
            }
          });
        },
        child: Icon(_isAddingEntry ? Icons.list : Icons.add),
      ),
    );
  }

  Widget _buildJournalList(MoodJournalProvider moodProvider, ThemeData theme) {
    if (moodProvider.isLoading) {
      return const Center(child: CircularProgressIndicator());
    }
    
    if (moodProvider.entries.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.mood,
              size: 80,
              color: theme.colorScheme.primary.withOpacity(0.5),
            ),
            const SizedBox(height: 16),
            Text(
              'Your mood journal is empty',
              style: theme.textTheme.titleLarge,
            ),
            const SizedBox(height: 8),
            Text(
              'Start tracking your moods to see patterns',
              style: theme.textTheme.bodyMedium,
            ),
            const SizedBox(height: 24),
            ElevatedButton.icon(
              onPressed: () {
                setState(() {
                  _isAddingEntry = true;
                });
              },
              icon: const Icon(Icons.add),
              label: const Text('Add First Entry'),
            ),
          ],
        ),
      );
    }
    
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: moodProvider.entries.length,
      itemBuilder: (context, index) {
        final entry = moodProvider.entries[index];
        return Dismissible(
          key: Key(entry.id),
          background: Container(
            color: Colors.red,
            alignment: Alignment.centerRight,
            padding: const EdgeInsets.only(right: 16),
            child: const Icon(Icons.delete, color: Colors.white),
          ),
          direction: DismissDirection.endToStart,
          onDismissed: (direction) {
            moodProvider.deleteEntry(entry.id);
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Entry deleted')),
            );
          },
          child: Card(
            margin: const EdgeInsets.only(bottom: 12),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
            child: ExpansionTile(
              leading: CircleAvatar(
                backgroundColor: entry.getMoodColor(context),
                child: Icon(entry.moodIcon, color: Colors.white),
              ),
              title: Text(
                entry.moodName,
                style: theme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              subtitle: Text(
                DateFormat('MMM d, yyyy • h:mm a').format(entry.date),
              ),
              children: [
                Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      if (entry.note.isNotEmpty) ...[
                        Text(
                          'Notes:',
                          style: theme.textTheme.titleSmall?.copyWith(
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(entry.note),
                        const SizedBox(height: 12),
                      ],
                      
                      if (entry.activities.isNotEmpty) ...[
                        Text(
                          'Activities:',
                          style: theme.textTheme.titleSmall?.copyWith(
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Wrap(
                          spacing: 8,
                          runSpacing: 8,
                          children: entry.activities.map((activity) {
                            return Chip(
                              label: Text(activity),
                              backgroundColor: theme.colorScheme.primary.withOpacity(0.1),
                            );
                          }).toList(),
                        ),
                        const SizedBox(height: 12),
                      ],
                      
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Energy Level:',
                                style: theme.textTheme.titleSmall?.copyWith(
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              const SizedBox(height: 4),
                              Row(
                                children: [
                                  Icon(
                                    Icons.battery_charging_full,
                                    color: theme.colorScheme.secondary,
                                  ),
                                  const SizedBox(width: 4),
                                  Text('${entry.energyLevel}/10'),
                                ],
                              ),
                            ],
                          ),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Sleep:',
                                style: theme.textTheme.titleSmall?.copyWith(
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              const SizedBox(height: 4),
                              Row(
                                children: [
                                  Icon(
                                    Icons.bedtime_outlined,
                                    color: theme.colorScheme.secondary,
                                  ),
                                  const SizedBox(width: 4),
                                  Text('${entry.sleepHours} hours'),
                                ],
                              ),
                            ],
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildAddEntryForm(ThemeData theme) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'How are you feeling?',
              style: theme.textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),
            
            // Mood selection
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                _buildMoodOption(theme, MoodType.verySad, 'Very Sad'),
                _buildMoodOption(theme, MoodType.sad, 'Sad'),
                _buildMoodOption(theme, MoodType.neutral, 'Neutral'),
                _buildMoodOption(theme, MoodType.happy, 'Happy'),
                _buildMoodOption(theme, MoodType.veryHappy, 'Very Happy'),
              ],
            ),
            const SizedBox(height: 24),
            
            // Note field
            TextFormField(
              controller: _noteController,
              decoration: InputDecoration(
                labelText: 'Notes (optional)',
                hintText: 'Add details about how you\'re feeling...',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
              maxLines: 3,
            ),
            const SizedBox(height: 24),
            
            // Activities
            Text(
              'Activities',
              style: theme.textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 8),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: _availableActivities.map((activity) {
                final isSelected = _selectedActivities.contains(activity);
                return FilterChip(
                  label: Text(activity),
                  selected: isSelected,
                  onSelected: (selected) {
                    _toggleActivity(activity);
                  },
                  backgroundColor: theme.colorScheme.primary.withOpacity(0.1),
                  selectedColor: theme.colorScheme.primary.withOpacity(0.3),
                  checkmarkColor: theme.colorScheme.primary,
                );
              }).toList(),
            ),
            const SizedBox(height: 24),
            
            // Energy level
            Text(
              'Energy Level: $_energyLevel',
              style: theme.textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 8),
            Slider(
              value: _energyLevel.toDouble(),
              min: 1,
              max: 10,
              divisions: 9,
              label: _energyLevel.toString(),
              onChanged: (value) {
                setState(() {
                  _energyLevel = value.toInt();
                });
              },
            ),
            const SizedBox(height: 24),
            
            // Sleep hours
            Text(
              'Hours of Sleep: $_sleepHours',
              style: theme.textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 8),
            Slider(
              value: _sleepHours.toDouble(),
              min: 0,
              max: 12,
              divisions: 12,
              label: _sleepHours.toString(),
              onChanged: (value) {
                setState(() {
                  _sleepHours = value.toInt();
                });
              },
            ),
            const SizedBox(height: 32),
            
            // Submit button
            ElevatedButton(
              onPressed: _addEntry,
              child: const Text('Save Entry'),
            ),
            const SizedBox(height: 16),
            OutlinedButton(
              onPressed: _resetForm,
              child: const Text('Reset'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMoodOption(ThemeData theme, MoodType mood, String label) {
    final isSelected = _selectedMood == mood;
    
    return GestureDetector(
      onTap: () {
        setState(() {
          _selectedMood = mood;
        });
      },
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: isSelected 
                  ? MoodEntry(
                      id: '',
                      mood: mood,
                      note: '',
                      date: DateTime.now(),
                      activities: [],
                      energyLevel: 0,
                      sleepHours: 0,
                    ).getMoodColor(context)
                  : MoodEntry(
                      id: '',
                      mood: mood,
                      note: '',
                      date: DateTime.now(),
                      activities: [],
                      energyLevel: 0,
                      sleepHours: 0,
                    ).getMoodColor(context).withOpacity(0.3),
              border: Border.all(
                color: isSelected ? theme.colorScheme.primary : Colors.transparent,
                width: 2,
              ),
            ),
            child: Icon(
              MoodEntry(
                id: '',
                mood: mood,
                note: '',
                date: DateTime.now(),
                activities: [],
                energyLevel: 0,
                sleepHours: 0,
              ).moodIcon,
              color: Colors.white,
              size: 30,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            label,
            style: TextStyle(
              fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
            ),
          ),
        ],
      ),
    );
  }
}
