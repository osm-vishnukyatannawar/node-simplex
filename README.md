powerpath-server-base
========================

A base framework for the PowerPath server.

# Requirements
- Ensure that you have python (version of python must be > 2.5.0 and < 3.0.0). `node-mariasql` requires python to be installed and in the PATH variable.
- node.js
- npm

# Installation

## Get the files from github

1. Do a git clone - `git clone /path/to/git --recursive`. This will pull the latest code including the sub-directoy.

## Setup the SQL database

We use the MariaDB server.

1. Restore the database from the `sql` folder
2. Update the `db-config.js` file to point to your database

## Installing dependencies

1. Run `npm install` to install node.js dependencies
2. Run `bower install` to install frontend dependencies
3. Run `npm start`


## Setting up documentation
1. Ensure `docker` is installed - `npm install -g docker`
2. In command line, and browse to the code base directory
2. Run `docker -o ./documents/code -c manni -s yes -I -u -x node_modules,app/code/public_html/plugins,documents -w --extras fileSearch`
