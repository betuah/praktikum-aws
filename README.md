

# Course Order Service
Course order service is a part of course app API backend services to handle course order functionality.

## TechStack

Course Order uses a number of technology stack to work properly:
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework 
- [Mocha] - JavaScript test framework running on Node.js and in the browser
- [dynamodb] - Fast, flexible NoSQL database service for single-digit millisecond performance at any scale by AWS

## API Endpoint

You can check the API endpoint documentation in [here]

## Installation and setup

#### Environment Variable

Course order service need environment variable to comunicate with other AWS services like dynamodb. You need create an IAM user to grand access for dynamodb. The following below is a list of the environments.

| KEY | Required | Description  |
|--|--|--|
| **AWS_ACCESS_KEY** | ***true*** | AWS access key to access the dynamodb |
|**AWS_SECRET_KEY**| ***true*** | AWS secret key to access the dynamodb |
|**AWS_DYNAMODB_TABLE**| ***true*** | table order name in dynamodb |
|**AWS_REGION**| ***true*** | AWS region that service you used |

> **Note** : If your want to run env variable in local machine, you need to create **.env.production** and **.env.testing** by filling the key and value in the table above

#### Run Unit Test
You can easily run unit tests for Course Order Services for production test with the following command:

```sh
npm install
npm run test 
```
these command will be generate `test-result.xml` file in **report** folder with JUnit format. If you want to show the testing result in the terminal, just following this command below :
```sh
npm install
npm run testdev
```

#### Run the server
Course Order requires [Node.js](https://nodejs.org/) v16+ to run.
Install the dependencies and start the server.

```sh
npm install
npm run start
```

### Run with Docker

Course order is very easy to install and deploy in a Docker container.
By default, the Docker will expose port 8000 for production and port 9000 for testing, When ready, simply use the Dockerfile to build the image.

```sh
docker build -t <name_tag> .
```
You can change `<name_tag>` with image name whatever you want. Let me gift you some example :
```sh
docker build -t course-order:latest .
```
or if you want to push the image to some docker registry repository like ECR just change the `<name_tag>` with the repository url, for example :

```sh
docker build AWS_ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/course-order:latest .
```
Once done, you can run the Docker image and map the port to whatever you wish on your host. In this example, we simply map port 8080 of the host to port 8000 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -d -p 8080:8000 --name=course-order-container <name_tag>
```

Verify the API by navigating to your server address in
your preferred browser.

```sh
127.0.0.1:8080
```

### Deploy to AWS Beanstalk
You can deploy to aws beanstalk if you already created the image and upload it to the docker registry like ECR. First step to deploy your image into aws beanstalk, you need to create Dockerrun.aws.json file in this repository with this following json format:
```json
{
   "AWSEBDockerrunVersion": "1",
   "Authentication": {
      "Bucket": "YOUR_BUCKET", 
      "Key": "YOUR_CONFIG_FILE_IN_BUCKET"
   },
   "Image": {
      "Name": "YOUR_IMAGE_REPOSITORY"
   },
   "Ports": [
      {
         "ContainerPort": 8000,
         "HostPort": 80
      }
   ]
}
```
Description:
- AWSEBDockerrunVersion is dockerrun version for create the container, 1 is mean for single container and 2 is for multi container.
- Authentication is use for authenticate to private docker registry like ECR.
- Authentication > bucket is where you put the dkcfg (Docker config) file for the credential.
- Authentication > key is the credential file name in the selected bucket, for example, config.json or dkcfg.
- Image is what you image url on ECR or other docker registry

This is the example of config.json file for ECR credential:
```json
{
  "auths": {
    "YOUR_AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com": {
      "auth": "YOUR_ECR_AUTH_TOKEN"
    }
  }
}
```
> **Note:** Dont forget to give permission aws beanstalk to get object from S3. You can create the ECR auth token with aws cli command `aws ecr get-login-password --region {{ECR_REGION}}` and copy the result to config.json file.

## License

MIT

**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [dill]: <https://github.com/betuah/lks-course-order>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [node.js]: <http://nodejs.org>
   [sequelize]: <https://sequelize.org>
   [express]: <http://expressjs.com>
   [Mocha]: <https://mochajs.org/>
   [AWS-SDK]: <https://aws.amazon.com/id/sdk-for-javascript/#:~:text=The%20AWS%20SDK%20for%20JavaScript%20simpli%EF%AC%81es%20use%20of%20AWS%20Services,marshaling%2C%20serialization%2C%20and%20deserialization.>
   [aws-ssm]: <https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html>
   [here]: <https://documenter.getpostman.com/view/2061573/2s83zdx7Di>
   [S3]: <https://aws.amazon.com/id/s3>
   [dynamodb]: <https://aws.amazon.com/id/dynamodb/?trk=fb31ef7c-dff3-4b64-b3eb-6d667ece9f85&sc_channel=ps&s_kwcid=AL!4422!3!536452582733!e!!g!!dynamodb&ef_id=Cj0KCQjw1vSZBhDuARIsAKZlijSWMN1Cvsbzx6A6NnjWKqp-NtJEIw1M3X1B_U6HM54NStAjBRqH3YoaAq3oEALw_wcB:G:s&s_kwcid=AL!4422!3!536452582733!e!!g!!dynamodb>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
