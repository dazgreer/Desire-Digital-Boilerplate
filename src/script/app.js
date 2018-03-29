requirejs.config({
	'waitSeconds': 60,
    'baseUrl': '/dist/js/',
    'paths': {
      'jquery': [
      	'//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min', // CDN
      	'libs/jquery-3.2.1.min' // Fallback
      ]
    }
});

// Load the main app module to start the app
requirejs(['script.min']);