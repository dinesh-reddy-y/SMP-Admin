# **App Name**: ShipMypack Admin

## Core Features:

- User List Display: Display a list of users fetched from the Node.js backend using axios.get('/api/users').
- Add New User Form: Implement a form to add new users, sending data to the Node.js backend via axios.post('/api/users', formData).
- Real-time Notifications: Utilize socket.io-client to establish a WebSocket connection and display live notifications from the Node.js server.
- File Upload: Allow users to upload files to a specified Node.js endpoint.

## Style Guidelines:

- Primary color: Deep Indigo (#4F46E5) for a professional and trustworthy feel.
- Background color: Light Gray (#F9FAFB), providing a clean and modern backdrop.
- Accent color: Teal (#06B6D4) for interactive elements and highlights.
- Body and headline font: 'Inter' sans-serif, suitable for headlines or body text, ensuring readability and a contemporary aesthetic.
- Use 'lucide-react' icons to maintain a consistent and clear visual language.
- Employ a grid-based layout with Tailwind CSS to create a responsive and well-organized interface.
- Implement subtle transitions and animations for interactive elements to improve user engagement.