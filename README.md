# CRM-REAL-ESTATE (BACKEND(NODE JS & POSTGRES))

* OVERVIEW

This project is a backend service for a simple CRM system that allows users to manage leads
The system supports creating leads, searching, filtering, sorting, and updating lead status, simulating

# Problem Understanding

In a CRM system, leads go through multiple stages:

New → Contacted → Qualified → Closed

The goal of this backend is to:
Store lead data
Allow flexible querying
Support updating lead status
Ensure data validation and security

# Tech Stack

 - Node.js – runtime environment  
 - Express.js – API framework  
 - PostgreSQL – relational database  
 - pg (node-postgres) – database client  
 - Supabase – hosted PostgreSQL  
 - dotenv – environment management 

 # Architecture & Design

The project follows a clean and modular structure:
