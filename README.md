# salesforce-restapi-made-easy
Node.js implementation of the salesforce's rest API.

## Contents
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)

## Features
- Escape special SOSL's characters: ? & | ! { } [ ] ( ) ^ ~ * : \ " ' + - 
- Escape special SOQL's characters: \ '
- Configurable API version. Default v43.0
- Fetch SOSL' search results.
  - Generate text-search criterion    
- Fetch SOQL's query results.
- CRUD operations (coming soon)
   
 ## Getting Started
 ### Installation
 ```
 > npm install --save salesforce-restapi-made-easy
 ```
## Usage

### Escape SOQL queries and SOSL searches
 ```js
const {escapeSOSL, escapeSOQL} = require('salesforce-restapi-made-easy');

console.log(escapeSOQL(`Tom's cabin`)); // Tom\\'s cabin
console.log(escapeSOSL('{1+1}:2'));     // \\{1\\+1\\}\\:2
 ```
### Create a text-search criteria for a SOSL search.
````js
const {createSearchCriteria} = require('salesforce-restapi-made-easy');
console.log(createSearchCriteria(' tavern by   the sea  '));
//Output:
// "tavern by the sea" OR "by the sea" OR "the sea" OR sea OR "tavern by the" OR "tavern by" OR tavern
```` 
 
 
### SOQL queries and SOSL searches
````js
const {escapeSOSL, escapeSOQL, easyAPI} = require('../index');

// Prerequisite: Fetch a token and an organization's url
//              from the Salesforce's OAuth2 API.
(async function() {
  try {
    let records;
    const token='62aC67bBquJkqLX8jXGhNhLwa3cbafU20jIZU5mMSw0MmyiDT7GPMEjucLfncgE0';
    const orgURL='https://cs13.salesforce.com';
    const API43 = easyAPI(orgURL, 'v43.0')(token);
    const soqlQuery=`Select Name from Account where Address='${escapeSOQL('Tom\'s rd')}'`;
    const soqlResults = await API43.SOQL(soqlQuery);
    // Process soqlResults

    const soslQuery = `FIND {${escapeSOSL(`O.A.K (2){3}`)}} IN NAME FIELDS RETURNING Account(Id, Name)`;
    const soslResults = await API43.SOSL(soslQuery);
    // Process soslResults

    //Return response
    return records;
  } catch (error) {
    throw error;
  }
})().then((records)=>console.log(records))
    .catch((error)=>console.error(error));
````
