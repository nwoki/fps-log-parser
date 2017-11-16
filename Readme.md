# COD2 log parser

A simple CallOfDuty tool made in nodejs to try out this framework. It parses the log file and reports to the `collector` the stats extracted.



## How to use (in game)

In order to get your stats registered you need to register to the stats server. (This part is left up to the developer). Execute the following steps in order to login:

* register an account on your [fps-stats-viewer](<link here>) website
* go to your `fps-stats-viewer` website and login. Here you'll be able to associate a series of nicks to your user account.
* go and play on your server!


# TODO


## Setup

You'll need to specify the following information in your `.env` file:

```
COLLECTOR_PORT=
COLLECTOR_ADDRESS=
LOG_FILE=
```

> **NOTE:** you log file for the game MUST reside in the application root folder. For some reason the `tail` module can't access files that are present in parent directories. Just softling the log file to the project root and you're done


## The Works

The application basically parses the COD2 (for now) server log file. It looks for:

* Joins
* Kills and Deaths

* **JOIN**
When a player joins the server, he is reported to the stats collector service and added to the database if missing.

* **KILL & DEATH**
Every kill and death is reported to the collector server for stats gathering
