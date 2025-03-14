
import 'package:flutter/material.dart';
import 'package:camera/camera.dart';

class FacialAnalysisScreen extends StatefulWidget {
  const FacialAnalysisScreen({super.key});

  @override
  State<FacialAnalysisScreen> createState() => _FacialAnalysisScreenState();
}

class _FacialAnalysisScreenState extends State<FacialAnalysisScreen> {
  bool _isAnalyzing = false;
  String? _result;
  CameraController? _cameraController;
  List<CameraDescription>? _cameras;
  bool _isCameraInitialized = false;
  
  @override
  void initState() {
    super.initState();
    _initializeCamera();
  }
  
  Future<void> _initializeCamera() async {
    try {
      _cameras = await availableCameras();
      if (_cameras != null && _cameras!.isNotEmpty) {
        _cameraController = CameraController(
          _cameras![1], // Use front camera (usually index 1)
          ResolutionPreset.medium,
          enableAudio: false,
        );
        
        await _cameraController!.initialize();
        
        if (mounted) {
          setState(() {
            _isCameraInitialized = true;
          });
        }
      }
    } catch (e) {
      debugPrint('Error initializing camera: $e');
    }
  }
  
  @override
  void dispose() {
    _cameraController?.dispose();
    super.dispose();
  }
  
  Future<void> _analyzeFacialExpression() async {
    if (_isAnalyzing) return;
    
    setState(() {
      _isAnalyzing = true;
      _result = null;
    });
    
    try {
      // Simulate facial expression analysis
      await Future.delayed(const Duration(seconds: 2));
      
      // Mock result
      final List<String> possibleEmotions = [
        'Happy',
        'Sad',
        'Neutral',
        'Anxious',
        'Tired',
        'Surprised',
      ];
      
      final emotion = possibleEmotions[DateTime.now().second % possibleEmotions.length];
      
      setState(() {
        _result = emotion;
        _isAnalyzing = false;
      });
    } catch (e) {
      debugPrint('Error in facial analysis: $e');
      setState(() {
        _result = 'Error: Could not analyze facial expression';
        _isAnalyzing = false;
      });
    }
  }
  
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return Scaffold(
      appBar: AppBar(
        title: const Text('Facial Expression Analysis'),
      ),
      body: Column(
        children: [
          Expanded(
            child: _isCameraInitialized
                ? CameraPreview(_cameraController!)
                : Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const CircularProgressIndicator(),
                        const SizedBox(height: 16),
                        Text(
                          'Initializing camera...',
                          style: theme.textTheme.bodyLarge,
                        ),
                      ],
                    ),
                  ),
          ),
          Container(
            color: theme.colorScheme.surface,
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                if (_result != null) ...[
                  Text(
                    'Detected Emotion:',
                    style: theme.textTheme.titleMedium,
                  ),
                  const SizedBox(height: 8),
                  Text(
                    _result!,
                    style: theme.textTheme.headlineMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                      color: theme.colorScheme.primary,
                    ),
                  ),
                  const SizedBox(height: 24),
                ],
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton.icon(
                    onPressed: _isAnalyzing ? null : _analyzeFacialExpression,
                    icon: Icon(_isAnalyzing 
                        ? Icons.hourglass_top 
                        : Icons.face_outlined),
                    label: Text(_isAnalyzing 
                        ? 'Analyzing...' 
                        : 'Analyze Facial Expression'),
                  ),
                ),
                const SizedBox(height: 16),
                const Text(
                  'Position your face in the center of the frame for the best results.',
                  textAlign: TextAlign.center,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
