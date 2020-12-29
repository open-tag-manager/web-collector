# Web Collector

A web implementation for Google Analytics Measurement Protocol.

See: https://developers.google.com/analytics/devguides/collection/protocol/v1

## Usage

### Web build

You can create web package by following command.

```
npm run build
```

And put `dist-web/web-collector.js` to your web server.

```
<script src="web-collector.js"></script>
<script>
(function() {
  var wc = WebCollector('UA-XXXXXX');
  wc.pageview();
})()
</script>
```

### CommonJS

```
npm install web-collector
```

```
import { WebCollector } from 'web-collector';

const wc = new WebCollector('UA-XXXXXX');
wc.pageview();
```


## WebCollector API

You can use following properties/methods on the instance of WebCollector.

### property

- `endpoint`: The collect endpoint. default: `https://www.google-analytics.com/collect`
- `trackingId`: The tracking id for Google Analytics.
- `clientId`: The client id to specify user.

### method

- `pageview()`: Send pageview
- `event(eventCategory, eventAction, eventLabel?)`: Send event
