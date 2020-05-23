# Postgres Questions and Answers

## How to find Configuration File

```SQL
SHOW config_file;
```

This will return the path on the machine where `postgres.conf` is located.

### What is SHOW

SHOW **name** returns the value of a run-time parameter.

To see all the run-time parameters:

```SQL
SHOW ALL
```
