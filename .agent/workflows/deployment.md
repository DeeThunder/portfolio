---
description: How to safely update the portfolio without site downtime
---

# Safe Deployment Workflow

To ensure your portfolio remains stable while you make updates, follow this professional CI/CD strategy.

## 1. Create a Feature Branch
Never push experimental changes directly to `main`. Create a new branch for your updates:

```bash
git checkout -b feature/new-updates
```

## 2. Push and Preview (Netlify)
Push your branch to GitHub. Netlify will automatically detect the new branch and generate a **Deploy Preview**.

```bash
git add .
git commit -m "Add new features"
git push origin feature/new-updates
```

- **Netlify Deploy Preview**: You will get a unique URL to view your changes. This URL is private and doesn't affect `https://your-portfolio.netlify.app`.
- **Validation**: Share the preview URL with others or test it on different devices.

## 3. Merge to Main
Once you are 100% satisfied with the preview, merge the branch into `main`.

1. Go to your GitHub repository.
2. Open a **Pull Request** from `feature/new-updates` to `main`.
3. Review the changes one last time and click **Merge**.

**Result**: Netlify will trigger a new build for the `main` branch, and the live site will update instantly without any lag or downtime for users.

## 4. Local Cleanup
After merging, switch back to `main` and pull the latest changes:

```bash
git checkout main
git pull origin main
git branch -d feature/new-updates
```

// turbo-all
