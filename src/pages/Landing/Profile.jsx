/**
 * ========================================================
 * PROFILE PAGE
 * ========================================================
 * 
 * Owner: MYLES (Group Leader - Landing & Other Components)
 * Week 1: Day 5 (Integration)
 * Status: COMMENTS ONLY - CODE PENDING
 * 
 * WIREFRAME:
 * ┌───────────────────────────────────┐
 * │  Profile                          │
 * │                                   │
 * │  [Avatar]                         │
 * │  Myles Kipchoge                   │
 * │  myles@pesaflow.com               │
 * │                                   │
 * │  Personal Information             │
 * │  Name:        Myles Kipchoge      │
 * │  Email:       myles@pesaflow.com  │
 * │  Phone:       0712345678          │
 * │  [ Edit ]                         │
 * │                                   │
 * │  Account Settings                 │
 * │  [ Change Password ]              │
 * │  [ Two-Factor Auth ]              │
 * │  [ Privacy Settings ]             │
 * │                                   │
 * │  [ Logout ]                       │
 * └───────────────────────────────────┘
 * 
 * REQUIREMENTS TO BUILD:
 * ✅ Display user profile information
 * ✅ User avatar/profile picture
 * ✅ Name, email, phone display
 * ✅ Edit profile button (optional for Week 1)
 * ✅ Account settings section
 * ✅ Change password link
 * ✅ Two-factor auth toggle (optional)
 * ✅ Privacy settings link (optional)
 * ✅ Logout button
 * ✅ Loading state
 * ✅ Responsive design
 * 
 * DATA SOURCE:
 * - Get user data from Redux auth slice
 * - Get user settings from Redux
 * 
 * FUNCTIONS TO BUILD:
 * - handleLogout(): clear Redux state, clear token, navigate to /
 * - handleEditProfile(): navigate to edit profile page (optional)
 * - handleChangePassword(): show modal or navigate to page
 * - handleToggle2FA(): update setting in Redux
 * 
 * STATE NEEDED:
 * - User data from Redux (name, email, phone)
 * - isLoading while updating settings
 * - successMessage, errorMessage
 * 
 * SECTIONS:
 * 1. Profile header with avatar and basic info
 * 2. Personal information section
 //    3. Account settings section with toggles/links
 * 4. Danger zone: Logout button
 * 
 * STYLING:
 * - Clean card-based layout
 * - Icons for each setting
 * - Proper spacing and hierarchy
 * - Highlight logout button (red color)
 * 
 * NEXT WEEK TODO:
 * - Implement edit profile functionality
 * - Implement change password flow
 * - Implement 2FA setup
 * - Add profile picture upload
 * - Add account deletion option
 * 
 * ========================================================
 */

import React from 'react';
// TODO: Import useNavigate from react-router-dom
// TODO: Import useDispatch, useSelector from react-redux

export default function Profile() {
  // TODO: Set up useNavigate hook
  // TODO: Set up useDispatch hook
  // TODO: Get user data from Redux (useSelector)
  
  // TODO: Create state for isLoading
  // TODO: Create state for successMessage, errorMessage
  
  // TODO: Build handleLogout() function
  // - Dispatch logout action to Redux
  // - Clear localStorage (token, user data)
  // - Navigate to /
  
  // TODO: Build handleEditProfile() function (optional)
  // - Navigate to /edit-profile page
  
  // TODO: Build handleChangePassword() function
  // - Navigate to /change-password page
  
  // TODO: Build handleToggle2FA() function
  // - Send API request to toggle 2FA
  // - Update Redux state
  
  // TODO: Build JSX:
  // 1. Header: Page title "Profile"
  // 2. Profile card:
  //    - Avatar/profile picture
  //    - Name
  //    - Email
  //    - "Edit Profile" button (optional)
  // 3. Personal Information section:
  //    - Name (read-only or editable)
  //    - Email (read-only or editable)
  //    - Phone (read-only or editable)
  // 4. Account Settings section:
  //    - "Change Password" link
  //    - "Two-Factor Authentication" toggle
  //    - "Privacy Settings" link (optional)
  //    - Success/Error messages for settings changes
  // 5. Danger Zone:
  //    - "Logout" button (red color)
  //    - Show confirmation dialog before logout
  
  return <div>{/* MYLES: Build profile page here */}</div>;
}
