# Mobila WebAR - Quick Start Guide

Follow these steps to run the local server and expose it via `ngrok` for testing the 1:1 WebAR room configurator on your mobile device.

---

### Step 1: Configure ngrok Authtoken (First Time Only)
If you have not configured your `ngrok` token yet, retrieve it from [dashboard.ngrok.com](https://dashboard.ngrok.com) and run:
```bash
ngrok config add-authtoken <YOUR_AUTHTOKEN>
```

---

### Step 2: Start the Local HTTP Server
Run a local server in the project root directory (`/Users/bodo/Desktop/Mobila`):

Using **Node.js** (recommended):
```bash
npx http-server -p 8080
```
*(Alternative using Python: `python3 -m http.server 8080`)*

---

### Step 3: Expose Server with ngrok Tunnel
Expose port `8080` to the internet to get a secure HTTPS link required for mobile camera access:
```bash
ngrok http 8080
```

---

### Step 4: Open and Test
1. Copy the **Forwarding** HTTPS URL generated in your terminal (e.g., `https://xxxx.ngrok-free.app`).
2. Open it in your **desktop browser** and navigate to:
   `https://xxxx.ngrok-free.app/widget/index.html`
3. Click **View in AR** to open the 3D viewer.
4. Scan the generated QR code with your mobile phone's camera.
5. Tap **View in your space** inside your phone's browser to launch the 1:1 camera viewer in your room.
