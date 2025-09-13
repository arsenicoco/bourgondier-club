# Deployment Checklist for GitHub Pages

## Pre-Deployment Checklist

### 1. Repository Setup
- [ ] Code is pushed to GitHub repository
- [ ] Repository is public (required for free GitHub Pages)
- [ ] Main branch contains the latest code

### 2. Formspree Configuration
- [ ] Formspree account created at [formspree.io](https://formspree.io)
- [ ] New form created in Formspree dashboard
- [ ] Form endpoint URL copied (format: `https://formspree.io/f/XXXXXXXXX`)
- [ ] Form endpoint updated in `src/components/JoinClubFormStatic.astro`

### 3. Site Configuration Updates
- [ ] `astro.config.mjs` - `site` field updated with GitHub Pages URL
- [ ] `astro.config.mjs` - `base` field updated if needed (for non-root repositories)
- [ ] Form redirect URL updated in `JoinClubFormStatic.astro`

### 4. GitHub Pages Settings
- [ ] Repository Settings → Pages → Source set to "GitHub Actions"
- [ ] GitHub Actions workflow file exists at `.github/workflows/deploy.yml`

## Configuration Values to Update

### In `astro.config.mjs`:
```javascript
export default defineConfig({
  integrations: [tailwind()],
  output: "static",
  site: "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME", // ← Update this
  base: "/YOUR_REPO_NAME/", // ← Update this if needed
});
```

### In `src/components/JoinClubFormStatic.astro`:
```html
<!-- Update the action URL -->
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">

<!-- Update the redirect URL -->
<input type="hidden" name="_next" value="https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/?success=true">
```

## Deployment Process

### 1. Final Build Test
- [ ] Run `npm run build` locally to ensure no errors
- [ ] Check that `dist/` folder is generated successfully

### 2. Deploy
- [ ] Commit all changes to main branch
- [ ] Push to GitHub
- [ ] Monitor GitHub Actions tab for deployment status
- [ ] Wait for green checkmark indicating successful deployment

### 3. Post-Deployment Testing

#### Test Website Access
- [ ] Visit: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`
- [ ] Verify all pages load correctly
- [ ] Check mobile responsiveness
- [ ] Test dark/light mode if applicable

#### Test Registration Form
- [ ] Navigate to registration form section
- [ ] Fill out form with test data:
  - Name: "Test User"
  - Email: "test@example.com"
- [ ] Submit form
- [ ] Verify redirect to success page
- [ ] Check success message displays

#### Test Formspree Integration
- [ ] Log into Formspree dashboard
- [ ] Verify test submission appears
- [ ] Check email notification received (if enabled)
- [ ] Test spam protection (if enabled)

#### Test Admin Page
- [ ] Visit: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/admin`
- [ ] Verify admin dashboard loads
- [ ] Check all links work correctly

## Troubleshooting Common Issues

### Site Returns 404
- [ ] Check GitHub Pages settings are correct
- [ ] Verify repository is public
- [ ] Check `base` path in astro config matches repo name
- [ ] Wait 5-10 minutes for DNS propagation

### Form Doesn't Submit
- [ ] Verify Formspree endpoint URL is correct
- [ ] Check browser network tab for errors
- [ ] Test form directly in Formspree dashboard
- [ ] Verify redirect URL is accessible

### Build Fails
- [ ] Check Actions tab for detailed error logs
- [ ] Run `npm run build` locally to reproduce error
- [ ] Verify all dependencies are installed
- [ ] Check for TypeScript errors

### Styles Look Wrong
- [ ] Verify Tailwind CSS is building correctly
- [ ] Check for missing CSS files in build output
- [ ] Test on different browsers/devices

## Post-Launch Maintenance

### Regular Tasks
- [ ] Monitor form submissions in Formspree dashboard
- [ ] Respond to new club registration emails
- [ ] Export member data periodically for backup
- [ ] Update spam protection settings as needed

### Monthly Reviews
- [ ] Check GitHub Actions for any failed deployments
- [ ] Review Formspree usage/limits
- [ ] Test form functionality
- [ ] Update dependencies if needed

## Emergency Rollback

If something goes wrong:
1. [ ] Revert to previous commit: `git revert HEAD`
2. [ ] Push the revert: `git push origin main`
3. [ ] Wait for redeployment
4. [ ] Verify site is working
5. [ ] Fix issues in separate branch before redeploying

## Success Indicators

Your deployment is successful when:
- ✅ Website loads at GitHub Pages URL
- ✅ Registration form accepts and processes submissions
- ✅ Form submissions appear in Formspree dashboard
- ✅ Email notifications work (if configured)
- ✅ Admin dashboard is accessible
- ✅ All internal links work correctly
- ✅ Site is mobile responsive
- ✅ GitHub Actions show successful deployments

## Resources

- [GitHub Pages Documentation](https://docs.github.com/pages)
- [Astro Static Site Guide](https://docs.astro.build/en/guides/deploy/github/)
- [Formspree Documentation](https://help.formspree.io/)

---

**Remember**: Always test thoroughly in a development environment before deploying to production!