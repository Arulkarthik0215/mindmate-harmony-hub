
import 'package:flutter/material.dart';

enum MoodType {
  veryHappy,
  happy,
  neutral,
  sad,
  verySad,
}

class MoodEntry {
  final String id;
  final MoodType mood;
  final String note;
  final DateTime date;
  final List<String> activities;
  final int energyLevel; // 1-10
  final int sleepHours;

  const MoodEntry({
    required this.id,
    required this.mood,
    required this.note,
    required this.date,
    required this.activities,
    required this.energyLevel,
    required this.sleepHours,
  });

  factory MoodEntry.fromJson(Map<String, dynamic> json) {
    return MoodEntry(
      id: json['id'] as String,
      mood: MoodType.values[json['mood'] as int],
      note: json['note'] as String,
      date: DateTime.parse(json['date'] as String),
      activities: List<String>.from(json['activities']),
      energyLevel: json['energyLevel'] as int,
      sleepHours: json['sleepHours'] as int,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'mood': mood.index,
      'note': note,
      'date': date.toIso8601String(),
      'activities': activities,
      'energyLevel': energyLevel,
      'sleepHours': sleepHours,
    };
  }

  IconData get moodIcon {
    switch (mood) {
      case MoodType.veryHappy:
        return Icons.sentiment_very_satisfied;
      case MoodType.happy:
        return Icons.sentiment_satisfied;
      case MoodType.neutral:
        return Icons.sentiment_neutral;
      case MoodType.sad:
        return Icons.sentiment_dissatisfied;
      case MoodType.verySad:
        return Icons.sentiment_very_dissatisfied;
    }
  }

  Color getMoodColor(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    switch (mood) {
      case MoodType.veryHappy:
        return isDark ? Colors.greenAccent : Colors.green;
      case MoodType.happy:
        return isDark ? Colors.lightGreenAccent : Colors.lightGreen;
      case MoodType.neutral:
        return isDark ? Colors.amberAccent : Colors.amber;
      case MoodType.sad:
        return isDark ? Colors.orangeAccent : Colors.orange;
      case MoodType.verySad:
        return isDark ? Colors.redAccent : Colors.red;
    }
  }

  String get moodName {
    switch (mood) {
      case MoodType.veryHappy:
        return 'Very Happy';
      case MoodType.happy:
        return 'Happy';
      case MoodType.neutral:
        return 'Neutral';
      case MoodType.sad:
        return 'Sad';
      case MoodType.verySad:
        return 'Very Sad';
    }
  }
}
