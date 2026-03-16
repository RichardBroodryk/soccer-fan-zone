import { useEffect } from "react";

declare global {
  interface Window {
    Paddle: any;
  }
}

const CheckoutPage = () => {

  useEffect(() => {

    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.async = true;

    document.body.appendChild(script);

    script.onload = () => {

      window.Paddle.Initialize({
        token: "live_1315bcf84802de1b59fc1bd1da5"
      });

      // Read transaction id from URL
      const params = new URLSearchParams(window.location.search);
      const transactionId = params.get("_ptxn");

      if (transactionId) {

      }

    };

    return () => {
      document.body.removeChild(script);
    };

  }, []);

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    }}>
      <h2>Preparing secure checkout...</h2>
      <p>Loading Rugby Anthem Zone subscription.</p>
    </div>
  );
};

export default CheckoutPage;