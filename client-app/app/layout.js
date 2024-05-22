import { Inter } from "next/font/google";
import "./globals.css";

import Header from "./ui/header/header";
import Footer from "./ui/footer/footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div class="wrapper">
          <Header></Header>
          {children}
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
}
