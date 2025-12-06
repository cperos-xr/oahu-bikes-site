import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Oahu E-Bikes | Easy, Affordable E-Bike Rentals on Oʻahu",
  description:
    "Reserve online, unlock, and ride Waikīkī, Ala Moana, and Diamond Head. Helmets and locks included. Optional hotel delivery available.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-GRD5KSYC4G"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GRD5KSYC4G');
            `,
          }}
        />
        {/* Peek Pro Booking Widget */}
        <Script
          id="peek-pro-widget"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(config) {
                window._peekConfig = config || {};
                var idPrefix = 'peek-book-button';
                var id = idPrefix + '-js';
                if (document.getElementById(id)) return;
                var head = document.getElementsByTagName('head')[0];
                var el = document.createElement('script');
                el.id = id;
                var date = new Date();
                var stamp = date.getMonth() + '-' + date.getDate();
                var basePath = 'https://js.peek.com';
                el.src = basePath + '/widget_button.js?ts=' + stamp;
                head.appendChild(el);
                id = idPrefix + '-css';
                el = document.createElement('link');
                el.id = id;
                el.href = basePath + '/widget_button.css?ts=' + stamp;
                el.rel = 'stylesheet';
                el.type = 'text/css';
                head.appendChild(el);
              })({ key: '319bb68d-5272-40cc-b627-a3787f443677' });
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
