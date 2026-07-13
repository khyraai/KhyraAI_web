# Khyra AI Revenue Impact Calculator - Complete Implementation Guide

**Version:** 1.0  
**Status:** Ready for Development  
**Target Stack:** React + Node.js + PostgreSQL  
**Timeline:** 3 weeks (MVP)

---

## Table of Contents

1. [Feature Overview](#feature-overview)
2. [User Journey](#user-journey)
3. [Technical Architecture](#technical-architecture)
4. [Database Schema](#database-schema)
5. [Frontend Components](#frontend-components)
6. [Backend Implementation](#backend-implementation)
7. [Email & CRM Integration](#email--crm-integration)
8. [API Endpoints](#api-endpoints)
9. [Calculation Logic](#calculation-logic)
10. [Industry Templates](#industry-templates)
11. [Deployment & Monitoring](#deployment--monitoring)

---

## Feature Overview

**Purpose:** Help SMBs visualize revenue loss from missed calls, then redirect them to signup for personalized insights and report.

**Key Difference from Original:** 
- Email gate is **removed**
- Users redirect to **signup page** instead of providing email/phone in calculator
- Report is sent **post-signup** after user authenticates
- Signup becomes the official lead capture point

**Flow:**
```
Calculator (FREE, no auth) 
  → Dashboard (FREE, no auth)
  → "Get Report" CTA
  → Redirect to /signup
  → User creates account
  → Report generated & emailed
  → Sales outreach begins
```

---

## User Journey

### Step 1: Landing & Calculator Entry
**URL:** `/calculator`  
**Auth Required:** No  
**Data Persistence:** Session/LocalStorage

User lands on calculator page with 4-step form:
1. Business profile (Business name, Industry)
2. Operations (Hours, Days, Staff, Reception)
3. Communication (Calls, Missed %, Duration, Follow-up method)
4. Revenue (Transaction value, Conversion rate)

**Progress Indicator:** Visual step counter (1/4 → 2/4 → 3/4 → 4/4)

### Step 2: Live Dashboard
**URL:** `/calculator` (same page, step 4)  
**Auth Required:** No  
**Data:** Real-time calculations from Step 1 inputs

Display 8 metric cards + 3 interactive charts.

### Step 3: CTA & Redirect
**Trigger:** User clicks "Get Your Personalized Report & Recommendations"  
**Action:** Validate form data → Redirect to `/signup?source=calculator&industry={industry}&revenue_at_risk={value}`

**Query Params Passed:**
```
?source=calculator
&industry=dental_clinic
&revenue_at_risk=448000
&monthly_missed_calls=216
&timestamp={ISO8601}
```

### Step 4: Signup Page (Existing)
**URL:** `/signup`  
**Query Params:** Read and pre-populate industry field if available  
**Standard signup form:** Email, Password, Business Name (pre-filled if available)

### Step 5: Account Created
**Trigger:** User completes signup  
**Backend Action:**
- Create user account
- Link calculator session to user account
- Generate personalized report
- Trigger email delivery
- Create CRM lead record
- Start email nurture sequence

### Step 6: Report Delivery
**Email Sent To:** User's registered email  
**Contents:** Personalized report (see Section 10)  
**Also Available At:** `/dashboard/report` (authenticated)

---

## Technical Architecture

### Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Next.js 14, TailwindCSS, Recharts |
| **Backend** | Node.js, Express.js, PostgreSQL |
| **Email** | SendGrid or AWS SES |
| **CRM** | Zoho CRM API |
| **Analytics** | Segment or Mixpanel |
| **Deployment** | Vercel (Frontend) + AWS/Railway (Backend) |

### System Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Next.js)                        │
├─────────────────────────────────────────────────────────────────┤
│  /calculator (Form + Dashboard)  │  /signup (Redirect Target)    │
│  Components:                      │  Existing signup component   │
│  - CalculatorForm                │  - Add query param handling  │
│  - DashboardCards                │  - Pre-fill industry field   │
│  - MetricsCharts                 │                              │
│  - CallToAction                  │                              │
└─────────────┬───────────────────────────────────────────────────┘
              │
              │ API Calls
              ↓
┌─────────────────────────────────────────────────────────────────┐
│                  BACKEND (Node.js + Express)                     │
├─────────────────────────────────────────────────────────────────┤
│  Routes:                                                          │
│  - POST /api/calculator/validate (validate form data)            │
│  - POST /api/calculator/metrics (calculate ROI metrics)          │
│  - POST /api/auth/signup (create account)                        │
│  - POST /api/report/generate (generate report)                   │
│  - GET /api/report/:userId (fetch report)                        │
└─────────────┬───────────────────────────────────────────────────┘
              │
              ├─────→ PostgreSQL (User, Calculator, Report data)
              ├─────→ SendGrid API (Email delivery)
              ├─────→ Zoho CRM API (Lead creation)
              └─────→ Segment (Analytics events)
```

---

## Database Schema

### Table: `calculator_sessions`

```sql
CREATE TABLE calculator_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(255) UNIQUE,  -- Browser session ID
  
  -- Step 1: Business Profile
  business_name VARCHAR(255),
  industry VARCHAR(100),  -- dental_clinic, salon_spa, real_estate, etc.
  
  -- Step 2: Operations
  business_hours_start TIME,
  business_hours_end TIME,
  working_days_start VARCHAR(20),  -- Monday
  working_days_end VARCHAR(20),    -- Friday
  staff_count INTEGER,  -- 1, 2-3, 4-5, 6+
  reception_available VARCHAR(50),  -- yes, no, part-time
  
  -- Step 3: Communication
  incoming_calls_per_day DECIMAL(10, 2),
  incoming_calls_period VARCHAR(20),  -- daily, weekly
  missed_calls_percentage DECIMAL(5, 2),
  avg_call_duration_minutes DECIMAL(5, 2),
  current_followup_method VARCHAR(50),  -- manual, whatsapp, crm, none
  
  -- Step 4: Revenue
  avg_transaction_value DECIMAL(12, 2),
  conversion_rate_percentage DECIMAL(5, 2),
  
  -- Calculated Metrics (stored for faster retrieval)
  monthly_incoming_calls DECIMAL(12, 2),
  monthly_missed_calls DECIMAL(12, 2),
  potential_leads_lost DECIMAL(12, 2),
  estimated_revenue_lost DECIMAL(12, 2),
  khyra_monthly_cost DECIMAL(12, 2),
  potential_revenue_protected DECIMAL(12, 2),
  annual_roi DECIMAL(12, 2),
  breakeven_months DECIMAL(5, 2),
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,  -- NULL until signup
  visited_signup BOOLEAN DEFAULT FALSE,
  signup_timestamp TIMESTAMP
);
```

### Table: `calculator_reports`

```sql
CREATE TABLE calculator_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  calculator_session_id UUID REFERENCES calculator_sessions(id),
  
  -- Report Content (JSON for flexibility)
  report_data JSONB,  -- Contains all report sections
  
  -- Report Metadata
  health_score INTEGER,  -- 0-100
  revenue_at_risk DECIMAL(12, 2),
  annual_roi DECIMAL(12, 2),
  
  -- Email Status
  email_sent BOOLEAN DEFAULT FALSE,
  email_sent_at TIMESTAMP,
  email_opened BOOLEAN DEFAULT FALSE,
  email_opened_at TIMESTAMP,
  email_clicked BOOLEAN DEFAULT FALSE,
  email_clicked_at TIMESTAMP,
  
  -- CRM Sync
  crm_lead_id VARCHAR(255),  -- Zoho CRM Lead ID
  crm_synced_at TIMESTAMP,
  
  -- Generated At
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Table: `calculator_metrics` (Pre-calculated for analytics)

```sql
CREATE TABLE calculator_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  calculator_session_id UUID REFERENCES calculator_sessions(id),
  
  -- Funnel metrics
  step_completed INTEGER,  -- 1, 2, 3, or 4
  time_to_complete_seconds INTEGER,
  devices_used VARCHAR(50),  -- desktop, mobile, tablet
  
  -- Traffic source
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  
  -- User behavior
  dashboard_viewed BOOLEAN,
  cta_clicked BOOLEAN,
  redirect_completed BOOLEAN,
  
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Frontend Components

### Component Tree

```
/pages/calculator.jsx
├── CalculatorHeader
├── CalculatorForm
│   ├── Step1_BusinessProfile
│   ├── Step2_Operations
│   ├── Step3_Communication
│   └── Step4_Revenue
├── DashboardCards
│   ├── MetricCard (× 8)
│   └── LoadingState
├── MetricsCharts
│   ├── LineChart (Revenue trend)
│   ├── BarChart (Monthly savings)
│   └── DonutChart (Recovery rate)
└── CallToActionSection
    ├── GetReportButton
    └── TermsDisclaimer
```

### Component: CalculatorForm

**File:** `components/Calculator/CalculatorForm.jsx`

```jsx
import React, { useState, useEffect } from 'react';
import Step1_BusinessProfile from './steps/Step1_BusinessProfile';
import Step2_Operations from './steps/Step2_Operations';
import Step3_Communication from './steps/Step3_Communication';
import Step4_Revenue from './steps/Step4_Revenue';
import DashboardCards from './DashboardCards';
import MetricsCharts from './MetricsCharts';
import ProgressBar from './ProgressBar';

export default function CalculatorForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    businessHoursStart: '',
    businessHoursEnd: '',
    workingDaysStart: 'Monday',
    workingDaysEnd: 'Friday',
    staffCount: '1',
    receptionAvailable: 'yes',
    incomingCallsPerDay: '',
    incomingCallsPeriod: 'day',
    missedCallsPercentage: 15,
    avgCallDurationMinutes: 3,
    currentFollowupMethod: 'manual',
    avgTransactionValue: '',
    conversionRatePercentage: 8,
  });
  
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);

  // Save to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem('calculatorSession', JSON.stringify(formData));
  }, [formData]);

  // Calculate metrics whenever formData changes (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      calculateMetrics();
    }, 500);
    return () => clearTimeout(timer);
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateMetrics = async () => {
    if (!formData.incomingCallsPerDay || !formData.avgTransactionValue) {
      return; // Skip if critical fields are empty
    }

    setLoading(true);
    try {
      const response = await fetch('/api/calculator/metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      console.error('Error calculating metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGetReport = async () => {
    // Validate form
    const errors = validateForm();
    if (errors.length > 0) {
      alert('Please fill in all required fields:\n' + errors.join('\n'));
      return;
    }

    // Save calculator session to server (without auth)
    const sessionData = {
      ...formData,
      metrics: metrics,
      timestamp: new Date().toISOString(),
    };

    // Store session and redirect to signup
    const params = new URLSearchParams({
      source: 'calculator',
      industry: formData.industry,
      revenue_at_risk: metrics.estimatedRevenueLostaAnnual || 0,
      monthly_missed_calls: metrics.monthlyMissedCalls || 0,
    });

    window.location.href = `/signup?${params.toString()}`;
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.industry) errors.push('Industry is required');
    if (!formData.incomingCallsPerDay) errors.push('Incoming calls per day is required');
    if (!formData.avgTransactionValue) errors.push('Average transaction value is required');
    if (!metrics) errors.push('Please wait for metrics to calculate');
    return errors;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Revenue Impact Calculator</h1>
      <p className="text-gray-600 mb-6">See how much revenue you're losing to missed calls in 2 minutes.</p>

      {/* Progress Bar */}
      <ProgressBar currentStep={currentStep} totalSteps={4} />

      {/* Form Steps */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        {currentStep === 1 && (
          <Step1_BusinessProfile 
            data={formData} 
            onChange={handleInputChange} 
          />
        )}
        {currentStep === 2 && (
          <Step2_Operations 
            data={formData} 
            onChange={handleInputChange} 
          />
        )}
        {currentStep === 3 && (
          <Step3_Communication 
            data={formData} 
            onChange={handleInputChange} 
          />
        )}
        {currentStep === 4 && (
          <Step4_Revenue 
            data={formData} 
            onChange={handleInputChange}
            industry={formData.industry}
          />
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleGetReport}
              disabled={loading || !metrics}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Calculating...' : 'Get Report'}
            </button>
          )}
        </div>
      </div>

      {/* Dashboard (shown after Step 4) */}
      {currentStep === 4 && metrics && (
        <>
          <DashboardCards metrics={metrics} />
          <MetricsCharts metrics={metrics} formData={formData} />
          
          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 mt-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Recover Lost Revenue?</h2>
            <p className="text-lg mb-6">Get your personalized report with industry-specific recommendations and next steps.</p>
            <button
              onClick={handleGetReport}
              disabled={loading}
              className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              {loading ? 'Generating Report...' : 'Get Your Report →'}
            </button>
            <p className="text-sm mt-4 text-blue-100">No credit card required. Takes 30 seconds.</p>
          </div>
        </>
      )}
    </div>
  );
}
```

### Component: DashboardCards

**File:** `components/Calculator/DashboardCards.jsx`

```jsx
import React from 'react';

const MetricCard = ({ label, value, subtext, icon, highlight = false }) => (
  <div className={`p-6 rounded-lg ${highlight ? 'bg-red-50 border-2 border-red-200' : 'bg-gray-50'}`}>
    <div className="flex items-center justify-between mb-4">
      <span className="text-gray-600 text-sm font-semibold">{label}</span>
      {icon && <span className="text-2xl">{icon}</span>}
    </div>
    <div className="text-3xl font-bold text-gray-900">{value}</div>
    {subtext && <p className="text-xs text-gray-500 mt-2">{subtext}</p>}
  </div>
);

export default function DashboardCards({ metrics }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
      <MetricCard
        label="Monthly Incoming Calls"
        value={metrics.monthlyIncomingCalls.toLocaleString()}
        icon="📞"
      />
      <MetricCard
        label="Monthly Missed Calls"
        value={metrics.monthlyMissedCalls.toLocaleString()}
        highlight={true}
        icon="❌"
      />
      <MetricCard
        label="Potential Leads Lost"
        value={metrics.potentialLeadsLost.toLocaleString()}
        icon="👥"
      />
      <MetricCard
        label="Monthly Revenue at Risk"
        value={`₹${(metrics.estimatedRevenueLostaMonthly / 100000).toFixed(1)}L`}
        subtext={`₹${metrics.estimatedRevenueLostaAnnual.toLocaleString()} annually`}
        highlight={true}
        icon="💰"
      />
      <MetricCard
        label="Khyra AI Monthly Cost"
        value={`₹${metrics.khyraaMonthlyCost.toLocaleString()}`}
        subtext={`₹${metrics.khyraaAnnualCost.toLocaleString()} annually`}
        icon="⚙️"
      />
      <MetricCard
        label="Protected Revenue (Monthly)"
        value={`₹${(metrics.potentialRevenueProtected / 100000).toFixed(1)}L`}
        subtext="Conservative 70% recovery"
        icon="✅"
      />
      <MetricCard
        label="Annual Net Benefit"
        value={`₹${(metrics.annualROI / 100000).toFixed(1)}L`}
        highlight={true}
        icon="🎯"
      />
      <MetricCard
        label="Break-even Timeline"
        value={metrics.breakEvenMonths < 1 ? '< 1 month' : `${metrics.breakEvenMonths.toFixed(1)} months`}
        subtext="Time to ROI"
        icon="⏱️"
      />
    </div>
  );
}
```

### Component: MetricsCharts

**File:** `components/Calculator/MetricsCharts.jsx`

```jsx
import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function MetricsCharts({ metrics }) {
  // Data for 12-month projection
  const monthlyProjection = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString('default', { month: 'short' }),
    current: metrics.estimatedRevenueLostaMonthly * (i + 1),
    withKhyra: (metrics.estimatedRevenueLostaMonthly * 0.3) * (i + 1),
  }));

  const recoveryData = [
    { name: 'Protected', value: metrics.potentialRevenueProtected, fill: '#10b981' },
    { name: 'Still at Risk', value: metrics.estimatedRevenueLostaMonthly - metrics.potentialRevenueProtected, fill: '#ef4444' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      {/* 12-Month Revenue Projection */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold mb-4">12-Month Revenue Impact</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyProjection}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `₹${(value / 100000).toFixed(1)}L`} />
            <Legend />
            <Line type="monotone" dataKey="current" stroke="#ef4444" name="Current Loss" strokeWidth={2} />
            <Line type="monotone" dataKey="withKhyra" stroke="#10b981" name="With Khyra AI" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recovery Rate */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold mb-4">Monthly Revenue Recovery Rate</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={recoveryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ₹${(value / 100000).toFixed(1)}L`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {recoveryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `₹${(value / 100000).toFixed(1)}L`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
```

---

## Backend Implementation

### API Endpoint: POST /api/calculator/metrics

**File:** `routes/calculator.js`

```javascript
const express = require('express');
const router = express.Router();
const { calculateMetrics } = require('../utils/calculatorUtils');

router.post('/metrics', async (req, res) => {
  try {
    const {
      incomingCallsPerDay,
      incomingCallsPeriod,
      missedCallsPercentage,
      avgCallDurationMinutes,
      avgTransactionValue,
      conversionRatePercentage,
    } = req.body;

    // Validate required fields
    if (!incomingCallsPerDay || !avgTransactionValue) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Calculate metrics using utility function
    const metrics = calculateMetrics({
      incomingCallsPerDay: parseFloat(incomingCallsPerDay),
      incomingCallsPeriod,
      missedCallsPercentage: parseFloat(missedCallsPercentage),
      avgCallDurationMinutes: parseFloat(avgCallDurationMinutes),
      avgTransactionValue: parseFloat(avgTransactionValue),
      conversionRatePercentage: parseFloat(conversionRatePercentage),
    });

    res.json(metrics);
  } catch (error) {
    console.error('Error calculating metrics:', error);
    res.status(500).json({ error: 'Failed to calculate metrics' });
  }
});

module.exports = router;
```

### Utility Function: calculateMetrics

**File:** `utils/calculatorUtils.js`

```javascript
function calculateMetrics({
  incomingCallsPerDay,
  incomingCallsPeriod,
  missedCallsPercentage,
  avgCallDurationMinutes,
  avgTransactionValue,
  conversionRatePercentage,
}) {
  // Convert daily/weekly to monthly
  const callsPerMonth = incomingCallsPeriod === 'week' 
    ? incomingCallsPerDay * 4.33 
    : incomingCallsPerDay * 21.67; // Business days per month

  // Calculate missed calls
  const monthlyMissedCalls = callsPerMonth * (missedCallsPercentage / 100);

  // Calculate potential leads lost
  const potentialLeadsLost = monthlyMissedCalls * (conversionRatePercentage / 100);

  // Calculate revenue lost
  const estimatedRevenueLostaMonthly = potentialLeadsLost * avgTransactionValue;
  const estimatedRevenueLostaAnnual = estimatedRevenueLostaMonthly * 12;

  // Khyra AI cost (₹13/min)
  const totalMonthlyMinutes = callsPerMonth * avgCallDurationMinutes;
  const khyraaMonthlyCost = totalMonthlyMinutes * 13;
  const khyraaAnnualCost = khyraaMonthlyCost * 12;

  // Revenue protection (conservative 70% recovery rate)
  const recoveryRate = 0.7;
  const potentialRevenueProtected = estimatedRevenueLostaMonthly * recoveryRate;

  // Annual ROI
  const annualROI = (potentialRevenueProtected * 12) - khyraaAnnualCost;

  // Break-even
  const breakEvenMonths = khyraaAnnualCost / (potentialRevenueProtected * 12);

  return {
    monthlyIncomingCalls: Math.round(callsPerMonth),
    monthlyMissedCalls: Math.round(monthlyMissedCalls),
    potentialLeadsLost: Math.round(potentialLeadsLost),
    estimatedRevenueLostaMonthly: Math.round(estimatedRevenueLostaMonthly),
    estimatedRevenueLostaAnnual: Math.round(estimatedRevenueLostaAnnual),
    khyraaMonthlyCost: Math.round(khyraaMonthlyCost),
    khyraaAnnualCost: Math.round(khyraaAnnualCost),
    potentialRevenueProtected: Math.round(potentialRevenueProtected),
    annualROI: Math.round(annualROI),
    breakEvenMonths: Math.max(breakEvenMonths, 0.1), // Minimum 0.1 months
  };
}

module.exports = { calculateMetrics };
```

### API Endpoint: POST /api/auth/signup (Modified)

**File:** `routes/auth.js` (MODIFY EXISTING SIGNUP)

```javascript
const express = require('express');
const router = express.Router();
const { hashPassword, generateToken } = require('../utils/auth');
const User = require('../models/User');
const { createZohoCRMLead } = require('../services/zohocrm');
const { sendReportEmail } = require('../services/email');
const { generateReport } = require('../utils/reportGenerator');

router.post('/signup', async (req, res) => {
  try {
    const { email, password, businessName } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create user
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      email,
      password: hashedPassword,
      businessName,
    });

    // ✅ NEW: Get calculator session from query params (passed from /calculator redirect)
    const { source, industry, revenue_at_risk } = req.query;

    // ✅ NEW: If user came from calculator, link session and generate report
    if (source === 'calculator') {
      // Retrieve calculator session from localStorage/session storage
      // (Frontend sends this as part of signup request)
      const { calculatorData } = req.body;

      if (calculatorData) {
        // Save calculator session to DB
        const calculatorSession = await CalculatorSession.create({
          userId: user.id,
          ...calculatorData,
        });

        // Generate personalized report
        const report = await generateReport(user.id, calculatorSession, industry);

        // Save report to DB
        const reportRecord = await CalculatorReport.create({
          userId: user.id,
          calculatorSessionId: calculatorSession.id,
          reportData: report,
          healthScore: report.healthScore,
          revenueAtRisk: parseFloat(revenue_at_risk),
          annualROI: calculatorSession.annualROI,
        });

        // Send report via email
        await sendReportEmail(user.email, user.businessName, report);

        // Create CRM lead
        const leadScore = parseFloat(revenue_at_risk) > 1000000 ? 'Hot' : 'Warm';
        await createZohoCRMLead({
          firstName: businessName || 'Customer',
          email: email,
          phone: req.body.phone || '',
          leadSource: 'Revenue Calculator',
          leadscore: leadScore,
          customFields: {
            industry: industry,
            revenueAtRisk: revenue_at_risk,
            monthlyMissedCalls: calculatorSession.monthlyMissedCalls,
            calculatorSessionId: calculatorSession.id,
            reportId: reportRecord.id,
          },
        });
      }
    }

    // Generate JWT token
    const token = generateToken(user.id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        businessName: user.businessName,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Signup failed' });
  }
});

module.exports = router;
```

### Flow After Signup

```
1. User clicks "Get Report" on /calculator
2. Frontend redirects to /signup?source=calculator&industry=X&revenue_at_risk=Y
3. User completes signup form
4. Frontend sends calculator data with signup POST request
5. Backend receives signup + calculator data
6. Backend creates:
   - User account
   - CalculatorSession record
   - CalculatorReport record (generated)
   - CRM Lead (Zoho)
   - Starts email nurture sequence
7. User redirected to /dashboard with report visible
8. Email sent with report
```

---

## Email & CRM Integration

### Email Integration: SendGrid

**File:** `services/email.js`

```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendReportEmail(userEmail, businessName, reportData) {
  const msg = {
    to: userEmail,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: `Your Personalized Revenue Impact Report - ${businessName}`,
    html: generateReportHTML(businessName, reportData),
    asm: {
      groupId: 123456, // Unsubscribe group ID
    },
  };

  try {
    await sgMail.send(msg);
    console.log('Report email sent to', userEmail);
  } catch (error) {
    console.error('SendGrid error:', error);
    throw error;
  }
}

function generateReportHTML(businessName, reportData) {
  return `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <h1>Your Revenue Impact Report</h1>
        <p>Hi ${businessName},</p>
        <p>Based on your business data, we've analyzed your communication gaps and prepared a personalized report.</p>
        
        <h2>Key Findings:</h2>
        <ul>
          <li>Monthly Missed Calls: <strong>${reportData.monthlyMissedCalls}</strong></li>
          <li>Revenue at Risk: <strong>₹${reportData.revenueAtRisk.toLocaleString()}</strong></li>
          <li>Health Score: <strong>${reportData.healthScore}/100</strong></li>
          <li>Annual ROI with Khyra: <strong>₹${reportData.annualROI.toLocaleString()}</strong></li>
        </ul>
        
        <p><a href="${process.env.APP_URL}/dashboard/report" style="padding: 10px 20px; background: #0066cc; color: white; text-decoration: none; border-radius: 5px;">View Full Report</a></p>
        
        <p>Questions? Reply to this email or <a href="${process.env.APP_URL}/contact">contact us</a>.</p>
        
        <p>Best regards,<br/>Khyra AI Team</p>
      </body>
    </html>
  `;
}

async function sendNurtureEmail(userEmail, emailSequenceNumber) {
  // Email sequence templates
  const templates = {
    1: {
      subject: 'Here's your revenue impact report',
      body: 'Report email with key highlights...',
    },
    3: {
      subject: 'Are you surprised by these numbers? Let's talk.',
      body: 'Soft sales pitch email...',
    },
    7: {
      subject: 'Free trial: Try Khyra AI for 7 days',
      body: 'Trial offer email...',
    },
    14: {
      subject: 'Last chance: Limited spots for onboarding next month',
      body: 'Urgency email...',
    },
  };

  if (templates[emailSequenceNumber]) {
    const template = templates[emailSequenceNumber];
    const msg = {
      to: userEmail,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: template.subject,
      html: template.body,
    };
    await sgMail.send(msg);
  }
}

module.exports = { sendReportEmail, sendNurtureEmail };
```

### CRM Integration: Zoho

**File:** `services/zohocrm.js`

```javascript
const axios = require('axios');

const zohoAPI = axios.create({
  baseURL: 'https://www.zohoapis.com/crm/v5',
  headers: {
    Authorization: `Bearer ${process.env.ZOHO_CRM_TOKEN}`,
  },
});

async function createZohoCRMLead(leadData) {
  try {
    const response = await zohoAPI.post('/Leads', {
      data: [
        {
          First_Name: leadData.firstName,
          Email: leadData.email,
          Phone: leadData.phone,
          Lead_Source: leadData.leadSource,
          Lead_Score: leadData.leadscore,
          Industry: leadData.customFields.industry,
          Revenue_at_Risk: leadData.customFields.revenueAtRisk,
          Monthly_Missed_Calls: leadData.customFields.monthlyMissedCalls,
          Calculator_Session_ID: leadData.customFields.calculatorSessionId,
        },
      ],
    });

    console.log('Zoho CRM lead created:', response.data.data[0].id);
    return response.data.data[0];
  } catch (error) {
    console.error('Zoho CRM error:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = { createZohoCRMLead };
```

---

## API Endpoints

### Complete API Reference

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| **POST** | `/api/calculator/metrics` | No | Calculate ROI metrics from form data |
| **POST** | `/api/auth/signup` | No | Create user account + trigger report |
| **GET** | `/api/report/:userId` | Yes | Fetch user's report |
| **PATCH** | `/api/report/:userId/status` | Yes | Update report view status |
| **GET** | `/api/dashboard/analytics` | Yes (Admin) | Get calculator analytics |

---

## Calculation Logic

### Formula Reference

**Monthly Incoming Calls**
```
Daily calls × 21.67 (business days/month)
OR
Weekly calls × 4.33
```

**Monthly Missed Calls**
```
Monthly incoming calls × (Missed calls % / 100)
```

**Potential Leads Lost**
```
Monthly missed calls × (Conversion rate % / 100)
```

**Revenue Lost (Monthly)**
```
Potential leads lost × Average transaction value
```

**Khyra Monthly Cost**
```
(Monthly call minutes × Average call duration) × ₹13/min
```

**Revenue Protected (Monthly)**
```
Revenue lost × 70% (conservative recovery rate)
```

**Annual ROI**
```
(Revenue protected × 12) - (Khyra cost × 12)
```

**Break-even Timeline**
```
Khyra annual cost ÷ (Revenue protected × 12)
```

---

## Industry Templates

### Template Structure

```javascript
const industryTemplates = {
  dental_clinic: {
    revenueLabel: 'Consultation Fee / Procedure Value',
    conversionRateDefault: 8,
    missedCallDefault: 18,
    recommendations: [
      'Dental practices typically see 12–18% missed-call rates. You're at 18%, indicating peak-hour gaps.',
      'Patient recalls are critical in dental. Automated follow-ups for post-procedure check-ins can increase retention.',
      'Emergency calls after hours often result in patient churn. Consider 24/7 virtual reception.',
    ],
    bottleneckRules: [
      {
        condition: 'missedCalls > 15 && staffCount < 3',
        message: 'High call volume with limited staff. Peak hours are likely understaffed.',
      },
    ],
  },
  salon_spa: {
    revenueLabel: 'Average Appointment Value',
    conversionRateDefault: 12,
    missedCallDefault: 16,
    recommendations: [
      'Salons with inconsistent staffing benefit most from AI receptionists handling appointment confirmations.',
      'Walk-in customers often call multiple salons; faster callback = higher booking rates.',
      'Missed calls during peak hours (lunch, weekends) represent lost revenue.',
    ],
  },
  real_estate: {
    revenueLabel: 'Average Lead Value / Property Deal Value',
    conversionRateDefault: 5,
    missedCallDefault: 22,
    recommendations: [
      'Real estate leads are time-sensitive. Every missed call = lost deal.',
      'Follow-up cadence is critical; missed callbacks lead to 40%+ lead loss.',
      'After-hours inquiry handling can capture international buyer calls and weekend prospects.',
    ],
  },
  // ... more industries
};
```

---

## Deployment & Monitoring

### Environment Variables

```bash
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=https://api.khyraai.com
NEXT_PUBLIC_ANALYTICS_KEY=XXX

# Backend (.env)
DATABASE_URL=postgresql://user:pass@localhost/khyra
SENDGRID_API_KEY=SG.XXXX
SENDGRID_FROM_EMAIL=noreply@khyraai.com
ZOHO_CRM_TOKEN=XXXXX
ZOHO_CRM_ORG_ID=XXXXX
JWT_SECRET=super-secret-key
APP_URL=https://app.khyraai.com
```

### Monitoring & Analytics

**Events to Track:**
```javascript
// Analytics.js
export const trackEvent = (eventName, eventData) => {
  if (window.segment) {
    window.segment.track(eventName, eventData);
  }
};

// Usage:
trackEvent('Calculator_Step_Completed', { step: 2 });
trackEvent('Calculator_Form_Submitted', { industry: 'dental_clinic' });
trackEvent('CTA_Clicked', { source: 'calculator' });
trackEvent('Signup_Redirect', { revenue_at_risk: 448000 });
trackEvent('User_Signup_Completed', { source: 'calculator' });
```

### Success Metrics Dashboard

Monitor these KPIs:
- Calculator completion rate (target: >40%)
- Email capture rate (target: >50% of completers)
- Report open rate (target: >50%)
- Demo booking rate (target: >15%)
- Customer conversion rate (target: >10%)
- CAC via calculator (target: <₹5,000)

---

## File Structure

```
khyra-calculator/
├── frontend/
│   ├── pages/
│   │   ├── calculator.jsx
│   │   └── signup.jsx (modified)
│   ├── components/
│   │   ├── Calculator/
│   │   │   ├── CalculatorForm.jsx
│   │   │   ├── DashboardCards.jsx
│   │   │   ├── MetricsCharts.jsx
│   │   │   └── steps/
│   │   │       ├── Step1_BusinessProfile.jsx
│   │   │       ├── Step2_Operations.jsx
│   │   │       ├── Step3_Communication.jsx
│   │   │       └── Step4_Revenue.jsx
│   └── utils/
│       └── analytics.js
├── backend/
│   ├── routes/
│   │   ├── calculator.js
│   │   └── auth.js (modified)
│   ├── services/
│   │   ├── email.js
│   │   └── zohocrm.js
│   ├── utils/
│   │   ├── calculatorUtils.js
│   │   └── reportGenerator.js
│   ├── models/
│   │   ├── User.js
│   │   ├── CalculatorSession.js
│   │   └── CalculatorReport.js
│   └── middleware/
│       └── auth.js
├── database/
│   └── migrations/
│       ├── 001_create_calculator_sessions.sql
│       ├── 002_create_calculator_reports.sql
│       └── 003_create_calculator_metrics.sql
└── .env.example
```

---

## Phase 1: MVP Deliverables (Week 3)

### Frontend
- [x] Calculator form (4 steps)
- [x] Real-time dashboard with 8 metrics cards
- [x] 3 interactive charts (Recharts)
- [x] CTA button with redirect to signup
- [x] LocalStorage persistence
- [x] Mobile-responsive design

### Backend
- [x] `/api/calculator/metrics` endpoint
- [x] `/api/auth/signup` endpoint (modified)
- [x] Calculation logic (all formulas)
- [x] Report generation (rules-based)
- [x] Email delivery (SendGrid)
- [x] CRM integration (Zoho)
- [x] Database schema

### Infrastructure
- [x] PostgreSQL migrations
- [x] Environment variables setup
- [x] API error handling
- [x] Request validation

---

## Next Steps for Claude Sonnet 4.6

1. **Review this document** thoroughly
2. **Start with frontend:** Build `/pages/calculator.jsx` and components
3. **Build backend:** Implement `/api/calculator/metrics` and calculations
4. **Integrate signup:** Modify existing `/api/auth/signup` to handle calculator data
5. **Email & CRM:** Set up SendGrid and Zoho integration
6. **Test:** End-to-end flow from calculator → signup → report
7. **Deploy:** Frontend to Vercel, Backend to Railway/AWS

---

**Document Version:** 1.0  
**Last Updated:** 2026-06-30  
**Status:** Ready for Development