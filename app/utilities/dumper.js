let conf = require('./app/config'),
    sys = require('sys');

let CronJob = require('cron').CronJob;
let job = new CronJob({
    cronTime: '00 30 11 * * 1-5',
    onTick: function() {
        /*
         * Runs every weekday (Monday through Friday)
         * at 11:30:00 AM. It does not run on Saturday
         * or Sunday.
         */
        sys.exec(`mongodump -u ${conf.dbLogin} -o ./dumps -p ${conf.dbPass}`);
    },
    start: false,
    timeZone: 'America/Los_Angeles'
});
job.start();