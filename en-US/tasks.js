// PROCESO SUBSCRIBE NEWSLETTER
document.getElementById('subscribe-button').addEventListener('click', function() {
	// Obtener los valores del formulario
	const email = document.querySelector('input[name="email"]').value;
	const language = document.querySelector('select[name="language"]').value;

	// Limpiar mensajes anteriores
	document.querySelector('.contact-form-success').classList.add('d-none');
	document.querySelector('.contact-form-error').classList.add('d-none');
	document.querySelector('.error-message').innerText = '';

	// Validar que los campos no estén vacíos
	if (!email || !language) {
		document.querySelector('.contact-form-error').classList.remove('d-none');
		document.querySelector('.error-message').innerText = 'All fields are required.';
		return;
	}

	// Validar que el correo electrónico sea correcto
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailPattern.test(email)) {
		document.querySelector('.contact-form-error').classList.remove('d-none');
		document.querySelector('.error-message').innerText = 'Please enter a valid email address.';
		return;
	}

	// Crear objeto FormData y añadir los valores del formulario
	const formData = new FormData();
	formData.append('email', email);
	formData.append('language', language);

	// Configuración de la solicitud Fetch
	fetch('https://svd-newsletter.webcindario.com/api.php', {
		method: 'POST',
		body: formData // Enviar los datos como FormData
	})
	.then(response => response.json().then(data => ({
		status: response.status,
		body: data
	})))
	.then(data => {
		if (data.body.status === 1) {
			// Código 1: Suscripción exitosa
			document.querySelector('.contact-form-success').classList.remove('d-none');
			document.querySelector('.success-message').innerText = 'Subscription successful!';

			// Ocultar los campos del formulario, pero mantener el mensaje de éxito visible
			document.querySelector('#form-subscribe-for-news').classList.add('d-none');
		} else if (data.body.status === 0) {
			// Código 0: Error general
			if (data.body.data === 'email_invalid') {
				// Error de duplicado
				document.querySelector('.contact-form-error').classList.remove('d-none');
				document.querySelector('.error-message').innerText = 'Please enter a valid email address.';
			} 
			if (data.body.data === 'email_duplicated') {
				// Error de duplicado
				document.querySelector('.contact-form-error').classList.remove('d-none');
				document.querySelector('.error-message').innerText = 'This email is already subscribed.';
			} 
			if (data.body.data === 'error') {
				// Otros errores
				document.querySelector('.contact-form-error').classList.remove('d-none');
				document.querySelector('.error-message').innerText = 'An error occurred while trying to subscribe.';
			}
		}
	})
	.catch(error => {
		// Manejo de errores en la solicitud fetch
		document.querySelector('.contact-form-error').classList.remove('d-none');
		document.querySelector('.error-message').innerText = 'An unexpected error occurred.';
	});
});

// PROCESO SEND CONTACT US
document.getElementById('send-button').addEventListener('click', function() {
    // Obtener los valores del formulario
    const name = document.getElementById('name-cu').value.trim();
    const email = document.getElementById('email-cu').value.trim();
    const subject = document.getElementById('subject-cu').value.trim();
    const message = document.getElementById('message-cu').value.trim();

    // Limpiar mensajes anteriores
    document.getElementById('contact-form-success').classList.add('d-none');
    document.getElementById('contact-form-error').classList.add('d-none');
    document.getElementById('error-message').innerText = '';

    // Validar que los campos no estén vacíos
    if (!name || !email || !subject || !message) {
        document.getElementById('contact-form-error').classList.remove('d-none');
        document.getElementById('error-message').innerText = 'All fields are required.';
        return;
    }

    // Validar que el correo electrónico sea correcto
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('contact-form-error').classList.remove('d-none');
        document.getElementById('error-message').innerText = 'Please enter a valid email address.';
        return;
    }

    // Crear objeto FormData y añadir los valores del formulario
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);

    // Configuración de la solicitud Fetch
    fetch('https://svd-newsletter.webcindario.com/api-contact-us.php', {
        method: 'POST',
        body: formData // Enviar los datos como FormData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 1) {
            // Código 1: Éxito
            document.getElementById('contact-form-success').classList.remove('d-none');
            document.getElementById('success-message').innerText = 'Your message has been sent successfully!';

            // Ocultar los campos del formulario, pero mantener el mensaje de éxito visible
            document.getElementById('form-subscribe-for-news').classList.add('d-none');
        } else if (data.status === 0) {
            // Código 0: Error general
            if (data.data === 'email_invalid') {
                // Error de correo electrónico no válido
                document.getElementById('contact-form-error').classList.remove('d-none');
                document.getElementById('error-message').innerText = 'Please enter a valid email address.';
            } else if (data.data === 'missing_fields') {
                // Campos faltantes
                document.getElementById('contact-form-error').classList.remove('d-none');
                document.getElementById('error-message').innerText = 'All fields are required.';
            } else if (data.data === 'error') {
                // Otros errores
                document.getElementById('contact-form-error').classList.remove('d-none');
                document.getElementById('error-message').innerText = 'An error occurred while trying to send your message.';
            }
        }
    })
    .catch(error => {
        // Manejo de errores en la solicitud fetch
        document.getElementById('contact-form-error').classList.remove('d-none');
        document.getElementById('error-message').innerText = 'An unexpected error occurred.';
    });
});