import type { Metadata } from "next";
import Providers from "@/app/providers";
import Layout, {Content, Footer, Header} from "antd/lib/layout/layout";
import "./globals.css"
import LayoutHeader from "@/components/LayoutHeader";

export const metadata: Metadata = {
  title: "Core Notes",
};

export default function RootLayout({ children, }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body style={{ margin: 0 }}>
      <Providers>
          <Layout style={{ minHeight: "100vh" }}>
              <LayoutHeader />
              <Content className={"p-8"}>{children}</Content>
              <Footer className={"flex"}>
                  <span>Luiz Felipe @ 2024</span>
                  <span className={"ml-auto"}>CoreNotes Project</span>
              </Footer>
          </Layout>
      </Providers>
      </body>
      </html>
  );
}