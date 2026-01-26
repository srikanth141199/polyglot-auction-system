Migrations are version-controlled scripts that live in your GitHub repo. When a new developer clones your project or the code is deployed to production, the system checks: "What version is the database at? Version 0? Okay, run script 1, 2, and 3 to create the tables."

Since we are in Go, the industry standard for this is a tool called golang-migrate.

example:
000001_create_bids_table.up.sql. The up means "do this when upgrading," and we can also have down files to "undo" changes.

