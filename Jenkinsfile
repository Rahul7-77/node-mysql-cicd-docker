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
        // If u have tests you can uncomment the below 'Docker Test' stage and make the to update the test in package.json 
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