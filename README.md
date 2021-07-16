# rndm_searx

This started out as a node script and turned into a rudimentary html page. Feel free to take it and run with it if you want to improve the maintainability.

In the wild: https://stringtalk.org/searx


## Details

A node script and complimentary html page to retrieve a random good search index from the searx api.

## How it works:

1. Parses the api response and checks for a grade of B
   or higher.

2. Select and print a random instance from the good instances.

## Dependencies

1. axios
2. user-agents

## HTML Installation

- open rndm-searx.html in a location capable of supporting ajax

## Node Installation

- git clone
- npm install

## Running

- node index.js

## HTML version

Also included is an HTML version rndm-searx.html which uses the browser to perform a redirect. It can be seen in the wild at https://stringtalk.org/searx

## Note:

There is an async branch with axios and split code. The main
with one file is running with a bash script e.g.
alias searchx="node ~/dev/scripts/searchx.js &"
