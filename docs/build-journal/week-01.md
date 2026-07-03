## Day 1 — Git branching strategy

### Goal

Create a professional Git workflow that separates active development from stable production code.

### Branch structure

* `main` contains stable, reviewed, and production-ready code.
* `dev` combines completed features before production release.
* `feature/*` branches isolate individual features and fixes.

### Work completed

* Confirmed `main` as the stable production branch.
* Created the `dev` development branch from `main`.
* Pushed `dev` to GitHub and configured its upstream remote.
* Established a feature-branch and pull-request workflow.

### Commands used

```bash
git checkout main
git pull origin main
git checkout -b dev
git push -u origin dev
git branch
git branch -r
git status
```

### Development workflow

```text
feature branch
      ↓
pull request into dev
      ↓
integration testing
      ↓
Codex review
      ↓
pull request from dev into main
      ↓
production release
```

### Why this decision was made

Separating development and production code reduces the risk of unfinished work reaching users. Feature branches also make changes easier to review, test, document, and reverse when necessary.

### What I learned

I learned that `main` should remain stable, `dev` should collect reviewed development work, and each major feature should be developed on its own branch.

### Evidence

Add screenshots showing:

1. The `main` and `dev` branches on GitHub.
2. The WSL terminal displaying `git branch`.
3. The first pull request from a feature branch into `dev`.
