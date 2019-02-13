export default {
  PORT: process.env.PORT || 3000,
  SWG_STATS_ROUTE: process.env.SWG_STATS_ROUTE || "/swagger-stats",
  SWG_STATS_SESSION_MAX_AGE: process.env.SWG_STATS_SESSION_MAX_AGE || 900,
  SWG_STATS_ATHENTICATION: process.env.SWG_STATS_ATHENTICATION || true,
  SWG_STATS_AUTH_USERNAME: process.env.SWG_STATS_AUTH_USERNAME || "admin",
  SWG_STATS_AUTH_PASSWORD: process.env.SWG_STATS_AUTH_PASSWORD || "admin"
};
