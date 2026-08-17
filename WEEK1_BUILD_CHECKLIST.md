# WEEK 1 BUILD CHECKLIST - COMMENTS ONLY
## All instructions are in code comments only - NO CODE IMPLEMENTATION YET

---

## 📋 PAGES BY TEAM MEMBER

### 🔐 MASON - Authentication + UI System (Day 2)
**Status**: Comments added ✅
- [x] Login.jsx - Email/phone login with validation
- [x] Register.jsx - Full registration with password strength
- [x] ForgotPassword.jsx - Reset password flow

**Day 1 TODO**: Build UI component system
- [ ] Button.jsx (all variants: primary, secondary, danger, disabled)
- [ ] Input.jsx (text, password, email, phone with error states)
- [ ] Loader.jsx (spinning animation)
- [ ] Modal.jsx (generic modal wrapper)
- [ ] Design system (colors, typography, spacing)

---

### 💰 NAOMI - Wallet + Beneficiaries (Day 3-4)
**Status**: Comments added ✅
- [x] Wallet.jsx - View balance and recent activity
- [x] AddFunds.jsx - Add funds form with payment methods
- [x] Beneficiaries.jsx - List saved beneficiaries
- [x] AddBeneficiary.jsx - Add new beneficiary form
- [x] AdminDashboard.jsx - Admin key metrics overview
- [x] Analytics.jsx - Charts and analytics dashboard
- [x] users.jsx - User management table

**Day 3-4 TODO**: Build all pages from comments

---

### 💸 NASRA - Transactions + Transfer (Day 3-4)
**Status**: Comments added ✅
- [x] Transactions.jsx - View all transactions with filters
- [x] TransactionDetails.jsx - View single transaction details
- [x] SendMoney.jsx - Send money form
- [x] ConfirmTransfer.jsx - Review transfer before sending
- [x] TrasferStatus.jsx - Show transfer result (success/pending/failed)

**Day 3-4 TODO**: Build all pages from comments

---

### 👑 MYLES - Frontend Lead (Day 1-5)
**Status**: Comments added ✅
- [x] App.jsx - Main app component with Router setup
- [x] UserDashboard.jsx - Main user dashboard
- [x] Landing.jsx - Public landing page
- [x] Profile.jsx - User profile page
- [x] TEAM_INSTRUCTIONS.md - Full sprint guide
- [x] COMPONENT_TEMPLATE.md - Component build guidelines

**Day 1 TODO - Priority 1**:
- [ ] Install React Router: `npm install react-router-dom`
- [ ] Install Redux Toolkit: `npm install @reduxjs/toolkit react-redux`
- [ ] Set up Redux store structure:
  - redux/store.js
  - redux/slices/authSlice.js
  - redux/slices/walletSlice.js
  - redux/slices/beneficiarySlice.js
  - redux/slices/transactionSlice.js
- [ ] Create API service layer: `services/api.js`
- [ ] Create mock data file: `data/mockData.js`
- [ ] Set up routing structure in App.jsx
- [ ] Update main.jsx with Redux Provider

**Day 1 TODO - Priority 2**:
- [ ] Configure Tailwind CSS properly
- [ ] Update index.css with global styles
- [ ] Build reusable components (Button, Input, Modal, Loader)
- [ ] Set up NavBar and Sidebar components
- [ ] Create layout wrappers (AuthLayout, AdminLayout, UserLayout)

**Day 3-5 TODO**:
- [ ] Build Landing.jsx
- [ ] Build UserDashboard.jsx
- [ ] Build Profile.jsx
- [ ] Code review all team contributions
- [ ] Fix responsive design issues

---

## 🎨 SHARED COMPONENTS (Need to be built by MASON)
**Location**: `src/Components/`
**Status**: Comments added, code pending ⏳

- [ ] Button.jsx - All variants (primary, secondary, danger, disabled, loading)
- [ ] Input.jsx - Text input with validation states
- [ ] Modal.jsx - Generic modal wrapper for dialogs
- [ ] Loader.jsx - Loading spinner component
- [ ] Navbar.jsx - Top navigation bar
- [ ] Sidebar.jsx - Side navigation menu
- [ ] BalanceCard.jsx - Display wallet balance
- [ ] TransactionCard.jsx - Display single transaction
- [ ] BeneficiaryCard.jsx - Display beneficiary info
- [ ] StatCard.jsx - Display statistics (count, value, etc.)

---

## 📝 DATA STRUCTURES

### Mock User
```javascript
{
  id: 1,
  name: "Myles",
  email: "myles@pesaflow.com",
  phone: "0712345678",
  role: "user" | "admin",
  balance: 25450
}
```

### Mock Transaction
```javascript
{
  id: "TXN001",
  type: "sent" | "received",
  recipient: "John Kamau",
  recipientPhone: "0712345678",
  amount: 500,
  fee: 10,
  status: "successful" | "pending" | "failed",
  date: "2026-08-17",
  description: "Payment for..."
}
```

### Mock Beneficiary
```javascript
{
  id: 1,
  name: "John Kamau",
  phone: "0712345678",
  verified: true,
  addedDate: "2026-08-17"
}
```

---

## 🔄 REDUX STRUCTURE (Myles to set up)

### authSlice
```javascript
state = {
  loggedIn: false,
  user: null,
  role: null,
  token: null,
  loading: false,
  error: null
}
```

### walletSlice
```javascript
state = {
  balance: 0,
  loading: false,
  error: null
}
```

### beneficiarySlice
```javascript
state = {
  beneficiaries: [],
  loading: false,
  error: null
}
```

### transactionSlice
```javascript
state = {
  transactions: [],
  currentTransaction: null,
  loading: false,
  error: null
}
```

---

## 🗓️ WEEK 1 TIMELINE

| Day | Task | Owner | Status |
|-----|------|-------|--------|
| 1   | Setup, Redux, API service, components | MYLES | Comments ✅ |
| 2   | Auth pages (Login, Register, ForgotPassword) | MASON | Comments ✅ |
| 3   | Wallet, Beneficiaries, Transactions, Dashboard | NAOMI/NASRA | Comments ✅ |
| 4   | Transfer flow, Admin pages | NASRA/NAOMI | Comments ✅ |
| 5   | Integration, testing, fixes | ALL | Pending |
| 6-7 | Polish, responsive, deploy | ALL | Pending |

---

## ✅ CHECKLIST FOR EACH PAGE

Before submitting a page:
- [ ] All comment instructions read and understood
- [ ] Form validation implemented (if applicable)
- [ ] Loading states added
- [ ] Error states added
- [ ] Empty states added (if applicable)
- [ ] Tailwind CSS used (no inline styles)
- [ ] Mobile responsive (tested)
- [ ] Component names imported correctly
- [ ] Redux actions called (if applicable)
- [ ] Navigation links work
- [ ] No console errors or warnings
- [ ] Meaningful commit message created

---

## 🚀 GETTING STARTED

### For MASON:
1. Read TEAM_INSTRUCTIONS.md
2. Read Login.jsx comments (top of file)
3. Understand what needs to be built
4. Start coding following the comments as a guide

### For NAOMI:
1. Read TEAM_INSTRUCTIONS.md
2. Read Wallet.jsx comments
3. Read Beneficiaries.jsx comments
4. Start from the simpler pages first (Wallet)

### For NASRA:
1. Read TEAM_INSTRUCTIONS.md
2. Read Transactions.jsx comments
3. Read SendMoney.jsx comments
4. Understand the multi-step flow (Send → Confirm → Status)

### For MYLES:
1. Set up Redux first (Day 1)
2. Set up React Router next (Day 1)
3. Build components while others work on pages (Day 1)
4. Integrate everyone's work (Day 5)

---

## 📞 DAILY STANDUP TEMPLATE

```
STANDUP - [DATE]

MASON:
- Yesterday: [what you completed]
- Today: [what you're working on]
- Blockers: [any issues?]

NAOMI:
- Yesterday: [what you completed]
- Today: [what you're working on]
- Blockers: [any issues?]

NASRA:
- Yesterday: [what you completed]
- Today: [what you're working on]
- Blockers: [any issues?]

MYLES:
- Yesterday: [what you completed]
- Today: [what you're working on]
- Blockers: [any issues?]
```

---

## 🎯 SUCCESS METRICS (END OF WEEK 1)

✅ User can register
✅ User can login
✅ User can see dashboard
✅ User can view wallet balance
✅ User can view beneficiaries
✅ User can add beneficiary
✅ User can send money (complete flow)
✅ User can view transactions
✅ Admin can see admin dashboard
✅ Admin can view users list
✅ All pages responsive on mobile
✅ No console errors
✅ Clean, readable code with comments
✅ Git history with meaningful commits
✅ Deployed to live URL

---

**Ready to build? Let's go! 🚀**

Every page has detailed comments in the code.
Read them first, then implement following the guidelines.

**Questions?** Ask in team chat or ask Myles.
**Stuck for 30 mins?** Reach out immediately.
**Finished early?** Help a teammate or improve your UI.

---

Good luck team! Let's build something amazing! 💪
