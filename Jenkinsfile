pipeline {
    agent any

    environment {
        PROJECT_DIR = "${WORKSPACE}"
        ENV_FILE = ".env"       // Change to .env.prod if needed
        DOCKER_COMPOSE = "docker-compose"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Prepare Environment') {
            steps {
                // Copy environment file to backend
                bat "copy ${ENV_FILE} backend\\.env /Y"
            }
        }

        stage('Build and Deploy Containers') {
            steps {
                dir("${PROJECT_DIR}") {
                    // Stop existing containers
                    bat "${DOCKER_COMPOSE} down"

                    // Build and start containers in detached mode
                    bat "${DOCKER_COMPOSE} up --build -d"
                }
            }
        }

        stage('Wait for MongoDB') {
            steps {
                bat """
                :waitmongo
                docker exec chat-mongo mongo --eval "db.getName()" >nul 2>&1
                if errorlevel 1 (
                    echo Waiting for MongoDB...
                    timeout /t 5
                    goto waitmongo
                )
                echo MongoDB is ready!
                """
            }
        }

        stage('Verify Deployment') {
            steps {
                bat "docker ps"
            }
        }
    }

    post {
        success {
            echo "✅ Chat app deployed successfully!"
        }
        failure {
            echo "❌ Deployment failed. Check logs!"
        }
    }
}
