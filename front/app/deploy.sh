#!/bin/sh

export AWS_ACCESS_KEY_ID="AKIAVEYZQNMYJAHBXGIN"
export AWS_SECRET_ACCESS_KEY="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"
export AWS_DEFAULT_REGION="us-west-1"

# remove unnecacery files
find /home/sugarfly/app/dist/ -iname *.map -exec rm -f {}  \;

# update all information
aws s3 sync /home/sugarfly/app/dist/ s3://sugarfly.nl/ --delete --cache-control 'max-age=31536000'

# remove cache controll from index.html
aws s3 cp /home/sugarfly/app/dist/index.html s3://sugarfly.nl/index.html --cache-control 'max-age=0'

# invalidate the website so it gets updated
aws cloudfront create-invalidation --distribution-id EZE7FZFRONFJ3 --paths "/index.html"
