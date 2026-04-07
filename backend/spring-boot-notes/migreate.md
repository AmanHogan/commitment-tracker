ce you're on PostgreSQL, the cleanest way is pg_dump / psql — no need to find any files.

On your current machine — dump the database:

On your work laptop — restore it:

Make sure PostgreSQL is installed and running
Create the database:
Restore:
Then update application.properties on the work laptop if your username/password differs:

That's it — the dump captures all tables, data, constraints, and sequences. Much more reliable than copying raw DB files (which are version/OS-sensitive with Postgres)