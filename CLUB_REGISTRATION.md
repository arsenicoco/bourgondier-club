# Club Registration System

This document describes the club registration system that allows visitors to join the wine club by providing their name and email address.

## Features

- **Simple Registration Form**: Clean, responsive form with name and email fields
- **SQLite Database Storage**: Member information is stored in a local SQLite database
- **Duplicate Prevention**: Email addresses are unique - prevents duplicate registrations
- **Input Validation**: Both client-side and server-side validation
- **Admin Dashboard**: View all registered members
- **API Endpoints**: RESTful API for member management

## File Structure

```
puffy-pegasi/
├── src/
│   ├── components/
│   │   └── JoinClubForm.astro          # Registration form component
│   ├── lib/
│   │   └── database.ts                 # SQLite database utilities
│   ├── pages/
│   │   ├── admin.astro                 # Admin dashboard to view members
│   │   ├── index.astro                 # Main page (includes form)
│   │   └── api/
│   │       └── join-club.ts            # API endpoint for registration
│   └── data/                           # Database storage directory
└── test-api.js                         # API testing script
```

## Database Schema

The system uses SQLite with the following table structure:

```sql
CREATE TABLE club_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

### POST /api/join-club
Register a new club member.

**Request Body (form-data):**
- `name` (string, required): Full name of the member
- `email` (string, required): Email address (must be valid and unique)

**Response:**
```json
{
  "success": true,
  "message": "Successfully joined the club!",
  "memberId": 123
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description"
}
```

### GET /api/join-club
Retrieve all registered club members.

**Response:**
```json
{
  "success": true,
  "members": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "created_at": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

## Usage

### For Users
1. Visit the main page (`/`)
2. Scroll down to the "Join Our Wine Club" section
3. Fill in your name and email address
4. Click "Join the Club"
5. You'll see a success message if registration is successful

### For Administrators
1. Visit the admin page (`/admin`)
2. View all registered members in a table format
3. See member ID, name, email, and registration date

## Development

### Setup
The registration system is already integrated into the existing Astro project. No additional setup is required.

### Testing the API
Run the included test script:
```bash
node test-api.js
```

This will test all API endpoints and validation rules.

### Database Location
The SQLite database file is created at `src/data/club.db` when the first member registers.

## Validation Rules

### Client-Side Validation
- Name field is required
- Email field is required and must be a valid email format

### Server-Side Validation
- Name and email fields cannot be empty
- Email must match regex pattern: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Email must be unique (no duplicates allowed)
- Input is sanitized (trimmed and email is lowercased)

## Error Handling

The system handles various error scenarios:
- Empty required fields
- Invalid email format
- Duplicate email addresses
- Database connection issues
- General server errors

## Security Considerations

- Input sanitization prevents basic injection attacks
- Email uniqueness prevents spam registrations
- Form submissions use POST method
- No sensitive data is exposed in error messages

## Customization

### Styling
The form uses Tailwind CSS classes and follows the existing site's design system. You can customize the appearance by modifying the classes in `JoinClubForm.astro`.

### Database Schema
To add more fields to the registration form:
1. Update the database schema in `src/lib/database.ts`
2. Modify the API endpoint in `src/pages/api/join-club.ts`
3. Update the form in `src/components/JoinClubForm.astro`
4. Update the admin interface in `src/pages/admin.astro`

### Email Integration
To send confirmation emails or notifications:
1. Install an email service library (like Nodemailer)
2. Add email sending logic to the API endpoint
3. Consider adding email templates

## Troubleshooting

### Common Issues

**Database errors:**
- Ensure the `src/data` directory exists and is writable
- Check file permissions for the database file

**Form not submitting:**
- Check browser console for JavaScript errors
- Verify the API endpoint is accessible
- Ensure the development server is running

**Build issues:**
- Make sure all dependencies are installed (`npm install`)
- Check for TypeScript errors (`npm run build`)

### Logs
Check the server console for detailed error messages when issues occur.