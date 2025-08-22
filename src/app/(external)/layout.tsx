import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default layout;
