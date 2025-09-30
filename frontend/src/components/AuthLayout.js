import React from 'react';

// NOTE: This component relies entirely on the CSS defined in src/index.css 
// (specifically the classes: auth-container, auth-left-panel, auth-right-panel, auth-card)
export default function AuthLayout({ children, title, subtitle }) {
  return (
    // Replaced Tailwind with standard CSS class for the full screen container
    <div className="auth-container">
      
      {/* Left Panel: VibeNest Branding (Hidden on mobile via CSS) */}
      <div className="auth-left-panel">
        {/* Using inline styles for direct control over text styling */}
        <div style={{ padding: '0 20px' }}>
            <h1 style={{ fontSize: '4rem', fontWeight: '800', color: '#333', marginBottom: '1rem' }}>
                Vibe<span style={{ color: '#3B82F6' }}>Nest</span> 
            </h1>
            <p style={{ fontSize: '1.5rem', fontWeight: '300', color: '#444', marginTop: '1rem' }}>Welcome</p>
            <p style={{ fontSize: '1rem', color: '#666', marginTop: '0.5rem', maxWidth: '350px' }}>
                {subtitle || "Connect with your community in a secure, friendly space."}
            </p>
        </div>
      </div>

      {/* Right Panel: Form Section (Background handled by CSS) */}
      <div className="auth-right-panel">
        {/* Inner Card - uses the CSS class defined in index.css */}
        <div className="auth-card">
          {/* Title uses a standard class defined in index.css */}
          <h2 className="auth-title">{title}</h2> 
          {children}
        </div>
      </div>
    </div>
  );
}