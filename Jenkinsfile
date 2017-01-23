node {
    stage('Pull') {
        // Pull repository
        git([url: 'https://github.com/Wiejeben/MarcoPlaats', branch: 'development'])
    }

    stage('Build') {
        // Run the docker build
        sh 'cd API/ && docker-compose -f docker-compose.yml build'
        sh 'cd API/ && docker build -t api-ci -f Dockerfile-test .'
    }

    stage('Test') {
        // Remove old instance
        sh 'cd API/ && docker rm api-server || true'

        // Run test
        sh 'cd API/ && docker run --name api-server api-ci'
    }

    stage('Deploy') {
        sh 'cd API/ && docker-compose -f docker-compose.yml stop'
        sh 'cd API/ && docker-compose -f docker-compose.yml rm -f'
        sh 'cd API/ && docker-compose -f docker-compose.yml up -d'
    }
}