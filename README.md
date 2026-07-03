# BrewMind Coffee

BrewMind Coffee is an AI-powered coffee shop platform built to improve how customers discover drinks, place orders, manage preferences, and interact with their local coffee shop.

The application combines a modern online storefront with personalized recommendations, secure checkout, customer accounts, order management, cloud deployment, and automated infrastructure.

## The problem

Many independent coffee shops still rely on disconnected systems for their website, menu, customer accounts, payments, loyalty programs, and order management.

This creates several problems:

* Customers may struggle to choose a drink that matches their taste, dietary needs, or caffeine preferences.
* Menus may be difficult to update and may not reflect current availability.
* Repeat customers must enter the same information every time they order.
* Small coffee shops may depend on expensive third-party platforms that reduce their control over customer relationships.
* Staff may have limited visibility into customer preferences, popular products, and order history.
* The online experience often feels separate from the in-store customer experience.

## The solution

BrewMind Coffee provides one connected platform for customers, employees, and administrators.

Customers can:

* Browse the current coffee and food menu.
* Create a secure account.
* Save preferences and view previous orders.
* Add products to a shopping cart.
* Complete payments through Stripe Checkout.
* Receive AI-powered coffee recommendations.
* Track order status and review order history.

Coffee shop administrators can:

* Manage products, prices, categories, and availability.
* View incoming and completed orders.
* Review customer and product trends.
* Maintain a consistent digital storefront.
* Monitor application health and deployment status.

## AI recommendation experience

The BrewMind assistant helps customers choose a drink by considering information such as:

* Hot or iced preference
* Coffee strength
* Sweetness level
* Milk or dairy preference
* Caffeine preference
* Dietary restrictions
* Available menu items

The recommendation system is designed to recommend real products from the BrewMind menu rather than inventing products, ingredients, or prices.

## Project goals

BrewMind Coffee is being built as both a customer-facing application and a reusable production system for future software projects.

The project demonstrates:

* Full-stack development with Next.js and TypeScript
* Accessible interface development with Tailwind CSS and shadcn/ui
* Animation and interaction design with Motion
* Authentication with Clerk
* Secure payments and webhook processing with Stripe
* PostgreSQL database design and order management
* AI integration using Microsoft Foundry
* Containerization with Docker
* Azure PaaS deployment
* Infrastructure as code with Terraform
* Linux configuration with Ansible
* Continuous integration with GitHub Actions
* End-to-end testing with Playwright
* AI-assisted development with Claude Code, Codex, and specialized subagents
* Technical documentation and architecture decision records

## Development workflow

* `main` contains stable, reviewed, and production-ready code.
* `dev` contains active development and integrated features.
* `feature/*` branches contain isolated feature work.

Features move through the following workflow:

```text
feature branch
      ↓
pull request into dev
      ↓
automated testing
      ↓
Codex independent review
      ↓
manual approval
      ↓
pull request into main
      ↓
production deployment
```

## Planned technology stack

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui
* Motion
* Clerk
* Stripe
* PostgreSQL
* Prisma
* Microsoft Foundry
* Docker
* Azure Container Apps
* Azure Container Registry
* Azure Key Vault
* Terraform
* Ansible
* GitHub Actions
* Playwright
* Claude Code
* Codex

## Current status

BrewMind Coffee is currently under active development. The initial focus is building a complete and reliable customer purchase journey before adding advanced AI, infrastructure automation, and production monitoring.
