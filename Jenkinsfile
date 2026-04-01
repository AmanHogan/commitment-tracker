pipeline {
    agent { label 'docker-agent' }

    environment {
        REGISTRY      = "192.168.56.20:5001"
        IMAGE         = "${REGISTRY}/commitment-tracker-api"
        K3S_REPO      = "https://github.com/AmanHogan/k3s.git"
        MANIFEST_FILE = "gitops/commitment-tracker/backend.yaml"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Push Image') {
            steps {
                script {
                    env.SHA = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    sh """
                        docker build \
                          -t ${IMAGE}:${SHA} \
                          -t ${IMAGE}:latest \
                          ./backend
                        docker push ${IMAGE}:${SHA}
                        docker push ${IMAGE}:latest
                    """
                }
            }
        }

        stage('Update Manifest') {
            steps {
                // Clone the k3s infra repo, bump the image tag, push back
                // so ArgoCD picks up the change and deploys the new image.
                withCredentials([usernamePassword(
                    credentialsId: 'github-token',
                    usernameVariable: 'GH_USER',
                    passwordVariable: 'GH_TOKEN'
                )]) {
                    sh """
                        rm -rf _k3s
                        git clone https://${GH_USER}:${GH_TOKEN}@github.com/AmanHogan/k3s.git _k3s
                        sed -i 's|image: ${REGISTRY}/commitment-tracker-api:.*|image: ${IMAGE}:${SHA}|' \
                            _k3s/${MANIFEST_FILE}
                        cd _k3s
                        git config user.email "jenkins@local"
                        git config user.name  "Jenkins"
                        git add ${MANIFEST_FILE}
                        git diff --cached --quiet || git commit -m "ci: update backend image to ${SHA}"
                        git push
                        cd ..
                        rm -rf _k3s
                    """
                }
            }
        }
    }

    post {
        success { echo "✅ Build ${SHA} deployed — ArgoCD will sync within 3 minutes." }
        failure { echo "❌ Build failed." }
    }
}
