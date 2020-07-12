import json
import boto3
from botocore.exceptions import ClientError

def lambda_handler(event, context):
    SENDER = "Sugarfly <info@sugarfly.nl>"
    RECIPIENT = "info@sugarfly.nl"
    AWS_REGION = "eu-west-1"
    CHARSET = "UTF-8"
    CONFIGURATION_SET = "ConfigSet"
    
    SUBJECT = "Sugarfly | contact"
    
    if 'bericht' not in event or 'naam' not in event or 'email' not in event:
        return {
            'statusCode': 400,
            'body': 'Verplicht veld mist'
        }
    
    BODY_TEXT = ("Naam: "+event['naam']+"\r\nE-mail: "+event['email']+"\r\nBericht: "+event['bericht']) 
    
    htlmmessage = """<html>
            <head></head>
            <body>
                Naam: %s <br>
                E-mail: %s <br>
                Bericht: %s
            </body>
            </html>
            """ 
    
    BODY_HTML = htlmmessage % (event['naam'],event['email'],event['bericht'])
            
    client = boto3.client('ses',region_name=AWS_REGION)
    
    try:
        #Provide the contents of the email.
        response = client.send_email(
            Destination={
                'ToAddresses': [
                    RECIPIENT,
                ],
            },
            Message={
                'Body': {
                    'Html': {
                        'Charset': CHARSET,
                        'Data': BODY_HTML,
                    },
                    'Text': {
                        'Charset': CHARSET,
                        'Data': BODY_TEXT,
                    },
                },
                'Subject': {
                    'Charset': CHARSET,
                    'Data': SUBJECT,
                },
            },
            Source=SENDER,
            # If you are not using a configuration set, comment or delete the
            # following line
            #ConfigurationSetName=CONFIGURATION_SET,
        )
    except ClientError as e:
        return {
            'statusCode': 400,
            'body': json.dumps(e.response['Error']['Message'])
        }

    return {
        'statusCode': 200,
        'body': json.dumps('Bericht verstuurd!')
    }
