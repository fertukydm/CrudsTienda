const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch('http://localhost:4001/api/login', { //  Puerto correcto
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email, // ✅ Cambio: mail -> email
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success('Inicio de sesión exitoso');
      // Guardar token si es necesario
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
    } else {
      toast.error(data.message || 'Error al hacer login');
    }
  } catch (error) {
    console.error('Error de conexión:', error);
    toast.error('Error de red o del servidor');
  } finally {
    setLoading(false);
  }
};