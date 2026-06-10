# Plugin Documentation

<!-- Use this page to document your plugin. Below is a suggested structure. -->

## Overview

This is a sample plugin demonstrating an API call action. It fetches data from a time API endpoint.

## Dependencies

### Backend

```kotlin
dependencies {
    implementation("com.ritense.valtimoplugins:samenwerkfunctionaliteit-plugin:1.0.0")
}
```

### Frontend

```json
{
  "dependencies": {
    "@valtimo-plugins/samenwerkfunctionaliteit-plugin": "1.0.0"
  }
}
```

In your `app.module.ts`:

```typescript
import {
    SamenwerkfunctionaliteitPluginModule, samenwerkfunctionaliteitPluginSpecification,
} from '@valtimo-plugins/samenwerkfunctionaliteit';

@NgModule({
    imports: [
        SamenwerkfunctionaliteitPluginModule,
    ],
    providers: [
        {
            provide: PLUGIN_TOKEN,
            useValue: [
                samenwerkfunctionaliteitPluginSpecification,
            ]
        }
    ]
})
```

### API Gateway
To enable the API proxy from the backend to the Samenwerkfunctionaliteit API, use to following settings in the **application.yml**:
```yaml
valtimo:
    samenwerkfunctionaliteit:
        enableGateway: true
```

The endpoint where the requests can be sent, can be set up at .env.properties
```yaml
AUTODEPLOYMENT_PLUGINCONFIG_SAMENWERKFUNCTIONALITEIT_GATEWAY_ENDPOINT=/samenwerkfunctionaliteit/v5/**
```
## Configuration

List the plugin configuration properties and how to set them.

| Property | Type   | Required | Description                          |
|----------|--------|----------|--------------------------------------|
|          |        |          |                                      |

## Actions

### Time API test action

Sends a GET request to the configured API URL and returns the timezone response.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
|           |      |          |             |

## Usage

Explain how to use the plugin in a process, with examples if applicable.
