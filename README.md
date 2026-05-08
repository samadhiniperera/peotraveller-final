# PeoTraveller — AI-Powered Travel Companion

> A web-based platform for tourists and local travellers to discover places, plan trips, organize adventures, and share memories.

---

## About

PeoTraveller is a web application designed to be the ultimate travel companion for both tourists and local explorers. It helps users discover destinations, curate personal travel lists, find accommodation and camping essentials, budget trips, and relive shared memories.

The platform stands out through its **AI-powered smart search**, which allows users to find places using images or natural language descriptions, and an **AI trip planner** that generates personalized itineraries including hotel and attraction suggestions.

---

## Features

### AI-Powered Smart Search
- **Image-based search** — Upload a photo of a place and the AI identifies it and surfaces related destinations.
- **Description-based search** — Describe a place in natural language and the LLM suggests matching locations.

### Place Discovery
- Browse and explore curated places — tourist attractions, rest stops, scenic spots, and hidden gems.
- View rich place details including photos, reviews, and location info.
- Filter by category: beaches, mountains, rest areas, cultural sites, and more.

### Personal Travel Lists
- Save places into custom lists (e.g., *"Places to Visit Next"*, *"Weekend Getaways"*).
- Organize and manage lists with tags, priorities, and notes.
- Access saved lists across devices.

### AI Trip Planner
- Input destination, dates, budget, and preferences.
- AI generates a full itinerary including:
  - Recommended places to visit
  - Hotel and accommodation suggestions
  - Day-by-day activity planning
- Calculates estimated costs and travel logistics.
- AI workflow engine *(model and orchestration TBD)*.

### Camping & Rest Place Finder
- Discover rest stops along travel routes.
- Find camping-friendly locations with details on amenities.
- Search for equipment rental and camping gear suppliers nearby.

### Trip Cost Organizer
- Estimate and track travel expenses.
- Calculate costs for accommodation, transport, food, and activities.
- Set budgets and get AI-assisted cost breakdowns per trip.

### Memory Sharing
- Upload and share photos and travel stories from past trips.
- Explore memories shared by other travellers at the same locations.
- Build a community travel journal tied to specific places.

---

## System Modules

| Module | Description |
|---|---|
| **Smart Search** | Image & description-based place discovery via LLM |
| **Place Explorer** | Browse, filter, and view place details |
| **My Lists** | Personal travel wishlist and bucket list manager |
| **Trip Planner** | AI-generated itineraries with hotels and activities |
| **Cost Calculator** | Budget estimation and expense tracking |
| **Rest & Camping Finder** | Locate rest stops and camping sites on route |
| **Memory Feed** | Social travel memory sharing and community posts |
| **User Profile** | Account management, preferences, and saved history |

---

## Tech Stack

| Layer | Technology | Status |
|---|---|---|
| **Frontend** | TBD | Not selected |
| **Backend** | TBD | Not selected |
| **LLM Model** | TBD | Not selected |
| **Database** | TBD | Not selected |
| **Image Processing** | TBD | Not selected |
| **Authentication** | TBD | Not selected |

---

## Target Users

- **Tourists** visiting new cities or countries seeking curated travel guidance.
- **Local travellers** looking to explore nearby places, rest stops, or camping sites.
- **Budget travellers** who need cost estimates and organized trip plans.
- **Memory keepers** who want to document and share their travel experiences.

---

## Epics

| # | Epic | Module | Status |
|---|---|---|---|
| E1 | [User Place List Management](#epic-1--user-place-list-management) | My Lists | Backlog |
| E2 | [Place Search by Image & Preference](#epic-2--place-search-by-image--preference) | Smart Search | Backlog |
| E3 | [Explore Journey Planner](#epic-3--explore-journey-planner-️-key-feature) | Trip Planner | Backlog |
| E4 | [Camping & Rest Finder](#epic-4--camping--rest-finder) | Rest & Camping Finder | Backlog |
| E5 | [Trip Cost Organizer](#epic-5--trip-cost-organizer) | Cost Calculator | Backlog |
| E6 | [Memory Sharing](#epic-6--memory-sharing) | Memory Feed | Backlog |
| E7 | [User Profile & Auth](#epic-7--user-profile--auth) | User Profile | Backlog |

---

## Epic & Story Breakdown

### Epic 1 — User Place List Management

> Users maintain a personalized wish list of places. This list feeds into seasonal suggestions and other AI features across the app.

| Story | Description | Sprint | Status |
|---|---|---|---|
| S1.1 | Add a place to wish list | Sprint 1 | Backlog |
| S1.2 | Remove a place from wish list | Sprint 1 | Backlog |
| S1.3 | View and manage wish list UI | Sprint 1 | Backlog |
| S1.4 | Persist wish list across sessions (auth + DB) | Sprint 1 | Backlog |
| S1.5 | Suggest places by season from wish list (LLM) | Sprint 2 | Backlog |

---

### Epic 2 — Place Search by Image & Preference

> Users search for destinations by uploading an image or entering text. LLM identifies and suggests matching places.

| Story | Description | Sprint | Status |
|---|---|---|---|
| S2.1 | Search places by image upload (Vision LLM) | Sprint 2 | Backlog |
| S2.2 | Search places by text preference | Sprint 2 | Backlog |
| S2.3 | Display LLM-powered place suggestions from search | Sprint 2 | Backlog |

---

### Epic 3 — Explore Journey Planner (Key Feature)

> Core feature. User provides preferences and the system plans a complete journey — places, optimal route map, hotels, camping, transport, gear, and budget.

| Story | Description | Sprint | Status |
|---|---|---|---|
| S3.1 | Journey preference input form (text) | Sprint 3 | Backlog |
| S3.2 | LLM suggests places based on user preference | Sprint 3 | Backlog |
| S3.3 | User selects places; auto-generate optimal route map | Sprint 3 | Backlog |
| S3.4 | Suggest hotels along the route | Sprint 3 | Backlog |
| S3.5 | Suggest camping sites along the route | Sprint 3 | Backlog |
| S3.6 | Suggest transport options between places | Sprint 3 | Backlog |
| S3.7 | Camping gear & instruments suggestions (LLM) | Sprint 4 | Backlog |
| S3.8 | Budget estimation for the journey | Sprint 4 | Backlog |
| S3.9 | Save and view a planned journey | Sprint 4 | Backlog |

---

### Epic 4 — Camping & Rest Finder

> Users discover rest stops and camping sites along their travel routes, with amenity details and gear supplier info.

| Story | Description | Sprint | Status |
|---|---|---|---|
| S4.1 | Search rest stops along a route | Sprint 4 | Backlog |
| S4.2 | View camping site details and amenities | Sprint 4 | Backlog |
| S4.3 | Find camping gear suppliers near a location | Sprint 4 | Backlog |

---

### Epic 5 — Trip Cost Organizer

> Users estimate, track, and manage trip expenses with AI-assisted budget breakdowns.

| Story | Description | Sprint | Status |
|---|---|---|---|
| S5.1 | Set a trip budget | Sprint 4 | Backlog |
| S5.2 | Estimate costs by category (accommodation, food, transport) | Sprint 4 | Backlog |
| S5.3 | AI-assisted cost breakdown per trip | Sprint 4 | Backlog |
| S5.4 | Track actual vs estimated expenses | Sprint 5 | Backlog |

---

### Epic 6 — Memory Sharing

> Users upload travel photos and stories tied to places, and explore memories shared by other travellers.

| Story | Description | Sprint | Status |
|---|---|---|---|
| S6.1 | Upload travel photo and story to a place | Sprint 5 | Backlog |
| S6.2 | View memories shared by others at a location | Sprint 5 | Backlog |
| S6.3 | Community memory feed (browse all shared memories) | Sprint 5 | Backlog |

---

### Epic 7 — User Profile & Auth

> Account creation, login, preferences, and saved history management.

| Story | Description | Sprint | Status |
|---|---|---|---|
| S7.1 | User registration and login | Sprint 1 | Backlog |
| S7.2 | User profile page (edit name, photo, preferences) | Sprint 1 | Backlog |
| S7.3 | View saved lists and trip history | Sprint 2 | Backlog |

---

## Product Backlog

> All stories ordered by sprint priority. Items in Sprint 1 are the immediate development focus.

### Sprint 1 — Foundation & Auth
- [ ] S7.1 — User registration and login
- [ ] S7.2 — User profile page
- [ ] S1.1 — Add a place to wish list
- [ ] S1.2 — Remove a place from wish list
- [ ] S1.3 — View and manage wish list UI
- [ ] S1.4 — Persist wish list across sessions

### Sprint 2 — Search & Discovery
- [ ] S1.5 — Suggest places by season from wish list (LLM)
- [ ] S7.3 — View saved lists and trip history
- [ ] S2.1 — Search places by image upload
- [ ] S2.2 — Search places by text preference
- [ ] S2.3 — Display LLM place suggestions from search

### Sprint 3 — Journey Planner Core
- [ ] S3.1 — Journey preference input form
- [ ] S3.2 — LLM suggests places from preference
- [ ] S3.3 — Select places and auto-generate optimal route map
- [ ] S3.4 — Suggest hotels along the route
- [ ] S3.5 — Suggest camping sites along the route
- [ ] S3.6 — Suggest transport options between places

### Sprint 4 — Budget, Gear & Camping
- [ ] S3.7 — Camping gear & instruments suggestions
- [ ] S3.8 — Budget estimation for the journey
- [ ] S3.9 — Save and view planned journey
- [ ] S4.1 — Search rest stops along a route
- [ ] S4.2 — View camping site details and amenities
- [ ] S4.3 — Find camping gear suppliers near a location
- [ ] S5.1 — Set a trip budget
- [ ] S5.2 — Estimate costs by category
- [ ] S5.3 — AI-assisted cost breakdown per trip

### Sprint 5 — Memory Sharing & Expense Tracking
- [ ] S5.4 — Track actual vs estimated expenses
- [ ] S6.1 — Upload travel photo and story to a place
- [ ] S6.2 — View memories shared by others at a location
- [ ] S6.3 — Community memory feed

---

## Project Status

This project is currently in the **initial planning and backlog definition phase**.

- [x] Project concept and scope defined
- [x] README and initial documentation
- [x] Epic and story definition
- [x] Product backlog created and prioritized
- [ ] Architecture design
- [ ] LLM model selection
- [ ] Database selection
- [ ] UI/UX wireframes
- [ ] Development kickoff

---

## Next Steps

1. Create GitHub Issues for all Epics and Stories above
2. Set up GitHub Project Board with Backlog / In Progress / In Review / Done columns
3. Finalize technology stack decisions (LLM model, database, frontend framework)
4. Create UI/UX wireframes for core flows (Place List, Search, Journey Planner)
5. Set up project infrastructure and CI/CD pipeline
6. Begin Sprint 1 — Foundation & Auth

---

## GitHub Labels

| Label | Color | Purpose |
|---|---|---|
| `epic` | `#7F77DD` | Large feature initiative |
| `story` | `#378ADD` | User-facing feature within an epic |
| `backlog` | `#888780` | Not yet scheduled or started |
| `in progress` | `#BA7517` | Actively being worked on |
| `done` | `#639922` | Completed and closed |

---

## License

License TBD.

---

*PeoTraveller — Explore smarter. Travel better.*
