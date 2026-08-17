/**
 * ========================================================
 * USERS MANAGEMENT PAGE
 * ========================================================
 * 
 * Owner: NAOMI (Admin Frontend)
 * Week 1: Day 4 (Money Transfer)
 * Status: COMMENTS ONLY - CODE PENDING
 * 
 * WIREFRAME:
 * ┌───────────────────────────────────────────┐
 * │  Users                                    │
 * │                                           │
 * │  [ Search ] [ Filter ]                    │
 * │                                           │
 * │  Users Table:                             │
 * │  ┌─────────────────────────────────────┐  │
 * │  │ Name  │ Email │ Phone │ Status │ ... │  │
 * │  ├─────────────────────────────────────┤  │
 * │  │ Myles │ ...   │ ...   │ Active │ ... │  │
 * │  │ Mason │ ...   │ ...   │ Active │ ... │  │
 * │  │ Nasra │ ...   │ ...   │ Inactive │ ..│  │
 * │  └─────────────────────────────────────┘  │
 * │                                           │
 * │  Action Buttons: [View] [Edit] [Delete]   │
 * │                                           │
 * │  Pagination: [< 1 2 3 >]                  │
 * └───────────────────────────────────────────┘
 * 
 * REQUIREMENTS TO BUILD:
 * ✅ User list in table format
 * ✅ Display: name, email, phone, status
 * ✅ Search functionality (optional)
 * ✅ Filter by status (all/active/inactive)
 * ✅ Action buttons: View, Edit, Delete
 * ✅ Pagination (show 10-20 per page)
 * ✅ Loading state
 * ✅ Responsive design (horizontal scroll on mobile)
 * 
 * DATA STRUCTURE:
 * {
 *   users: [
 *     { id, name, email, phone, status, createdAt }
 *   ],
 *   total: number,
 *   page: number,
 *   pageSize: number
 * }
 * 
 * FUNCTIONS TO BUILD:
 * - handleSearch(query): filter users by name/email/phone
 // - handleFilterStatus(status): filter by active/inactive
 * - handleViewUser(id): navigate to /admin/users/{id}
 * - handleEditUser(id): navigate to /admin/users/{id}/edit
 * - handleDeleteUser(id): show confirmation, delete user
 * - handlePageChange(page): update pagination
 * 
 * STATE NEEDED:
 * - users: array
 * - searchQuery: string
 * - filterStatus: 'all'|'active'|'inactive'
 * - page: number
 * - totalPages: number
 * - isLoading: boolean
 * 
 * NEXT WEEK TODO:
 * - Connect to user management API
 * - Implement actual delete functionality
 * - Implement edit user functionality
 * - Add user role management
 * - Add ban/suspend functionality
 * 
 * ========================================================
 */

import React from 'react';
// TODO: Import useNavigate from react-router-dom

export default function Users() {
  // TODO: Set up useNavigate hook
  // TODO: Check if user is admin
  // TODO: If not admin, redirect to /dashboard
  
  // TODO: Create state for:
  // - users: array
  // - searchQuery: string
  // - filterStatus: string
  // - currentPage: number
  // - isLoading: boolean
  
  // TODO: useEffect to fetch users list
  
  // TODO: Build functions:
  // - handleSearch(query): update searchQuery state
  // - handleFilterStatus(status): update filterStatus state
  // - handleViewUser(id): navigate to user details
  // - handleEditUser(id): navigate to edit user page
  // - handleDeleteUser(id): show confirmation, then delete
  // - handlePageChange(page): fetch new page
  
  // TODO: Build JSX:
  // 1. Header: "Users Management"
  // 2. Search and filter bar:
  //    - Search input field
  //    - Status filter dropdown/buttons
  // 3. Users table:
  //    - Columns: Name, Email, Phone, Status, Actions
  //    - Use <table> or div-based grid
  //    - Show loading spinner if isLoading
  //    - Show empty state if no users
  // 4. Action buttons for each row:
  //    - View button
  //    - Edit button
  //    - Delete button (show confirmation modal)
  // 5. Pagination at bottom:
  //    - Previous/Next buttons
  //    - Page numbers
  //    - Current page indicator
  
  return <div>{/* NAOMI: Build users management page here */}</div>;
}
