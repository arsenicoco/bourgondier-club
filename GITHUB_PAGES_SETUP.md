# GitHub Pages Deployment Guide

This guide will help you deploy your wine club website with the registration form to GitHub Pages.

## Overview

The website has been configured for static deployment to GitHub Pages using:
- **Static Site Generation**: Astro builds a static site
- **Form Handling**: Formspree service for contact form submissions
- **GitHub Actions**: Automatic deployment on push to main branch

## Prerequisites

1. GitHub account
2. Formspree account (free tier available)
3. Repository with the wine club code

## Step-by-Step Setup

### 1. Repository Setup

1. Push your code to a GitHub repository
2. Go to your repository settings on GitHub
3. Navigate to "Pages" section
4. Under "Source", select "GitHub Actions"

### 2. Formspree Configuration

#### Create Formspree Account
1. Go to [formspree.io](https://formspree.io)
2. Sign up for a free account
3. Create a new form project

#### Get Your Form Endpoint
1. In your Formspree dashboard, create a new form
2. Copy the form endpoint URL (looks like: `https://formspree.io/f/YOUR_FORM_ID`)
3. Note down this URL - you'll need it in the next step

#### Update Form Configuration
1. Open `src/components/JoinClubFormStatic.astro`
2. Find this line:
   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
3. Replace `YOUR_FORM_ID` with your actual Formspree form ID

#### Configure Formspree Settings
In your Formspree dashboard:
1. **Subject Line**: Set to "New Wine Club Registration"
2. **Redirect URL**: Set to `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/?success=true`
3. **Email Notifications**: Enable to receive emails for new submissions
4. **Spam Protection**: Enable reCAPTCHA if desired

### 3. Update Site Configuration

1. Open `astro.config.mjs`
2. Update the `site` field with your GitHub Pages URL:
   ```javascript
   site: "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME",
   ```
3. If your repository name is NOT your main GitHub Pages site, update the `base` field:
   ```javascript
   base: "/YOUR_REPO_NAME/",
   ```

### 4. Update Form Redirect URL

1. Open `src/components/JoinClubFormStatic.astro`
2. Find the hidden input field:
   ```html
   <input type="hidden" name="_next" value="https://club.bourgondier.wine/?success=true">
   ```
3. Replace the URL with your GitHub Pages URL:
   ```html
   <input type="hidden" name="_next" value="https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/?success=true">
   ```

### 5. Deploy

1. Commit and push your changes to the `main` branch
2. GitHub Actions will automatically build and deploy your site
3. Check the "Actions" tab in your repository to monitor deployment progress
4. Your site will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## Testing Your Deployment

### Test the Registration Form
1. Visit your deployed site
2. Navigate to the registration form section
3. Fill out and submit the form
4. You should be redirected back to your site with a success message
5. Check your email for the form submission notification

### Monitor Form Submissions
1. Log into your Formspree dashboard
2. View all form submissions in real-time
3. Export data as CSV for your records
4. Set up email notifications for new registrations

## Troubleshooting

### Site Not Loading
- Check that GitHub Pages is enabled in repository settings
- Verify the GitHub Action completed successfully
- Ensure the correct branch is selected for deployment

### Form Not Working
- Verify the Formspree endpoint URL is correct
- Check that the redirect URL matches your actual site URL
- Test the form endpoint directly in Formspree dashboard

### 404 Errors
- Ensure `base` path in `astro.config.mjs` matches your repository name
- Check that all internal links use relative paths

### Build Failures
- Check the Actions tab for detailed error logs
- Ensure all dependencies are properly listed in `package.json`
- Verify there are no TypeScript errors

## Custom Domain (Optional)

If you want to use a custom domain:

1. Add a `CNAME` file to the `public/` directory with your domain name
2. Configure DNS settings with your domain provider
3. Update the `site` field in `astro.config.mjs`
4. Update the form redirect URL in `JoinClubFormStatic.astro`

## File Structure After Setup

```
puffy-pegasi/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions deployment
├── src/
│   ├── components/
│   │   └── JoinClubFormStatic.astro # Contact form (configured)
│   ├── pages/
│   │   ├── admin.astro             # Admin dashboard
│   │   └── index.astro             # Main page with form
│   └── ...
├── astro.config.mjs                # Site configuration (updated)
└── public/
    └── CNAME                       # Custom domain (optional)
```

## Form Features

✅ **Email Collection**: Names and emails stored in Formspree
✅ **Spam Protection**: Built-in validation and optional reCAPTCHA
✅ **Email Notifications**: Instant notifications for new registrations
✅ **Data Export**: Download submissions as CSV
✅ **Mobile Responsive**: Works on all devices
✅ **Success Messages**: User feedback after form submission

## Limitations of GitHub Pages

- No server-side processing (that's why we use Formspree)
- No database storage (handled by Formspree)
- Static files only
- 1GB repository size limit
- 100GB bandwidth per month

## Alternative Form Services

If you prefer not to use Formspree, other options include:
- **Netlify Forms** (if you deploy to Netlify instead)
- **EmailJS** (client-side email sending)
- **Google Forms** (embed Google Form)
- **Typeform** (professional forms)

## Maintenance

### Regular Tasks
- Monitor form submissions in Formspree dashboard
- Export member data periodically for backup
- Update spam protection settings as needed
- Review and respond to new club registrations

### Updates
- Keep Astro dependencies updated
- Monitor GitHub Actions for any deployment issues
- Test form functionality after any major changes

## Support

- **Astro Documentation**: [docs.astro.build](https://docs.astro.build)
- **GitHub Pages Help**: [docs.github.com/pages](https://docs.github.com/pages)
- **Formspree Support**: [help.formspree.io](https://help.formspree.io)

Your wine club website is now ready for GitHub Pages deployment! 🍷