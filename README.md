# 🎨 UI Craft

Welcome to **UI Craft**! This tool allows you to generate and preview UI components with Tailwind CSS. Just type in the chat to request a UI component, and you'll instantly see it generated on the right, along with the component's code.

## 🛠️ Installation & Setup

### 1. Clone the Repository

To get started, clone the repository by running the following command:

```bash
git clone https://github.com/AkianJS/ui-craft.git
```

### 2. Install Dependencies

This project uses `pnpm` for package management. If you don't have it installed, you can install it globally by running:

```bash
npm install -g pnpm
```

Once `pnpm` is installed, navigate to the cloned directory and install the project dependencies:

```bash
cd ui-craft
pnpm install
```

### 3. Set Up Environment Variables

To make the app work in development, you'll need to create a `.env` file in the root of the project and add your `GROQ_API_KEY`. Here's how:

1. In the project root, create a `.env` file:
    ```bash
    touch .env
    ```

2. Open the `.env` file and add the following line, replacing `<your-groq-api-key>` with your actual GROQ API key:
    ```bash
    GROQ_API_KEY=<your-groq-api-key>
    ```

### 4. Run the Development Server

To start the development server, run the following command:

```bash
pnpm run dev
```

Now open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

## 💬 How to Use

Once you have the app running, you'll see a chat interface on the left side of the screen.

1. **Ask for a UI Component**: Type in the chat asking for a specific UI component, such as _"Can you give me a button component?"_

2. **Preview & Code**: You'll receive the requested component on the right side of the screen, along with its **Tailwind CSS** code in the chat.

This is a fast and efficient way to generate UI components and see them in real-time!
