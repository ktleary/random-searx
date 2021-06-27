# rndm_searchx

A node script to retrieve a random good search index from the api.



## How it works:

1. Parses the api response and checks for a grade of B
or higher.

2. Select and print a random instance from the good instances.

## Dependencies

1. axios
2. user-agents


## Installation

- git clone
- npm install

## Running

- node index.js

## Note:

There is an async branch with axios and split code. The main
with one file is running with a bash script e.g.
alias searchx="node ~/dev/scripts/searchx.js &"
