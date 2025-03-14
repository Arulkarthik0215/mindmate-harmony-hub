
import 'package:flutter/material.dart';

class VoiceAnalysisScreen extends StatefulWidget {
  const VoiceAnalysisScreen({super.key});

  @override
  State<VoiceAnalysisScreen> createState() => _VoiceAnalysisScreenState();
}

class _VoiceAnalysisScreenState extends State<VoiceAnalysisScreen> {
  bool _isRecording = false;
  bool _isAnalyzing = false;
  String? _result;
  int _recordingDuration = 0;
  late final Timer? _timer;
  
  @override
  void initState() {
    super.initState();
    _timer = null;
  }
  
  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }
  
  void _startRecording() {
    setState(() {
      _isRecording = true;
      _recordingDuration = 0;
      _result = null;
    });
    
    // Start a timer to track recording duration
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      setState(() {
        _recordingDuration++;
        
        // Automatically stop after 10 seconds
        if (_recordingDuration >= 10) {
          _stopRecording();
        }
      });
    });
    
    // In a real app, we would start recording audio here
  }
  
  Future<void> _stopRecording() async {
    if (!_isRecording) return;
    
    _timer?.cancel();
    
    setState(() {
      _isRecording = false;
      _isAnalyzing = true;
    });
    
    // In a real app, we would stop recording audio here and send it for analysis
    
    // Simulate analysis
    await Future.delayed(const Duration(seconds: 2));
    
    // Mock result
    final List<String> possibleResults = [
      'Calm and relaxed voice patterns detected',
      'Signs of stress detected in voice patterns',
      'Voice indicates neutral emotional state',
      'Voice patterns suggest elevated mood',
      'Voice analysis indicates possible fatigue',
    ];
    
    final result = possibleResults[DateTime.now().second % possibleResults.length];
    
    setState(() {
      _result = result;
      _isAnalyzing = false;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return Scaffold(
      appBar: AppBar(
        title: const Text('Voice Analysis'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            const SizedBox(height: 16),
            Icon(
              Icons.mic,
              size: 80,
              color: _isRecording 
                  ? theme.colorScheme.primary 
                  : theme.colorScheme.primary.withOpacity(0.5),
            ),
            const SizedBox(height: 24),
            if (_isRecording) ...[
              Text(
                'Recording: ${_recordingDuration}s',
                style: theme.textTheme.headlineSmall?.copyWith(
                  color: theme.colorScheme.primary,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 8),
              const Text(
                'Speak clearly about how you\'re feeling today...',
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 16),
              LinearProgressIndicator(
                value: _recordingDuration / 10, // 10 seconds max
                backgroundColor: theme.colorScheme.primary.withOpacity(0.2),
                color: theme.colorScheme.primary,
              ),
            ] else if (_isAnalyzing) ...[
              const CircularProgressIndicator(),
              const SizedBox(height: 16),
              const Text(
                'Analyzing your voice patterns...',
                style: TextStyle(fontStyle: FontStyle.italic),
              ),
            ] else ...[
              Text(
                'Voice Pattern Analysis',
                style: theme.textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 16),
              const Text(
                'Record your voice to analyze emotional patterns, stress levels, and potential mood indicators.',
                textAlign: TextAlign.center,
              ),
            ],
            const SizedBox(height: 32),
            if (_result != null) ...[
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: theme.colorScheme.primary.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Column(
                  children: [
                    Text(
                      'Analysis Result',
                      style: theme.textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      _result!,
                      textAlign: TextAlign.center,
                      style: const TextStyle(height: 1.5),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),
            ],
            const Spacer(),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                onPressed: _isRecording 
                    ? _stopRecording 
                    : (_isAnalyzing ? null : _startRecording),
                icon: Icon(_isRecording ? Icons.stop : Icons.mic),
                label: Text(_isRecording ? 'Stop Recording' : 'Start Recording'),
              ),
            ),
            if (!_isRecording && !_isAnalyzing) ...[
              const SizedBox(height: 16),
              const Text(
                'Tap the button and speak for up to 10 seconds',
                style: TextStyle(fontStyle: FontStyle.italic),
              ),
            ],
          ],
        ),
      ),
    );
  }
}

import 'dart:async';
