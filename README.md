# gcs-premature-eos-error

When the target stream is ended/closed before the Google Cloud Storage client is finished reading the remote file, the validation fails because it tries to compare the partially received data with the remote hash.

This repo contains a simplified example of the problem. In real-world, we experienced this problem when an HTTP server behind a proxy was piping from GCS to the HTTP response, and the upstream proxy closed the socket.


## Running

```
git clone https://github.com/rexxars/gcs-premature-eos-error.git
cd gcs-premature-eos-error
npm install
npm test
```

## Environment variables

Please set the following environment variables (or directly modify `test.js`):

- `GCS_KEY_PATH` - Path to a Google Cloud key file with access to a bucket
- `GCS_BUCKET` - Name of Google Cloud Storage bucket to fetch from
- `GCS_FILE_PATH` - Path to a file inside of the bucket
