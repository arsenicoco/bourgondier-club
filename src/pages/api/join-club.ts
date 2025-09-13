import type { APIRoute } from 'astro';
import { database } from '../../lib/database.js';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    // Validate input
    if (!name || !email) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Name and email are required'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Please enter a valid email address'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Sanitize input
    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim().toLowerCase();

    // Add member to database
    const memberId = await database.addMember(sanitizedName, sanitizedEmail);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Successfully joined the club!',
        memberId
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    console.error('Error adding club member:', error);

    let message = 'An error occurred while processing your request';
    let status = 500;

    if (error instanceof Error) {
      if (error.message === 'Email already exists') {
        message = 'This email is already registered with our club';
        status = 409;
      }
    }

    return new Response(
      JSON.stringify({
        success: false,
        message
      }),
      {
        status,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};

export const GET: APIRoute = async () => {
  try {
    const members = await database.getAllMembers();

    return new Response(
      JSON.stringify({
        success: true,
        members: members.map(member => ({
          id: member.id,
          name: member.name,
          email: member.email,
          created_at: member.created_at
        }))
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error fetching club members:', error);

    return new Response(
      JSON.stringify({
        success: false,
        message: 'An error occurred while fetching members'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};
