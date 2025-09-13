// Simple test script to verify the API endpoints work correctly
import fetch from 'node-fetch';

const API_BASE_URL = 'http://localhost:4321';

async function testAPI() {
  console.log('🧪 Testing Club Registration API...\n');

  try {
    // Test 1: Add a new member
    console.log('1. Testing POST /api/join-club - Adding new member...');
    const formData = new URLSearchParams();
    formData.append('name', 'John Doe');
    formData.append('email', 'john.doe@example.com');

    const postResponse = await fetch(`${API_BASE_URL}/api/join-club`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const postResult = await postResponse.json();
    console.log('Response:', postResult);

    if (postResult.success) {
      console.log('✅ Successfully added member with ID:', postResult.memberId);
    } else {
      console.log('❌ Failed to add member:', postResult.message);
    }

    // Test 2: Try to add duplicate email
    console.log('\n2. Testing POST /api/join-club - Duplicate email...');
    const duplicateResponse = await fetch(`${API_BASE_URL}/api/join-club`, {
      method: 'POST',
      body: formData,
    });

    const duplicateResult = await duplicateResponse.json();
    console.log('Response:', duplicateResult);

    if (!duplicateResult.success && duplicateResult.message.includes('already registered')) {
      console.log('✅ Correctly rejected duplicate email');
    } else {
      console.log('❌ Did not handle duplicate email properly');
    }

    // Test 3: Add another member
    console.log('\n3. Testing POST /api/join-club - Adding another member...');
    const formData2 = new URLSearchParams();
    formData2.append('name', 'Jane Smith');
    formData2.append('email', 'jane.smith@example.com');

    const postResponse2 = await fetch(`${API_BASE_URL}/api/join-club`, {
      method: 'POST',
      body: formData2,
    });

    const postResult2 = await postResponse2.json();
    console.log('Response:', postResult2);

    // Test 4: Get all members
    console.log('\n4. Testing GET /api/join-club - Retrieving all members...');
    const getResponse = await fetch(`${API_BASE_URL}/api/join-club`);
    const getResult = await getResponse.json();

    console.log('Response:', getResult);

    if (getResult.success && Array.isArray(getResult.members)) {
      console.log(`✅ Successfully retrieved ${getResult.members.length} members`);
      getResult.members.forEach((member, index) => {
        console.log(`   ${index + 1}. ${member.name} (${member.email}) - joined ${member.created_at}`);
      });
    } else {
      console.log('❌ Failed to retrieve members');
    }

    // Test 5: Test validation - empty fields
    console.log('\n5. Testing POST /api/join-club - Empty fields validation...');
    const emptyData = new URLSearchParams();
    emptyData.append('name', '');
    emptyData.append('email', '');

    const emptyResponse = await fetch(`${API_BASE_URL}/api/join-club`, {
      method: 'POST',
      body: emptyData,
    });

    const emptyResult = await emptyResponse.json();
    console.log('Response:', emptyResult);

    if (!emptyResult.success && emptyResult.message.includes('required')) {
      console.log('✅ Correctly validated empty fields');
    } else {
      console.log('❌ Did not validate empty fields properly');
    }

    // Test 6: Test email validation
    console.log('\n6. Testing POST /api/join-club - Invalid email validation...');
    const invalidEmailData = new URLSearchParams();
    invalidEmailData.append('name', 'Invalid User');
    invalidEmailData.append('email', 'not-an-email');

    const invalidEmailResponse = await fetch(`${API_BASE_URL}/api/join-club`, {
      method: 'POST',
      body: invalidEmailData,
    });

    const invalidEmailResult = await invalidEmailResponse.json();
    console.log('Response:', invalidEmailResult);

    if (!invalidEmailResult.success && invalidEmailResult.message.includes('valid email')) {
      console.log('✅ Correctly validated invalid email');
    } else {
      console.log('❌ Did not validate invalid email properly');
    }

    console.log('\n🎉 API testing completed!');
    console.log('\nTo test the UI:');
    console.log(`- Main page with form: ${API_BASE_URL}/`);
    console.log(`- Admin page: ${API_BASE_URL}/admin`);

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
    console.error('Make sure the development server is running with: npm run dev');
  }
}

// Run tests
testAPI();
