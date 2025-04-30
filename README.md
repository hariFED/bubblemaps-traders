# Token Trader Network Visualization

![bubblemaps traders](https://github.com/user-attachments/assets/6bcfd264-a922-40c6-bdf4-b44b05f84818)

A **Next.js** application that visualizes the top traders of a given token using Bubblemaps data. Explore trading relationships between addresses with an interactive force-directed graph—helping traders and analysts gain insights into token activity.

---

## 🚀 Features

- **Search Functionality:** Search for any token contract on multiple blockchains.
- **Visualization:** Force-directed bubble graph of top traders.
- **Statistics:** Detailed token trading activity stats.
- **Interactive UI:** Hover nodes for trader details.
- **Responsive Design:** Fully responsive, with dark mode.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Visualization:** react-force-graph
- **Animation:** Framer Motion
- **Forms:** React Hook Form + Zod
- **Language:** TypeScript

---

## 📦 Getting Started

1. **Install dependencies:**
  ```bash
  npm install
  ```
2. **Run the development server:**
  ```bash
  npm run dev
  ```
3. **Open** [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
app/
  ├─ page.tsx                # Home page with search form
  ├─ visualize/[chain]/[contract]/page.tsx  # Visualization page
  ├─ not-found.tsx           # Custom 404 page
components/
  ├─ search-form.tsx         # Token & chain search form
  ├─ network-graph.tsx       # Force-directed graph
  ├─ network-stats.tsx       # Trading statistics
  ├─ back-button.tsx         # Navigation button
  ├─ loading-skeleton.tsx    # Loading UI
lib/
  ├─ api.ts                  # Bubblemaps API requests
  ├─ analyze.ts              # Data processing for visualization
  ├─ types.ts                # TypeScript types
  ├─ utils.ts                # Helper functions
styles/
  └─ ...                     # Global styles
```

---

## ⚙️ How It Works

1. **Search for a Token:**  
  Enter a token contract address and select a blockchain. Input is validated with Zod and React Hook Form.

2. **Fetch Data:**  
  The app requests trading data from the Bubblemaps API.

3. **Process Data:**  
  Data is processed (`lib/analyze.ts`) to extract top traders and relationships.

4. **Visualize Data:**  
  The graph is rendered with `react-force-graph`. Hover nodes for trader info.

5. **View Statistics:**  
  Key stats (connections, top trader volume, etc.) are shown in a separate panel.

---

## 💡 Use Cases

- **Identify Key Players:** Spot the most active addresses in a token's network.
- **Analyze Relationships:** Visualize clusters and trading patterns.
- **Make Informed Decisions:** Use insights to guide trading strategies.
- **Cross-Chain Insights:** Analyze activity across multiple blockchains.

---

## 📝 Example Workflow

1. Enter a token contract address (e.g., `0x603c7f932ed1fc6575303d8fb018fdcbb0f39a95`).
2. Select a blockchain (e.g., Binance Smart Chain).
3. Click **Visualize Network**.
4. Explore the interactive graph.
5. Hover nodes for trader details.
6. Use the statistics panel for insights.

---

## 🔮 Future Enhancements

- Support for more blockchains
- Advanced graph filtering options
- Export processed data
- Real-time trading activity updates

---

## 🤝 Contributing

Contributions are welcome!

1. **Fork** the repository.
2. **Create** a new branch (`feature/your-feature-name`).
3. **Commit** your changes.
4. **Push** to your branch and **open a pull request**.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
