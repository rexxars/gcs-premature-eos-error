require('hard-rejection/register')

const fs = require('fs')
const path = require('path')
const brake = require('brake')
const storage = require('@google-cloud/storage')

const gcs = storage({
  keyFilename: process.env.GCS_KEY_PATH || path.join(__dirname, 'gcloud.json')
})

const bucket = gcs.bucket(process.env.GCS_BUCKET || 'gcs-issue-test')
const file = bucket.file(process.env.GCS_FILE_PATH || 'G0030540.JPG')
const outputFile = path.join(__dirname, 'out.file')
const targetStream = fs.createWriteStream(outputFile)
const sourceStream = file.createReadStream()

sourceStream.pipe(brake(10)).pipe(targetStream)
sourceStream.once('readable', scheduleTargetStreamEnd)

function scheduleTargetStreamEnd() {
  setImmediate(() => {
    targetStream.end()
    console.log('Target stream ended')
    console.log('Waiting for timeout/error from GCS (approx. 60s)')
  })
}
