# Announcements web app

## Description
This project demonstrates how to build and deploy a Node.js and mysql web application using Jenkins, Docker, and Kubernetes. The application can be integrated through Jenkins CI/CD pipelines. Additionally, the application can be deployed locally using Minikube or hosted on AWS using Amazon EKS.

## Prerequisites
- AWS EC2 instances
- Docker
- Jenkins
- Kubernetes
- Minikube (for local deployment)
- kubectl
- nodejs
- mysql
- html,css

## Integrating the Project with jenkins
1. Create an EC2 instance in AWS with the instance type t2.small.
2. Install Jenkins, Docker, and Minikube on the EC2 instance.
3. Allow SSH access on port 22 and Jenkins access on port 8080.
4. Configure Jenkins and install recommended plugins.
5. Set up a Jenkins pipeline using the GitHub repository link.
6. Build the project.
7. Access the site at port 30001.

## Hosting the Project Locally with Minikube
1. Clone the GitHub repository.
2. Install Minikube and kubectl.
3. Apply the Kubernetes configuration files using the following commands:
```
kubectl apply -f mysql-secret.yaml
```
```
kubectl apply -f mysql.yaml
```
```
kubectl apply -f announce-configmap.yaml
```
```
kubectl apply -f announce-app.yaml
```
4. Access the site using the command:
```
minikube service announce-service
```

## Hosting the Project on Amazon EKS
1. Create an Amazon EKS cluster using the `eksctl` command:
```
eksctl create cluster \
--name "name"
--version "version"
--region "region"
--nodegroup-name "name of nodegroup"
--nodetype t2.micro(if u want something else u can change it)
--nodes "nodes you want"
--nodes-min "min nodes needed"
--nodes-max "max nodes needed"
```
2. But make sure that amazon eks will have charges so create cluster only if needed.

## License
This project is licensed under the MIT License

