# Collaboration & Pull Request Workflow (Read Carefully)

To make our teamwork smoother and prevent messy merge conflicts, everyone should start following these steps from now on:

## 1. Always stay updated with the dev branch

Before you start coding each day, pull the latest changes from dev into your local branch.
Example:

```
git switch dev
git branch --set-upstream-to=origin/dev dev # If you haven't set up tracking
git pull
git switch <working_branch>
git merge dev
```

This keeps your local work in sync with everyone else’s progress and reduces the chance of big conflicts later.

## 2. Create a draft PR as soon as you start working on something

Don’t wait until your feature is done. Open a **Draft Pull Request** early so others can see what files you’re editing. This helps avoid multiple people changing the same file or section of code at once.

Draft PRs also make it easier for others to give you feedback early instead of after you finish everything.

## 3. Keep each PR small, simple, and focused

Each PR should handle only one specific feature or bug fix. Avoid mixing multiple tasks or unrelated edits in the same PR.

Try to keep the total number of changed lines **under ~300 lines**. Smaller PRs are easier to review, merge, and debug if something breaks.

## 4. Merge quickly and frequently

Don’t let your PR sit open for too long. If your work is complete and tested, merge daily or as soon as possible.

The longer a PR stays open, the more it risks conflicting with others’ updates. Frequent merging keeps the codebase fresh and reduces rework.

## Summary of what to do from now on

1. Pull latest from dev before working if `dev` just got merged.
2. Open a Draft PR early (don’t wait until done).
3. Keep each PR focused on one thing and under 300 lines.
4. Merge as soon as your work is reviewed and ready.