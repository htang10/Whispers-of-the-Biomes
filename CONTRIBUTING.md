# 1. One-Time Setup
## Install Git

Download: https://git-scm.com/install/

Choose your OS and install with default options.

Open <b>VS Code</b> (recommended) or <b>Git Bash</b> — both can run Git commands.

## Set Your Git Identity

```
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

This helps others know who made each change.

Clone the Project

`git clone https://github.com/htang10/Whispers-Of-The-Biomes.git`

Now open the folder in VS Code.

Go into the cloned folder.

`cd whispers-of-the-biomes`

Then check if your local repo is linked to GitHub.

`git remote -v`

You should see something like:

```
origin  https://github.com/htang10/Whispers-Of-The-Biomes.git (fetch)
origin  https://github.com/htang10/Whispers-Of-The-Biomes.git (push)
```

If you don’t see this, add the remote manually.

`git remote add origin https://github.com/htang10/Whispers-Of-The-Biomes.git`

Fetch all remote branches to make sure your local copy matches GitHub.

`git fetch --all`

Create the local `dev` branch to sync changes from the remote `dev`.

`git checkout -b dev origin/dev`

Then check available branches.

`git branch -a`

You should see:

```
* dev
  remotes/origin/HEAD -> origin/main
  remotes/origin/dev
  remotes/origin/main
```

Now your local repo is fully connected and up to date.

# 2. Our Branching Strategy

We follow a simple and safe Git Flow:

`feature/*  →  dev  →  main`

| Branch       | Purpose                                                        |
| ------------ | -------------------------------------------------------------- |
| **main**     | The final, stable version (only for production).               |
| **dev**      | Shared development branch (where everyone’s work gets merged). |
| **feature/** | Your personal working branch for each new feature or fix.      |

Never edit code directly in main or dev.

Always create your own feature/... branch first.

# 3. Creating a New Branch (Start of Each Task)

Before creating a new branch, make sure your local repo is up to date:

```
git fetch
git checkout dev
git pull
```

Then create your feature branch:

`git checkout -b feature/your-branch-name`

Example:

`git checkout -b feature/intro-scene`

You’ll now be working only on this branch.

# 4. Working and Saving Your Changes

After you make some edits:

1. Check what changed:

`git status`


2. Add all modified files:

`git add .`


3. Commit your changes with a message:

`git commit -m "Added new animation to the intro scence."`

This will add the new changes to your local repo.

4. Push your changes to your branch:

`git push origin feature/forest-scene`

This will add the new changes to the remote repo, where our team is working together,
and other team membes can see the new changes inside that branch.

# 5. Making a Pull Request (PR)

Once you’re happy with your feature:

1. Go to GitHub, navigate to the `Pull requests` tab.

2. Click `New pull request`. Set the <i>base</i> to `dev` and <i>compare</i> to the branch you made your changes in.

3. Type a title and description for your pull request.

4. Submit the PR.

5. Wait for teammates to review or approve.

After successfully merged, GitHub will offer a “Delete branch” button — click it ✅

(That branch is safely merged into dev already, so you may no longer need it)

# 6. If You Need to Fix a Small Bug

Use a fix branch:

```
git checkout dev
git pull
git checkout -b fix/audio-loop
```

Make changes → commit → push → open PR to `dev`.

# 7. Extra Learning

If you want a visual explanation of Git basics, check out the video below:

[How Git Works: Explained in 4 Minutes](https://youtu.be/e9lnsKot_SQ?si=GjYo1WT8v7lNCgrh)
