
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import 'package:mindmate_harmony_hub/models/mood_entry.dart';

class MoodJournalProvider extends ChangeNotifier {
  List<MoodEntry> _entries = [];
  bool _isLoading = false;
  String? _errorMessage;

  List<MoodEntry> get entries => _entries;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  MoodJournalProvider() {
    _loadEntries();
  }

  Future<void> _loadEntries() async {
    _isLoading = true;
    notifyListeners();

    try {
      final prefs = await SharedPreferences.getInstance();
      final entriesJson = prefs.getStringList('mood_entries') ?? [];
      
      _entries = entriesJson
          .map((json) => MoodEntry.fromJson(jsonDecode(json)))
          .toList();
      
      // Sort entries by date, newest first
      _entries.sort((a, b) => b.date.compareTo(a.date));
      
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _errorMessage = e.toString();
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> addEntry(MoodEntry entry) async {
    _isLoading = true;
    notifyListeners();

    try {
      _entries.insert(0, entry);
      
      await _saveEntries();
      
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _errorMessage = e.toString();
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> updateEntry(MoodEntry updatedEntry) async {
    _isLoading = true;
    notifyListeners();

    try {
      final index = _entries.indexWhere((entry) => entry.id == updatedEntry.id);
      
      if (index != -1) {
        _entries[index] = updatedEntry;
        await _saveEntries();
      }
      
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _errorMessage = e.toString();
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> deleteEntry(String id) async {
    _isLoading = true;
    notifyListeners();

    try {
      _entries.removeWhere((entry) => entry.id == id);
      
      await _saveEntries();
      
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _errorMessage = e.toString();
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> _saveEntries() async {
    final prefs = await SharedPreferences.getInstance();
    final entriesJson = _entries
        .map((entry) => jsonEncode(entry.toJson()))
        .toList();
    
    await prefs.setStringList('mood_entries', entriesJson);
  }
}
