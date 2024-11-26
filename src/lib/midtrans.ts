export default function paymentscript(): Promise<void> {
  return new Promise((resolve, reject) => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_API;

    if (!clientKey) {
      console.error("Midtrans client key is missing!");
      reject(new Error("Midtrans client key is missing!"));
      return;
    }

    // Check if the script is already added to avoid duplicates
    if (document.querySelector(`script[src="${snapScript}"]`)) {
      console.log("Midtrans script already loaded.");
      resolve(); // Script already loaded, no need to load again
      return;
    }

    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;

    script.onload = () => {
      console.log("Midtrans Snap script loaded successfully.");
      resolve(); // Resolve the promise when the script loads
    };

    script.onerror = () => {
      console.error("Failed to load Midtrans Snap script.");
      reject(new Error("Failed to load Midtrans Snap script."));
    };

    document.body.appendChild(script);
  });
}
