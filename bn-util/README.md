# bn-util

* Basic boatnet function wrappers, currently just using `moment` for parsing ISO 8601:

`shortFormatDate(dateStr: string): string`

`formatDate(dateStr: string): string`

```
const testShort = util.shortFormatDate('2019-01-01T00:00:00');
// "01/01/19 00:00"
const testFormat = util.formatDate('2019-01-01T00:00:00');
// "January 1, 2019 12:00 AM"
```