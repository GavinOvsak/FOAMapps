# ⚕️ FOAM Apps (Free Open Access Medical Web Apps)

🔗 **Live Directory**: [gavinovsak.github.io/FOAMapps](https://gavinovsak.github.io/FOAMapps/)

FOAM Apps is an open, curated directory of **Free Open Access Medical education (FOAM)** web applications, calculators, reference engines, interactive simulations, and other digital tools designed for healthcare professionals, students, and clinical researchers.

This interactive web application makes it easy for clinicians to discover, search, filter, and star their favorite bedside and educational resources.

---

## 📂 App Directory (The JSON List)

The database of applications powering this directory is stored in a clean, easily-editable JSON file:

📍 **Path**: [`public/data/apps.json`](file:///Users/ggovsak/Documents/GitHub/FOAMapps/public/data/apps.json)

### Adding a New App
To add a new application or update an existing one in the directory, simply append a new object to the array in `public/data/apps.json` matching the schema below:

```json
{
  "name": "MDCalc",
  "url": "https://www.mdcalc.com",
  "tags": ["calculators"],
  "description": "The most widely used medical calculator and clinical decision support tool, with hundreds of validated scores and risk stratification tools.",
  "dateAdded": "2026-05-25",
  "github": "optional/repo-path"
}
```

### Schema Properties
* **`name`** (string, required): The official name of the medical application.
* **`url`** (string, required): The primary website or web application deployment URL.
* **`tags`** (array of strings, required): Category tags for indexing and filtering (e.g., `emergency`, `critical-care`, `pharmacology`, `anatomy`, `calculators`, `reference`, `radiology`, `pediatrics`).
* **`description`** (string, optional): A concise explanation of the application's clinical utility and educational focus.
* **`dateAdded`** (string, optional): The date the app was added to the directory (formatted as `YYYY-MM-DD`).
* **`github`** (string, optional): The GitHub repository path formatted as `"owner/repo"` (e.g., `Slicer/Slicer`). Providing this enables dynamic GitHub star count fetching and automatic "My Stars" filtering integration.

---

## 🚀 Key Features

* **Instant Search**: Search through apps by name, description, or tags in real-time.
* **Tag-Based Filtering**: Filter tools using custom tags to find exactly what you need (e.g., Emergency Medicine, Radiology, Pediatrics, Anatomy, etc.).
* **GitHub Integration**:
  * **Dynamic Star Counts**: Fetches repository stars directly from the GitHub API, using client-side caching to respect rate limits.
  * **Personal Favorites / "My Stars"**: Users can link their GitHub username to filter the directory by repositories they have personally starred on GitHub.
* **Browser Local Star Fallback**: If an app does not have a GitHub repository, users can still favorite/star the app locally, which is saved securely in browser `localStorage`.
* **Advanced Sorting**: Sort the directory by addition date (Newest/Oldest) or popular interest (Most/Fewest GitHub stars).
* **Responsive, Premium Design**: Crafted with a clean, grid-based interface, responsive layouts for bedside mobile use, smooth micro-animations, and a highly polished slate/blue aesthetic.

---

## 🛠️ Technology Stack

The project is built using a modern, fast frontend development stack:
* **Core**: [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/) for robust component state and type-safety.
* **Build Tool & Dev Server**: [Vite](https://vitejs.dev/) for blazing-fast development and optimized production builds.
* **Styling**: [TailwindCSS](https://tailwindcss.com/) for fluid, flexible layouts and beautiful modern responsive UI.
* **API Integration**: RESTful communication with the [GitHub API](https://docs.github.com/en/rest) to fetch live social proof.
* **State & Persistence**: Client-side `localStorage` caching for caching repository statistics, star configurations, and active user preferences.

---

## 📬 Contributing and Submissions

We welcome new app submissions, corrections, and improvements! If you know of a free, open-access medical application that belongs in this directory, you can submit or add it in three different ways:

1. **GitHub Issue**: Open a [GitHub Issue](https://github.com/GavinOvsak/FOAMapps/issues/new?template=add-app.yml) using our curated **Add App** template.
2. **Email**: Email the details directly to Gavin at [ovsak.gavin@gmail.com](mailto:ovsak.gavin@gmail.com).
3. **Pull Request (PR)**: Fork the repository, add the application directly to the database in [`public/data/apps.json`](file:///Users/ggovsak/Documents/GitHub/FOAMapps/public/data/apps.json) matching the schema outlined above, and submit a Pull Request.
