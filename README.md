# Rent Estimator


Steps to Run
1. `npm install`
2. `npm start`
3.  Go to http://localhost:3000/properties/estimate/:zipcode/:size , example zipcode= 10318 & size = 100
## How does it work.

There are two csv files in the lib/data folder. They contain rent information.
Whenever the server starts, it cleans up the database then start to read the files on after one & update them to the database (postgres~heruku).
Ideally, the cron task should download the file every monday & process it. At this moment there is no cloud source for getting the files every week, and we have only 2 of them. So the cron task processes those hardcoded files one after one.

At the `rent-uploader.ts` file, the startProcessingDataFiles function is being executed in every 40 seconds for now, for easier monitoring.
The expression for executing in it every monday is written on side of the code as comment.

At the same file, the function `saveFileData`, it updates the old entries (if there is any change) and also adds new entries (if there is any).
