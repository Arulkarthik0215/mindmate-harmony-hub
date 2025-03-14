
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'dart:convert';
import 'package:mindmate_harmony_hub/models/user.dart';

class AuthProvider extends ChangeNotifier {
  User? _currentUser;
  bool _isLoading = false;
  String? _errorMessage;
  final _secureStorage = const FlutterSecureStorage();

  User? get currentUser => _currentUser;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  bool get isLoggedIn => _currentUser != null;

  Future<bool> checkAuthentication() async {
    _isLoading = true;
    notifyListeners();

    try {
      final token = await _secureStorage.read(key: 'auth_token');
      if (token == null) {
        _isLoading = false;
        notifyListeners();
        return false;
      }

      // For demo, we're just assuming the token is valid
      // In a real app, you would verify the token with your backend
      final prefs = await SharedPreferences.getInstance();
      final userData = prefs.getString('user_data');
      
      if (userData != null) {
        _currentUser = User.fromJson(json.decode(userData));
        _isLoading = false;
        notifyListeners();
        return true;
      }
      
      _isLoading = false;
      notifyListeners();
      return false;
    } catch (e) {
      _errorMessage = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<bool> login(String email, String password) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      // Simulate API call
      await Future.delayed(const Duration(seconds: 1));
      
      // For demo purposes, accept any email with a valid format and password length > 6
      if (!_isValidEmail(email)) {
        _errorMessage = 'Please enter a valid email';
        _isLoading = false;
        notifyListeners();
        return false;
      }

      if (password.length < 6) {
        _errorMessage = 'Password must be at least 6 characters';
        _isLoading = false;
        notifyListeners();
        return false;
      }

      // Mock successful login
      _currentUser = User(
        id: '1',
        name: email.split('@')[0],
        email: email,
        avatarUrl: null,
      );

      // Save user data
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('user_data', json.encode(_currentUser!.toJson()));
      
      // Save mock token
      await _secureStorage.write(key: 'auth_token', value: 'mock_token_${DateTime.now().millisecondsSinceEpoch}');

      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _errorMessage = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<bool> register(String name, String email, String password) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      // Simulate API call
      await Future.delayed(const Duration(seconds: 1));
      
      // For demo purposes, accept any name, email with a valid format, and password length > 6
      if (name.isEmpty) {
        _errorMessage = 'Please enter your name';
        _isLoading = false;
        notifyListeners();
        return false;
      }

      if (!_isValidEmail(email)) {
        _errorMessage = 'Please enter a valid email';
        _isLoading = false;
        notifyListeners();
        return false;
      }

      if (password.length < 6) {
        _errorMessage = 'Password must be at least 6 characters';
        _isLoading = false;
        notifyListeners();
        return false;
      }

      // Mock successful registration and login
      _currentUser = User(
        id: '1',
        name: name,
        email: email,
        avatarUrl: null,
      );

      // Save user data
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('user_data', json.encode(_currentUser!.toJson()));
      
      // Save mock token
      await _secureStorage.write(key: 'auth_token', value: 'mock_token_${DateTime.now().millisecondsSinceEpoch}');

      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _errorMessage = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<void> logout() async {
    _isLoading = true;
    notifyListeners();

    try {
      await _secureStorage.delete(key: 'auth_token');
      final prefs = await SharedPreferences.getInstance();
      await prefs.remove('user_data');
      
      _currentUser = null;
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _errorMessage = e.toString();
      _isLoading = false;
      notifyListeners();
    }
  }

  bool _isValidEmail(String email) {
    return RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$').hasMatch(email);
  }
}
