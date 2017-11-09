# COD2 Rcon

A simple rcon tool made in nodejs to try out this framework.



## How to use (in game)

In order to get your stats registered you need to register to the stats server. (This part is left up to the developer). Execute the following steps in order to login:

* register an account on your [fps-stats-viewer](<link here>) website
* go to your `fps-stats-viewer` website and login
* request a `login pin`. Write it down somewhere or memorize it
* enter the server with one of your registered nicks and digit `!login <pin>` in the global chat. Now your player should be authenticated to the log parser and all stats gathered will be sent to the [fps-collector](<link here>) server.
* to logout (a.k.a stop stats collection) simply type `!logout`.

> **NOTE:** if you logout from the current match and come back in, you'll have to repeat the procedure in order to get your stats registered again

# TODO
* success/fail login message (rcon) for user to be notified


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
* Kills
* Deaths

* **JOIN**
When a player joins the server, he is added to the redis database as the following KEY:VALUE (<nick>:null). The key is the nick the player is curren

game_id:[game_nick, auth_id]

* **KILL & DEATH**
Every kill and death is reported to the collector server *only* if the player has a valid account (see creating an account) and is logged in (see login section).

* **QUIT**
If the user was logged in, the application marks him as logged out and stops collecting information for that player id.
