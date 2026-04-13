'use strict';

// Vercel Serverless Function entry point.
// Vercel calls this file's default export as a standard Node.js HTTP handler.
// We just re-export the Express app — @vercel/node wraps it automatically.
const app = require('../backend/server');

module.exports = app;
