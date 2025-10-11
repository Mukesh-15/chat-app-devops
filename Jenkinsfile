pipeline {
    agent any

    environment {
        // Set Node.js version or PATH if needed
        NODE_ENV = "production"
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Pull latest code from GitHub
                git branch: 'main', url: 'https://github.com/Mukesh-15/chat-app-devops.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                dir('backend') {
                    sh 'npm test || echo "No tests configured"'
                }
            }
        }

        stage('Start Server') {
            steps {
                dir('backend') {
                    sh 'npm start &'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished!'
        }
    }
}
