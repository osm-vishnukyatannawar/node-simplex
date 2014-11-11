powerpath-server-base
========================

A base framework for the PowerPath server.

# Requirements
- Ensure that you have python (version of python must be > 2.5.0 and < 3.0.0). `node-mariasql` requires python to be installed and in the PATH variable.
- node.js
- npm
- bower (`npm install -g bower`)

# Installation

## Get the files from github

1. Do a git clone - `git clone /path/to/git --recursive`. This will pull the latest code including the sub-directoy.
2. Open a terminal in the sub-directory - `cd app/code`
3. Change the branch to whatever is the current sprint. You can do so - `git checkout -b sprint_X`.

## Setup the SQL database

We use the MariaDB server.

1. Restore the database from the `sql` folder
2. Update the `db-config.js` file to point to your database

## Installing dependencies

1. Run `npm install` to install node.js dependencies
2. Run `bower install` to install frontend dependencies
3. Run `npm start`


