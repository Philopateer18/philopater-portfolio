# Philopater Ashraf William — Developer Portfolio Website

A modern, responsive, and visually appealing developer portfolio website crafted specifically for **Philopater Ashraf William**, Back-End .NET Developer & Business Information Systems (BIS) Graduate based in Cairo, Egypt.

---

## 🌟 Key Highlights & Features

- **Developer-Centric Visual Identity**: Modern dark/light theme designed around the modern Microsoft .NET aesthetic (`#512bd4` purple & `#06b6d4` cyan accents), glowing gradients, and subtle grid patterns.
- **Interactive C# Code Terminal**: Hero section features an interactive code editor previewing real C# .NET solution snippets with tab switching (`PhilopaterProfile.cs`, `OnionArchitecture.cs`, `BISWorkflow.cs`).
- **The BIS + .NET Dual Value Proposition**: Prominently highlights the unique blend of business domain analysis (El Shorouk Academy - Very Good) with enterprise software architecture (Route Academy .NET Diploma).
- **Interactive Architecture Deep-Dive**: Visual breakdown of **Onion Architecture** layers (Domain Core, Application, Infrastructure/Persistence, and Presentation/Web API) implemented in flagship projects like **Route Fitness**.
- **Dynamic Projects Showcase & Modal Inspector**:
  - **Route Fitness**: Gym Management System Backend with Onion Architecture, EF Core, SQL Server, Unit of Work, and Generic Repository.
  - **Enterprise E-Commerce RESTful Web API**: JWT Bearer Auth, Swagger/OpenAPI, FluentValidation, Global Exception Middleware.
  - **Task & Workflow Management API**: CQRS, LINQ optimization, Postman collection.
  - **Healthcare Clinic System**: BIS systems analysis, relational database design.
- **One-Click Contact & Clipboard**:
  - One-click copy for Email (`Philowilliam336@gmail.com`) and Phone (`+20 1284751117`).
  - Pre-filled interactive contact form with instant validation and feedback toasts.
- **Built-in ATS Resume Viewer & Print to PDF**:
  - View full CV directly in a modal without needing external PDF viewers or broken download links.
  - Instant "Print / Save as PDF" button with specialized print CSS styling.
- **100% Zero-Dependency Standalone Build**:
  - Pure semantic HTML5, CSS3 with modern CSS custom variables, and vanilla JavaScript.
  - Works straight out of the box in any browser by double-clicking `index.html`.

---

## 📁 File Structure

```
philopater-portfolio/
├── index.html              # Main semantic HTML5 markup & SEO meta tags
├── css/
│   └── style.css           # Complete responsive stylesheet (Dark/Light mode, animations)
├── js/
│   ├── projects.js         # Structured data for projects, architectures & code snippets
│   └── main.js             # Theme switching, interactive tabs, modals & form logic
└── README.md               # Documentation & deployment guide
```

---

## 🚀 How to Run Locally

You can run this portfolio in seconds:

### Option 1: Direct Browser Launch
Simply navigate to `C:\Users\philo\.gemini\antigravity\scratch\philopater-portfolio` in Windows Explorer and double-click `index.html`. It will open in Chrome, Edge, Firefox, or your default browser immediately!

### Option 2: Using VS Code Live Server
1. Open the `philopater-portfolio` folder in Visual Studio Code.
2. Right-click `index.html` and select **"Open with Live Server"**.

### Option 3: Using Python HTTP Server (if installed)
```bash
cd C:\Users\philo\.gemini\antigravity\scratch\philopater-portfolio
python -m http.server 3000
```
Then visit `http://localhost:3000`.

---

## 🌐 Free 1-Click Deployment Options

### Deploy to GitHub Pages (Recommended)
1. Initialize a git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Philopater's Portfolio"
   ```
2. Create a new repository on your GitHub account (e.g., `philopater-ashraf.github.io` or `portfolio`).
3. Push to GitHub:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
4. Go to **Settings > Pages > Branch**, choose `main`, and click **Save**. Your site will be live globally with HTTPS!

### Deploy to Vercel or Netlify
- Drag and drop the `philopater-portfolio` folder directly into [netlify.com/drop](https://app.netlify.com/drop) or import from GitHub on [vercel.com](https://vercel.com).

---

## 🛠️ Personal Customizations

- **Updating Projects**: Modify or add entries in `js/projects.js`. The UI updates automatically.
- **Updating Social Links**: Update the URLs in `index.html` (e.g., your GitHub username or custom domain).
- **Styling & Colors**: Adjust `--dotnet-purple` or `--accent-cyan` in `css/style.css` `:root` variables.
