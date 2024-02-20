library identifier:'jenkins-shared-library@main',retriever:modernSCM(
    [
        $class : 'GitSCMSource',
        remote: 'https://github.com/Rahul7-77/jenkins-shared-library.git'
    ]
)

def gv
pipeline {
    agent any
    tools{
        nodejs 'node'
    }
    stages {
        stage('Git clone') {
            steps {
                git branch: 'main', changelog: false, poll: false, url: 'https://github.com/Rahul7-77/node-mysql-cicd-docker.git'
            }
        }
        stage('Compile'){
            steps{
                script{
                    npmBuild()
                }
            }
        }
        stage('OWASP Scan'){
            steps{
                script{
                    owaspscan.call()
                }
            }
        }
        stage('Docker build'){
            steps{
                script{
                    buildImage 'rahul7502/announcement-node-app'
                }
            }
        }
        stage('Docker login and push'){
            steps{
                script{
                    dockerLogin 'docker-creds'
                    dockerPush 'rahul7502/announcement-node-app'
                }
            }
        }
        stage('kubernetes deploy'){
            steps{
                script{
                    k8Apply 'mysql-secret'
                    k8Apply 'mysql'
                    k8Apply 'announce-configmap'
                    k8Apply 'announce-app'
                }
            }
        }
        // this step is to access the site from webBrowser when using minikube
        stage('Accessing site from webBrowser'){
            steps{
                sh 'minikube service announce-service'
            }
        }
    }
    post {
        success {
            emailext(
                subject: "Build Successful: ${currentBuild.fullDisplayName}",
                body: "Your build succeeded.",
                to: "youremail@gmail.com"
            )
        }
        failure {
            emailext(
                subject: "Build Failed: ${currentBuild.fullDisplayName}",
                body: "Your build failed. Please check the Jenkins console output for details.",
                to: "youremail@gmail.com"
            )
        }
    }
}