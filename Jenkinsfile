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
                sh "npm install"
            }
        }
        stage('OWASP Scan'){
            steps{
                dependencyCheck additionalArguments: '--scan ./ ', odcInstallation: 'DP'
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
        }
        stage('Docker build'){
            steps{
                script{
                    sh 'docker-compose build'
                }
            }
        }
        // stage('Docker Test'){
        //     steps{
        //         script{
        //             sh 'docker-compose run --rm app npm test'
        //         }
        //     }
        // }
        stage('Docker Deploy'){
            steps{
                script{
                    sh 'docker-compose up -d --build'
                }
            }
        }
    }
}