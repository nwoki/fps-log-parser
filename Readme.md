# COD2 Rcon

A simple rcon tool made in nodejs to try out this framework.



## Features

* sends game info to it's brother for stats gathering (WIP)


## Setup

You'll need to specify the following information in your `.env` file:

```
COLLECTOR_PORT=
COLLECTOR_ADDRESS=
LOG_FILE=
```

> **NOTE:** you log file for the game MUST reside in the application root folder. For some reason the `tail` module can't access files that are present in parent directories. Just softling the log file to the project root and you're done
