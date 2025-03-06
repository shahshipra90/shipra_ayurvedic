export async function authenticateUser(email: string, password: string) {
  try {
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    

    const text = await response.text();
    console.log('Raw API Response:', text); // For debugging

    if (!response.ok) {
      console.error('API Error:', text);
      throw new Error(`API returned status ${response.status} - ${text}`);
    }

    try {
      return JSON.parse(text); // Try parsing JSON response
    } catch {
      console.error('Invalid JSON response:', text);
      throw new Error('Server returned invalid JSON. Check the API.');
    }
  } catch (error) {
    console.error('Error in authenticateUser:', error);
    return { success: false, message: 'An unexpected error occurred.' };
  }
}
