async function startVideo() {
  const video = document.getElementById('video');
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
    video.srcObject = stream;
  } catch (err) {
    console.error('Error accessing the camera:', err);
  }
}

async function detectFace() {
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const message = document.getElementById('message');

  await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
  await faceapi.nets.faceLandmark68Net.loadFromUri('/models');

  const detectionOptions = new faceapi.TinyFaceDetectorOptions({ inputSize: 256 });

  async function checkForFace() {
    const detections = await faceapi.detectAllFaces(video, detectionOptions).withFaceLandmarks();
    if (detections.length > 0) {
      message.innerText = 'Face detected! Authentication successful.';
      message.style.color = 'green';
      // You can proceed with further actions such as redirecting to another page or displaying content
    } else {
      message.innerText = 'No face detected. Please try again.';
      message.style.color = 'red';
    }
  }

  setInterval(checkForFace, 1000); // Check for face every second
}

startVideo();
detectFace();

