# rndm_searx

A simple script to query a searx api monitor stats for instance health and redirect to a healthy site. This helps redistribute the load and narrows down choices from a long list.

In the wild: https://stringtalk.org/searx

## How it works:

1. Parses the api response and checks for a grade of B
   or higher.

2. Select and print a random instance from the good instances.

## HTML Installation

-  copy index.html and rndm-search.js in a location capable of supporting ajax

## Node

This started out as a node script which is also available in the nodejs folder.

### Dependencies

1. axios
2. user-agents
