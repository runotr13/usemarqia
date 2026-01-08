import React from "react";

const Privacy = () => {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 16px" }}>
      <h1>Privacy Policy</h1>
      <p>
        <strong>Last updated:</strong> January 2026
      </p>

      <h2>1. Introduction</h2>
      <p>
        UseMarqia is a Chrome extension designed to help users generate
        AI-powered content from images they explicitly select. This Privacy
        Policy explains how data is handled when you use the UseMarqia
        extension.
      </p>

      <h2>2. Data Collection</h2>
      <p>
        UseMarqia does <strong>not</strong> collect, store, or share any
        personally identifiable information such as names, email addresses,
        phone numbers, payment details, or authentication credentials.
      </p>
      <p>
        The extension only processes data that the user explicitly interacts
        with, such as selected images and temporary preferences.
      </p>

      <h2>3. Image Processing</h2>
      <p>
        When a user chooses to generate content from an image, the image (or its
        URL) may be sent securely to a third-party AI service only for the
        purpose of generating content. Images are processed on demand and are
        not stored by UseMarqia.
      </p>

      <h2>4. Local Storage</h2>
      <p>
        UseMarqia may use Chrome local storage to temporarily save user
        preferences (such as selected platform or language). This data remains
        on the user’s device and is never shared with third parties.
      </p>

      <h2>5. Data Sharing</h2>
      <ul>
        <li>We do not sell user data</li>
        <li>We do not transfer user data to third parties for advertising</li>
        <li>
          We do not use data for tracking, profiling, or credit evaluation
        </li>
      </ul>

      <h2>6. Permissions</h2>
      <p>
        UseMarqia only uses permissions required for its core functionality.
        Access to the active tab and context menu occurs only when the user
        explicitly interacts with the extension.
      </p>

      <h2>7. Security</h2>
      <p>
        All external requests are made over secure HTTPS connections. The
        extension does not execute remote JavaScript code and does not inject
        third-party scripts into web pages.
      </p>

      <h2>8. Changes</h2>
      <p>
        This privacy policy may be updated from time to time. Any changes will
        be reflected on this page.
      </p>

      <h2>9. Contact</h2>
      <p>
        If you have any questions about this Privacy Policy, you can contact us:
      </p>
      <p>
        <strong>Email:</strong> runot13@gmail.com <br />
        <strong>Website:</strong>{" "}
        <a href="https://usemarqia.vercel.app" target="_blank">
          https://usemarqia.vercel.app
        </a>
      </p>
    </main>
  );
};

export default Privacy;
