// app/tools/layout.jsx
import React from "react";

// Remove imports that are already handled by app/layout.jsx
// import Image from "next/image"; // Remove if not used directly in this layout
// import { ThemeProvider } from "@/components/theme-provider"; // Remove - already in root layout
// import Navbar from "@/components/navbar"; // Remove - already in root layout

export default function ToolsLayout({ children }) { // Renamed to clarify purpose
  return (
    // This div acts as a wrapper specifically for the /tools route segment.
    // It sits *inside* the <body> provided by the root layout.
    // It DOES NOT contain <html> or <body> tags.
    // It DOES NOT contain components like Navbar, ThemeProvider, Toaster
    // that are already handled in the root layout.
    <main className="min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url("/img.png")' }}>
      {/* {children} will be the content of page.jsx or any deeper layouts */}
      {children}
    </main>
    
    // If you didn't need the <main> wrapper or the background image specifically for /tools,
    // you could just return <>{children}</> or <div className="some-tools-wrapper">{children}</div>;
  );
}