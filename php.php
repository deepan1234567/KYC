<?php

function submitKYC($name, $dob, $address, $aadhaarNumber = null) {
  $verificationUrl = 'https://your-verification-service.com/api/verify';
  $apiKey = 'YOUR_API_KEY';

  $data = [
    'name' => $name,
    'dob' => $dob,
